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

GET /onboarding/progress and POST /onboarding/progress/hide.
"""

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from app.api import onboarding
from app.core.auth import get_current_user
from app.database import get_db

app = FastAPI()
app.include_router(onboarding.router, prefix="/api/v1/onboarding")


@pytest.fixture
def client(db, test_user):
    async def as_user():
        return test_user
    app.dependency_overrides[get_db] = lambda: db
    app.dependency_overrides[get_current_user] = as_user
    yield TestClient(app)
    app.dependency_overrides.clear()


def test_progress_for_a_new_org(client):
    body = client.get("/api/v1/onboarding/progress").json()
    assert body == {"step": "create", "agent_id": None, "widget_id": None, "hidden": False}


def test_progress_names_the_agent_and_widget(client, test_widget):
    body = client.get("/api/v1/onboarding/progress").json()
    assert body["step"] == "teach"
    assert body["widget_id"] == test_widget.id


def test_hide(client):
    assert client.post("/api/v1/onboarding/progress/hide").status_code == 204
    assert client.get("/api/v1/onboarding/progress").json()["hidden"] is True


def test_requires_sign_in(db):
    app.dependency_overrides[get_db] = lambda: db
    try:
        assert TestClient(app).get("/api/v1/onboarding/progress").status_code in (401, 403)
    finally:
        app.dependency_overrides.clear()
