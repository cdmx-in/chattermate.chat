# ChatterMate - AI-Powered Customer Support Platform

![ChatterMate Logo](frontend/public/assets/images/logo.svg)

ChatterMate is an intelligent customer support platform that combines AI agents with human oversight. It enables businesses to provide 24/7 support through AI agents that can handle common queries, escalate complex issues, and continuously learn from knowledge base articles.

## Features

### Backend (FastAPI)
- **Real-time Communication**: WebSocket support for instant messaging
- **Knowledge Base Management**: CRUD operations for articles & documents
- **AI Integration**: Multiple AI providers support (OpenAI GPT-4, Google AI, Ollama)
- **OCR Capabilities**: Document text extraction with RapidOCR
- **Vector Search**: Semantic search with PGVector
- **Authentication**: JWT & Firebase Authentication
- **Database**: PostgreSQL with SQLAlchemy ORM
- **File Storage**: Firebase Cloud Storage for document uploads
- **API Documentation**: Auto-generated Swagger/OpenAPI docs

### Frontend (Vue 3)
- **Chat Interface**: Real-time chat widget with markdown support
- **Agent Dashboard**: Conversation monitoring and takeover
- **Knowledge Management**: File upload and article editing
- **White-label Widget**: Customizable chat widget for embedding
- **Customization**: Theming and styling with PrimeVue and HeadlessUI
- **Notifications**: Firebase Cloud Messaging integration
- **Toast Notifications**: Modern toast notifications with Vue Sonner
- **Testing**: Unit tests (Vitest) and E2E tests (Playwright)

## Technologies

**Backend**
- Python 3.12+
- FastAPI
- PostgreSQL with PGVector
- Firebase Admin SDK
- SQLAlchemy + Alembic
- WebSocket (Socket.IO)
- Multiple AI Providers:
  - OpenAI
  - Google Generative AI
  - Google Cloud AI Platform
  - Ollama
- RapidOCR for document processing
- Redis (Rate limiting)

**Frontend**
- Vue 3.5+ (Composition API)
- PrimeVue 4.2+ UI Library
- HeadlessUI & HeroIcons
- Pinia State Management
- Socket.IO Client
- Firebase Web SDK v11+
- Markdown Processing
- Vue Advanced Cropper
- Vue Sonner for Notifications
- Vitest + Playwright

## Getting Started

### Prerequisites

- Python 3.12+
- Node.js 22+
- PostgreSQL 14+ (with Vector extension)
- Firebase Project
- Redis (Optional for rate limiting)

### Installation

**Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Configure .env with your credentials

# Database setup
alembic upgrade head
```

**Frontend Setup**
```bash
cd frontend
npm install

# Configure environment
cp .env.example .env.local
# Set your Firebase config in swenv.js
```

### Configuration

**Backend (.env)**
```ini
DATABASE_URL=postgresql://user:password@localhost/chattermate
FIREBASE_CREDENTIALS=firebase-credentials.json
JWT_SECRET=your_jwt_secret_here

```

**Frontend (.env.local)**
```ini
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000
```

## Running the Application

**Start Backend**
```bash
uvicorn main:app --reload --port 8000
```

**Start Frontend**
```bash
# Development
npm run dev

# Build Widget
npm run build:widget

# Build Web Client
npm run build:webclient
```

## Testing

**Backend Tests**
```bash
pytest tests/
```

**Frontend Tests**
```bash
# Unit tests
npm run test:unit

# E2E tests
npm run test:e2e
```

## Deployment

**Production Setup**
```bash
# Backend
gunicorn -k uvicorn.workers.UvicornWorker -w 4 main:app

# Frontend
npm run build
```

## API Documentation

Access Swagger UI at `http://localhost:8000/docs` after starting the backend.

## License

This project is licensed under the terms of the [LICENSE.md](LICENSE.md) file.

## Support

For issues or feature requests, please [open an issue](https://github.com/yourrepo/chattermate/issues). 