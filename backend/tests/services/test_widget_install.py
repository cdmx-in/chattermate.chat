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
from app.services.widget_install import OriginKind, classify_origin, claim_write

ORG_DOMAIN = "teeckbox.com"


@pytest.fixture(autouse=True)
def clean_memory(monkeypatch):
    widget_install._recorded_installs.clear()
    widget_install._recorded_blocks.clear()
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
    base = dict(id="w-1", installed_at=None, installed_origin=None, blocked_origin=None,
                blocked_origin_seen_at=None, organization=SimpleNamespace(domain=ORG_DOMAIN))
    return SimpleNamespace(**{**base, **fields})


def test_first_install_is_claimed_once():
    assert claim_write(widget(), "https://teeckbox.com") is OriginKind.INSTALLED
    assert claim_write(widget(), "https://www.teeckbox.com") is None  # already claimed


def test_installed_widget_is_not_rewritten():
    w = widget(installed_at=datetime.now(timezone.utc), installed_origin="https://teeckbox.com")
    assert claim_write(w, "https://teeckbox.com") is None
    assert claim_write(w, "https://www.teeckbox.com") is None


def test_blocked_site_is_claimed_once_a_day():
    assert claim_write(widget(), "https://shop.teeckbox.com") is OriginKind.BLOCKED
    assert claim_write(widget(), "https://shop.teeckbox.com") is None
    # A different blocked site is new information
    assert claim_write(widget(), "https://other.io") is OriginKind.BLOCKED


def test_recently_recorded_block_is_not_rewritten():
    w = widget(blocked_origin="https://shop.teeckbox.com", blocked_origin_seen_at=datetime.now(timezone.utc))
    assert claim_write(w, "https://shop.teeckbox.com") is None
    stale = widget(blocked_origin="https://shop.teeckbox.com",
                   blocked_origin_seen_at=datetime.now(timezone.utc) - timedelta(days=2))
    assert claim_write(stale, "https://shop.teeckbox.com") is OriginKind.BLOCKED


def test_preview_loads_never_read_the_org(monkeypatch):
    class Unloaded:
        @property
        def domain(self):
            raise AssertionError("org looked up for a load that can't matter")
    w = widget(organization=Unloaded())
    for origin in ("https://app.chattermate.chat", "http://localhost:5173", "https://acme.chattermate.help"):
        assert claim_write(w, origin) is None


def test_explore_widget_and_missing_origin_are_skipped():
    assert claim_write(widget(id=settings.EXPLORE_WIDGET_ID), "https://teeckbox.com") is None
    assert claim_write(widget(), None) is None


def test_memory_is_bounded(monkeypatch):
    monkeypatch.setattr(widget_install, "_MEMORY_LIMIT", 2)
    for i in range(5):
        claim_write(widget(id=f"w-{i}"), "https://teeckbox.com")
    assert len(widget_install._recorded_installs) <= 2
