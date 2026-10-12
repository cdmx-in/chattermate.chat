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

Setup progress for the dashboard's "Finish setup" bar and the setup wizard.
"""

from dataclasses import asdict
from typing import Optional

from fastapi import APIRouter, Depends, Response, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.auth import get_current_user, require_permissions
from app.database import get_db
from app.models.organization import Organization
from app.models.user import User
from app.services import setup_progress

router = APIRouter()


class SetupProgressResponse(BaseModel):
    step: setup_progress.SetupStep
    agent_id: Optional[str] = None
    widget_id: Optional[str] = None
    hidden: bool = False


@router.get("/progress", response_model=SetupProgressResponse)
def get_setup_progress(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    organization = db.get(Organization, current_user.organization_id)
    return asdict(setup_progress.get_progress(db, organization))


@router.post("/progress/hide", status_code=status.HTTP_204_NO_CONTENT)
def hide_setup_bar(
    current_user: User = Depends(require_permissions("manage_agents")),
    db: Session = Depends(get_db),
):
    """Stop showing the setup bar to this organization."""
    setup_progress.hide(db, db.get(Organization, current_user.organization_id))
    return Response(status_code=status.HTTP_204_NO_CONTENT)
