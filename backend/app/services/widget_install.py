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

Origin is only a header: anyone with the widget id can send one. The first
load from the org's site sets installed_at at once (the owner, checking their
own site, sees "Live" straight away); a load from a second, different visitor
confirms it, and only a confirmed install counts as live for email.

Our own surfaces (dashboard, help centers, configured CORS origins) and local
or development addresses are ignored. Recording costs at most two writes per
widget for the install, and one per widget/site/day for a block, for at most
a few sites a day.
"""

import hashlib
import hmac
import ipaddress
import re
from collections import Counter
from dataclasses import dataclass
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
from app.utils.datetimes import as_utc
from app.utils.domain_check import site_host

logger = get_logger(__name__)

_LOCAL_SUFFIXES = (".localhost", ".local", ".test", ".internal", ".lan", ".home.arpa")
_STANDARD_PORTS = (None, 80, 443)
_BLOCKED_REFRESH = timedelta(days=1)
# Distinct blocked sites recorded per widget per day: a few real mistakes
# (staging, a second shop), not one write per forged Origin.
_BLOCKED_SITES_PER_DAY = 5
_ORIGIN_MAX = 255  # the widgets.*_origin column width
_VISITOR_HASH_LENGTH = 16  # the widgets.install_visitor column width
# In-process memory of what was already written, so a busy page doesn't
# queue a write per load. Bounded: cleared when it grows past this.
_MEMORY_LIMIT = 10_000
_recorded_installs: Set[Tuple[str, "Write"]] = set()
_recorded_blocks: Set[Tuple[str, str, date]] = set()
_blocks_per_day: Counter = Counter()


class OriginKind(Enum):
    INSTALLED = "installed"
    BLOCKED = "blocked"
    IGNORED = "ignored"


class Write(Enum):
    INSTALL = "install"   # first load from the org's own site
    CONFIRM = "confirm"   # then a load there from a different visitor
    BLOCK = "block"


@dataclass(frozen=True)
class Sighting:
    """One write to make after the response."""
    write: Write
    origin: str
    visitor: Optional[str]


def visitor_key(client_ip: Optional[str]) -> Optional[str]:
    """Tells visitors apart without storing their IP: a keyed hash."""
    if not client_ip:
        return None
    digest = hmac.new(settings.SECRET_KEY.encode(), client_ip.encode(), hashlib.sha256).hexdigest()
    return digest[:_VISITOR_HASH_LENGTH]


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


def _same_site(public_origin: str, other: str) -> bool:
    return site_host(public_origin) == site_host(other)


def _kind(public_origin: str, org_domain: Optional[str]) -> OriginKind:
    # The same rule CORS uses (app/core/cors.py): the org's site and its www.
    if org_domain and site_host(org_domain) and _same_site(public_origin, org_domain):
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


def claim_write(widget: Widget, origin: Optional[str], client_ip: Optional[str] = None) -> Optional[Sighting]:
    """Whether this load should be recorded: the write to make, or None.

    The steady state - loads from the site it is already installed on - is
    answered from the loaded row with no query. Otherwise the org's domain is
    read (one lookup) to classify. A returned write is claimed in memory
    straight away, so a burst of loads queues one write, not many."""
    if widget.id == settings.EXPLORE_WIDGET_ID or not origin:
        return None
    public_origin = _public_origin(origin)
    if public_origin is None:
        return None
    if (
        widget.install_confirmed_at is not None
        and widget.installed_origin
        and _same_site(public_origin, widget.installed_origin)
    ):
        return None  # the steady state: nothing left to learn from its own site
    kind = _kind(public_origin, widget.organization.domain if widget.organization else None)
    if kind is OriginKind.INSTALLED:
        sighting = _install_sighting(widget, public_origin, visitor_key(client_ip))
    elif kind is OriginKind.BLOCKED:
        sighting = _block_sighting(widget, public_origin)
    else:
        sighting = None
    if sighting:
        _remember(widget.id, sighting)
    return sighting


def _install_sighting(widget: Widget, origin: str, visitor: Optional[str]) -> Optional[Sighting]:
    if widget.install_confirmed_at is not None:
        return None
    if widget.installed_at is None:
        write = Write.INSTALL
    elif visitor and visitor != widget.install_visitor:
        write = Write.CONFIRM
    else:
        return None
    if (widget.id, write) in _recorded_installs:
        return None
    return Sighting(write, origin, visitor)


def _block_sighting(widget: Widget, origin: str) -> Optional[Sighting]:
    fresh = (
        widget.blocked_origin == origin
        and widget.blocked_origin_seen_at is not None
        and as_utc(widget.blocked_origin_seen_at) > datetime.now(timezone.utc) - _BLOCKED_REFRESH
    )
    today = date.today()
    if (
        fresh
        or (widget.id, origin, today) in _recorded_blocks
        or _blocks_per_day[(widget.id, today)] >= _BLOCKED_SITES_PER_DAY
    ):
        return None
    return Sighting(Write.BLOCK, origin, None)


def record(widget_id: str, sighting: Sighting) -> None:
    """Make one write. Runs as a background task after the response, in its
    own session: the request's session is gone by then."""
    now = datetime.now(timezone.utc)
    if sighting.write is Write.INSTALL:
        # First write wins, across every worker process.
        statement = (
            update(Widget)
            .where(Widget.id == widget_id, Widget.installed_at.is_(None))
            .values(installed_at=now, installed_origin=sighting.origin, install_visitor=sighting.visitor)
        )
    elif sighting.write is Write.CONFIRM:
        statement = (
            update(Widget)
            .where(Widget.id == widget_id, Widget.installed_at.isnot(None),
                   Widget.install_confirmed_at.is_(None))
            .values(install_confirmed_at=now)
        )
    else:
        statement = (
            update(Widget)
            .where(Widget.id == widget_id)
            .where(or_(
                Widget.blocked_origin.is_(None),
                Widget.blocked_origin != sighting.origin,
                Widget.blocked_origin_seen_at < now - _BLOCKED_REFRESH,
            ))
            .values(blocked_origin=sighting.origin, blocked_origin_seen_at=now)
        )
    try:
        with SessionLocal() as db:
            db.execute(statement)
            db.commit()
    except Exception:
        # Losing one sighting is harmless.
        logger.exception(f"Could not record widget {sighting.write.value} for {widget_id}")
        _forget(widget_id, sighting)  # let the next load retry


def _remember(widget_id: str, sighting: Sighting) -> None:
    if len(_recorded_installs) + len(_recorded_blocks) >= _MEMORY_LIMIT:
        _recorded_installs.clear()
        _recorded_blocks.clear()
        _blocks_per_day.clear()
    if sighting.write is Write.BLOCK:
        today = date.today()
        _recorded_blocks.add((widget_id, sighting.origin, today))
        _blocks_per_day[(widget_id, today)] += 1
    else:
        _recorded_installs.add((widget_id, sighting.write))


def _forget(widget_id: str, sighting: Sighting) -> None:
    if sighting.write is Write.BLOCK:
        today = date.today()
        _recorded_blocks.discard((widget_id, sighting.origin, today))
        _blocks_per_day[(widget_id, today)] -= 1
    else:
        _recorded_installs.discard((widget_id, sighting.write))
