#!/bin/bash
# ChatterMate File Upload Setup Script

echo "🚀 Setting up file upload feature with MinIO..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker is running${NC}"

# Start MinIO service
echo -e "\n${YELLOW}📦 Starting MinIO service...${NC}"
docker compose up -d minio

# Wait for MinIO to be ready
echo -e "${YELLOW}⏳ Waiting for MinIO to be ready...${NC}"
sleep 5

# Check if MinIO is running
if docker compose ps minio | grep -q "Up"; then
    echo -e "${GREEN}✅ MinIO is running${NC}"
else
    echo -e "${RED}❌ MinIO failed to start${NC}"
    exit 1
fi

# Install MinIO client if not present
if ! command -v mc &> /dev/null; then
    echo -e "${YELLOW}📥 Installing MinIO client...${NC}"
    wget -q https://dl.min.io/client/mc/release/linux-amd64/mc -O /tmp/mc
    chmod +x /tmp/mc
    MC_CMD="/tmp/mc"
else
    MC_CMD="mc"
fi

# Configure MinIO client
echo -e "${YELLOW}🔧 Configuring MinIO client...${NC}"
$MC_CMD alias set chatlocal http://localhost:9000 minioadmin minioadmin > /dev/null 2>&1

# Create bucket
echo -e "${YELLOW}📁 Creating chattermate-uploads bucket...${NC}"
$MC_CMD mb chatlocal/chattermate-uploads > /dev/null 2>&1 || echo -e "${YELLOW}ℹ️  Bucket already exists${NC}"

# Set public download policy (adjust as needed for production)
echo -e "${YELLOW}🔓 Setting bucket policy...${NC}"
$MC_CMD anonymous set download chatlocal/chattermate-uploads > /dev/null 2>&1

# Check backend .env file
echo -e "\n${YELLOW}🔍 Checking backend configuration...${NC}"
if [ -f "backend/.env" ]; then
    if grep -q "S3_FILE_STORAGE=true" backend/.env; then
        echo -e "${GREEN}✅ S3_FILE_STORAGE is enabled${NC}"
    else
        echo -e "${YELLOW}⚠️  S3_FILE_STORAGE is not enabled in backend/.env${NC}"
        echo -e "${YELLOW}   Add the following to backend/.env:${NC}"
        echo ""
        echo "   S3_FILE_STORAGE=true"
        echo "   S3_BUCKET=chattermate-uploads"
        echo "   S3_REGION=us-east-1"
        echo "   S3_ENDPOINT_URL=http://minio:9000"
        echo "   AWS_ACCESS_KEY_ID=minioadmin"
        echo "   AWS_SECRET_ACCESS_KEY=minioadmin"
        echo ""
    fi
else
    echo -e "${RED}❌ backend/.env file not found${NC}"
fi

# Run database migrations
echo -e "\n${YELLOW}🗄️  Running database migrations...${NC}"
if docker compose ps backend | grep -q "Up"; then
    docker compose exec -T backend alembic upgrade head
    echo -e "${GREEN}✅ Database migrations completed${NC}"
else
    echo -e "${YELLOW}⚠️  Backend service is not running. Start it and run: docker compose exec backend alembic upgrade head${NC}"
fi

# Restart services
echo -e "\n${YELLOW}🔄 Restarting backend and frontend services...${NC}"
docker compose restart backend frontend

echo -e "\n${GREEN}✅ Setup complete!${NC}"
echo -e "\n${YELLOW}📝 Next steps:${NC}"
echo "1. Access MinIO Console: http://localhost:9001"
echo "   Username: minioadmin"
echo "   Password: minioadmin"
echo ""
echo "2. Test file upload in the widget or admin panel"
echo ""
echo "3. Check FILE_UPLOAD_FEATURE.md for detailed documentation"
echo ""
echo -e "${GREEN}Happy uploading! 📤${NC}"
