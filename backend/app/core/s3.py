"""
S3 Storage Utilities
"""
import traceback
import boto3
from botocore.exceptions import ClientError
from app.core.config import settings
from app.core.logger import get_logger
from fastapi import HTTPException, UploadFile
from typing import Optional
from urllib.parse import urlparse

logger = get_logger(__name__)

def get_s3_client():
    """Get boto3 S3 client"""
    client_config = {
        'aws_access_key_id': settings.AWS_ACCESS_KEY_ID,
        'aws_secret_access_key': settings.AWS_SECRET_ACCESS_KEY,
        'region_name': settings.S3_REGION
    }
    
    # If S3_ENDPOINT_URL is set (for MinIO or other S3-compatible services), use it
    if settings.S3_ENDPOINT_URL:
        client_config['endpoint_url'] = settings.S3_ENDPOINT_URL
    
    return boto3.client('s3', **client_config)

async def get_s3_signed_url(s3_url: str, expiration: int = 2592000) -> str:
    """
    Generate a signed URL for an S3 object
    For MinIO: Returns backend proxy URL (/api/v1/files/download/...)
    For AWS S3: Returns AWS signed URL
    
    Args:
        s3_url: The S3 URL or backend proxy path
        expiration: URL expiration time in seconds (default 30 days)
    Returns:
        Signed URL or proxy URL for the object
    """
    try:
        if not settings.S3_FILE_STORAGE or not s3_url:
            return s3_url

        # If it's already a backend proxy URL, return as-is
        if s3_url.startswith('/api/v1/files/download/'):
            return s3_url

        # Parse the URL to extract the key
        parsed_url = urlparse(s3_url)
        path_parts = parsed_url.path.strip('/').split('/')
        
        # For MinIO: Return backend proxy URL instead of generating AWS-style signed URL
        if settings.S3_ENDPOINT_URL:
            # Extract the file path (everything after bucket name)
            if len(path_parts) > 1 and path_parts[0] == settings.S3_BUCKET:
                file_path = '/'.join(path_parts[1:])
            else:
                file_path = '/'.join(path_parts)
            
            # Return backend proxy URL
            signed_url = f"/api/v1/files/download/{file_path}"
            logger.debug(f"Generated proxy URL: {signed_url}")
            return signed_url
        
        # For AWS S3, generate proper signed URL
        # Extract key based on URL format
        if parsed_url.netloc == 's3.amazonaws.com':
            # Format: https://s3.amazonaws.com/bucket/key
            key = '/'.join(path_parts[1:])
        else:
            # Format: https://bucket.s3.region.amazonaws.com/key
            # Skip the first part if it's the bucket name
            if path_parts and path_parts[0] == settings.S3_BUCKET:
                key = '/'.join(path_parts[1:])
            else:
                key = '/'.join(path_parts)
        
        logger.debug(f"Generating AWS signed URL for key: {key}")
        
        s3_client = get_s3_client()
        signed_url = s3_client.generate_presigned_url(
            'get_object',
            Params={
                'Bucket': settings.S3_BUCKET,
                'Key': key
            },
            ExpiresIn=expiration
        )
        
        logger.debug(f"Generated AWS signed URL")
        return signed_url
    except Exception as e:
        traceback.print_exc()
        logger.error(f"Error generating signed URL: {str(e)}")
        return s3_url

async def upload_file_to_s3(
    file: UploadFile,
    folder: str,
    filename: str,
    content_type: Optional[str] = None
) -> str:
    """
    Upload file to S3 bucket
    Returns the S3 URL of the uploaded file
    Falls back to local storage if S3 fails
    """
    try:
        s3_client = get_s3_client()
        file_content = await file.read()
        
        # Construct S3 key (path)
        s3_key = f"{folder}/{filename}"
        
        # Try to create the bucket if it doesn't exist
        try:
            s3_client.head_bucket(Bucket=settings.S3_BUCKET)
            logger.debug(f"Bucket {settings.S3_BUCKET} already exists")
        except ClientError as e:
            error_code = e.response['Error']['Code']
            if error_code in ('404', 'NoSuchBucket'):
                # Bucket doesn't exist, try to create it
                try:
                    if settings.S3_ENDPOINT_URL:
                        # For MinIO, create bucket without LocationConstraint
                        s3_client.create_bucket(Bucket=settings.S3_BUCKET)
                    else:
                        # For AWS, use LocationConstraint for non-us-east-1 regions
                        if settings.S3_REGION != 'us-east-1':
                            s3_client.create_bucket(
                                Bucket=settings.S3_BUCKET,
                                CreateBucketConfiguration={'LocationConstraint': settings.S3_REGION}
                            )
                        else:
                            s3_client.create_bucket(Bucket=settings.S3_BUCKET)
                    logger.info(f"Created S3 bucket: {settings.S3_BUCKET}")
                except Exception as create_err:
                    logger.warning(f"Could not create S3 bucket: {str(create_err)}. Falling back to local storage.")
                    return await _save_file_locally(file_content, folder, filename)
            else:
                # Different error, log and continue
                logger.warning(f"Error checking bucket {settings.S3_BUCKET}: {error_code} - {str(e)}")
        
        # Upload to S3
        extra_args = {}
        if content_type:
            extra_args['ContentType'] = content_type
        
        logger.info(f"Putting object to S3: bucket={settings.S3_BUCKET}, key={s3_key}, size={len(file_content)} bytes")
        s3_client.put_object(
            Bucket=settings.S3_BUCKET,
            Key=s3_key,
            Body=file_content,
            **extra_args
        )
        # Verify file was written
        for attempt in range(3):
            try:
                s3_client.head_object(Bucket=settings.S3_BUCKET, Key=s3_key)
                break
            except Exception as verify_err:
                if attempt < 2:
                    import time
                    time.sleep(0.5)
                else:
                    logger.error(f"File verification failed after retries: {s3_key} - {str(verify_err)}")
                    raise HTTPException(
                        status_code=500,
                        detail="File upload verification failed"
                    )
        # Generate S3 URL (handle both AWS and MinIO URLs)
        # For S3/MinIO, we return the backend proxy URL instead of direct MinIO URL
        if settings.S3_ENDPOINT_URL:
            # For MinIO or other S3-compatible services
            # Return backend proxy URL: /api/v1/files/download/folder/filename
            url = f"/api/v1/files/download/{folder}/{filename}"
        else:
            # For AWS S3
            url = f"https://{settings.S3_BUCKET}.s3.{settings.S3_REGION}.amazonaws.com/{s3_key}"
        
        logger.info(f"Successfully uploaded file to S3: {url}")
        return url
        
    except ClientError as e:
        logger.warning(f"S3 upload failed with ClientError: {str(e)}. Falling back to local storage.")
        file_content = await file.read()
        return await _save_file_locally(file_content, folder, filename)
    except Exception as e:
        logger.error(f"S3 upload failed with unexpected error: {str(e)}")
        traceback.print_exc()
        logger.warning(f"Falling back to local storage.")
        file_content = await file.read()
        return await _save_file_locally(file_content, folder, filename)


async def _save_file_locally(
    file_content: bytes,
    folder: str,
    filename: str
) -> str:
    """
    Fallback function to save file locally when S3 fails
    """
    try:
        import os
        upload_dir = os.path.join("uploads", folder)
        os.makedirs(upload_dir, exist_ok=True)
        
        file_path = os.path.join(upload_dir, filename)
        with open(file_path, "wb") as f:
            f.write(file_content)
        
        file_url = f"/api/v1/uploads/{folder}/{filename}"
        logger.info(f"File saved locally (S3 fallback): {file_url}")
        return file_url
    except Exception as e:
        logger.error(f"Failed to save file locally: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to save file")

async def delete_file_from_s3(s3_url: str) -> bool:
    """Delete file from S3 bucket
    
    Args:
        s3_url: Can be either a backend proxy URL (/api/v1/files/download/...) 
                or an S3 URL (for AWS compatibility)
    """
    try:
        s3_client = get_s3_client()
        
        # If it's a proxy URL, extract the file path
        if s3_url.startswith('/api/v1/files/download/'):
            # Format: /api/v1/files/download/chat_attachments/org-id/filename
            key = s3_url.replace('/api/v1/files/download/', '')
        else:
            # It's an S3 URL - extract key from URL
            parsed_url = urlparse(s3_url)
            path_parts = parsed_url.path.strip('/').split('/')
            
            # Extract key based on URL format
            if parsed_url.netloc == 's3.amazonaws.com':
                # Format: https://s3.amazonaws.com/bucket/key
                key = '/'.join(path_parts[1:])
            else:
                # Format: https://bucket.s3.region.amazonaws.com/key
                # Skip the first part if it's the bucket name
                if path_parts and path_parts[0] == settings.S3_BUCKET:
                    key = '/'.join(path_parts[1:])
                else:
                    key = '/'.join(path_parts)
        
        s3_client.delete_object(
            Bucket=settings.S3_BUCKET,
            Key=key
        )
        logger.info(f"Successfully deleted file from S3: {key}")
        return True
        
    except Exception as e:
        logger.error(f"Error deleting from S3: {str(e)}")
        return False 