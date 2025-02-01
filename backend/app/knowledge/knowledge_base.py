from phi.knowledge.pdf import PDFKnowledgeBase, PDFUrlKnowledgeBase
from phi.knowledge.website import WebsiteKnowledgeBase
from phi.knowledge.pdf import PDFReader,PDFImageReader
from phi.vectordb.pgvector import PgVector, SearchType
from app.core.config import settings
from app.core.logger import get_logger
from app.models.knowledge import Knowledge, SourceType
from app.models.knowledge_to_agent import KnowledgeToAgent
from app.repositories.ai_config import AIConfigRepository
from app.database import get_db
from app.repositories.knowledge_to_agent import KnowledgeToAgentRepository
from app.repositories.knowledge import KnowledgeRepository
from typing import List, Optional, Dict
import os
from uuid import UUID
from app.core.security import decrypt_api_key

logger = get_logger(__name__)


class KnowledgeManager:
    def __init__(self, org_id: UUID, agent_id: Optional[str] = None):
        self.org_id = org_id
        self.agent_id = agent_id
        self.db = next(get_db())

        # Get API key from AI config
        ai_config_repo = AIConfigRepository(self.db)
        ai_config = ai_config_repo.get_active_config(org_id)
        if ai_config and ai_config.encrypted_api_key:
            os.environ['OPENAI_API_KEY'] = decrypt_api_key(
                ai_config.encrypted_api_key)

        self.vector_db = PgVector(
            table_name=f"d_{org_id}",
            db_url=settings.DATABASE_URL,
            schema="ai",
            search_type=SearchType.hybrid
        )
        self.knowledge_repo = KnowledgeRepository(self.db)
        self.link_repo = KnowledgeToAgentRepository(self.db)

    def _add_knowledge_source(self, source: str, source_type: SourceType):
        """Track knowledge source in database"""
        # Create or get knowledge source
        knowledge = Knowledge(
            organization_id=self.org_id,
            source=source,
            source_type=source_type,
            table_name=self.vector_db.table_name,
            schema=self.vector_db.schema
        )
        logger.debug(f"Adding knowledge source: {knowledge}")
        knowledge = self.knowledge_repo.create(knowledge)
        logger.debug(f"Knowledge source added: {knowledge}")
        # Link to agent if specified
        if self.agent_id:
            link = KnowledgeToAgent(
                knowledge_id=knowledge.id,
                agent_id=self.agent_id
            )
            self.link_repo.create(link)

        return knowledge

    async def add_pdf_urls(self, urls: List[str]) -> bool:
        """Add knowledge from PDF URLs"""
        try:
            # Convert agent_id to string if it exists
            agent_id_filter = [str(self.agent_id)] if self.agent_id else []
            
            for url in urls:
                knowledge_base = PDFUrlKnowledgeBase(
                    urls=[url],  # Pass single URL in a list
                    vector_db=self.vector_db
                )
                # Extract filename from URL and remove extension
                filename = os.path.splitext(os.path.basename(url))[0]
                knowledge_base.load(recreate=False, upsert=True, filters={
                    "name": filename,
                    "agent_id": agent_id_filter,
                    "org_id": str(self.org_id)
                })
                self._add_knowledge_source(filename, SourceType.FILE)
            return True
        except Exception as e:
            logger.error(f"Error adding PDF URLs: {str(e)}")
            return False

    async def add_websites(self, urls: List[str], max_links: int = 10) -> bool:
        """Add knowledge from websites"""
        try:
            # Convert agent_id to string if it exists
            agent_id_filter = [str(self.agent_id)] if self.agent_id else []
            
            for url in urls:
                logger.debug(f"Adding website: {url}")
                knowledge_base = WebsiteKnowledgeBase(
                    urls=[url],  # Pass single URL in a list
                    max_links=max_links,
                    vector_db=self.vector_db
                )
                logger.debug(f"Knowledge base created for: {url}")
                
                knowledge_base.load(recreate=False, upsert=True, filters={
                    "name": url,
                    "agent_id": agent_id_filter,
                    "org_id": str(self.org_id)
                })
                logger.debug(f"Knowledge base loaded for: {url}")
                self._add_knowledge_source(url, SourceType.WEBSITE)
            return True
        except Exception as e:
            logger.error(f"Error adding websites: {str(e)}")
            return False

    async def add_pdf_files(self, files: List[str], chunk: bool = True) -> bool:
        """Add knowledge from PDF files"""
        try:
            # Process each file individually since PDFKnowledgeBase expects a single path
            for file_path in files:
                knowledge_base = PDFKnowledgeBase(
                    path=file_path,  # Pass single path string instead of list
                    vector_db=self.vector_db,
                    reader=PDFImageReader(chunk=chunk)
                )
                # Extract just the filename from the path and remove extension
                filename = os.path.splitext(os.path.basename(file_path))[0]
                # Convert agent_id to string if it exists
                agent_id_filter = [str(self.agent_id)] if self.agent_id else []
                knowledge_base.load(recreate=False, upsert=True, filters={
                    "name": filename,
                    "agent_id": agent_id_filter,
                    "org_id": str(self.org_id)
                })
                self._add_knowledge_source(filename, SourceType.FILE)
            return True
        except Exception as e:
            logger.error(f"Error adding PDF files: {str(e)}")
            return False

    def get_knowledge_base(self) -> List[Dict]:
        """Get all knowledge sources for the organization or specific agent"""
        try:
            if self.agent_id:
                sources = self.knowledge_repo.get_by_agent(self.agent_id)
            else:
                sources = self.knowledge_repo.get_by_org(self.org_id)

            return [{
                'id': source.id,
                'source': source.source,
                'source_type': source.source_type,
                'table_name': source.table_name,
                'schema': source.schema,
                'agent_ids': [link.agent_id for link in source.agent_links]
            } for source in sources]
        except Exception as e:
            logger.error(f"Error getting knowledge base: {str(e)}")
            return []

    async def process_knowledge(self, queue_item):
        """Process knowledge based on source type"""
        try:
            # Process based on source type
            if queue_item.source_type == 'pdf_file':
                success = await self.add_pdf_files([queue_item.source])
                # Clean up temp file after processing
                if os.path.exists(queue_item.source):
                    os.remove(queue_item.source)

            elif queue_item.source_type == 'pdf_url':
                success = await self.add_pdf_urls([queue_item.source])

            elif queue_item.source_type == 'website':
                max_links = queue_item.queue_metadata.get(
                    'max_links', 10) if queue_item.queue_metadata else 10
                success = await self.add_websites([queue_item.source], max_links=max_links)
            else:
                raise ValueError(f"Unsupported source type: {
                                 queue_item.source_type}")

            if not success:
                raise Exception("Failed to process knowledge source")

            return success

        except Exception as e:
            logger.error(f"Error processing knowledge: {str(e)}")
            raise
