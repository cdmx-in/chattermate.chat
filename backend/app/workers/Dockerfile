# syntax=docker/dockerfile:1
FROM --platform=linux/amd64 python:3.12-slim

# Set working directory
WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    ENVIRONMENT=production \
    TESTING=0

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    git \
    curl \
    jq \
    && rm -rf /var/lib/apt/lists/*

# Clone the repository and checkout the enterprise_changes branch
RUN --mount=type=cache,target=/root/.git \
    git clone https://github.com/chattermate/chattermate.chat.git /app/main && \
    cd /app/main && \
    git fetch --all && \
    git checkout enterprise_changes && \
    git pull origin enterprise_changes

# Set working directory to backend
WORKDIR /app/main/backend

# Create config directory and setup Firebase credentials
RUN mkdir -p app/config

# Create Firebase config file from environment variable
ARG FIREBASE_CREDENTIALS
RUN echo "${FIREBASE_CREDENTIALS}" | base64 -d | jq '.' > /app/main/backend/app/config/firebase-config.json

# Install Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Create non-root user and set permissions
RUN useradd -m appuser && \
    chown -R appuser:appuser /app && \
    chmod -R 755 /app/main/backend
USER appuser

# Run knowledge processor
CMD ["python", "-m", "app.workers.run_knowledge_processor"] 