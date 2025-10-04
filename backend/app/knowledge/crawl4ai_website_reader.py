"""
ChatterMate - Crawl4AI Website Reader
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
import re
import time
import threading
from datetime import datetime
from dataclasses import dataclass, field
from typing import Dict, List, Set, Tuple, Optional, Callable
from urllib.parse import urljoin, urlparse
from concurrent.futures import ThreadPoolExecutor, as_completed

from crawl4ai import AsyncWebCrawler
from crawl4ai.async_configs import BrowserConfig, CrawlerRunConfig, CacheMode
from crawl4ai.markdown_generation_strategy import DefaultMarkdownGenerator

from agno.document.base import Document
from agno.document.reader.website_reader import WebsiteReader
from app.core.logger import get_logger

# Initialize logger for this module
logger = get_logger(__name__)


@dataclass
class Crawl4AIWebsiteReader(WebsiteReader):
    """Enhanced Reader for Websites using Crawl4AI with robust content extraction"""
    debug_on = False
    
    # Configuration options
    min_content_length: int = 100  # Minimum length of text to be considered meaningful content
    timeout: int = 30  # Request timeout in seconds
    max_retries: int = 3  # Maximum number of retries for failed requests
    max_workers: int = 10  # Maximum number of parallel workers for crawling
    
    # Browser and crawler configs for crawl4ai
    _browser_config: Optional[BrowserConfig] = None
    _crawler_config: Optional[CrawlerRunConfig] = None
    
    # Track crawling statistics
    _crawled_pages_count: int = 0
    _successful_crawls: int = 0
    _failed_crawls: int = 0
    
    def __post_init__(self):
        """Initialize crawl4ai configurations after dataclass initialization"""
        # Initialize browser configuration
        self._browser_config = BrowserConfig(
            verbose=False,  # Disable verbose logging to reduce noise
            headless=True,
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        )
        
        # Initialize crawler configuration with optimized settings
        self._crawler_config = CrawlerRunConfig(
            # Content filtering - use reasonable threshold
            word_count_threshold=10,
            exclude_external_links=False,
            
            # Content processing
            process_iframes=True,  # Always parse iframes for complete content
            remove_overlay_elements=True,
            
            # Markdown generation strategy
            markdown_generator=DefaultMarkdownGenerator(),
            
            # Page loading strategy
            wait_until="domcontentloaded",
            page_timeout=15000,  # 15 seconds
            
            # Cache control
            cache_mode=CacheMode.BYPASS
        )
    
    def _get_primary_domain(self, url: str) -> str:
        """
        Extract primary domain from the given URL.
        Overrides the parent method to handle domains more effectively.

        :param url: The URL to extract the primary domain from.
        :return: The primary domain.
        """
        # Parse the URL to get the netloc
        parsed_url = urlparse(url)
        netloc = parsed_url.netloc
        
        # Strip 'www.' prefix if present
        if netloc.startswith('www.'):
            netloc = netloc[4:]
        
        # Get the relevant domain part (last two components for common domains)
        parts = netloc.split('.')
        
        # Special case for country code TLDs with subdomains (e.g., co.uk, com.au)
        if len(parts) > 2 and parts[-2] in ['co', 'com', 'org', 'net', 'edu', 'gov', 'ac'] and len(parts[-1]) == 2:
            domain = '.'.join(parts[-3:])  # Include subdomains like example.co.uk
        else:
            domain = '.'.join(parts[-2:] if len(parts) > 1 else parts)  # domain.com or just domain
        
        return domain
    
    def _extract_links_from_result(self, result, base_url: str) -> List[str]:
        """
        Extract links from crawl4ai result.
        
        :param result: The CrawlResult from crawl4ai
        :param base_url: The base URL to resolve relative URLs.
        :return: A list of absolute URLs.
        """
        links = []
        primary_domain = self._get_primary_domain(base_url)
        
        # Extract internal links from the result
        if hasattr(result, 'links') and result.links:
            internal_links = result.links.get('internal', [])
            for link_info in internal_links:
                # link_info is a dict with 'href' and other properties
                if isinstance(link_info, dict):
                    full_url = link_info.get('href', '')
                else:
                    full_url = str(link_info)
                
                if not full_url:
                    continue
                    
                # Make URL absolute if needed
                if not full_url.startswith('http'):
                    full_url = urljoin(base_url, full_url)
                
                # Filter out unwanted URLs
                parsed_url = urlparse(full_url)
                
                # Ignore self-links
                if full_url == base_url:
                    continue
                    
                # Check if it's in the same domain
                link_domain = parsed_url.netloc
                is_same_domain = link_domain.endswith(primary_domain)
                
                if (
                    is_same_domain
                    and not any(parsed_url.path.endswith(ext) for ext in [
                        ".pdf", ".jpg", ".png", ".gif", ".zip", ".mp3", ".mp4", ".exe", ".dll"
                    ])
                    and not parsed_url.path.startswith("#")  # Skip anchors
                    and "?" not in full_url  # Skip query parameters for simplicity
                ):
                    links.append(full_url)
        
        return links
    
    async def _crawl_url_async(self, url: str, depth: int) -> Optional[Tuple[str, str, List[str]]]:
        """
        Crawl a single URL using crawl4ai asynchronously.
        
        :param url: The URL to crawl
        :param depth: Current depth level
        :return: Tuple of (URL, content, new_links) or None if failed
        """
        # Increment crawled pages counter
        self._crawled_pages_count += 1
        logger.info(f"Crawling page {self._crawled_pages_count}: {url} (depth: {depth})")
        
        content = None
        new_links = []
        retry_count = 0
        
        while retry_count < self.max_retries and content is None:
            try:
                async with AsyncWebCrawler(config=self._browser_config) as crawler:
                    # Add timeout to the crawl operation
                    try:
                        result = await asyncio.wait_for(
                            crawler.arun(url=url, config=self._crawler_config),
                            timeout=15  # Fixed 15-second timeout
                        )
                        
                    except asyncio.TimeoutError:
                        logger.warning(f"Timeout after 15s crawling {url}")
                        retry_count += 1
                        if retry_count < self.max_retries:
                            await asyncio.sleep(min(2 ** retry_count, 3))  # Cap backoff at 3 seconds
                        continue
                    
                    if not result.success:
                        logger.warning(f"Failed to crawl {url}: {result.error_message}")
                        retry_count += 1
                        if retry_count < self.max_retries:
                            await asyncio.sleep(2 ** retry_count)
                        continue
                    
                    # Extract content with fallback strategy
                    content = self._extract_content_from_result(result, url)
                    
                    # Check content quality
                    if not content or len(content.strip()) < self.min_content_length:
                        logger.warning(f"Content too short for {url}: {len(content.strip()) if content else 0} chars")
                        self._failed_crawls += 1
                        return None
                    
                    self._successful_crawls += 1
                    logger.info(f"✓ Successfully extracted {len(content.strip())} chars from {url}")
                    
                    # Extract new links if not at max depth
                    if depth < self.max_depth:
                        links = self._extract_links_from_result(result, url)
                        next_depth = depth + 1
                        new_links = [(link, next_depth) for link in links]
                    
            except Exception as e:
                retry_count += 1
                logger.error(f"Error crawling {url} (attempt {retry_count}/{self.max_retries}): {type(e).__name__}: {str(e)}")
                if retry_count < self.max_retries:
                    await asyncio.sleep(2 ** retry_count)
        
        # Log failure if all retries failed
        if content is None:
            self._failed_crawls += 1
            logger.error(f"Failed to crawl {url} after {self.max_retries} attempts")
            return None
        
        return (url, content, new_links)
    
    def _extract_content_from_result(self, result, url: str) -> Optional[str]:
        """
        Extract content from crawl4ai result with fallback strategies.
        
        :param result: The CrawlResult from crawl4ai
        :param url: The URL being processed
        :return: Extracted content or None
        """
        content = None
        
        # Strategy 1: Try direct markdown access
        if hasattr(result, 'markdown') and result.markdown:
            if isinstance(result.markdown, str):
                content = result.markdown
            elif hasattr(result.markdown, 'fit_markdown') and result.markdown.fit_markdown:
                content = result.markdown.fit_markdown
            elif hasattr(result.markdown, 'raw_markdown') and result.markdown.raw_markdown:
                content = result.markdown.raw_markdown
        
        # Strategy 2: Fallback to cleaned_html if markdown is empty
        if (not content or len(content.strip()) < self.min_content_length) and hasattr(result, 'cleaned_html') and result.cleaned_html:
            content = result.cleaned_html
        
        # Strategy 3: Last resort - use raw HTML
        if (not content or len(content.strip()) < self.min_content_length) and hasattr(result, 'html') and result.html:
            content = result.html
        
        return content
    
    def _process_url(self, url_info: Tuple[str, int], primary_domain: str) -> Optional[Tuple[str, str, List[str]]]:
        """
        Process a single URL - fetch content and extract links.
        This is used for parallel processing of URLs (wrapper around async method).
        
        :param url_info: Tuple of (URL, depth)
        :param primary_domain: Primary domain to filter links
        :return: Tuple of (URL, content, new_links) or None if failed
        """
        current_url, current_depth = url_info
        
        # Skip if URL meets any skip conditions
        if current_url in self._visited:
            return None
            
        if not urlparse(current_url).netloc.endswith(primary_domain):
            return None
            
        if current_depth > self.max_depth:
            return None
        
        # Mark as visited before processing
        self._visited.add(current_url)
        
        self.delay()
        
        # Run the async crawl in a new event loop
        try:
            # Check if there's already an event loop running
            try:
                loop = asyncio.get_running_loop()
                # If there's already a loop, we need to run in a new thread
                import concurrent.futures
                with concurrent.futures.ThreadPoolExecutor(max_workers=1) as executor:
                    future = executor.submit(self._run_async_in_new_loop, current_url, current_depth)
                    result = future.result(timeout=20)  # Reduced timeout
                    return result
            except RuntimeError:
                # No event loop running, create one
                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)
                try:
                    result = loop.run_until_complete(self._crawl_url_async(current_url, current_depth))
                    return result
                finally:
                    loop.close()
                    asyncio.set_event_loop(None)
                    
        except Exception as e:
            logger.error(f"Error in _process_url for {current_url}: {type(e).__name__}: {str(e)}")
            self._failed_crawls += 1
            return None
    
    def _run_async_in_new_loop(self, url: str, depth: int) -> Optional[Tuple[str, str, List[str]]]:
        """Run async crawl in a completely new event loop"""
        try:
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            try:
                result = loop.run_until_complete(self._crawl_url_async(url, depth))
                return result
            finally:
                loop.close()
                asyncio.set_event_loop(None)
        except Exception as e:
            logger.error(f"Error in _run_async_in_new_loop for {url}: {type(e).__name__}: {str(e)}")
            return None
    
    def crawl(self, url: str, starting_depth: int = 1, on_document_callback: Optional[Callable[[str, str], None]] = None, on_url_crawled_callback: Optional[Callable[[str], None]] = None) -> Dict[str, str]:
        """
        Enhanced crawl method with parallel processing and immediate vector DB insertion.
        
        :param url: The URL to crawl.
        :param starting_depth: The starting depth level for the crawl.
        :param on_document_callback: Callback function that receives (url, content) for immediate processing
        :param on_url_crawled_callback: Callback function that receives (url) when a page is successfully crawled
        :return: Dictionary of URLs and their corresponding content.
        """
        # Reset visited and urls_to_crawl for fresh crawl
        self._visited = set()
        self._urls_to_crawl = []
        
        # Reset crawling statistics
        self._crawled_pages_count = 0
        self._successful_crawls = 0
        self._failed_crawls = 0
        
        crawl_start_time = time.time()
        logger.info(f"Starting parallel crawl of {url} with max_depth={self.max_depth}, max_links={self.max_links}, max_workers={self.max_workers}")
        
        crawler_result: Dict[str, str] = {}
        primary_domain = self._get_primary_domain(url)
        
        # Add starting URL with its depth to the queue
        urls_to_process = [(url, starting_depth)]
        
        # Use ThreadPoolExecutor for parallel processing
        with ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            # Process URLs in batches until no more URLs or max_links reached
            while urls_to_process and len(crawler_result) < self.max_links:
                # Take a batch of URLs to process
                batch_size = min(self.max_workers, len(urls_to_process))
                current_batch = urls_to_process[:batch_size]
                urls_to_process = urls_to_process[batch_size:]
                
                # Submit all URLs in the current batch for parallel processing
                future_to_url = {
                    executor.submit(self._process_url, url_info, primary_domain): url_info[0]
                    for url_info in current_batch
                }
                
                # Process completed futures as they finish
                for future in as_completed(future_to_url):
                    url_processed = future_to_url[future]
                    try:
                        result = future.result()
                        if result:
                            processed_url, content, new_links = result
                            
                            # Add the content to our results
                            crawler_result[processed_url] = content
                            
                            # Call the URL crawled callback first (for progress tracking)
                            if on_url_crawled_callback:
                                on_url_crawled_callback(processed_url)
                            
                            # Call the callback for immediate processing if provided
                            if on_document_callback:
                                on_document_callback(processed_url, content)
                            
                            # Add new links to the processing queue
                            for new_link, depth in new_links:
                                if new_link not in self._visited and (new_link, depth) not in urls_to_process:
                                    urls_to_process.append((new_link, depth))
                            
                            # If we've reached max_links, break early
                            if len(crawler_result) >= self.max_links:
                                logger.info(f"Reached maximum number of links ({self.max_links}), stopping crawling")
                                break
                                
                    except Exception as exc:
                        logger.error(f"URL {url_processed} generated an exception: {exc}")
                        self._failed_crawls += 1

        # Log crawling summary
        crawl_end_time = time.time()
        crawl_duration = crawl_end_time - crawl_start_time
        logger.info(f"Parallel crawl completed: {len(crawler_result)} pages crawled successfully")
        logger.info(f"Crawling statistics: Total: {self._crawled_pages_count}, Successful: {self._successful_crawls}, Failed: {self._failed_crawls}")
        logger.info(f"Total crawling time: {crawl_duration:.2f}s")
        
        return crawler_result

    def _create_document_from_content(self, page_url: str, content: str, source_url: str, index: int) -> Document:
        """
        Create a Document object from page content with proper metadata.
        
        :param page_url: The URL of the page
        :param content: The page content
        :param source_url: Original source URL 
        :param index: The document index
        :return: Document object
        """
        # Extract page identifier without protocol and domain for ID
        parsed_url = urlparse(page_url)
        path = parsed_url.path
        
        # Handle fragment identifiers (#section)
        fragment = parsed_url.fragment
        if fragment:
            path = f"{path}#{fragment}"
        
        # Clean up path for ID generation
        if not path or path == "/":
            path = "index"
        else:
            # Remove leading/trailing slashes and replace special chars
            path = path.strip("/")
            path = re.sub(r'[^\w\-]', '_', path)
        
        # Create metadata with relevant information
        metadata = {
            "url": page_url,
            "chunk": index,
            "chunk_size": len(content)
        }
        
        # Create document with content and metadata
        document = Document(
            content=content,
            meta_data=metadata
        )
        
        # Set document ID and name
        document.id = page_url
        # Set name to full page URL for matching with knowledge_queue
        document.name = source_url
        
        return document

    def read(self, url: str, vector_db_callback: Optional[Callable[[Document], None]] = None, url_crawled_callback: Optional[Callable[[str], None]] = None) -> List[Document]:
        """
        Read content from a URL, crawl related pages, and convert the content into Documents.
        Optionally sends documents to vector DB as they are created.
        
        :param url: The URL to read from.
        :param vector_db_callback: Optional callback to send documents to vector DB as they're created
        :param url_crawled_callback: Optional callback called when each URL is successfully crawled
        :return: A list of Document objects.
        """
        # Get timestamp for tracking
        start_time = time.time()
        logger.info(f"Starting to read from {url} with parallel processing using Crawl4AI")
        
        documents = []
        
        # Create a callback for immediate document processing with content validation
        def on_document_created(page_url: str, content: str):
            # Validate content before creating document
            if not content or len(content.strip()) < self.min_content_length:
                logger.warning(f"Skipping document creation for {page_url}: content too short ({len(content.strip()) if content else 0} chars)")
                return
            
            # Additional content validation to prevent empty embedding errors
            stripped_content = content.strip()
            if not stripped_content or stripped_content.isspace():
                logger.warning(f"Skipping document creation for {page_url}: content is empty or whitespace only")
                return
            
            index = len(documents) + 1
            document = self._create_document_from_content(page_url, stripped_content, url, index)
            documents.append(document)
            
            # Call vector DB callback if provided
            if vector_db_callback:
                try:
                    vector_db_callback(document)
                    logger.info(f"✓ Document {document.id} successfully sent to vector DB")
                except Exception as e:
                    logger.error(f"Error sending document {document.id} to vector DB: {str(e)}")
        
        # Crawl website with the callback for immediate document processing
        self.crawl(url, on_document_callback=on_document_created, on_url_crawled_callback=url_crawled_callback)
        
        end_time = time.time()
        duration = end_time - start_time
        logger.info(f"Completed reading from {url} - Created {len(documents)} documents using Crawl4AI (Total time: {duration:.2f}s)")
        
        return documents

