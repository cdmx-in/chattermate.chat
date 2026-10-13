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

from sqlalchemy import Column, DateTime, String, ForeignKey, Integer
from sqlalchemy.orm import relationship
from uuid import  uuid4
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base


class Widget(Base):
    __tablename__ = "widgets"

    id = Column(String, primary_key=True, default=lambda: str(uuid4()))
    name = Column(String, nullable=False)
    organization_id = Column(UUID(as_uuid=True), ForeignKey(
        "organizations.id"), nullable=False)

    # Agent relationship
    agent_id = Column(UUID(as_uuid=True), ForeignKey("agents.id"))
    agent = relationship("Agent", back_populates="widgets")

    # Where it is live: the first load from the org's own site (see
    # app/services/widget_install.py). Never overwritten once set.
    installed_at = Column(DateTime(timezone=True), nullable=True)
    installed_origin = Column(String(255), nullable=True)
    # A keyed hash of the first visitor's IP (never the IP), and when a second,
    # different visitor loaded it there: the Origin header can be forged by
    # anyone with the widget id, a second real visitor much less easily.
    install_visitor = Column(String(16), nullable=True)
    install_confirmed_at = Column(DateTime(timezone=True), nullable=True)
    # The latest site that loaded it but isn't allowed to (CORS admits only the
    # org's domain), so the widget silently fails there.
    blocked_origin = Column(String(255), nullable=True)
    blocked_origin_seen_at = Column(DateTime(timezone=True), nullable=True)

    # Relationships
    organization = relationship("Organization", back_populates="widgets")
