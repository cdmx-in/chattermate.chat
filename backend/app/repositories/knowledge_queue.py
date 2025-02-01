from sqlalchemy.orm import Session
from app.models.knowledge_queue import KnowledgeQueue, QueueStatus
from typing import List, Optional


class KnowledgeQueueRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, queue_item: KnowledgeQueue) -> KnowledgeQueue:
        self.db.add(queue_item)
        self.db.commit()
        self.db.refresh(queue_item)
        return queue_item

    def get_by_id(self, queue_id: int) -> Optional[KnowledgeQueue]:
        """Get queue item by ID"""
        return self.db.query(KnowledgeQueue).filter(
            KnowledgeQueue.id == queue_id
        ).first()

    def get_pending(self) -> List[KnowledgeQueue]:
        """Get all pending queue items"""
        return self.db.query(KnowledgeQueue)\
            .filter(KnowledgeQueue.status == QueueStatus.PENDING)\
            .all()

    def update_status(self, queue_id: int, status: QueueStatus, error: Optional[str] = None) -> bool:
        item = self.db.query(KnowledgeQueue).filter(
            KnowledgeQueue.id == queue_id).first()
        if item:
            item.status = status
            item.error = error
            self.db.commit()
            return True
        return False
