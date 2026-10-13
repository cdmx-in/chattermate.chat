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

Where a widget is live: classifying page-load origins, and recording each
install once and each blocked site at most daily.
"""

from datetime import datetime, timedelta, timezone
from types import SimpleNamespace

import pytest

from app.core.config import settings
from app.services import widget_install
from app.services.widget_install import OriginKind, Write, classify_origin, claim_write, visitor_key

ORG_DOMAIN = "teeckbox.com"


@pytest.fixture(autouse=True)
def clean_memory(monkeypatch):
    widget_install._recorded_installs.clear()
    widget_install._recorded_blocks.clear()
    widget_install._blocks_per_day.clear()
    monkeypatch.setattr(settings, "FRONTEND_URL", "https://app.chattermate.chat")
    monkeypatch.setattr(settings, "BACKEND_URL", "https://api.chattermate.chat")
    monkeypatch.setattr(widget_install, "BASE_CORS_ORIGINS", ["https://chattermate.chat"])
    monkeypatch.setattr(widget_install, "get_cors_origin_regex", lambda: r"^https?://([a-z0-9-]+\.)?chattermate\.help(:\d+)?$")
    # Everything CORS admits: org domains plus a verified help-center domain
    monkeypatch.setattr(widget_install, "get_cors_origins", lambda: {
        "https://teeckbox.com", "https://www.teeckbox.com", "https://help.teeckbox.com",
    })


@pytest.mark.parametrize("origin,expected", [
    ("https://teeckbox.com", OriginKind.INSTALLED),
    ("https://www.teeckbox.com", OriginKind.INSTALLED),
    ("http://TEECKBOX.com", OriginKind.INSTALLED),
    ("https://shop.teeckbox.com", OriginKind.BLOCKED),     # subdomain: CORS refuses it
    ("https://another-site.io", OriginKind.BLOCKED),
    ("https://teeckbox.com.evil.io", OriginKind.BLOCKED),
    ("https://app.chattermate.chat", OriginKind.IGNORED),  # our dashboard preview
    ("https://api.chattermate.chat", OriginKind.IGNORED),
    ("https://chattermate.chat", OriginKind.IGNORED),
    ("https://teeckbox.chattermate.help", OriginKind.IGNORED),  # help center
    ("https://help.teeckbox.com", OriginKind.IGNORED),  # verified help-center domain: CORS admits it
    ("http://localhost:3000", OriginKind.IGNORED),
    ("http://127.0.0.1", OriginKind.IGNORED),
    ("http://192.168.1.20", OriginKind.IGNORED),
    ("http://[::1]:8080", OriginKind.IGNORED),
    ("https://shop.test", OriginKind.IGNORED),
    ("https://teeckbox.com:8443", OriginKind.IGNORED),     # non-standard port: dev/staging
    ("null", OriginKind.IGNORED),
    ("", OriginKind.IGNORED),
    (None, OriginKind.IGNORED),
    ("chrome-extension://abcdef", OriginKind.IGNORED),
    ("https://" + "a" * 250 + ".com", OriginKind.IGNORED),  # longer than the column
])
def test_classify_origin(origin, expected):
    assert classify_origin(origin, ORG_DOMAIN) is expected


@pytest.mark.parametrize("org_domain", ["https://www.TeeckBox.com/", "teeckbox.com", "www.teeckbox.com"])
def test_org_domain_forms_all_match(org_domain):
    assert classify_origin("https://teeckbox.com", org_domain) is OriginKind.INSTALLED


def test_no_org_domain_means_blocked():
    assert classify_origin("https://somewhere.io", None) is OriginKind.BLOCKED


def widget(**fields):
    base = dict(id="w-1", installed_at=None, installed_origin=None, install_visitor=None,
                install_confirmed_at=None, blocked_origin=None,
                blocked_origin_seen_at=None, organization=SimpleNamespace(domain=ORG_DOMAIN))
    return SimpleNamespace(**{**base, **fields})


def written(sighting):
    return sighting.write if sighting else None


def test_first_install_is_claimed_once():
    sighting = claim_write(widget(), "https://teeckbox.com", "1.1.1.1")
    assert (sighting.write, sighting.origin, sighting.visitor) == (Write.INSTALL, "https://teeckbox.com", visitor_key("1.1.1.1"))
    assert claim_write(widget(), "https://www.teeckbox.com", "2.2.2.2") is None  # already claimed


def installed(**fields):
    return widget(installed_at=datetime.now(timezone.utc), installed_origin="https://teeckbox.com",
                  install_visitor=visitor_key("1.1.1.1"), **fields)


def test_a_second_visitor_confirms_the_install():
    assert claim_write(installed(), "https://teeckbox.com", "1.1.1.1") is None  # the same visitor again
    assert written(claim_write(installed(), "https://www.teeckbox.com", "2.2.2.2")) is Write.CONFIRM
    assert claim_write(installed(), "https://teeckbox.com", "3.3.3.3") is None  # already claimed


def test_confirmed_install_is_not_rewritten_and_reads_no_org():
    class Unloaded:
        @property
        def domain(self):
            raise AssertionError("org looked up in the steady state")
    w = installed(install_confirmed_at=datetime.now(timezone.utc), organization=Unloaded())
    assert claim_write(w, "https://teeckbox.com", "2.2.2.2") is None
    assert claim_write(w, "https://www.teeckbox.com", "2.2.2.2") is None  # www. is the same site


def test_visitor_key_hides_the_ip():
    key = visitor_key("203.0.113.9")
    assert key and "203" not in key and len(key) == 16
    assert visitor_key("203.0.113.9") == key and visitor_key(None) is None


def test_blocked_site_is_claimed_once_a_day():
    assert written(claim_write(widget(), "https://shop.teeckbox.com")) is Write.BLOCK
    assert claim_write(widget(), "https://shop.teeckbox.com") is None
    # A different blocked site is new information
    assert written(claim_write(widget(), "https://other.io")) is Write.BLOCK


def test_blocked_sites_are_capped_per_day():
    """Forged Origins can't turn a read-only endpoint into a write per request."""
    sites = [f"https://site{i}.io" for i in range(widget_install._BLOCKED_SITES_PER_DAY + 3)]
    claims = [claim_write(widget(), site) for site in sites]
    assert sum(1 for c in claims if c) == widget_install._BLOCKED_SITES_PER_DAY


def test_recently_recorded_block_is_not_rewritten():
    w = widget(blocked_origin="https://shop.teeckbox.com", blocked_origin_seen_at=datetime.now(timezone.utc))
    assert claim_write(w, "https://shop.teeckbox.com") is None
    stale = widget(blocked_origin="https://shop.teeckbox.com",
                   blocked_origin_seen_at=datetime.now(timezone.utc) - timedelta(days=2))
    assert written(claim_write(stale, "https://shop.teeckbox.com")) is Write.BLOCK


def test_preview_loads_never_read_the_org(monkeypatch):
    class Unloaded:
        @property
        def domain(self):
            raise AssertionError("org looked up for a load that can't matter")
    w = widget(organization=Unloaded())
    for origin in ("https://app.chattermate.chat", "http://localhost:5173", "https://acme.chattermate.help"):
        assert claim_write(w, origin) is None


def test_explore_widget_and_missing_origin_are_skipped():
    assert claim_write(widget(id=settings.EXPLORE_WIDGET_ID), "https://teeckbox.com", "1.1.1.1") is None
    assert claim_write(widget(), None) is None


def test_memory_is_bounded(monkeypatch):
    monkeypatch.setattr(widget_install, "_MEMORY_LIMIT", 2)
    for i in range(5):
        claim_write(widget(id=f"w-{i}"), "https://teeckbox.com", "1.1.1.1")
    assert len(widget_install._recorded_installs) <= 2
