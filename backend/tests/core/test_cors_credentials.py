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

Only our own surfaces may use the dashboard's sign-in cookies cross-origin.

An org's domain is whatever was typed at signup, unverified, and every org
domain is in the CORS list. If those origins were also allowed credentials, a
page on any signed-up domain could read a signed-in dashboard user's account.
"""

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from app.core import auth_utils, cors

DASHBOARD = "https://app.example.com"
OPERATOR_LISTED = "https://admin.example.com"
ORG_SITE = "https://signed-up-domain.example"
HELP_CENTER = "https://acme.help.example.com"


@pytest.fixture(autouse=True)
def first_party(monkeypatch):
    monkeypatch.setattr(cors.settings, "FRONTEND_URL", DASHBOARD)
    monkeypatch.setattr(cors, "BASE_CORS_ORIGINS", [OPERATOR_LISTED, DASHBOARD + "/"])


@pytest.fixture
def client():
    app = FastAPI()
    app.add_middleware(
        cors.FirstPartyCredentialsCORSMiddleware,
        credentialed_origins=cors.first_party_origins(),
        allow_origins=[DASHBOARD, OPERATOR_LISTED, ORG_SITE],
        allow_origin_regex=r"^https://[a-z0-9-]+\.help\.example\.com$",
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/me")
    def me():
        return {"who": "a signed-in user"}

    return TestClient(app)


def preflight(client, origin):
    return client.options("/me", headers={"Origin": origin, "Access-Control-Request-Method": "GET"})


class TestFirstPartyOrigins:
    def test_the_dashboard_and_operator_listed_origins(self):
        assert cors.first_party_origins() == {DASHBOARD, OPERATOR_LISTED}

    @pytest.mark.parametrize("origin, expected", [
        (DASHBOARD, True),
        (DASHBOARD.upper(), True),
        (OPERATOR_LISTED, True),
        (ORG_SITE, False),
        (HELP_CENTER, False),
        ("null", False),
        ("", False),
        (None, False),
    ])
    def test_is_first_party(self, origin, expected):
        assert cors.is_first_party_origin(origin) is expected


class TestCredentials:
    @pytest.mark.parametrize("origin", [DASHBOARD, OPERATOR_LISTED])
    def test_our_own_origins_may_send_credentials(self, client, origin):
        for response in (client.get("/me", headers={"Origin": origin}), preflight(client, origin)):
            assert response.headers["access-control-allow-origin"] == origin
            assert response.headers["access-control-allow-credentials"] == "true"

    @pytest.mark.parametrize("origin", [ORG_SITE, HELP_CENTER])
    def test_an_org_site_may_call_the_api_but_never_with_cookies(self, client, origin):
        for response in (client.get("/me", headers={"Origin": origin}), preflight(client, origin)):
            assert response.headers["access-control-allow-origin"] == origin
            assert "access-control-allow-credentials" not in response.headers

    def test_even_when_it_sends_cookies(self, client):
        response = client.get("/me", headers={"Origin": ORG_SITE, "Cookie": "access_token=x"})
        assert "access-control-allow-credentials" not in response.headers

    def test_an_unknown_site_gets_nothing(self, client):
        response = client.get("/me", headers={"Origin": "https://evil.example"})
        assert "access-control-allow-origin" not in response.headers
        assert "access-control-allow-credentials" not in response.headers
        assert preflight(client, "https://evil.example").status_code == 400


class TestRefreshKeepsTheSplit:
    def test_update_local_cors_keeps_first_party_credentials(self, client):
        app = client.app
        cors.update_local_cors(app, [DASHBOARD, ORG_SITE])

        layers = [m for m in app.user_middleware if isinstance(m.cls, type) and issubclass(m.cls, cors.CORSMiddleware)]
        assert len(layers) == 1
        assert layers[0].cls is cors.FirstPartyCredentialsCORSMiddleware
        assert "access-control-allow-credentials" not in client.get("/me", headers={"Origin": ORG_SITE}).headers
        assert client.get("/me", headers={"Origin": DASHBOARD}).headers["access-control-allow-credentials"] == "true"

    def test_a_rebuilt_middleware_is_the_first_party_one(self):
        bare = FastAPI()
        cors.update_local_cors(bare, [ORG_SITE])
        assert bare.user_middleware[0].cls is cors.FirstPartyCredentialsCORSMiddleware


class TestCookieSockets:
    """WebSockets get no CORS check, so the cookie-authenticated namespace
    checks the handshake's Origin itself."""

    @pytest.fixture
    def emitted(self, monkeypatch):
        sent = []

        async def emit(event, data, to=None):
            sent.append(event)

        monkeypatch.setattr(auth_utils.sio, "emit", emit)
        return sent

    @pytest.mark.asyncio
    async def test_another_site_gets_no_cookie_auth_and_no_fresh_token(self, emitted):
        environ = {"HTTP_ORIGIN": ORG_SITE, "HTTP_COOKIE": "refresh_token=stolen-by-the-browser"}

        assert await auth_utils.authenticate_socket("sid-1", environ) == (None, None, None)
        assert emitted == []

    @pytest.mark.asyncio
    async def test_our_dashboard_is_still_authenticated_from_its_cookies(self, monkeypatch):
        reached = []
        monkeypatch.setattr(auth_utils, "live_payload", lambda db, token, kind: reached.append(token) or None)
        environ = {"HTTP_ORIGIN": DASHBOARD, "HTTP_COOKIE": "access_token=tok"}

        await auth_utils.authenticate_socket("sid-1", environ)

        assert reached == ["tok"]
