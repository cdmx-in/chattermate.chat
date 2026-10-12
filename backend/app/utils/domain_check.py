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

Whether a signup domain resolves in DNS - for a soft warning, never a block:
some people sign up before their site is live.
"""

import asyncio
import socket
import time
from typing import Dict, Optional, Tuple
from urllib.parse import urlparse

LOOKUP_TIMEOUT_SECONDS = 2.0
# The field re-checks on every pause in typing, and the endpoint is public:
# remember answers for a while so neither costs a lookup each time.
CACHE_SECONDS = 600
CACHE_LIMIT = 1000
_cache: Dict[str, Tuple[float, Optional[bool]]] = {}


def bare_host(domain: str) -> str:
    """'https://Example.com/path' -> 'example.com'."""
    value = domain.strip()
    return (urlparse(value if "//" in value else f"//{value}").hostname or "").lower()


async def _resolves(host: str) -> bool:
    loop = asyncio.get_running_loop()
    try:
        await loop.getaddrinfo(host, None, type=socket.SOCK_STREAM)
        return True
    except socket.gaierror:
        return False


async def domain_resolves(domain: str) -> Optional[bool]:
    """True/False when DNS answered, None when it couldn't say in time (or the
    input isn't a hostname) - callers warn only on a definite False. Asks for
    the bare domain and www. together (some sites only publish www), within
    one overall time budget."""
    host = bare_host(domain)
    if not host or "." not in host:
        return None
    cached = _cache.get(host)
    if cached and time.monotonic() - cached[0] < CACHE_SECONDS:
        return cached[1]
    candidates = {host, f"www.{host.removeprefix('www.')}"}
    try:
        answers = await asyncio.wait_for(
            asyncio.gather(*(_resolves(candidate) for candidate in candidates)), LOOKUP_TIMEOUT_SECONDS
        )
        result: Optional[bool] = any(answers)
    except asyncio.TimeoutError:
        result = None
    if len(_cache) >= CACHE_LIMIT:
        _cache.clear()
    _cache[host] = (time.monotonic(), result)
    return result
