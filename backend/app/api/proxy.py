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
from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import HTMLResponse
from bs4 import BeautifulSoup
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

# Security: Only allow certain domains for demo purposes
ALLOWED_DOMAINS = [
    'example.com',
    'html5test.opensuse.org',
    'www.w3schools.com',
    'developer.mozilla.org',
    'httpbin.org',
    'jsonplaceholder.typicode.com',
    'paywithatoa.co.uk',  # Add the specific domain we're testing
    'www.paywithatoa.co.uk'
]

def is_domain_allowed(url: str) -> bool:
    """Check if the domain is in our allowed list"""
    try:
        parsed = urlparse(url)
        domain = parsed.netloc.lower()
        
        # Remove www. for comparison
        domain_without_www = domain.replace('www.', '')
        
        return (domain in ALLOWED_DOMAINS or 
                domain_without_www in ALLOWED_DOMAINS or
                any(allowed in domain for allowed in ALLOWED_DOMAINS))
    except Exception:
        return False

def modify_html_content(html_content: str, original_url: str, proxy_base_url: str) -> str:
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
            if any(keyword in script_content.lower() for keyword in ['framebuster', 'top.location', 'parent.location', 'window.top']):
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
            detail="Domain not allowed for security reasons. This is a demo feature."
        )
    
    try:
        # Set headers to mimic a regular browser request
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
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
        
        # Modify the HTML content for iframe compatibility
        proxy_base_url = "http://localhost:8000/api/proxy"  # Adjust based on your setup
        modified_content = modify_html_content(response.text, url, proxy_base_url)
        
        # Return the modified HTML with appropriate headers
        return HTMLResponse(
            content=modified_content,
            headers={
                'Content-Type': 'text/html; charset=utf-8',
                'X-Frame-Options': 'ALLOWALL',  # Allow iframe embedding
                'Content-Security-Policy': "frame-ancestors *;",  # Allow embedding in any frame
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