"""
ChatterMate - Enhanced PDF URL Knowledge Base
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

from typing import Any, Dict, Optional
from agno.knowledge.pdf_url import PDFUrlKnowledgeBase
from app.core.logger import get_logger

logger = get_logger(__name__)


class EnhancedPDFUrlKnowledgeBase(PDFUrlKnowledgeBase):
    """Enhanced PDF URL knowledge base that supports metadata filters"""
    
    def load(
        self,
        recreate: bool = False,
        upsert: bool = True,
        skip_existing: bool = True,
        filters: Optional[Dict[str, Any]] = None,
    ) -> None:
        """
        Load the PDF URL contents to the vector db with metadata filters
        
        Args:
            recreate (bool, optional): Whether to recreate the collection. Defaults to False.
            upsert (bool, optional): Whether to upsert documents. Defaults to True.
            skip_existing (bool, optional): Whether to skip existing documents. Defaults to True.
            filters (Optional[Dict[str, Any]], optional): Metadata filters to apply to the documents. Defaults to None.
        """
        if self.vector_db is None:
            logger.warning("No vector db provided")
            return

        if recreate:
            self.vector_db.drop()
            self.vector_db.create()
        elif not self.vector_db.exists():
            self.vector_db.create()

        if not self.urls:
            logger.warning("No URLs provided")
            return

        logger.info(f"Loading PDF URL knowledge base: {len(self.urls)} URLs")

        # Read documents from PDF URLs
        for document_list in self.document_lists:
            # Embed documents if embedder is available
            if self.vector_db and hasattr(self.vector_db, 'embedder'):
                for document in document_list:
                    if document.embedding is None:
                        try:
                            document.embed(embedder=self.vector_db.embedder)
                        except Exception as e:
                            logger.error(f"Error embedding document {document.id}: {str(e)}")
            
            # Upsert documents with filters
            if upsert and self.vector_db:
                try:
                    logger.debug(f"Upserting {len(document_list)} documents with filters: {filters}")
                    self.vector_db.upsert(documents=document_list, filters=filters)
                except Exception as e:
                    logger.error(f"Error upserting documents: {str(e)}")
        
        logger.info(f"Completed loading PDF URL knowledge base")

