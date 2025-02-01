from sqlalchemy.orm import Session, joinedload
from app.models.user import UserGroup

class GroupRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_group_with_users(self, group_id: str):
        return self.db.query(UserGroup)\
            .options(joinedload(UserGroup.users))\
            .filter(UserGroup.id == group_id)\
            .first() 