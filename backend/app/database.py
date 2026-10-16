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

import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
from sqlalchemy.pool import QueuePool

# Create SQLAlchemy engine with Unicode support
# t3.micro RDS has ~45-65 max connections, reserve some for admin and other services
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    poolclass=QueuePool,
    pool_size=5,  # Conservative pool size for t3.micro
    max_overflow=10,  # Allow up to 15 total connections from this pool
    pool_timeout=30,  # Timeout waiting for connection
    pool_recycle=1800,  # Recycle connections after 30 minutes
    # Unicode, and UTC: naive timestamp columns default to now(), which is the
    # session's local time. The code reads them as UTC, so pin the session.
    connect_args={"options": "-c client_encoding=utf8 -c timezone=UTC"} if "postgresql" in settings.DATABASE_URL else {},
    json_serializer=lambda obj: __import__('json').dumps(obj, ensure_ascii=False),
    json_deserializer=lambda s: __import__('json').loads(s)
)



def _fresh_pool_after_fork() -> None:
    """gunicorn --preload (scripts/start.sh) imports the app, which opens pooled
    connections, before it forks the workers. A worker must never reuse its
    parent's sockets: two workers talking over one connection corrupt each
    other's transactions. So each child starts with an empty pool, leaving the
    parent's connections open for the parent."""
    engine.dispose(close=False)


os.register_at_fork(after_in_child=_fresh_pool_after_fork)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
