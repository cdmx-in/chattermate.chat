# Add users import
from fastapi.staticfiles import StaticFiles
from app.api import chat, organizations, users, ai_setup, knowledge, agent, notification, widget, widget_chat, user_groups, roles
from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings, sio
from app.services.firebase import initialize_firebase
from app.database import engine, Base
import socketio
import asyncio
from app.workers.knowledge_processor import run_processor
from app.core.logger import get_logger
from contextlib import asynccontextmanager
import os

# Import models to ensure they're registered with SQLAlchemy
from app.models import Organization, User, Customer
from app.api import roles
from app.api import session_to_agent
logger = get_logger(__name__)

# Create FastAPI app


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    initialize_firebase()
    asyncio.create_task(start_knowledge_processor())
    yield
    # Shutdown
    pass

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="AI-powered customer service platform with role-based access and integrations",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include routers
app.include_router(
    chat.router,
    prefix=f"{settings.API_V1_STR}/chats",
    tags=["chats"]
)

app.include_router(
    organizations.router,
    prefix=f"{settings.API_V1_STR}/organizations",
    tags=["organizations"]
)

app.include_router(
    users.router,
    prefix=f"{settings.API_V1_STR}/users",
    tags=["users"]
)

app.include_router(
    knowledge.router,
    prefix=f"{settings.API_V1_STR}/knowledge",
    tags=["knowledge"]
)

app.include_router(
    ai_setup.router,
    prefix=f"{settings.API_V1_STR}/ai",
    tags=["ai"]
)

app.include_router(
    agent.router,
    prefix=f"{settings.API_V1_STR}/agent",
    tags=["agent"]
)

app.include_router(
    notification.router,
    prefix=f"{settings.API_V1_STR}/notifications",
    tags=["notification"]
)

app.include_router(
    widget.router,
    prefix=f"{settings.API_V1_STR}/widgets",
    tags=["widget"]
)

app.include_router(
    user_groups.router,
    prefix=f"{settings.API_V1_STR}/groups",
    tags=["groups"]
)

app.include_router(
    roles.router,
    prefix=f"{settings.API_V1_STR}/roles",
    tags=["roles"]
)

app.include_router(
    session_to_agent.router,
    prefix=f"{settings.API_V1_STR}/sessions",
    tags=["session_to_agent"]
)


@app.get("/")
async def root():
    return {
        "name": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "description": "Welcome to ChatterMate API"
    }


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "version": settings.VERSION
    }


async def start_knowledge_processor():
    """Start the knowledge processor as a background task"""
    try:
        while True:
            await run_processor()
            await asyncio.sleep(60)  # Wait for 60 seconds before next run
    except Exception as e:
        logger.error(f"Knowledge processor error: {str(e)}")
        # Restart the processor after error
        await asyncio.sleep(5)
        asyncio.create_task(start_knowledge_processor())

# Create upload directories if they don't exist
if not os.path.exists("uploads"):
    os.makedirs("uploads")
if not os.path.exists("uploads/agents"):
    os.makedirs("uploads/agents")

# Mount static files before creating the SocketIO app
app.mount("/api/v1/uploads", StaticFiles(directory="uploads"), name="uploads")

# Create SocketIO app
app = socketio.ASGIApp(sio, app)
