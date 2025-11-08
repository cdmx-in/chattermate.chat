#!/bin/bash

# Initialize MinIO bucket
# This script creates the necessary S3/MinIO bucket on startup

set -e

MINIO_HOST="${MINIO_HOST:-minio:9000}"
MINIO_USER="${MINIO_USER:-minioadmin}"
MINIO_PASSWORD="${MINIO_PASSWORD:-minioadmin}"
BUCKET_NAME="${BUCKET_NAME:-chattermate-uploads}"

echo "Waiting for MinIO to be ready at $MINIO_HOST..."
max_attempts=30
attempt=0

while [ $attempt -lt $max_attempts ]; do
    if curl -s -f "http://${MINIO_HOST}/minio/health/live" > /dev/null 2>&1; then
        echo "MinIO is ready!"
        break
    fi
    attempt=$((attempt + 1))
    echo "Attempt $attempt/$max_attempts: MinIO not ready yet, waiting..."
    sleep 2
done

if [ $attempt -eq $max_attempts ]; then
    echo "ERROR: MinIO did not become ready after $max_attempts attempts"
    exit 1
fi

# Install mc (MinIO Client) if not available
if ! command -v mc &> /dev/null; then
    echo "Installing MinIO Client..."
    curl -o /usr/local/bin/mc https://dl.min.io/client/mc/release/linux-amd64/mc
    chmod +x /usr/local/bin/mc
fi

# Configure MinIO alias
echo "Configuring MinIO alias..."
mc alias set minio http://${MINIO_HOST} ${MINIO_USER} ${MINIO_PASSWORD} --api S3v4

# Create bucket if it doesn't exist
echo "Checking/creating bucket: $BUCKET_NAME"
if mc ls minio/${BUCKET_NAME} > /dev/null 2>&1; then
    echo "Bucket $BUCKET_NAME already exists"
else
    echo "Creating bucket $BUCKET_NAME..."
    mc mb minio/${BUCKET_NAME}
    echo "Bucket $BUCKET_NAME created successfully"
fi

echo "MinIO initialization complete!"
