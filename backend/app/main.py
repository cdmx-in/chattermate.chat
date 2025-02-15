"""
ChatterMate - Main (Simplified for Testing)
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

# Initialize FastAPI app
app = FastAPI(
    title="ChatterMate",
    version="0.1.0",
)

# Basic CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    # Get some important environment variables for testing
    env_vars = {
        "DATABASE_URL": os.getenv("DATABASE_URL", "not set"),
        "CORS_ORIGINS": os.getenv("CORS_ORIGINS", "not set"),
        "REDIS_HOST": os.getenv("REDIS_HOST", "not set"),
        "ENVIRONMENT": os.getenv("ENVIRONMENT", "not set"),
        "AWS_REGION": os.getenv("AWS_REGION", "not set")
    }
    
    return {
        "status": "healthy",
        "version": "0.1.0",
        "environment_check": env_vars
    }

# Original code commented out for testing
"""
from fastapi.staticfiles import StaticFiles
import socketio
from app.api import chat, organizations, users, ai_setup, knowledge, agent, notification, widget, widget_chat, user_groups, roles, analytics
from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.services.firebase import initialize_firebase
from app.database import engine, Base
import asyncio
from app.workers.knowledge_processor import run_processor
from app.core.logger import get_logger
from contextlib import asynccontextmanager
import os
from app.core.socketio import socket_app, configure_socketio, sio
from app.core.cors import get_cors_origins

# Import models to ensure they're registered with SQLAlchemy
from app.models import Organization, User, Customer
try:
    from app.enterprise.models import OTP
except ImportError:
    print("Enterprise models not available")
from app.api import session_to_agent

logger = get_logger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    initialize_firebase()
    asyncio.create_task(start_knowledge_processor())
    await startup_event()
    yield
    # Shutdown
    pass

# Move the CORS setup before app instantiation
cors_origins = get_cors_origins()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="AI-powered customer service platform with role-based access and integrations",
    lifespan=lifespan,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Add CORS middleware immediately after app instantiation
app.add_middleware(
    CORSMiddleware,
    allow_origins=list(cors_origins),  # Convert set to list
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    Configure Socket.IO on startup
    configure_socketio(cors_origins)

# Include routers
app.include_router(
    chat.router,
    prefix=f"{settings.API_V1_STR}/chats",
    tags=["chats"]
)

# Try to import enterprise module if available
try:
    from app.enterprise import router as enterprise_router
    app.include_router(enterprise_router, prefix=f"{settings.API_V1_STR}/enterprise", tags=["enterprise"])
except ImportError as e:
    logger.info("Enterprise module not available - running in community edition mode")
    logger.debug(f"Import error: {e}")

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

app.include_router(
    analytics.router,
    prefix=f"{settings.API_V1_STR}/analytics",
    tags=["analytics"]
)


@app.get("/")
async def root():
    return {
        "name": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "description": "Welcome to ChatterMate API"
    }

async def start_knowledge_processor():
    Start the knowledge processor as a background task
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

# Mount static files
app.mount("/api/v1/uploads", StaticFiles(directory="uploads"), name="uploads")

# Create SocketIO app
app = socketio.ASGIApp(sio, app)
"""
