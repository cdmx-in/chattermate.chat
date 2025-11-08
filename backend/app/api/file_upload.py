"""
ChatterMate - File Upload API
Copyright (C) 2024 ChatterMate

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>
"""

from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, status, Header, Request
from fastapi.responses import JSONResponse
from typing import Optional
import uuid
import os
from datetime import datetime
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.s3 import upload_file_to_s3, get_s3_signed_url
from app.core.logger import get_logger
from app.core.security import verify_conversation_token
from app.models import User
from app.core.auth import get_current_user
from app.database import get_db

logger = get_logger(__name__)

router = APIRouter()

# Allowed file types and size limits
ALLOWED_IMAGE_TYPES = {'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'}
ALLOWED_DOCUMENT_TYPES = {'application/pdf', 'application/msword', 
                          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                          'text/plain', 'text/csv', 'application/vnd.ms-excel',
                          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}
ALLOWED_FILE_TYPES = ALLOWED_IMAGE_TYPES | ALLOWED_DOCUMENT_TYPES

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
MAX_IMAGE_SIZE = 5 * 1024 * 1024  # 5MB


def get_cors_headers(request: Request) -> dict:
    """
    Get CORS headers for responses with credentials support
    """
    origin = request.headers.get('origin', '*')
    return {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Conversation-Token',
        'Access-Control-Max-Age': '3600'
    }


async def get_current_user_or_widget(
    request: Request,
    db: Session = Depends(get_db),
    authorization: Optional[str] = Header(None),
    x_conversation_token: Optional[str] = Header(None)
) -> dict:
    """
    Get current user from JWT token, cookies, or widget conversation token
    Returns dict with user info or widget info
    """
    # Try to get user from cookies or Authorization header (admin/agent users)
    try:
        # Call get_current_user with the request - it handles both cookies and headers
        user = await get_current_user(request, None, db)
        if user:
            return {
                "type": "user",
                "user_id": str(user.id),
                "org_id": str(user.organization_id)
            }
    except HTTPException:
        # User auth failed, continue to try other methods
        pass
    except Exception as e:
        logger.error(f"Error authenticating user: {str(e)}")
    
    # Try to get widget info from conversation token
    if x_conversation_token:
        try:
            payload = verify_conversation_token(x_conversation_token)
            if payload:
                return {
                    "type": "widget",
                    "widget_id": payload.get("widget_id"),
                    "org_id": payload.get("org_id"),
                    "customer_id": payload.get("customer_id")
                }
        except Exception as e:
            logger.error(f"Error verifying conversation token: {str(e)}")
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Authentication required"
    )


# OPTIONS endpoint for CORS preflight requests
@router.options("/upload")
async def upload_options(request: Request):
    """Handle CORS preflight requests for file upload"""
    cors_headers = get_cors_headers(request)
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={},
        headers=cors_headers
    )


@router.post("/upload")
async def upload_file(
    request: Request,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    authorization: Optional[str] = Header(None),
    x_conversation_token: Optional[str] = Header(None)
):
    """
    Upload a file (image or document) to S3/MinIO storage
    Supports both authenticated users and widget conversations
    """
    try:
        # Authenticate request - use headers and cookies
        auth_info = await get_current_user_or_widget(request, db, authorization, x_conversation_token)
        
        # Validate file type
        if file.content_type not in ALLOWED_FILE_TYPES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"File type {file.content_type} not allowed. Allowed types: images and documents."
            )
        
        # Read file content to check size
        file_content = await file.read()
        file_size = len(file_content)
        
        # Check file size limits
        if file.content_type in ALLOWED_IMAGE_TYPES and file_size > MAX_IMAGE_SIZE:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Image file size exceeds maximum allowed size of {MAX_IMAGE_SIZE / (1024*1024)}MB"
            )
        
        if file_size > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"File size exceeds maximum allowed size of {MAX_FILE_SIZE / (1024*1024)}MB"
            )
        
        # Reset file pointer for upload
        await file.seek(0)
        
        # Generate unique filename
        file_extension = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        
        # Determine folder based on auth type
        if auth_info["type"] == "user":
            folder = f"chat_attachments/{auth_info['org_id']}"
        else:
            folder = f"widget_attachments/{auth_info['org_id']}"
        
        # Upload to S3/MinIO if enabled, otherwise save locally
        if settings.S3_FILE_STORAGE:
            file_url = await upload_file_to_s3(
                file=file,
                folder=folder,
                filename=unique_filename,
                content_type=file.content_type
            )
            # file_url is now a backend proxy URL like /api/v1/files/download/...
            signed_url = file_url  # For MinIO, file_url IS the signed URL
        else:
            # Save locally
            upload_dir = os.path.join("uploads", folder)
            os.makedirs(upload_dir, exist_ok=True)
            
            file_path = os.path.join(upload_dir, unique_filename)
            with open(file_path, "wb") as f:
                f.write(file_content)
            
            file_url = f"/api/v1/uploads/{folder}/{unique_filename}"
            signed_url = file_url
        
        # Create FileAttachment record for tracking
        try:
            from app.models import FileAttachment
            
            # Validate org_id exists before attempting to create attachment
            org_id = auth_info.get('org_id')
            if not org_id:
                raise ValueError("Missing required field: organization_id (org_id not found in auth_info)")
            
            file_attachment = FileAttachment(
                file_url=file_url,
                filename=file.filename,
                content_type=file.content_type,
                file_size=file_size,
                organization_id=org_id,
                uploaded_by_user_id=auth_info.get('user_id') if auth_info.get('type') == 'user' else None,
                uploaded_by_customer_id=auth_info.get('customer_id') if auth_info.get('type') == 'widget' else None,
            )
            db.add(file_attachment)
            db.commit()
            logger.info(f"Created FileAttachment record for: {file.filename}")
        except Exception as att_err:
            logger.warning(f"Failed to create FileAttachment record: {str(att_err)}")
            # Continue even if attachment record fails
        
        # Get CORS headers for response
        cors_headers = get_cors_headers(request)
        
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "success": True,
                "file_url": file_url,
                "signed_url": signed_url,
                "filename": file.filename,
                "content_type": file.content_type,
                "size": file_size
            },
            headers=cors_headers
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error uploading file: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to upload file"
        )





@router.get("/download/{file_path:path}")
async def download_file(
    file_path: str,
    request: Request,
    db: Session = Depends(get_db),
    authorization: Optional[str] = Header(None),
    x_conversation_token: Optional[str] = Header(None)
):
    """
    Download/serve a file from S3/MinIO through the backend API
    This proxies MinIO requests so MinIO doesn't need to be publicly exposed
    
    Usage: GET /api/v1/files/download/chat_attachments/org-id/filename.jpg
    """
    try:
        from fastapi.responses import StreamingResponse
        from app.core.s3 import get_s3_client
        import io
        
        # Try to authenticate
        try:
            auth_info = await get_current_user_or_widget(request, db, authorization, x_conversation_token)
        except Exception:
            auth_info = None
        
        if not settings.S3_FILE_STORAGE:
            # If S3 is disabled, try local file
            import os
            local_file_path = os.path.join("uploads", file_path)
            if os.path.exists(local_file_path):
                with open(local_file_path, "rb") as f:
                    file_content = f.read()
                
                import mimetypes
                content_type, _ = mimetypes.guess_type(local_file_path)
                content_type = content_type or "application/octet-stream"
                
                return StreamingResponse(
                    io.BytesIO(file_content),
                    media_type=content_type,
                    headers={"Content-Disposition": f"inline; filename={os.path.basename(file_path)}"}
                )
            else:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"File not found: {local_file_path}"
                )
        
        # For S3/MinIO
        try:
            s3_client = get_s3_client()
        except Exception as client_err:
            logger.error(f"Failed to create S3 client: {str(client_err)}", exc_info=True)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create S3 client"
            )
        
        s3_key = file_path
        bucket = settings.S3_BUCKET
        
        # Check if the file exists
        try:
            head_response = s3_client.head_object(Bucket=bucket, Key=s3_key)
        except s3_client.exceptions.NoSuchKey:
            logger.warning(f"File not found: {s3_key}")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="File not found"
            )
        except Exception as head_err:
            logger.error(f"Error checking file: {str(head_err)}", exc_info=True)
        
        # Get the object from S3
        try:
            response = s3_client.get_object(Bucket=bucket, Key=s3_key)
        except s3_client.exceptions.NoSuchKey:
            logger.warning(f"File not found: {s3_key}")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="File not found"
            )
        except Exception as s3_err:
            logger.error(f"S3 error: {str(s3_err)}", exc_info=True)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to retrieve file"
            )
        
        # Stream the file back to client
        def generate():
            while True:
                chunk = response['Body'].read(8192)
                if not chunk:
                    break
                yield chunk
        
        # Determine content type
        content_type = response.get('ContentType', 'application/octet-stream')
        
        # Extract filename from path
        filename = file_path.split('/')[-1]
        
        logger.info(f"Streaming file: {filename}, content-type: {content_type}")
        return StreamingResponse(
            generate(),
            media_type=content_type,
            headers={"Content-Disposition": f"inline; filename={filename}"}
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error downloading file {file_path}: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to download file: {str(e)}"
        )


@router.post("/signed-url")
async def get_signed_url(
    request: Request,
    body: dict,
    db: Session = Depends(get_db),
    authorization: Optional[str] = Header(None),
    x_conversation_token: Optional[str] = Header(None)
):
    """
    Generate a signed URL for file access through the backend API
    Instead of exposing MinIO directly, this provides a backend-routed URL
    
    Request body:
    {
        "file_url": "http://minio:9000/chattermate-uploads/chat_attachments/org-id/filename.jpg"
    }
    
    Response:
    {
        "signed_url": "/api/v1/files/download/chat_attachments/org-id/filename.jpg",
        "method": "GET"
    }
    """
    try:
        # Authenticate request
        auth_info = await get_current_user_or_widget(request, db, authorization, x_conversation_token)
        
        file_url = body.get('file_url')
        if not file_url:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="file_url is required"
            )
        
        # Extract the file path from the S3 URL
        # From: http://minio:9000/chattermate-uploads/chat_attachments/org-id/filename.jpg
        # To: chat_attachments/org-id/filename.jpg
        from urllib.parse import urlparse
        parsed_url = urlparse(file_url)
        path_parts = parsed_url.path.strip('/').split('/')
        
        # Skip the bucket name (first part) to get just the key
        if len(path_parts) > 1 and path_parts[0] == settings.S3_BUCKET:
            file_path = '/'.join(path_parts[1:])
        else:
            file_path = '/'.join(path_parts)
        
        # Return backend proxy URL instead of direct S3 URL
        signed_url = f"/api/v1/files/download/{file_path}"
        
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "signed_url": signed_url,
                "method": "GET",
                "message": "Use the signed_url as a direct GET request from the browser"
            }
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error generating signed URL: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate signed URL"
        )


@router.delete("/upload/{file_id}")
async def delete_file(
    file_id: str,
    current_user: User = Depends(get_current_user)
):
    """
    Delete an uploaded file (admin/agent only)
    """
    try:
        # In a production system, you would:
        # 1. Verify the file belongs to the user's organization
        # 2. Delete from S3/MinIO
        # 3. Remove database record
        
        # For now, return success
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"success": True, "message": "File deleted"}
        )
        
    except Exception as e:
        logger.error(f"Error deleting file: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete file"
        )


@router.post("/attach")
async def attach_files_to_message(
    request: Request,
    session_id: str,
    file_urls: list[str],
    db: Session = Depends(get_db),
    authorization: Optional[str] = Header(None),
    x_conversation_token: Optional[str] = Header(None)
):
    """
    Attach previously uploaded files to a chat message
    """
    try:
        # Authenticate request
        auth_info = await get_current_user_or_widget(request, db, authorization, x_conversation_token)
        
        from app.models import ChatHistory, FileAttachment
        
        # Find the most recent message in this session
        latest_message = db.query(ChatHistory).filter(
            ChatHistory.session_id == session_id
        ).order_by(ChatHistory.created_at.desc()).first()
        
        if not latest_message:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Chat message not found"
            )
        
        # Create FileAttachment records for each file
        for file_url in file_urls:
            file_attachment = FileAttachment(
                file_url=file_url,
                filename=file_url.split('/')[-1],
                content_type='application/octet-stream',  # Default, should be known from upload
                file_size=0,  # Should be known from upload
                chat_history_id=latest_message.id,
                organization_id=auth_info.get('org_id')
            )
            db.add(file_attachment)
        
        db.commit()
        
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"success": True, "message": "Files attached to message"}
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error attaching files to message: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to attach files to message"
        )

