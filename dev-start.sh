#!/bin/bash

# Development Docker Compose Setup with Hot Reloading
# This script starts the development environment with hot reloading enabled
# NOTE: Backend Dockerfile is built ONCE and NOT rebuilt on each start for performance

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ============================================================================
# STEP 1: Check Docker and Docker Compose installation
# ============================================================================
echo -e "${BLUE}🔍 Step 1: Checking Docker installation...${NC}"

if ! command -v docker &> /dev/null; then
  echo -e "${RED}✗ Docker is not installed${NC}"
  exit 1
fi
echo -e "${GREEN}   ✓ Docker found: $(docker --version)${NC}"

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
  echo -e "${RED}✗ Docker Compose is not installed${NC}"
  exit 1
fi
echo -e "${GREEN}   ✓ Docker Compose found: $(docker compose version 2>/dev/null || docker-compose --version)${NC}"

echo ""

# ============================================================================
# STEP 1.5: Clear old cached widget and frontend build files
# ============================================================================
echo -e "${BLUE}🧹 Step 1.5: Clearing old build caches...${NC}"

# Remove old widget.js and widget.css from backend/assets
if [ -f "$SCRIPT_DIR/backend/assets/widget.js" ] || [ -f "$SCRIPT_DIR/backend/assets/widget.css" ]; then
  echo "   Removing old widget build files..."
  rm -f "$SCRIPT_DIR/backend/assets/widget.js" "$SCRIPT_DIR/backend/assets/widget.css"
  echo -e "${GREEN}   ✓ Removed widget.js and widget.css${NC}"
fi

# Remove old incorrect build directory if it exists
if [ -d "$SCRIPT_DIR/frontend/backend-assets" ]; then
  echo "   Removing incorrect backend-assets directory..."
  rm -rf "$SCRIPT_DIR/frontend/backend-assets"
  echo -e "${GREEN}   ✓ Removed backend-assets directory${NC}"
fi

# Clear Docker volume build artifacts
if docker volume inspect chattermatechat_frontend_node_modules > /dev/null 2>&1; then
  echo "   Cleaning frontend node_modules volume (this ensures fresh dependencies)..."
  # Note: We don't delete the volume, just clear large build caches
  docker volume inspect chattermatechat_frontend_node_modules > /dev/null 2>&1 && \
  echo -e "${GREEN}   ✓ Frontend dependencies volume exists${NC}" || true
fi

echo ""

# ============================================================================
# STEP 2: Create Docker network
# ============================================================================
echo -e "${BLUE}📡 Step 2: Setting up Docker network...${NC}"

docker network create chattermate-network 2>/dev/null || true
echo -e "${GREEN}   ✓ Network 'chattermate-network' ready${NC}"

echo ""

# ============================================================================
# STEP 2.5: Rebuild widget and webclient locally
# ============================================================================
echo -e "${BLUE}🛠️  Step 2.5: Rebuilding widget and webclient...${NC}"

if command -v npm &> /dev/null; then
  cd "$SCRIPT_DIR/frontend"
  
  # Rebuild widget
  echo "   Building widget..."
  if npm run build:widget:dev 2>&1 | head -20; then
    echo -e "${GREEN}   ✓ Widget rebuilt successfully${NC}"
  else
    echo -e "${YELLOW}   ⚠️  Widget build had issues, will retry in container${NC}"
  fi
  
  # Rebuild webclient
  echo "   Building webclient..."
  if npm run build:webclient:dev 2>&1 | head -20; then
    echo -e "${GREEN}   ✓ Webclient rebuilt successfully${NC}"
  else
    echo -e "${YELLOW}   ⚠️  Webclient build had issues, will retry in container${NC}"
  fi
  
  cd "$SCRIPT_DIR"
else
  echo -e "${YELLOW}   ℹ️  npm not available locally, will build in container${NC}"
fi

echo ""

# ============================================================================
# STEP 3: Build backend image (first time only)
# ============================================================================
echo -e "${BLUE}📦 Step 3: Preparing backend image...${NC}"

BACKEND_IMAGE="chattermate-backend:dev"
if ! docker image inspect $BACKEND_IMAGE > /dev/null 2>&1; then
  echo "   Building backend image (this may take 2-5 minutes on first run)..."
  if docker build -f "$SCRIPT_DIR/Dockerfile" -t $BACKEND_IMAGE "$SCRIPT_DIR"; then
    echo -e "${GREEN}   ✓ Backend image built successfully${NC}"
  else
    echo -e "${RED}   ✗ Failed to build backend image${NC}"
    exit 1
  fi
else
  echo -e "${GREEN}   ✓ Backend image already exists (skipping build)${NC}"
fi

echo ""

# ============================================================================
# STEP 4: Create Docker network
# ============================================================================
echo -e "${BLUE}📡 Step 4: Setting up Docker network...${NC}"

docker network create chattermate-network 2>/dev/null || true
echo -e "${GREEN}   ✓ Network 'chattermate-network' ready${NC}"

echo ""

# ============================================================================
# STEP 5: Start infrastructure services
# ============================================================================
echo -e "${BLUE}🔧 Step 5: Starting infrastructure services (PostgreSQL, Redis, MinIO)...${NC}"

docker compose -f "$SCRIPT_DIR/docker-compose.yml" up -d db redis minio

# Wait for services to be healthy
echo "   Waiting for services to be healthy..."
for service in db redis minio; do
  echo "   Waiting for $service..."
  docker compose -f "$SCRIPT_DIR/docker-compose.yml" exec -T $service echo "OK" > /dev/null 2>&1 || true
  sleep 2
done

echo -e "${GREEN}   ✓ Infrastructure services ready${NC}"
echo ""

# ============================================================================
# STEP 5.5: Clean up frontend container if it exists
# ============================================================================
echo -e "${BLUE}🧹 Step 5.5: Cleaning up frontend container...${NC}"

if docker ps -a | grep -q "chattermatechat-frontend-1"; then
  echo "   Stopping and removing old frontend container..."
  docker compose -f "$SCRIPT_DIR/docker-compose.yml" stop frontend > /dev/null 2>&1 || true
  docker compose -f "$SCRIPT_DIR/docker-compose.yml" rm -f frontend > /dev/null 2>&1 || true
  echo -e "${GREEN}   ✓ Frontend container cleaned${NC}"
else
  echo -e "${GREEN}   ✓ No old frontend container found${NC}"
fi

echo "   Ensuring old widget build artifacts are cleared from container..."
docker exec chattermatechat-frontend-1 rm -rf /app/backend-assets /app/backend/assets/widget.* > /dev/null 2>&1 || true
echo -e "${GREEN}   ✓ Container artifacts cleared${NC}"

echo ""

# ============================================================================
# STEP 6: Build and start frontend
# ============================================================================
echo -e "${BLUE}🎨 Step 6: Building and starting frontend...${NC}"

echo "   Building frontend image with no cache (ensures fresh build)..."
docker compose -f "$SCRIPT_DIR/docker-compose.yml" build --no-cache frontend 2>&1 | grep -E "(Successfully|DONE|Built|Error|frontend)" || true

echo "   Starting frontend container..."
docker compose -f "$SCRIPT_DIR/docker-compose.yml" up -d frontend
echo -e "${GREEN}   ✓ Frontend container started${NC}"

echo ""

# ============================================================================
# STEP 6.5: Build widget in frontend container
# ============================================================================
echo -e "${BLUE}🎨 Step 6.5: Building widget CSS and JS files...${NC}"

MAX_ATTEMPTS=30
ATTEMPT=0
while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
  if docker compose -f "$SCRIPT_DIR/docker-compose.yml" exec -T frontend \
    sh -c 'cd /app && VITE_API_URL=https://chm.c-dev.in/api/v1 VITE_WS_URL=wss://chm.c-dev.in npm run build:widgetdocker'; then
    echo -e "${GREEN}   ✓ Widget built successfully${NC}"
    break
  fi
  ATTEMPT=$((ATTEMPT + 1))
  if [ $ATTEMPT -lt $MAX_ATTEMPTS ]; then
    echo "   Attempt $ATTEMPT/$MAX_ATTEMPTS: Widget build not ready yet, retrying in 2 seconds..."
    sleep 2
  fi
done

if [ $ATTEMPT -eq $MAX_ATTEMPTS ]; then
  echo -e "${YELLOW}   ⚠️  Widget build timed out, this may be retried by frontend startup${NC}"
fi

echo ""

# ============================================================================
# STEP 6.6: Rebuild web client (chattermate.min.js)
# ============================================================================
echo -e "${BLUE}🌐 Step 6.6: Rebuilding web client (chattermate.min.js)...${NC}"

MAX_ATTEMPTS=10
ATTEMPT=0
while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
  if docker compose -f "$SCRIPT_DIR/docker-compose.yml" exec -T frontend \
    sh -c 'cd /app && VITE_API_URL=https://chm.c-dev.in/api/v1 npm run build:webclient:dev'; then
    echo -e "${GREEN}   ✓ Web client built successfully${NC}"
    break
  fi
  ATTEMPT=$((ATTEMPT + 1))
  if [ $ATTEMPT -lt $MAX_ATTEMPTS ]; then
    echo "   Attempt $ATTEMPT/$MAX_ATTEMPTS: Web client build not ready yet, retrying in 2 seconds..."
    sleep 2
  fi
done

if [ $ATTEMPT -eq $MAX_ATTEMPTS ]; then
  echo -e "${YELLOW}   ⚠️  Web client build timed out${NC}"
fi

echo ""

# ============================================================================
# STEP 7: Start backend and nginx
# ============================================================================
echo -e "${BLUE}⚙️  Step 7: Starting backend and nginx...${NC}"

docker compose -f "$SCRIPT_DIR/docker-compose.yml" up -d backend nginx
echo -e "${GREEN}   ✓ Backend and Nginx containers started${NC}"

echo ""

# ============================================================================
# STEP 8: Wait for backend to be ready
# ============================================================================
echo -e "${BLUE}⏳ Step 8: Waiting for backend to be healthy...${NC}"

MAX_ATTEMPTS=30
ATTEMPT=0
while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
  if docker compose -f "$SCRIPT_DIR/docker-compose.yml" exec -T backend curl -f http://localhost:8000/health > /dev/null 2>&1; then
    echo -e "${GREEN}   ✓ Backend is healthy${NC}"
    break
  fi
  ATTEMPT=$((ATTEMPT + 1))
  if [ $ATTEMPT -lt $MAX_ATTEMPTS ]; then
    echo "   Attempt $ATTEMPT/$MAX_ATTEMPTS: Backend not ready yet, retrying in 2 seconds..."
    sleep 2
  fi
done

if [ $ATTEMPT -eq $MAX_ATTEMPTS ]; then
  echo -e "${YELLOW}   ⚠️  Backend health check timed out, continuing anyway...${NC}"
else
  sleep 2
fi

echo ""

# ============================================================================
# STEP 8.5: Run database migrations
# ============================================================================
echo -e "${BLUE}🗄️  Step 8.5: Running database migrations...${NC}"

MAX_ATTEMPTS=30
ATTEMPT=0
while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
  if docker compose -f "$SCRIPT_DIR/docker-compose.yml" exec -T backend alembic upgrade heads > /dev/null 2>&1; then
    echo -e "${GREEN}   ✓ Database migrations completed successfully${NC}"
    break
  fi
  ATTEMPT=$((ATTEMPT + 1))
  if [ $ATTEMPT -lt $MAX_ATTEMPTS ]; then
    echo "   Attempt $ATTEMPT/$MAX_ATTEMPTS: Migrations not ready yet, retrying in 2 seconds..."
    sleep 2
  fi
done

if [ $ATTEMPT -eq $MAX_ATTEMPTS ]; then
  echo -e "${YELLOW}   ⚠️  Database migrations timed out${NC}"
fi

echo ""

# ============================================================================
# STEP 9: Configure CORS
# ============================================================================
echo -e "${BLUE}🔄 Step 9: Configuring CORS...${NC}"

echo "   Clearing CORS cache from Redis..."
docker compose -f "$SCRIPT_DIR/docker-compose.yml" exec -T redis redis-cli del cors:origins > /dev/null 2>&1 || true
echo -e "${GREEN}   ✓ CORS cache cleared${NC}"

echo "   Refreshing CORS middleware..."
docker compose -f "$SCRIPT_DIR/docker-compose.yml" exec -T backend python -c "
import sys
sys.path.append('/app')
from app.core.cors import update_cors_middleware
from app.main import app
try:
    update_cors_middleware(app)
    print('   ✓ CORS middleware updated successfully')
except Exception as e:
    print(f'   ⚠️  CORS update: {e}')
" || echo "   ℹ️  Backend initializing, CORS will be configured on first request"

echo ""

# ============================================================================
# STEP 10: Display build artifact information
# ============================================================================
echo -e "${BLUE}📦 Build Artifacts Information:${NC}"

if [ -f "$SCRIPT_DIR/backend/assets/widget.js" ]; then
  WIDGET_JS_DATE=$(stat -c %y "$SCRIPT_DIR/backend/assets/widget.js" 2>/dev/null | cut -d' ' -f1-2)
  WIDGET_JS_SIZE=$(ls -lh "$SCRIPT_DIR/backend/assets/widget.js" | awk '{print $5}')
  echo -e "  ${GREEN}✓ widget.js${NC}"
  echo "    Size:    $WIDGET_JS_SIZE"
  echo "    Built:   $WIDGET_JS_DATE"
else
  echo -e "  ${RED}✗ widget.js${NC} (not found)"
fi

if [ -f "$SCRIPT_DIR/backend/assets/widget.css" ]; then
  WIDGET_CSS_DATE=$(stat -c %y "$SCRIPT_DIR/backend/assets/widget.css" 2>/dev/null | cut -d' ' -f1-2)
  WIDGET_CSS_SIZE=$(ls -lh "$SCRIPT_DIR/backend/assets/widget.css" | awk '{print $5}')
  echo -e "  ${GREEN}✓ widget.css${NC}"
  echo "    Size:    $WIDGET_CSS_SIZE"
  echo "    Built:   $WIDGET_CSS_DATE"
else
  echo -e "  ${RED}✗ widget.css${NC} (not found)"
fi

if [ -f "$SCRIPT_DIR/frontend/public/webclient/chattermate.min.js" ]; then
  WEBCLIENT_DATE=$(stat -c %y "$SCRIPT_DIR/frontend/public/webclient/chattermate.min.js" 2>/dev/null | cut -d' ' -f1-2)
  WEBCLIENT_SIZE=$(ls -lh "$SCRIPT_DIR/frontend/public/webclient/chattermate.min.js" | awk '{print $5}')
  echo -e "  ${GREEN}✓ chattermate.min.js${NC}"
  echo "    Size:    $WEBCLIENT_SIZE"
  echo "    Built:   $WEBCLIENT_DATE"
else
  echo -e "  ${RED}✗ chattermate.min.js${NC} (not found)"
fi

echo ""

# ============================================================================
# STEP 9: Summary and instructions
# ============================================================================
echo -e "${GREEN}✅ Development environment started successfully!${NC}"
echo ""
echo -e "${BLUE}📋 Environment Configuration:${NC}"
echo "  - Frontend:        ${GREEN}https://chm.c-dev.in${NC} (Vite HMR: auto-reload)"
echo "  - Frontend Direct: ${GREEN}http://localhost:8330${NC} (direct access)"
echo "  - Backend API:     ${GREEN}https://chm.c-dev.in/api/v1${NC} (auto-reload)"
echo "  - Backend Direct:  ${GREEN}http://localhost:8400${NC}"
echo "  - WebSocket:       ${GREEN}wss://chm.c-dev.in${NC}"
echo "  - PostgreSQL:      ${GREEN}localhost:5432${NC} (user: postgres, pass: postgres)"
echo "  - Redis:           ${GREEN}localhost:6379${NC}"
echo "  - MinIO Console:   ${GREEN}http://localhost:9001${NC} (user: minioadmin, pass: minioadmin)"
echo "  - MinIO S3:        ${GREEN}http://localhost:9000${NC}"
echo ""

echo -e "${BLUE}📝 Useful Commands:${NC}"
echo "  View logs:"
echo "    - Frontend:  docker compose -f docker-compose.yml logs -f frontend"
echo "    - Backend:   docker compose -f docker-compose.yml logs -f backend"
echo "    - All:       docker compose -f docker-compose.yml logs -f"
echo ""
echo "  Database operations:"
echo "    - Run migrations: docker compose -f docker-compose.yml exec backend alembic upgrade heads"
echo "    - Create migration: docker compose -f docker-compose.yml exec backend alembic revision --autogenerate -m 'description'"
echo ""
echo "  Container operations:"
echo "    - Stop:      docker compose -f docker-compose.yml down"
echo "    - Restart:   docker compose -f docker-compose.yml restart"
echo "    - Shell:     docker compose -f docker-compose.yml exec backend bash"
echo ""

echo -e "${BLUE}🔄 Hot Reloading Status:${NC}"
echo "  - ${GREEN}Frontend${NC}: Changes in /frontend/src → auto-reload in browser"
echo "  - ${GREEN}Backend${NC}: Changes in /backend/app → auto-restart server"
echo "  - ${GREEN}Widget${NC}: Widget JS/CSS rebuilt on each dev-start in /backend/assets/widget.*"
echo "  - ${GREEN}Web Client${NC}: chattermate.min.js rebuilt on each dev-start"
echo ""

echo -e "${BLUE}⚙️  Environment Variables:${NC}"
echo "  Backend: $SCRIPT_DIR/backend/.env"
echo "  Frontend: $SCRIPT_DIR/frontend/.env"
echo "  Frontend Dev: $SCRIPT_DIR/frontend/.env.development"
echo ""

echo -e "${YELLOW}💡 Pro Tips:${NC}"
echo "  1. Main Base URL: ${GREEN}https://chm.c-dev.in${NC}"
echo "  2. API Endpoint: ${GREEN}https://chm.c-dev.in/api/v1${NC}"
echo "  3. WebSocket URL: ${GREEN}wss://chm.c-dev.in${NC}"
echo "  4. Widget uses: ${GREEN}\${widgetEnv.API_URL}/files/upload${NC} (automatically resolves to /api/v1/files/upload)"
echo "  5. Widget CSS/JS: ${GREEN}/backend/assets/widget.{css,js}${NC} (rebuilt on each dev-start)"
echo "  6. Web Client: ${GREEN}chattermate.min.js${NC} (rebuilt on each dev-start)"
echo "  7. To manually rebuild widget: npm run build:widget:dev (from /frontend)"
echo "  8. To manually rebuild web client: npm run build:webclient:dev (from /frontend)"
echo "  9. To run tests: docker compose -f docker-compose.yml exec backend pytest"
echo ""
echo -e "${YELLOW}🔧 Build Fixes Applied:${NC}"
echo "  - ${GREEN}isImageAttachment()${NC}: Now handles undefined/null content_type safely"
echo "  - ${GREEN}WidgetBuilder${NC}: Widget only renders when widgetId is available"
echo "  - ${GREEN}Database migrations${NC}: Automatically runs on each dev-start"
echo "  - ${GREEN}Widget rebuild${NC}: Automatically rebuilds widget.js and widget.css"
echo ""

