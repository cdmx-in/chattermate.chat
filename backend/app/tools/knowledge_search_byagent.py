"""
ChatterMate - Knowledge Search Byagent
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

from typing import List, Dict, Any
from agno.tools import Toolkit
from agno.utils.log import logger
from app.database import SessionLocal
from app.core.config import settings
from app.repositories.knowledge_to_agent import KnowledgeToAgentRepository
from app.repositories.knowledge import KnowledgeRepository
from app.repositories.ai_config import AIConfigRepository
from app.core.security import decrypt_api_key
from agno.knowledge.agent import AgentKnowledge
from agno.vectordb.pgvector import PgVector, SearchType
from agno.embedder.fastembed import FastEmbedEmbedder
from uuid import UUID
import os

class KnowledgeSearchByAgent(Toolkit):
    def __init__(self, agent_id: str, org_id: UUID, source: str = None):
        super().__init__(name="knowledge_search_by_agent")
        self.name = "knowledge_search_by_agent"
        self.description = "Search the knowledge base for information about a query"
        self.function = self.search_knowledge_base
        self.agent_id = agent_id
        self.org_id = org_id
        self.source = source
        
        # Get API key from AI config - use context manager for database session
        with SessionLocal() as db:
            ai_config_repo = AIConfigRepository(db)
            ai_config = ai_config_repo.get_active_config(org_id)
            if ai_config and ai_config.encrypted_api_key:
                os.environ['OPENAI_API_KEY'] = decrypt_api_key(ai_config.encrypted_api_key)
        
        self.agent_knowledge = None
        self.register(self.search_knowledge_base)

    def search_knowledge_base(self, query: str) -> str:
        """Use this function to search the knowledge base for information about a query.

        Args:
            query: The query to search for.
        """
        try:
            logger.debug(f"Searching knowledge base for query: {query}")
            
            # Use context manager for database operations
            with SessionLocal() as db:
                knowledge_repo = KnowledgeRepository(db)
                # Get knowledge sources linked to this agent
                knowledge_sources = knowledge_repo.get_by_agent(self.agent_id)

                if not knowledge_sources:
                    return "No knowledge sources available for this agent."

                # Initialize agent_knowledge if it doesn't exist
                if self.agent_knowledge is None:
                    # Use the first knowledge source's table and schema since they should all be in the same table
                    source = knowledge_sources[0]
                    embedder = FastEmbedEmbedder(
                         # Use configurable model ID from settings
                    )
                    # Updated dimensions for the model (all-MiniLM-L6-v2 uses 384 dimensions)
                    
                    # Initialize vector db with simpler search type to avoid connection issues
                    vector_db = PgVector(
                        table_name=source.table_name,
                        db_url=settings.DATABASE_URL,
                        schema=source.schema,
                        search_type=SearchType.vector,  # Changed from hybrid to vector for speed
                        embedder=embedder
                    )
                    logger.debug(f"Vector db initialized: {source.table_name}")

                    # Create AgentKnowledge instance
                    self.agent_knowledge = AgentKnowledge(vector_db=vector_db)

                # Convert UUID to string in filters
                filters = {"agent_id": [str(self.agent_id)]}
                if self.source:
                    filters["name"] = self.source
                logger.debug(f"Search filters: {filters}")

                # Search with filters - reduced from 5 to 3 documents for faster retrieval
                # Only retrieve what we actually use to minimize database query time
                documents = self.agent_knowledge.search(
                    query=query,
                    num_documents=3,  # Reduced from 5 to 3 since we only use top 3 anyway
                    filters=filters
                )
                logger.debug(f"Documents: {documents}")

                search_results = []
                for doc in documents:
                    if doc.content:
                        # Find the source type from knowledge sources
                        source_type = next(
                            (source.source_type.value.lower() for source in knowledge_sources if source.source == doc.name),
                            'unknown'
                        )
                        search_results.append({
                            'content': doc.content,
                            'source_type': source_type,
                            'name': doc.name or 'Untitled',
                            'similarity': doc.score if hasattr(doc, 'score') else 0.0
                        })

                if not search_results:
                    return "No relevant information found in the knowledge base."

                # Sort by similarity and format results
                search_results.sort(key=lambda x: x['similarity'], reverse=True)

                # Return all results (already limited to 3)
                formatted_results = []
                for result in search_results:
                    formatted_results.append(
                        f"[{result['source_type'].upper()} - {result['name']}] {result['content']}")
                logger.debug(f"Formatted results: {formatted_results}")
                return "\n\n".join(formatted_results)

        except Exception as e:
            logger.error(f"Error searching knowledge base: {str(e)}")
            import traceback
            logger.error(f"Full traceback: {traceback.format_exc()}")
            return "Error searching knowledge base."
