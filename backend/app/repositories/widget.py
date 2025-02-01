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
