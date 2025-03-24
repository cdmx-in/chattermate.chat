"""
ChatterMate - Enhanced Website Knowledge Base
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

from typing import Any, Dict, Iterator, List, Optional

from agno.document import Document
from agno.knowledge.agent import AgentKnowledge
from agno.utils.log import log_debug, log_info, logger
from pydantic import model_validator

from app.knowledge.enhanced_website_reader import EnhancedWebsiteReader


class EnhancedWebsiteKnowledgeBase(AgentKnowledge):
    """Enhanced knowledge base for websites with more robust content extraction"""
    
    urls: List[str] = []
    reader: Optional[EnhancedWebsiteReader] = None

    # Reader parameters
    max_depth: int = 3
    max_links: int = 10
    min_content_length: int = 100
    timeout: int = 30
    max_retries: int = 3

    @model_validator(mode="after")
    def set_reader(self) -> "EnhancedWebsiteKnowledgeBase":
        """Set the reader if not provided"""
        if self.reader is None:
            self.reader = EnhancedWebsiteReader(
                max_depth=self.max_depth,
                max_links=self.max_links,
                min_content_length=self.min_content_length,
                timeout=self.timeout,
                max_retries=self.max_retries
            )
        return self

    @property
    def document_lists(self) -> Iterator[List[Document]]:
        """
        Iterate over urls and yield lists of documents.
        Each object yielded by the iterator is a list of documents.

        Returns:
            Iterator[List[Document]]: Iterator yielding list of documents
        """
        if self.reader is not None:
            for _url in self.urls:
                log_info(f"Reading documents from {_url}")
                yield self.reader.read(url=_url)

    def load(
        self,
        recreate: bool = False,
        upsert: bool = True,
        skip_existing: bool = True,
        filters: Optional[Dict[str, Any]] = None,
    ) -> None:
        """
        Load the website contents to the vector db
        
        Args:
            recreate (bool, optional): Whether to recreate the collection. Defaults to False.
            upsert (bool, optional): Whether to upsert documents. Defaults to True.
            skip_existing (bool, optional): Whether to skip existing documents. Defaults to True.
            filters (Optional[Dict[str, Any]], optional): Filters to apply to the documents. Defaults to None.
        """
        if self.vector_db is None:
            logger.warning("No vector db provided")
            return

        if self.reader is None:
            logger.warning("No reader provided")
            return

        if recreate:
            log_debug("Dropping collection")
            self.vector_db.drop()

        log_debug("Creating collection")
        self.vector_db.create()

        log_info("Loading knowledge base")
        num_documents = 0

        # Check if URLs exist in vector db
        urls_to_read = self.urls.copy()
        if not recreate:
            for url in self.urls:
                log_debug(f"Checking if {url} exists in the vector db")
                if self.vector_db.name_exists(name=url):
                    log_debug(f"Skipping {url} as it exists in the vector db")
                    if url in urls_to_read:
                        urls_to_read.remove(url)

        # Process each URL
        for url in urls_to_read:
            log_info(f"Processing URL: {url}")
            try:
                document_list = self.reader.read(url=url)
                
                # Log the number of documents extracted
                log_debug(f"Extracted {len(document_list)} documents from {url}")
                
                # Filter out documents which already exist in the vector db
                if not recreate:
                    initial_count = len(document_list)
                    document_list = [document for document in document_list if not self.vector_db.doc_exists(document)]
                    log_debug(f"Filtered out {initial_count - len(document_list)} existing documents")
                
                # Skip if no documents to process
                if not document_list:
                    log_info(f"No new documents to insert for {url}")
                    continue
                    
                # Insert documents into vector db
                if upsert and self.vector_db.upsert_available():
                    log_debug(f"Upserting {len(document_list)} documents")
                    self.vector_db.upsert(documents=document_list, filters=filters)
                else:
                    log_debug(f"Inserting {len(document_list)} documents")
                    self.vector_db.insert(documents=document_list, filters=filters)
                    
                num_documents += len(document_list)
                log_info(f"Loaded {num_documents} documents to knowledge base")
                
            except Exception as e:
                logger.error(f"Error processing URL {url}: {str(e)}")
                # Continue with next URL
                continue

        # Optimize vector db if needed
        if self.optimize_on is not None and num_documents > self.optimize_on:
            log_debug("Optimizing Vector DB")
            self.vector_db.optimize()
            
        log_info(f"Successfully loaded {num_documents} documents to knowledge base") 