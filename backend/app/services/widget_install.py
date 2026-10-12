"""
Copyright 2024-2026 ChatterMate

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Where a widget is live, from the Origin of its page loads.

The loader fetches /widgets/{id}/data with mode 'cors', so the browser always
sends Origin. A first-time visitor has no token, so that request is a simple
GET with no preflight: it reaches us even from a site CORS will then refuse.
That makes two useful facts visible:

- installed: loaded from the org's own domain (or www.) - it works there;
- blocked: loaded from some other public site, where CORS stops it and the
  widget silently never appears.

Our own surfaces (dashboard, help centers, configured CORS origins) and local
or development addresses are ignored. Recording costs at most one write per
widget for the install, and one per widget/site/day for a block.
"""

import ipaddress
import re
from datetime import date, datetime, timedelta, timezone
from enum import Enum
from typing import Optional, Set, Tuple
from urllib.parse import urlparse

from sqlalchemy import or_, update

from app.core.config import settings
from app.core.cors import BASE_CORS_ORIGINS, get_cors_origin_regex, get_cors_origins
from app.core.logger import get_logger
from app.database import SessionLocal
from app.models.widget import Widget

logger = get_logger(__name__)

_LOCAL_SUFFIXES = (".localhost", ".local", ".test", ".internal", ".lan", ".home.arpa")
_STANDARD_PORTS = (None, 80, 443)
_BLOCKED_REFRESH = timedelta(days=1)
_ORIGIN_MAX = 255  # the widgets.*_origin column width
# In-process memory of what was already written, so a busy page doesn't
# queue a write per load. Bounded: cleared when it grows past this.
_MEMORY_LIMIT = 10_000
_recorded_installs: Set[str] = set()
_recorded_blocks: Set[Tuple[str, str, date]] = set()


class OriginKind(Enum):
    INSTALLED = "installed"
    BLOCKED = "blocked"
    IGNORED = "ignored"


def _origin_of(url: str) -> Optional[str]:
    parsed = urlparse(url)
    return f"{parsed.scheme}://{parsed.netloc}".lower() if parsed.scheme and parsed.netloc else None


def _our_origins() -> Set[str]:
    own = {_origin_of(settings.FRONTEND_URL), _origin_of(settings.BACKEND_URL)}
    return {o for o in own if o} | {o.lower().rstrip("/") for o in BASE_CORS_ORIGINS}


def _is_local(host: str, port: Optional[int]) -> bool:
    """Dev machines and private networks: tested, not installed."""
    if port not in _STANDARD_PORTS or host == "localhost" or host.endswith(_LOCAL_SUFFIXES):
        return True
    try:
        address = ipaddress.ip_address(host.strip("[]"))
    except ValueError:
        return False
    return not address.is_global


def _bare_domain(domain: str) -> str:
    """An org domain as hostnames compare: no scheme, path, port or www."""
    host = urlparse(domain if "//" in domain else f"//{domain}").hostname or ""
    return host.lower().removeprefix("www.")


def _public_origin(origin: Optional[str]) -> Optional[str]:
    """The normalised origin when it is a public site that isn't ours, else
    None. Needs no database, so it screens out previews and dev loads first."""
    if not origin or origin == "null":
        return None
    try:
        parsed = urlparse(origin)
        host, port = (parsed.hostname or "").lower(), parsed.port
    except ValueError:
        return None
    if parsed.scheme not in ("http", "https") or not host or _is_local(host, port):
        return None
    normalized = f"{parsed.scheme}://{parsed.netloc}".lower()
    if len(normalized) > _ORIGIN_MAX or normalized in _our_origins() or re.match(get_cors_origin_regex(), normalized):
        return None
    return normalized


def _kind(public_origin: str, org_domain: Optional[str]) -> OriginKind:
    domain = _bare_domain(org_domain or "")
    if domain and (urlparse(public_origin).hostname or "").removeprefix("www.") == domain:
        return OriginKind.INSTALLED
    # Allowed by CORS for another reason (a verified help-center domain, say):
    # the widget works there, so it is neither this install nor a block.
    if public_origin in get_cors_origins():
        return OriginKind.IGNORED
    return OriginKind.BLOCKED


def classify_origin(origin: Optional[str], org_domain: Optional[str]) -> OriginKind:
    """What a page load from `origin` says about the widget of an org whose
    domain is `org_domain`."""
    public_origin = _public_origin(origin)
    return _kind(public_origin, org_domain) if public_origin else OriginKind.IGNORED


def claim_write(widget: Widget, origin: Optional[str]) -> Optional[OriginKind]:
    """Whether this load should be recorded: the kind to write, or None.

    The steady state - loads from the site it is already installed on - is
    answered from the loaded row with no query. Otherwise the org's domain is
    read (one lookup) to classify. A returned kind is claimed in memory
    straight away, so a burst of loads queues one write, not many."""
    if widget.id == settings.EXPLORE_WIDGET_ID or not origin:
        return None
    public_origin = _public_origin(origin)
    if public_origin is None or public_origin == widget.installed_origin:
        return None
    org_domain = widget.organization.domain if widget.organization else None
    kind = _kind(public_origin, org_domain)
    origin = public_origin
    if kind is OriginKind.INSTALLED:
        if widget.installed_at is not None or widget.id in _recorded_installs:
            return None
    elif kind is OriginKind.BLOCKED:
        fresh = (
            widget.blocked_origin == origin
            and widget.blocked_origin_seen_at is not None
            and _aware(widget.blocked_origin_seen_at) > datetime.now(timezone.utc) - _BLOCKED_REFRESH
        )
        if fresh or (widget.id, origin, date.today()) in _recorded_blocks:
            return None
    else:
        return None
    _remember(widget.id, kind, origin)
    return kind


def record(widget_id: str, kind: OriginKind, origin: str) -> None:
    """Write one install or block. Runs as a background task after the
    response, in its own session: the request's session is gone by then."""
    origin = origin.lower()
    now = datetime.now(timezone.utc)
    if kind is OriginKind.INSTALLED:
        # First write wins, across every worker process.
        statement = (
            update(Widget)
            .where(Widget.id == widget_id, Widget.installed_at.is_(None))
            .values(installed_at=now, installed_origin=origin)
        )
    else:
        statement = (
            update(Widget)
            .where(Widget.id == widget_id)
            .where(or_(
                Widget.blocked_origin.is_(None),
                Widget.blocked_origin != origin,
                Widget.blocked_origin_seen_at < now - _BLOCKED_REFRESH,
            ))
            .values(blocked_origin=origin, blocked_origin_seen_at=now)
        )
    try:
        with SessionLocal() as db:
            db.execute(statement)
            db.commit()
    except Exception:
        # Losing one sighting is harmless.
        logger.exception(f"Could not record widget {kind.value} for {widget_id}")
        _forget(widget_id, kind, origin)  # let the next load retry


def _remember(widget_id: str, kind: OriginKind, origin: str) -> None:
    memory = _recorded_installs if kind is OriginKind.INSTALLED else _recorded_blocks
    if len(memory) >= _MEMORY_LIMIT:
        memory.clear()
    if kind is OriginKind.INSTALLED:
        _recorded_installs.add(widget_id)
    else:
        _recorded_blocks.add((widget_id, origin, date.today()))


def _forget(widget_id: str, kind: OriginKind, origin: str) -> None:
    if kind is OriginKind.INSTALLED:
        _recorded_installs.discard(widget_id)
    else:
        _recorded_blocks.discard((widget_id, origin, date.today()))


def _aware(value: datetime) -> datetime:
    """SQLite (tests) hands back naive datetimes for timezone columns."""
    return value if value.tzinfo else value.replace(tzinfo=timezone.utc)
