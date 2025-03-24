"""
ChatterMate - Test Enhanced Website Knowledge Base
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

import pytest
from unittest.mock import MagicMock, patch, call
from agno.document.base import Document
from app.knowledge.enhanced_website_kb import EnhancedWebsiteKnowledgeBase
from app.knowledge.enhanced_website_reader import EnhancedWebsiteReader

# Test Data
TEST_URLS = [
    "https://example.com",
    "https://test.com"
]

TEST_DOCUMENTS = [
    Document(content="Test content 1", meta_data={"url": "https://example.com/page1"}),
    Document(content="Test content 2", meta_data={"url": "https://example.com/page2"})
]

@pytest.fixture
def mock_vector_db():
    """Create a mock vector database"""
    mock_db = MagicMock()
    mock_db.upsert_available.return_value = True
    mock_db.name_exists.return_value = False
    mock_db.doc_exists.return_value = False
    return mock_db

@pytest.fixture
def mock_reader():
    """Create a mock website reader"""
    mock = MagicMock(spec=EnhancedWebsiteReader)
    mock.read.return_value = TEST_DOCUMENTS
    return mock

class TestEnhancedWebsiteKnowledgeBase:
    def test_initialization_with_defaults(self):
        """Test initialization with default values"""
        kb = EnhancedWebsiteKnowledgeBase(urls=TEST_URLS)
        
        assert kb.urls == TEST_URLS
        assert isinstance(kb.reader, EnhancedWebsiteReader)
        assert kb.max_depth == 3
        assert kb.max_links == 10
        assert kb.min_content_length == 100
        assert kb.timeout == 30
        assert kb.max_retries == 3
    
    def test_initialization_with_custom_params(self):
        """Test initialization with custom parameters"""
        kb = EnhancedWebsiteKnowledgeBase(
            urls=TEST_URLS,
            max_depth=5,
            max_links=20,
            min_content_length=200,
            timeout=60,
            max_retries=5
        )
        
        assert kb.urls == TEST_URLS
        assert isinstance(kb.reader, EnhancedWebsiteReader)
        assert kb.max_depth == 5
        assert kb.max_links == 20
        assert kb.min_content_length == 200
        assert kb.timeout == 60
        assert kb.max_retries == 5
        
        # Verify reader was initialized with custom params
        assert kb.reader.max_depth == 5
        assert kb.reader.max_links == 20
        assert kb.reader.min_content_length == 200
        assert kb.reader.timeout == 60
        assert kb.reader.max_retries == 5
    
    def test_initialization_with_custom_reader(self):
        """Test initialization with a custom reader"""
        custom_reader = EnhancedWebsiteReader(max_depth=4, max_links=15)
        kb = EnhancedWebsiteKnowledgeBase(urls=TEST_URLS, reader=custom_reader)
        
        assert kb.reader is custom_reader
        assert kb.reader.max_depth == 4
        assert kb.reader.max_links == 15
    
    def test_document_lists_property(self, mock_reader):
        """Test the document_lists property"""
        kb = EnhancedWebsiteKnowledgeBase(urls=TEST_URLS, reader=mock_reader)
        
        # Convert iterator to list to verify contents
        doc_lists = list(kb.document_lists)
        
        assert len(doc_lists) == len(TEST_URLS)
        assert all(docs == TEST_DOCUMENTS for docs in doc_lists)
        assert mock_reader.read.call_count == len(TEST_URLS)
        
        # Verify read was called with correct URLs
        for url in TEST_URLS:
            mock_reader.read.assert_any_call(url=url)
    
    def test_load_without_vector_db(self, mock_reader):
        """Test load method when no vector db is provided"""
        kb = EnhancedWebsiteKnowledgeBase(urls=TEST_URLS, reader=mock_reader)
        
        with patch('app.knowledge.enhanced_website_kb.logger') as mock_logger:
            kb.load()
            mock_logger.warning.assert_called_with("No vector db provided")
    
    def test_load_with_recreate(self, mock_vector_db, mock_reader):
        """Test load method with recreate=True"""
        kb = EnhancedWebsiteKnowledgeBase(urls=TEST_URLS, reader=mock_reader)
        kb.vector_db = mock_vector_db
        
        # Set up mock reader to return different documents for each URL
        doc1 = Document(content="Test content 1", meta_data={"url": "https://example.com/page1"})
        doc2 = Document(content="Test content 2", meta_data={"url": "https://test.com/page1"})
        mock_reader.read.side_effect = [[doc1], [doc2]]
        
        kb.load(recreate=True)
        
        # Verify vector db operations
        mock_vector_db.drop.assert_called_once()
        mock_vector_db.create.assert_called_once()
        
        # Verify upsert was called for each URL's documents
        assert mock_vector_db.upsert.call_count == 2
        mock_vector_db.upsert.assert_has_calls([
            call(documents=[doc1], filters=None),
            call(documents=[doc2], filters=None)
        ])
        
        # Verify reader operations
        assert mock_reader.read.call_count == len(TEST_URLS)
        mock_reader.read.assert_has_calls([
            call(url=TEST_URLS[0]),
            call(url=TEST_URLS[1])
        ])
    
    def test_load_with_existing_urls(self, mock_vector_db, mock_reader):
        """Test load method with existing URLs in vector db"""
        kb = EnhancedWebsiteKnowledgeBase(urls=TEST_URLS, reader=mock_reader)
        kb.vector_db = mock_vector_db
        
        # Simulate first URL already exists
        mock_vector_db.name_exists.side_effect = lambda name: name == TEST_URLS[0]
        
        kb.load(recreate=False)
        
        # Should only process second URL
        assert mock_reader.read.call_count == 1
        mock_reader.read.assert_called_once_with(url=TEST_URLS[1])
    
    def test_load_with_existing_documents(self, mock_vector_db, mock_reader):
        """Test load method with existing documents"""
        kb = EnhancedWebsiteKnowledgeBase(urls=TEST_URLS, reader=mock_reader)
        kb.vector_db = mock_vector_db
        
        # Simulate first document already exists
        mock_vector_db.doc_exists.side_effect = lambda doc: doc == TEST_DOCUMENTS[0]
        
        kb.load(recreate=False)
        
        # Should only insert second document
        mock_vector_db.upsert.assert_called_with(
            documents=[TEST_DOCUMENTS[1]], 
            filters=None
        )
    
    def test_load_without_upsert(self, mock_vector_db, mock_reader):
        """Test load method when upsert is not available"""
        kb = EnhancedWebsiteKnowledgeBase(urls=TEST_URLS, reader=mock_reader)
        kb.vector_db = mock_vector_db
        
        # Simulate upsert not available
        mock_vector_db.upsert_available.return_value = False
        
        kb.load(upsert=True)
        
        # Should use insert instead of upsert
        mock_vector_db.insert.assert_called_with(documents=TEST_DOCUMENTS, filters=None)
        mock_vector_db.upsert.assert_not_called()
    
    def test_load_with_optimization(self, mock_vector_db, mock_reader):
        """Test load method with optimization"""
        kb = EnhancedWebsiteKnowledgeBase(
            urls=TEST_URLS,
            reader=mock_reader,
            optimize_on=1  # Set low threshold to trigger optimization
        )
        kb.vector_db = mock_vector_db
        
        kb.load()
        
        # Should call optimize after inserting documents
        mock_vector_db.optimize.assert_called_once()
    
    def test_load_with_error_handling(self, mock_vector_db, mock_reader):
        """Test load method error handling"""
        kb = EnhancedWebsiteKnowledgeBase(urls=TEST_URLS, reader=mock_reader)
        kb.vector_db = mock_vector_db
        
        # Simulate error for first URL
        mock_reader.read.side_effect = [Exception("Test error"), TEST_DOCUMENTS]
        
        with patch('app.knowledge.enhanced_website_kb.logger') as mock_logger:
            kb.load()
            
            # Should log error and continue with second URL
            mock_logger.error.assert_called_once()
            assert mock_reader.read.call_count == 2
            mock_vector_db.upsert.assert_called_once_with(
                documents=TEST_DOCUMENTS,
                filters=None
            ) 