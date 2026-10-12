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
"""

"""Opt-in refusal of user-configured outbound targets on internal networks.

AI base URLs, MCP server URLs and ticket databases are dialled by this server.
Self-hosters legitimately point them at their own network (Ollama on
localhost, a private MCP server or database), so the default policy "any"
allows everything. A shared, multi-tenant deployment sets
OUTBOUND_URL_POLICY=public_only so no tenant can use these features to reach
the server's own network or the cloud metadata endpoint.

Targets are checked when saved and again right before each connection, since
what a hostname resolves to can change in between.
"""

import ipaddress
from typing import Optional

from fastapi import HTTPException, status

from app.core.config import settings
from app.knowledge.url_safety import resolves_to_blocked_host

POLICY_ANY = "any"
POLICY_PUBLIC_ONLY = "public_only"


class OutboundTargetBlocked(ValueError):
    """A configured target is internal and the policy is public_only."""


def _as_url(target: str) -> str:
    """resolves_to_blocked_host parses a URL; give a bare host (a database or
    SSH host) the shape it expects. A scheme-less "localhost:11434/v1" would
    otherwise parse with no host at all and slip through."""
    if "://" in target:
        return target
    try:
        if ipaddress.ip_address(target).version == 6:
            return f"//[{target}]"
    except ValueError:
        pass
    return f"//{target}"


def check_outbound_target(target: Optional[str], label: str) -> None:
    """Raise OutboundTargetBlocked when the policy is public_only and
    ``target`` (a URL or a bare host) is, or resolves to, a private, loopback,
    link-local or reserved address. ``label`` names the field in the error."""
    if settings.OUTBOUND_URL_POLICY != POLICY_PUBLIC_ONLY or not target:
        return
    if resolves_to_blocked_host(_as_url(target.strip())):
        raise OutboundTargetBlocked(
            f"{label} must be a public address. This server does not allow "
            "private, loopback, link-local or reserved network targets."
        )


def require_public_target(target: Optional[str], label: str) -> None:
    """check_outbound_target for request handlers: a refusal is a 400."""
    try:
        check_outbound_target(target, label)
    except OutboundTargetBlocked as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
