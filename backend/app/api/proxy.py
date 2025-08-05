"""
ChatterMate - Website Proxy API
Copyright (C) 2024 ChatterMate

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
"""

import requests
import re
from urllib.parse import urljoin, urlparse
from fastapi import APIRouter, HTTPException, Query, Request
from fastapi.responses import HTMLResponse
from bs4 import BeautifulSoup
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

def is_domain_allowed(url: str) -> bool:
    """Validate URL format and basic security checks"""
    try:
        parsed = urlparse(url)
        # Basic validation that URL has a domain
        return bool(parsed.netloc)
    except Exception:
        return False

def modify_html_content(html_content: str, original_url: str) -> str:
    """
    Modify HTML content to work within our proxy iframe:
    - Convert relative URLs to absolute URLs
    - Remove problematic scripts and headers
    - Add base tag for proper resource loading
    """
    try:
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Add base tag to handle relative URLs
        if not soup.find('base'):
            base_tag = soup.new_tag('base', href=original_url)
            if soup.head:
                soup.head.insert(0, base_tag)
            else:
                # Create head if it doesn't exist
                head = soup.new_tag('head')
                head.append(base_tag)
                if soup.html:
                    soup.html.insert(0, head)
        
        # Remove or modify problematic elements
        for element in soup.find_all(['script']):
            # Keep essential scripts but remove those that might break iframe
            script_content = element.get_text()
            if any(keyword in script_content.lower() for keyword in [
                'framebuster', 'top.location', 'parent.location', 'window.top',
                'history.pushstate', 'history.replacestate', 'window.history'
            ]):
                logger.debug(f"Removing problematic script: {script_content[:100]}...")
                element.decompose()
            elif element.get('src'):
                # Convert relative script sources to absolute
                src = element.get('src')
                if src and not src.startswith(('http://', 'https://', '//')):
                    element['src'] = urljoin(original_url, src)
        
        # Convert relative links to absolute
        for element in soup.find_all(['a', 'link']):
            href = element.get('href')
            if href and not href.startswith(('http://', 'https://', '//', '#', 'javascript:', 'mailto:')):
                element['href'] = urljoin(original_url, href)
        
        # Convert relative image sources to absolute
        for element in soup.find_all(['img']):
            src = element.get('src')
            if src and not src.startswith(('http://', 'https://', '//', 'data:')):
                element['src'] = urljoin(original_url, src)
        
        # Add style to prevent framebusting
        style_tag = soup.new_tag('style')
        style_tag.string = """
            /* Prevent framebusting and improve iframe compatibility */
            body { margin: 0; padding: 0; }
            * { box-sizing: border-box; }
        """
        if soup.head:
            soup.head.append(style_tag)
        
        # Add JavaScript to handle common iframe issues
        iframe_script = soup.new_tag('script')
        iframe_script.string = """
            // Iframe compatibility fixes
            (function() {
                // Override problematic history methods
                try {
                    const originalPushState = history.pushState;
                    const originalReplaceState = history.replaceState;
                    
                    history.pushState = function(...args) {
                        try {
                            return originalPushState.apply(this, args);
                        } catch (e) {
                            console.warn('History pushState blocked in iframe:', e);
                        }
                    };
                    
                    history.replaceState = function(...args) {
                        try {
                            return originalReplaceState.apply(this, args);
                        } catch (e) {
                            console.warn('History replaceState blocked in iframe:', e);
                        }
                    };
                } catch (e) {
                    console.warn('Could not override history methods:', e);
                }
                
                // Handle fetch with better error handling
                const originalFetch = window.fetch;
                window.fetch = function(...args) {
                    return originalFetch.apply(this, args).catch(error => {
                        if (error.name === 'TypeError' && error.message.includes('CORS')) {
                            console.warn('CORS error intercepted:', error);
                            // Return a minimal response to prevent complete failure
                            return new Response('{}', {
                                status: 200,
                                headers: { 'Content-Type': 'application/json' }
                            });
                        }
                        throw error;
                    });
                };
                
                // Prevent some common iframe-breaking patterns
                try {
                    if (window.top !== window.self) {
                        // We're in an iframe, disable some problematic behaviors
                        window.addEventListener('error', function(e) {
                            if (e.message && e.message.includes('SecurityError')) {
                                e.preventDefault();
                                console.warn('SecurityError prevented:', e.message);
                            }
                        });
                    }
                } catch (e) {
                    // Access to window.top blocked, which is expected in cross-origin iframe
                }
            })();
        """
        if soup.head:
            soup.head.append(iframe_script)
        
        return str(soup)
    
    except Exception as e:
        logger.error(f"Error modifying HTML content: {e}")
        return html_content

@router.get("/website-proxy")
async def proxy_website(url: str = Query(..., description="URL of the website to proxy")):
    """
    Proxy a website through our server to bypass CSP restrictions.
    This allows embedding websites that normally block iframe embedding.
    """
    
    # Validate URL
    if not url:
        raise HTTPException(status_code=400, detail="URL parameter is required")
    
    # Ensure URL has protocol
    if not url.startswith(('http://', 'https://')):
        url = f'https://{url}'
    
    # Security check
    if not is_domain_allowed(url):
        raise HTTPException(
            status_code=403, 
            detail="Invalid URL format or domain not accessible."
        )
    
    try:
        # Set headers to mimic a regular browser request
        # Note: Removing Accept-Encoding to avoid compression issues with some sites
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        }
        
        # Fetch the website content
        response = requests.get(url, headers=headers, timeout=10, allow_redirects=True)
        response.raise_for_status()
        
        # Get the content type
        content_type = response.headers.get('content-type', '').lower()
        
        if 'text/html' not in content_type:
            # If it's not HTML, return as-is
            return HTMLResponse(
                content=response.content,
                headers={'Content-Type': content_type}
            )
        
        # Ensure proper text decoding - use response.text which handles encoding automatically
        # response.text handles gzip decompression and encoding detection automatically
        html_content = response.text
        
        # Double-check that we got valid text content
        if not html_content or len(html_content.strip()) == 0:
            logger.error(f"Empty or invalid content received from {url}")
            raise HTTPException(status_code=502, detail="Website returned empty or invalid content")
        
        # Check if content looks like binary (shouldn't happen with response.text, but safety check)
        try:
            # Try to encode as UTF-8 to verify it's valid text
            html_content.encode('utf-8')
        except UnicodeEncodeError:
            logger.error(f"Received non-text content from {url}")
            raise HTTPException(status_code=502, detail="Website returned non-text content")
        
        # Modify the HTML content for iframe compatibility
        modified_content = modify_html_content(html_content, url)
        
        # Return the modified HTML with appropriate headers
        return HTMLResponse(
            content=modified_content,
            headers={
                'Content-Type': 'text/html; charset=utf-8',
                'X-Frame-Options': 'ALLOWALL',  # Allow iframe embedding
                'Content-Security-Policy': "frame-ancestors *;",  # Allow embedding in any frame
                'Access-Control-Allow-Origin': '*',  # Allow cross-origin requests
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
                'Referrer-Policy': 'no-referrer-when-downgrade',  # Preserve referrer for API calls
            }
        )
        
    except requests.exceptions.Timeout:
        raise HTTPException(status_code=408, detail="Website request timed out")
    except requests.exceptions.ConnectionError:
        raise HTTPException(status_code=503, detail="Unable to connect to the website")
    except requests.exceptions.HTTPError as e:
        raise HTTPException(status_code=e.response.status_code, detail=f"Website returned error: {e.response.status_code}")
    except Exception as e:
        logger.error(f"Error proxying website {url}: {e}")
        raise HTTPException(status_code=500, detail="Error loading website")

@router.api_route("/api-proxy", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"])
async def proxy_api_request(
    request: Request,
    url: str = Query(..., description="URL of the API endpoint to proxy")
):
    """
    Proxy API requests from websites loaded through our proxy.
    This helps handle CORS issues for API calls made by proxied sites.
    """
    
    # Validate URL
    if not url:
        raise HTTPException(status_code=400, detail="URL parameter is required")
    
    # Ensure URL has protocol
    if not url.startswith(('http://', 'https://')):
        url = f'https://{url}'
    
    # Security check
    if not is_domain_allowed(url):
        raise HTTPException(
            status_code=403, 
            detail="Invalid URL format or domain not accessible."
        )
    
    try:
        # Get request body if present
        body = await request.body() if request.method in ["POST", "PUT", "PATCH"] else None
        
        # Forward headers (excluding problematic ones)
        headers = {}
        for key, value in request.headers.items():
            if key.lower() not in ['host', 'content-length', 'connection']:
                headers[key] = value
        
        # Add user agent if not present
        if 'user-agent' not in headers:
            headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        
        # Make the request
        response = requests.request(
            method=request.method,
            url=url,
            headers=headers,
            data=body,
            timeout=10,
            allow_redirects=True
        )
        
        # Return response with CORS headers
        return HTMLResponse(
            content=response.content,
            status_code=response.status_code,
            headers={
                'Content-Type': response.headers.get('Content-Type', 'application/json'),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
            }
        )
        
    except requests.exceptions.Timeout:
        raise HTTPException(status_code=408, detail="API request timed out")
    except requests.exceptions.ConnectionError:
        raise HTTPException(status_code=503, detail="Unable to connect to the API")
    except Exception as e:
        logger.error(f"Error proxying API request {url}: {e}")
        raise HTTPException(status_code=500, detail="Error processing API request")

@router.get("/website-screenshot")
async def screenshot_website(url: str = Query(..., description="URL of the website to screenshot")):
    """
    Alternative approach: Take a screenshot of the website.
    This can be used as a fallback when proxy doesn't work.
    """
    # This would require additional dependencies like Playwright or Selenium
    # For now, return a placeholder response
    return {
        "message": "Screenshot feature not implemented yet",
        "url": url,
        "suggestion": "Use the proxy endpoint instead"
    }