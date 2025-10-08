"""
ChatterMate - Test Enhanced Website Reader
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

import os
import unittest
from unittest.mock import patch, MagicMock, Mock
from bs4 import BeautifulSoup
import httpx

from app.knowledge.enhanced_website_reader import EnhancedWebsiteReader


class TestEnhancedWebsiteReader(unittest.TestCase):
    """Test cases for EnhancedWebsiteReader"""

    def setUp(self):
        """Set up test environment"""
        self.reader = EnhancedWebsiteReader(
            max_depth=2,
            max_links=5,
            min_content_length=50
        )
        
        # Create a simple HTML response for testing
        self.test_html = """
        <!DOCTYPE html>
        <html>
        <head>
            <title>Test Page</title>
            <style>
                .hidden { display: none; }
            </style>
            <script>console.log('This should be ignored');</script>
        </head>
        <body>
            <header>
                <nav>
                    <a href="/page1">Page 1</a>
                    <a href="/page2">Page 2</a>
                </nav>
            </header>
            <div class="banner">Banner content to be ignored</div>
            <main>
                <h1>Main Content</h1>
                <p>This is the main content of the page. It should be extracted properly.</p>
                <p>Additional paragraph with meaningful content.</p>
            </main>
            <div class="sidebar">
                <h2>Sidebar</h2>
                <p>Sidebar content should be ignored.</p>
            </div>
            <div class="content">
                <h2>Additional Content</h2>
                <p>More content in a div with class 'content'.</p>
            </div>
            <div id="post-content">
                <h2>Post Content</h2>
                <p>Content in a div with id 'post-content'.</p>
            </div>
            <div>
                <h2>Generic Content</h2>
                <p>Content in a generic div without special class or id.</p>
                <p>This is a good paragraph with substantial text that should be detected by density extraction.</p>
                <p>Another good paragraph that helps identify this div as having high text density.</p>
            </div>
            <footer>
                <p>Footer content to be ignored.</p>
            </footer>
            <div class="hidden">
                <p>This should be ignored because it's hidden.</p>
            </div>
        </body>
        </html>
        """
        self.soup = BeautifulSoup(self.test_html, 'html.parser')
        
    def test_extract_content_by_tags(self):
        """Test content extraction by common tags"""
        # Extract content from the main tag
        content = self.reader._extract_main_content(self.soup)
        self.assertIn("Main Content", content)
        self.assertIn("This is the main content of the page", content)
        
    def test_extract_content_by_class_names(self):
        """Test content extraction by class names"""
        # Remove the main tag to test fallback to class names
        main_tag = self.soup.find('main')
        if main_tag:
            main_tag.decompose()
            
        content = self.reader._extract_main_content(self.soup)
        self.assertIn("Additional Content", content)
        self.assertIn("More content in a div with class 'content'", content)
        
    def test_extract_content_by_id(self):
        """Test content extraction by id"""
        # Remove the main tag and content class to test fallback to id
        main_tag = self.soup.find('main')
        if main_tag:
            main_tag.decompose()
        content_div = self.soup.find(class_='content')
        if content_div:
            content_div.decompose()
            
        content = self.reader._extract_main_content(self.soup)
        self.assertIn("Post Content", content)
        self.assertIn("Content in a div with id 'post-content'", content)
        
    def test_extract_content_by_density(self):
        """Test content extraction by paragraph density"""
        # Remove all specific tags, classes and ids to test density-based extraction
        main_tag = self.soup.find('main')
        if main_tag:
            main_tag.decompose()
        content_div = self.soup.find(class_='content')
        if content_div:
            content_div.decompose()
        post_content_div = self.soup.find(id='post-content')
        if post_content_div:
            post_content_div.decompose()
            
        content = self.reader._extract_main_content(self.soup)
        self.assertIn("Generic Content", content)
        self.assertIn("good paragraph with substantial text", content)
        
    def test_clean_soup(self):
        """Test cleaning of unwanted elements from HTML"""
        # Create a copy for testing
        soup_copy = BeautifulSoup(str(self.soup), 'html.parser')
        self.reader._clean_soup(soup_copy)
        
        # Check that truly unwanted elements are removed (scripts, styles)
        self.assertIsNone(soup_copy.find('script'))
        self.assertIsNone(soup_copy.find('style'))
        self.assertIsNone(soup_copy.find(class_='hidden'))
        
        # Check that structural elements are kept (header, footer, nav are now preserved)
        self.assertIsNotNone(soup_copy.find('header'))
        self.assertIsNotNone(soup_copy.find('footer'))
        self.assertIsNotNone(soup_copy.find('nav'))
        
    @patch('httpx.Client')
    def test_crawl_with_successful_request(self, mock_client):
        """Test crawling with successful HTTP requests"""
        # Mock HTTP client response
        mock_response = MagicMock()
        mock_response.text = self.test_html
        mock_response.raise_for_status = MagicMock()
        
        # Setup mock client
        mock_client_instance = MagicMock()
        mock_client_instance.get.return_value = mock_response
        mock_client.return_value.__enter__.return_value = mock_client_instance
        
        # Test crawling
        result = self.reader.crawl('https://example.com')
        
        # Verify that httpx client was called (may be multiple times due to parallel processing)
        self.assertTrue(mock_client.called)
        self.assertTrue(mock_client_instance.get.called)
        
        # Verify result contains the expected content
        self.assertIn('https://example.com', result)
        self.assertIn("Main Content", result['https://example.com'])
        
    @patch('httpx.Client')
    @patch('time.sleep', return_value=None)  # Skip actual sleeping
    def test_crawl_with_retries(self, mock_sleep, mock_client):
        """Test crawling with retries on failed requests"""
        # Mock HTTP errors for the first two attempts, then success
        mock_response_error = MagicMock()
        mock_response_error.raise_for_status.side_effect = httpx.HTTPStatusError("Error", request=MagicMock(), response=MagicMock(status_code=500))
        
        mock_response_success = MagicMock()
        mock_response_success.text = self.test_html
        mock_response_success.raise_for_status = MagicMock()
        
        # Setup mock client - the parallel processing may create multiple client instances
        mock_client_instance = MagicMock()
        mock_client_instance.get.side_effect = [
            mock_response_error,  # First attempt fails with HTTP error
            MagicMock(raise_for_status=MagicMock(side_effect=httpx.RequestError("Timeout", request=MagicMock()))),  # Second attempt fails with request error
            mock_response_success  # Third attempt succeeds
        ]
        mock_client.return_value.__enter__.return_value = mock_client_instance
        
        # Test crawling with retries
        result = self.reader.crawl('https://example.com')
        
        # Verify that retries happened (at least 3 calls should have been made)
        self.assertGreaterEqual(mock_client_instance.get.call_count, 3)
        
        # Verify result contains the expected content after successful retry
        self.assertIn('https://example.com', result)
        self.assertIn("Main Content", result['https://example.com'])
        
    @patch('httpx.Client')
    def test_read_method(self, mock_client):
        """Test the read method to ensure it returns proper Document objects"""
        # Mock HTTP response
        mock_response = MagicMock()
        mock_response.text = self.test_html
        mock_response.raise_for_status = MagicMock()
        
        # Setup mock client
        mock_client_instance = MagicMock()
        mock_client_instance.get.return_value = mock_response
        mock_client.return_value.__enter__.return_value = mock_client_instance
        
        # Test read method
        documents = self.reader.read('https://example.com')
        
        # Verify documents are created correctly
        self.assertTrue(len(documents) > 0)
        self.assertIn("Main Content", documents[0].content)
        
        # Verify metadata format
        self.assertEqual(documents[0].meta_data['url'], 'https://example.com')
        self.assertEqual(documents[0].meta_data['chunk'], 1)
        self.assertIsInstance(documents[0].meta_data['chunk_size'], int)
        
        # Verify ID and name
        self.assertEqual(documents[0].id, 'https://example.com')
        # Verify that name is the original source URL
        self.assertEqual(documents[0].name, 'https://example.com')


if __name__ == '__main__':
    unittest.main() 