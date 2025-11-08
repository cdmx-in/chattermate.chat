#!/usr/bin/env python3
"""
Initialize S3/MinIO bucket for ChatterMate
This script ensures the S3 bucket exists before the application starts processing files
"""
import sys
import time
import logging
from pathlib import Path

# Add the backend app to the path
backend_dir = Path(__file__).resolve().parent.parent / 'backend'
sys.path.insert(0, str(backend_dir))

from app.core.config import settings
from app.core.logger import get_logger
import boto3
from botocore.exceptions import ClientError

logger = get_logger(__name__)

def wait_for_s3():
    """Wait for S3/MinIO to be available"""
    max_attempts = 30
    attempt = 0
    
    while attempt < max_attempts:
        try:
            client = boto3.client(
                's3',
                aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                region_name=settings.S3_REGION,
                endpoint_url=settings.S3_ENDPOINT_URL if settings.S3_ENDPOINT_URL else None
            )
            # Try to list buckets to verify connection
            client.list_buckets()
            logger.info("✓ Successfully connected to S3/MinIO")
            return client
        except Exception as e:
            attempt += 1
            logger.warning(f"Attempt {attempt}/{max_attempts}: Could not connect to S3/MinIO: {str(e)}")
            if attempt < max_attempts:
                time.sleep(2)
            else:
                logger.error("ERROR: Could not connect to S3/MinIO after maximum attempts")
                return None
    
    return None

def ensure_bucket_exists(client):
    """Ensure the S3 bucket exists, create if needed"""
    try:
        # Check if bucket exists
        client.head_bucket(Bucket=settings.S3_BUCKET)
        logger.info(f"✓ Bucket '{settings.S3_BUCKET}' already exists")
        return True
    except ClientError as e:
        error_code = e.response['Error']['Code']
        if error_code in ('404', 'NoSuchBucket'):
            logger.info(f"Bucket '{settings.S3_BUCKET}' does not exist, creating...")
            try:
                if settings.S3_ENDPOINT_URL:
                    # For MinIO, create bucket without LocationConstraint
                    client.create_bucket(Bucket=settings.S3_BUCKET)
                else:
                    # For AWS, use LocationConstraint for non-us-east-1 regions
                    if settings.S3_REGION != 'us-east-1':
                        client.create_bucket(
                            Bucket=settings.S3_BUCKET,
                            CreateBucketConfiguration={'LocationConstraint': settings.S3_REGION}
                        )
                    else:
                        client.create_bucket(Bucket=settings.S3_BUCKET)
                logger.info(f"✓ Successfully created bucket '{settings.S3_BUCKET}'")
                return True
            except Exception as create_err:
                logger.error(f"✗ Failed to create bucket: {str(create_err)}")
                return False
        else:
            logger.warning(f"Could not check bucket status (error: {error_code}): {str(e)}")
            return False
    except Exception as e:
        logger.error(f"✗ Unexpected error checking bucket: {str(e)}")
        return False

def main():
    """Main initialization function"""
    if not settings.S3_FILE_STORAGE:
        logger.info("S3 file storage is disabled, skipping MinIO initialization")
        return True
    
    logger.info("=" * 60)
    logger.info("Initializing S3/MinIO storage...")
    logger.info(f"S3 Endpoint: {settings.S3_ENDPOINT_URL or 'AWS S3'}")
    logger.info(f"Bucket: {settings.S3_BUCKET}")
    logger.info(f"Region: {settings.S3_REGION}")
    logger.info("=" * 60)
    
    # Wait for S3/MinIO to be available
    client = wait_for_s3()
    if not client:
        logger.error("Failed to connect to S3/MinIO")
        return False
    
    # Ensure bucket exists
    if ensure_bucket_exists(client):
        logger.info("=" * 60)
        logger.info("✓ S3/MinIO initialization successful!")
        logger.info("=" * 60)
        return True
    else:
        logger.error("=" * 60)
        logger.error("✗ S3/MinIO initialization failed!")
        logger.error("=" * 60)
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
