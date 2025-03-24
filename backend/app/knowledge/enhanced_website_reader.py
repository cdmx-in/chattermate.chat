"""
ChatterMate - Enhanced Website Reader
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

import random
import re
import time
from dataclasses import dataclass, field
from typing import Dict, List, Set, Tuple, Optional
from urllib.parse import urljoin, urlparse

from bs4 import BeautifulSoup, Tag
import httpx

from agno.document.base import Document
from agno.document.reader.website_reader import WebsiteReader
from agno.utils.log import log_debug, logger


@dataclass
class EnhancedWebsiteReader(WebsiteReader):
    """Enhanced Reader for Websites with more robust content extraction"""

    # Additional configuration options
    min_content_length: int = 100  # Minimum length of text to be considered meaningful content
    blacklist_tags: List[str] = field(default_factory=lambda: [
        'script', 'style', 'nav', 'footer', 'header', 'aside', 'noscript', 'iframe', 'head'
    ])
    common_content_tags: List[str] = field(default_factory=lambda: [
        'article', 'main', 'section', 'div', 'p', 'content', 'body'
    ])
    common_content_classes: List[str] = field(default_factory=lambda: [
        'content', 'main-content', 'post-content', 'article-content', 'entry-content', 'page-content',
        'blog-content', 'main', 'article', 'post', 'entry', 'text', 'body', 'container'
    ])
    common_content_ids: List[str] = field(default_factory=lambda: [
        'content', 'main-content', 'post-content', 'article-content', 'entry-content', 'page-content',
        'blog-content', 'main', 'article', 'post', 'entry', 'text', 'body', 'container'
    ])
    user_agent: str = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
    headers: Dict[str, str] = field(default_factory=lambda: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'max-age=0'
    })
    timeout: int = 30  # Request timeout in seconds
    max_retries: int = 3  # Maximum number of retries for failed requests
    respect_robots_txt: bool = True  # Whether to respect robots.txt
    
    def _extract_main_content(self, soup: BeautifulSoup) -> str:
        """
        Extracts the main content from a BeautifulSoup object using multiple strategies.
        
        Strategies:
        1. Look for main content containers (article, main, etc.)
        2. Look for content by class names
        3. Look for content by ID
        4. Density-based content extraction (paragraph density)
        5. Fallback to cleaned body content
        
        :param soup: The BeautifulSoup object to extract the main content from.
        :return: The main content as a string.
        """
        # Remove undesirable elements first
        self._clean_soup(soup)
        
        # Strategy 1: Try to find main content by common content tags
        for tag in self.common_content_tags:
            elements = soup.find_all(tag)
            for element in elements:
                content = self._get_clean_text(element)
                if len(content) >= self.min_content_length:
                    return content
                    
        # Strategy 2: Try to find main content by common class names
        for class_name in self.common_content_classes:
            elements = soup.find_all(class_=re.compile(class_name, re.IGNORECASE))
            for element in elements:
                content = self._get_clean_text(element)
                if len(content) >= self.min_content_length:
                    return content
        
        # Strategy 3: Try to find main content by common IDs
        for id_name in self.common_content_ids:
            element = soup.find(id=re.compile(id_name, re.IGNORECASE))
            if element:
                content = self._get_clean_text(element)
                if len(content) >= self.min_content_length:
                    return content
        
        # Strategy 4: Density-based content extraction
        density_content = self._extract_by_text_density(soup)
        if density_content and len(density_content) >= self.min_content_length:
            return density_content
            
        # Strategy 5: Fallback to entire body content with minimal cleaning
        body = soup.find('body')
        if body:
            return self._get_clean_text(body)
            
        # Last resort: just get all text from the document
        return soup.get_text(strip=True, separator=" ")
        
    def _clean_soup(self, soup: BeautifulSoup) -> None:
        """
        Removes undesirable elements from the soup.
        
        :param soup: The BeautifulSoup object to clean.
        """
        # Remove comments
        for comment in soup.find_all(string=lambda text: isinstance(text, str) and text.strip().startswith('<!--')):
            comment.extract()
            
        # Remove blacklisted tags
        for tag in self.blacklist_tags:
            for element in soup.find_all(tag):
                element.extract()
                
        # Remove hidden elements with style attribute
        for element in soup.find_all(style=re.compile(r'display:\s*none|visibility:\s*hidden')):
            element.extract()
            
        # Remove elements with hidden class
        for element in soup.find_all(class_='hidden'):
            element.extract()
            
        # Remove elements with certain classes
        for class_name in ['ads', 'advertisement', 'banner', 'cookie', 'popup', 'modal', 'sidebar']:
            for element in soup.find_all(class_=re.compile(class_name, re.IGNORECASE)):
                element.extract()

    def _get_clean_text(self, element: Tag) -> str:
        """
        Gets clean text from a BeautifulSoup element.
        
        :param element: The BeautifulSoup element to get text from.
        :return: The clean text.
        """
        if not element:
            return ""
            
        # Get text with preserved whitespace
        text = element.get_text(separator=" ", strip=True)
        
        # Normalize whitespace
        text = re.sub(r'\s+', ' ', text)
        
        # Remove excessive newlines
        text = re.sub(r'\n{2,}', '\n', text)
        
        return text.strip()
        
    def _extract_by_text_density(self, soup: BeautifulSoup) -> str:
        """
        Extracts content based on text density (paragraphs with substantial text).
        
        :param soup: The BeautifulSoup object to extract content from.
        :return: The extracted content.
        """
        paragraphs = soup.find_all('p')
        if not paragraphs:
            return ""
            
        # Find paragraphs with substantial text
        good_paragraphs = []
        for p in paragraphs:
            text = p.get_text(strip=True)
            # Consider paragraphs with more than 20 characters
            if len(text) > 20:
                good_paragraphs.append(p)
                
        if not good_paragraphs:
            return ""
            
        # Find the most common parent that contains a good number of paragraphs
        parent_counts = {}
        for p in good_paragraphs:
            for parent in p.parents:
                if parent.name not in ['html', 'body']:
                    parent_counts[parent] = parent_counts.get(parent, 0) + 1
                    
        # Get the parent with the most children
        if parent_counts:
            best_parent = max(parent_counts.items(), key=lambda x: x[1])[0]
            return self._get_clean_text(best_parent)
            
        # If no good parent found, just concatenate the good paragraphs
        return " ".join([self._get_clean_text(p) for p in good_paragraphs])

    def crawl(self, url: str, starting_depth: int = 1) -> Dict[str, str]:
        """
        Enhanced crawl method with better error handling and content extraction.
        
        :param url: The URL to crawl.
        :param starting_depth: The starting depth level for the crawl.
        :return: Dictionary of URLs and their corresponding content.
        """
        # Reset visited and urls_to_crawl for fresh crawl
        self._visited = set()
        self._urls_to_crawl = []
        
        num_links = 0
        crawler_result: Dict[str, str] = {}
        primary_domain = self._get_primary_domain(url)
        
        # Add starting URL with its depth to the global list
        self._urls_to_crawl.append((url, starting_depth))
        
        while self._urls_to_crawl:
            # Unpack URL and depth from the global list
            current_url, current_depth = self._urls_to_crawl.pop(0)

            # Skip if URL meets any skip conditions
            if (
                current_url in self._visited
                or not urlparse(current_url).netloc.endswith(primary_domain)
                or current_depth > self.max_depth
                or num_links >= self.max_links
            ):
                continue

            self._visited.add(current_url)
            self.delay()

            # Try to get content from URL with retries
            content = None
            retry_count = 0
            last_error = None
            
            while retry_count < self.max_retries and content is None:
                try:
                    log_debug(f"Crawling: {current_url}")
                    
                    # Use httpx with configured headers for better compatibility
                    response = httpx.get(
                        current_url, 
                        headers=self.headers,
                        timeout=self.timeout,
                        follow_redirects=True
                    )
                    
                    response.raise_for_status()
                    
                    # Parse content with BeautifulSoup
                    soup = BeautifulSoup(response.content, "html.parser")
                    
                    # Extract main content
                    main_content = self._extract_main_content(soup)
                    
                    if main_content:
                        crawler_result[current_url] = main_content
                        num_links += 1
                        content = main_content  # Set content to exit retry loop
                    
                    # Extract and add links to crawl
                    for link in soup.find_all("a", href=True):
                        if not isinstance(link, Tag):
                            continue
                        
                        href_str = str(link["href"])
                        full_url = urljoin(current_url, href_str)
                        
                        if not isinstance(full_url, str):
                            continue
                            
                        # Filter out unwanted URLs
                        parsed_url = urlparse(full_url)
                        if (
                            parsed_url.netloc.endswith(primary_domain) 
                            and not any(parsed_url.path.endswith(ext) for ext in [
                                ".pdf", ".jpg", ".png", ".gif", ".zip", ".mp3", ".mp4", ".exe", ".dll"
                            ])
                            and not parsed_url.path.startswith("#")  # Skip anchors
                            and "?" not in full_url  # Skip query parameters for simplicity
                        ):
                            full_url_str = str(full_url)
                            if (
                                full_url_str not in self._visited
                                and (full_url_str, current_depth + 1) not in self._urls_to_crawl
                            ):
                                self._urls_to_crawl.append((full_url_str, current_depth + 1))
                
                except httpx.HTTPStatusError as e:
                    last_error = f"HTTP error {e.response.status_code}: {str(e)}"
                    log_debug(last_error)
                    
                except httpx.RequestError as e:
                    last_error = f"Request error: {str(e)}"
                    log_debug(last_error)
                    
                except Exception as e:
                    last_error = f"Unexpected error: {str(e)}"
                    log_debug(last_error)
                    
                finally:
                    retry_count += 1
                    if content is None and retry_count < self.max_retries:
                        # Exponential backoff for retries
                        backoff_time = 2 ** retry_count
                        time.sleep(backoff_time)
            
            if content is None and last_error:
                logger.warning(f"Failed to crawl after {retry_count} attempts: {current_url}: {last_error}")

        return crawler_result 