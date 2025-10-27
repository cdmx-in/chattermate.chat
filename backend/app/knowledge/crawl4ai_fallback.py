"""
ChatterMate - Crawl4AI Fallback for JavaScript-Heavy Websites
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

import asyncio
from typing import Optional, Tuple
from bs4 import BeautifulSoup
from app.core.logger import get_logger

logger = get_logger(__name__)

# Try to import crawl4ai
try:
    from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode
    CRAWL4AI_AVAILABLE = True
    logger.info("✓ Crawl4AI module loaded successfully")
except ImportError:
    CRAWL4AI_AVAILABLE = False
    logger.warning("⚠️  Crawl4AI not installed. Install with: pip install crawl4ai>=0.7.0")

# Try to import nest_asyncio for event loop compatibility
try:
    import nest_asyncio
    NEST_ASYNCIO_AVAILABLE = True
except ImportError:
    NEST_ASYNCIO_AVAILABLE = False
    logger.debug("nest_asyncio not available (optional)")


class Crawl4AIFallback:
    """
    Fallback crawler using Crawl4AI with browser rendering for JavaScript-heavy websites.
    This provides an alternative when standard HTTP requests fail to extract content.
    """
    
    def __init__(self, timeout: int = 30, verify_ssl: bool = True):
        """
        Initialize the Crawl4AI fallback crawler.
        
        :param timeout: Request timeout in seconds
        :param verify_ssl: Whether to verify SSL certificates
        """
        self.timeout = timeout
        self.verify_ssl = verify_ssl
        self._is_available = CRAWL4AI_AVAILABLE
    
    @property
    def is_available(self) -> bool:
        """Check if Crawl4AI is available."""
        return self._is_available
    
    async def _async_fetch(self, url: str) -> Tuple[Optional[str], Optional[str]]:
        """
        Async method to fetch content using Crawl4AI.
        
        :param url: The URL to fetch
        :return: Tuple of (html, markdown) or (None, None) if failed
        """
        try:
            browser_config = BrowserConfig(
                headless=True,
                java_script_enabled=True,
                text_mode=False,  # Get full HTML
                verbose=False,
                ignore_https_errors=not self.verify_ssl
            )
            
            crawler_config = CrawlerRunConfig(
                cache_mode=CacheMode.BYPASS,
                wait_until="networkidle",  # Wait for network to be idle
                page_timeout=self.timeout * 1000,  # Convert to milliseconds
                delay_before_return_html=2.0,  # Wait 2 seconds for JS to render
            )
            
            logger.info(f"🌐 Starting Crawl4AI browser session for {url}")
            
            async with AsyncWebCrawler(config=browser_config) as crawler:
                result = await crawler.arun(url=url, config=crawler_config)
                
                if result.success:
                    html_length = len(result.html) if result.html else 0
                    markdown_length = len(result.markdown.raw_markdown) if result.markdown and result.markdown.raw_markdown else 0
                    
                    logger.info(f"✓ Crawl4AI fetch successful - HTML: {html_length} chars, Markdown: {markdown_length} chars")
                    
                    return result.html, result.markdown.raw_markdown if result.markdown else None
                else:
                    logger.error(f"❌ Crawl4AI failed: {result.error_message}")
                    return None, None
                    
        except Exception as e:
            logger.error(f"❌ Crawl4AI async fetch error: {str(e)}", exc_info=True)
            return None, None
    
    def fetch_with_browser(self, url: str) -> Tuple[Optional[str], Optional[BeautifulSoup]]:
        """
        Fetch content using Crawl4AI with browser rendering.
        This method handles async execution in a thread-safe manner.
        
        :param url: The URL to fetch
        :return: Tuple of (content, soup) where content is the extracted text
        """
        if not self._is_available:
            logger.error(f"❌ Crawl4AI not available. Cannot fetch {url}")
            return None, None
        
        try:
            logger.info(f"🔄 Using Crawl4AI fallback for JavaScript-heavy page: {url}")
            
            # Handle async execution in thread-safe way
            html, markdown = self._run_async_safely(url)
            
            if not html and not markdown:
                logger.warning(f"⚠️  Crawl4AI returned no content for {url}")
                return None, None
            
            # Parse HTML with BeautifulSoup if available
            soup = None
            if html:
                soup = BeautifulSoup(html, 'html.parser')
                logger.debug(f"Parsed HTML into BeautifulSoup object ({len(html)} chars)")
            
            # Prefer markdown if available and substantial
            if markdown and len(markdown.strip()) > 100:
                logger.info(f"✓ Using Crawl4AI markdown output ({len(markdown)} chars)")
                return markdown.strip(), soup
            
            # Otherwise return None for content (will trigger extraction from soup)
            return None, soup
            
        except Exception as e:
            logger.error(f"❌ Crawl4AI fetch error for {url}: {str(e)}", exc_info=True)
            return None, None
    
    def _run_async_safely(self, url: str) -> Tuple[Optional[str], Optional[str]]:
        """
        Run async crawl in a thread-safe manner, handling various event loop scenarios.
        
        :param url: The URL to fetch
        :return: Tuple of (html, markdown)
        """
        try:
            # Try to get the current event loop
            loop = asyncio.get_event_loop()
            
            if loop.is_running():
                # Event loop is already running (e.g., in FastAPI context)
                if NEST_ASYNCIO_AVAILABLE:
                    logger.debug("Event loop running, using nest_asyncio")
                    nest_asyncio.apply()
                    return loop.run_until_complete(self._async_fetch(url))
                else:
                    # Create a new event loop in a separate thread
                    logger.debug("Event loop running, creating new loop in thread")
                    import concurrent.futures
                    with concurrent.futures.ThreadPoolExecutor(max_workers=1) as executor:
                        future = executor.submit(asyncio.run, self._async_fetch(url))
                        return future.result(timeout=self.timeout + 10)
            else:
                # Event loop exists but not running
                logger.debug("Event loop exists but not running")
                return loop.run_until_complete(self._async_fetch(url))
                
        except RuntimeError as e:
            # No event loop exists, create a new one
            logger.debug(f"No event loop, creating new one: {str(e)}")
            return asyncio.run(self._async_fetch(url))
        except Exception as e:
            logger.error(f"❌ Error running async fetch: {str(e)}", exc_info=True)
            return None, None


# Singleton instance for convenience
_crawl4ai_fallback_instance = None

def get_crawl4ai_fallback(timeout: int = 30, verify_ssl: bool = True) -> Crawl4AIFallback:
    """
    Get or create a Crawl4AI fallback instance (singleton pattern).
    
    :param timeout: Request timeout in seconds
    :param verify_ssl: Whether to verify SSL certificates
    :return: Crawl4AIFallback instance
    """
    global _crawl4ai_fallback_instance
    
    if _crawl4ai_fallback_instance is None:
        _crawl4ai_fallback_instance = Crawl4AIFallback(timeout=timeout, verify_ssl=verify_ssl)
    
    return _crawl4ai_fallback_instance

