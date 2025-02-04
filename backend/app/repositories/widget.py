"""
ChatterMate - Widget
Copyright (C) 2024 ChatterMate

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>
"""

from sqlalchemy.orm import Session
from app.models.widget import Widget
from app.models.schemas.widget import WidgetCreate



def create_widget(db: Session, widget: WidgetCreate, organization_id: str) -> Widget:
    db_widget = Widget(
        name=widget.name,
        organization_id=organization_id,
        agent_id=widget.agent_id
    )
    db.add(db_widget)
    db.commit()
    db.refresh(db_widget)
    return db_widget


def get_widget(db: Session, widget_id: str) -> Widget:
    return db.query(Widget).filter(Widget.id == widget_id).first()


def get_widgets(db: Session, organization_id: str) -> list[Widget]:
    return db.query(Widget).filter(Widget.organization_id == organization_id).all()


def delete_widget(db: Session, widget_id: str) -> None:
    db.query(Widget).filter(Widget.id == widget_id).delete()
    db.commit()
