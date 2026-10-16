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

Customer-identity capture on native ticket creation: the email/name the
customer states in chat must be validated, folded onto the (usually anonymous)
customer, and surfaced to the investigator — the …@noemail.com placeholder must
never be presented as a real identity.
"""

from types import SimpleNamespace

from app.tools.ticket_toolkit import _clean_email, _clean_name


class TestCleanEmail:
    def test_normalizes_and_lowercases(self):
        assert _clean_email("  Admin@ChatterMate.Chat ") == "admin@chattermate.chat"

    def test_rejects_junk(self):
        for bad in (None, "", "not-an-email", "no@domain", "@no-local.com", "a b@c.com"):
            assert _clean_email(bad) is None


class TestCleanName:
    def test_trims(self):
        assert _clean_name("  Arun  ") == "Arun"

    def test_empty_is_none(self):
        assert _clean_name(None) is None
        assert _clean_name("   ") is None


class TestCustomerIdentitySection:
    """The worker's trusted identity block fed to the investigator."""

    def _section(self, **customer_fields):
        from app.workers.ticket_investigator import _customer_identity_section

        fields = {"full_name": None, "email": None, "phone": None, "meta_data": None}
        fields.update(customer_fields)
        customer = SimpleNamespace(**fields)
        ticket = SimpleNamespace(customer=customer)
        return _customer_identity_section(ticket)

    def test_none_without_customer(self):
        from app.workers.ticket_investigator import _customer_identity_section

        assert _customer_identity_section(SimpleNamespace(customer=None)) is None

    def test_real_identity_included(self):
        section = self._section(
            full_name="Arun Kumar", email="admin@chattermate.chat", phone="+441234567890"
        )
        assert section is not None
        assert "admin@chattermate.chat" in section
        assert "Arun Kumar" in section
        assert "+441234567890" in section

    def test_placeholder_email_omitted(self):
        # Anonymous widget visitor with no real identity -> no section at all.
        assert self._section(email="1784547346351@noemail.com") is None

    def test_placeholder_email_but_real_name_keeps_name_only(self):
        section = self._section(
            full_name="Arun", email="1784547346351@noemail.com"
        )
        assert section is not None
        assert "Arun" in section
        assert "noemail.com" not in section

    def test_meta_data_identifiers_included(self):
        section = self._section(
            full_name="Arun", meta_data={"account_id": "acc_991", "plan": "pro"}
        )
        assert "acc_991" in section


class TestCaptureCustomerIdentity:
    """A name stated in chat only lands on the record of the conversation's own
    customer - never on one the visitor is bound to by an email they typed."""

    def _customer_with_session(self, db, org_id, key, customer_key):
        from uuid import uuid4
        from app.models.customer import Customer
        from app.models.session_to_agent import SessionStatus, SessionToAgent
        customer = Customer(email=f"{uuid4().hex}@noemail.com", organization_id=org_id,
                            conversation_key=customer_key)
        db.add(customer); db.commit(); db.refresh(customer)
        session = SessionToAgent(session_id=uuid4(), customer_id=customer.id, organization_id=org_id,
                                 status=SessionStatus.OPEN, conversation_key=key)
        db.add(session); db.commit()
        return customer, session

    def test_the_visitors_own_customer_is_named(self, db, test_organization_id):
        from app.tools.ticket_toolkit import TicketTools
        customer, session = self._customer_with_session(db, test_organization_id, "browser-a", "browser-a")

        TicketTools("agent", str(test_organization_id), str(session.session_id)) \
            ._capture_customer_identity(db, session.session_id, None, "Own Name")

        db.refresh(customer)
        assert customer.full_name == "Own Name"

    def test_a_customer_created_by_another_browser_is_not_renamed(self, db, test_organization_id):
        from app.tools.ticket_toolkit import TicketTools
        customer, session = self._customer_with_session(db, test_organization_id, "browser-b", "browser-a")

        TicketTools("agent", str(test_organization_id), str(session.session_id)) \
            ._capture_customer_identity(db, session.session_id, None, "Someone Else")

        db.refresh(customer)
        assert customer.full_name is None
