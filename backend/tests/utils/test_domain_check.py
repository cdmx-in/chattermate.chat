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

Signup domain DNS check: answers true/false, and "can't tell" (None) on a
timeout or a non-hostname - only a definite false should warn.
"""

import asyncio
import socket
import time

import pytest

from app.utils import domain_check
from app.utils.domain_check import bare_host, domain_resolves


@pytest.mark.parametrize("given,expected", [
    ("teeckbox.com", "teeckbox.com"), ("https://WWW.Teeckbox.com/pricing", "www.teeckbox.com"),
    ("  rex.com ", "rex.com"), ("", ""),
])
def test_bare_host(given, expected):
    assert bare_host(given) == expected


@pytest.fixture(autouse=True)
def empty_cache():
    domain_check._cache.clear()


def fake_dns(monkeypatch, known=(), slow=False):
    async def getaddrinfo(host, port, type=None):
        if slow:
            await asyncio.sleep(10)
        if host in known:
            return [(socket.AF_INET, socket.SOCK_STREAM, 6, "", ("1.2.3.4", 0))]
        raise socket.gaierror("Name or service not known")

    class Loop:
        pass
    loop = Loop()
    loop.getaddrinfo = getaddrinfo
    monkeypatch.setattr(domain_check.asyncio, "get_running_loop", lambda: loop)


def test_resolving_domain(monkeypatch):
    fake_dns(monkeypatch, known={"teeckbox.com"})
    assert asyncio.run(domain_resolves("teeckbox.com")) is True


def test_www_only_domain_counts(monkeypatch):
    fake_dns(monkeypatch, known={"www.teeckbox.com"})
    assert asyncio.run(domain_resolves("https://teeckbox.com")) is True


def test_unknown_domain(monkeypatch):
    fake_dns(monkeypatch)
    assert asyncio.run(domain_resolves("erfanpv.com")) is False


def test_timeout_is_unknown(monkeypatch):
    fake_dns(monkeypatch, slow=True)
    monkeypatch.setattr(domain_check, "LOOKUP_TIMEOUT_SECONDS", 0.01)
    assert asyncio.run(domain_resolves("slow.example")) is None


@pytest.mark.parametrize("value", ["", "localhost", "not a domain"])
def test_non_hostnames_are_unknown(monkeypatch, value):
    fake_dns(monkeypatch)
    assert asyncio.run(domain_resolves(value)) is None


def test_answers_are_cached(monkeypatch):
    lookups = []
    fake_dns(monkeypatch, known={"teeckbox.com"})
    real = domain_check._resolves

    async def counting(host):
        lookups.append(host)
        return await real(host)
    monkeypatch.setattr(domain_check, "_resolves", counting)
    asyncio.run(domain_resolves("teeckbox.com"))
    asyncio.run(domain_resolves("https://teeckbox.com/"))
    assert len(lookups) == 2  # bare + www, once


def test_one_overall_time_budget(monkeypatch):
    fake_dns(monkeypatch, slow=True)
    monkeypatch.setattr(domain_check, "LOOKUP_TIMEOUT_SECONDS", 0.05)
    started = asyncio.run(_timed(domain_resolves("slow.example")))
    assert started < 0.09  # not 2 x 0.05


async def _timed(coro):
    start = time.monotonic()
    await coro
    return time.monotonic() - start
