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

/widgets/{id}/data records where the widget is live after responding, and
/widgets/{id}/install reports it to the org.
"""

from uuid import uuid4

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from app.api import widget as widget_router
from app.core.auth import get_current_user
from app.core.config import settings
from app.database import Base, get_db
from app.models.organization import Organization
from app.models.widget import Widget
from app.services import widget_install
from tests.conftest import TestingSessionLocal, engine

app = FastAPI()
app.include_router(widget_router.router, prefix=f"{settings.API_V1_STR}/widgets")


@pytest.fixture(scope="function")
def db():
    """Tables on the shared test engine, the way the other widget API tests set up."""
    Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=engine)


@pytest.fixture
def client(test_user, monkeypatch):
    widget_install._recorded_installs.clear()
    widget_install._recorded_blocks.clear()
    widget_install._blocks_per_day.clear()
    monkeypatch.setattr(widget_install, "SessionLocal", TestingSessionLocal)
    monkeypatch.setattr(settings, "FRONTEND_URL", "https://app.chattermate.chat")
    monkeypatch.setattr(widget_install, "get_cors_origins", lambda: {"https://test.com", "https://www.test.com"})

    def override_get_db():
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()

    async def override_user():
        return test_user

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = override_user
    yield TestClient(app)
    app.dependency_overrides.clear()


def reload(db, widget_id):
    db.expire_all()
    return db.get(Widget, widget_id)


def test_load_from_org_site_records_the_install(client, db, test_widget):
    response = client.get(f"/api/v1/widgets/{test_widget.id}/data", headers={"Origin": "https://www.test.com"})
    assert response.status_code == 200
    widget = reload(db, test_widget.id)
    assert widget.installed_at is not None
    assert widget.installed_origin == "https://www.test.com"
    assert widget.blocked_origin is None


def test_first_install_is_kept(client, db, test_widget):
    client.get(f"/api/v1/widgets/{test_widget.id}/data", headers={"Origin": "https://test.com"})
    first = reload(db, test_widget.id).installed_at
    widget_install._recorded_installs.clear()  # as if another worker process
    client.get(f"/api/v1/widgets/{test_widget.id}/data", headers={"Origin": "https://www.test.com"})
    widget = reload(db, test_widget.id)
    assert widget.installed_at == first
    assert widget.installed_origin == "https://test.com"


def from_visitor(ip, origin="https://test.com"):
    # Behind our nginx: it appends the real client IP to X-Forwarded-For
    return {"Origin": origin, "X-Forwarded-For": f"10.9.9.9, {ip}"}


def test_a_second_visitor_confirms_the_install(client, db, test_widget):
    url = f"/api/v1/widgets/{test_widget.id}/data"
    client.get(url, headers=from_visitor("198.51.100.1"))
    client.get(url, headers=from_visitor("198.51.100.1"))
    assert reload(db, test_widget.id).install_confirmed_at is None  # one visitor is not proof

    client.get(url, headers=from_visitor("198.51.100.2", "https://www.test.com"))
    widget = reload(db, test_widget.id)
    assert widget.install_confirmed_at is not None
    assert widget.install_visitor and "198.51" not in widget.install_visitor


def test_load_from_another_site_records_a_block(client, db, test_widget):
    client.get(f"/api/v1/widgets/{test_widget.id}/data", headers={"Origin": "https://shop.test.com"})
    widget = reload(db, test_widget.id)
    assert widget.installed_at is None
    assert widget.blocked_origin == "https://shop.test.com"
    assert widget.blocked_origin_seen_at is not None


@pytest.mark.parametrize("headers", [{}, {"Origin": "http://localhost:3000"}, {"Origin": "https://app.chattermate.chat"}])
def test_local_preview_and_missing_origins_record_nothing(client, db, test_widget, headers):
    client.get(f"/api/v1/widgets/{test_widget.id}/data", headers=headers)
    widget = reload(db, test_widget.id)
    assert (widget.installed_at, widget.blocked_origin) == (None, None)


def test_org_reads_install_status(client, test_widget):
    client.get(f"/api/v1/widgets/{test_widget.id}/data", headers={"Origin": "https://test.com"})
    client.get(f"/api/v1/widgets/{test_widget.id}/data", headers={"Origin": "https://blog.example.org"})
    status = client.get(f"/api/v1/widgets/{test_widget.id}/install").json()
    assert status["installed_origin"] == "https://test.com"
    assert status["installed_at"]
    assert status["blocked_origin"] == "https://blog.example.org"
    assert status["allowed_domain"] == "test.com"


def test_install_status_is_org_scoped(client, db, test_widget):
    other_org = Organization(name="Other", domain="other.example", timezone="UTC")
    db.add(other_org)
    db.commit()
    foreign = Widget(id=str(uuid4()), name="Theirs", organization_id=other_org.id)
    db.add(foreign)
    db.commit()
    assert client.get(f"/api/v1/widgets/{foreign.id}/install").status_code == 404
    assert client.get("/api/v1/widgets/no-such-widget/install").status_code == 404
