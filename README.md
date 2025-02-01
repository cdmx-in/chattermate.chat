# ChatterMate - AI-Powered Customer Support Platform

![ChatterMate Logo](frontend/public/assets/images/logo.svg)

ChatterMate is an intelligent customer support platform that combines AI agents with human oversight. It enables businesses to provide 24/7 support through AI agents that can handle common queries, escalate complex issues, and continuously learn from knowledge base articles.

## Features

- 🤖 **AI-Powered Responses**: Context-aware AI with multiple provider support (OpenAI GPT-4, Google AI, Ollama)
- 👥 **Human Handoff**: Seamless transition to human agents when needed
- 🔌 **Deep Integration**: Connect with Jira, Zendesk, Slack, and more
- 🎨 **Custom Theming**: Fully customizable chat interface
- 🔐 **Role-Based Access**: Granular control over user permissions
- 📊 **Analytics Dashboard**: Real-time monitoring and insights
- 💾 **Smart Memory**: Maintains conversation context across sessions
- 📚 **Knowledge Base**: Train the AI with your domain knowledge
- 🌐 **Open Source**: Self-hostable and community-driven

### Technical Features

**Backend (FastAPI)**
- Real-time WebSocket communication
- Knowledge base management with vector search (PGVector)
- OCR capabilities with RapidOCR
- JWT & Firebase Authentication
- PostgreSQL with SQLAlchemy ORM
- Firebase Cloud Storage
- Auto-generated API documentation

**Frontend (Vue 3)**
- Real-time chat widget with markdown support
- Agent dashboard for conversation monitoring
- Knowledge management interface
- White-label customizable widget
- Theming with PrimeVue and HeadlessUI
- Firebase Cloud Messaging integration
- Modern toast notifications (Vue Sonner)
- Comprehensive testing suite

## Prerequisites

- Python 3.12+
- Node.js 22+
- PostgreSQL 14+ (with Vector extension)
- Firebase Project
- Redis (Optional for rate limiting)

## Installation

### Backend Setup
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

### Frontend Setup
```bash
cd frontend
npm install

# Configure environment
cp .env.example .env.local
# Set your Firebase config in env.js
```

## Configuration

### Backend (.env)
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/chattermate
FIREBASE_CREDENTIALS=firebase-credentials.json
JWT_SECRET_KEY=your-secret-key
CONVERSATION_SECRET_KEY=yoursecretkey
ENCRYPTION_KEY_PATH=encryption.key
CORS_ORIGINS=["https://yourdomain.com"]
```

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000
```

## Running the Application

**Backend**
```bash
uvicorn app.main:app --reload --port 8000
```

**Frontend**
```bash
# Development
npm run dev

# Build Widget
npm run build:widget

# Build Web Client
npm run build:webclient
```

## Testing

**Backend**
```bash
pytest tests/
```

**Frontend**
```bash
# Unit tests
npm run test:unit

# E2E tests
npm run test:e2e
```

## Deployment

For production deployment:
```bash
# Backend
gunicorn -k uvicorn.workers.UvicornWorker -w 4 main:app

# Frontend
npm run build
```

## Documentation

- API Documentation: `http://localhost:8000/docs`
- Project Documentation: [docs.chattermate.chat](https://docs.chattermate.chat)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow PEP 8 style guide
- Write tests for new features
- Update documentation as needed
- Add type hints to new functions

## Support

- 💬 Discord: [Join our community](https://discord.gg/chattermate)
- 🐛 Issues: [GitHub Issues](https://github.com/chattermate/chattermate/issues)
- 📧 Email: support@chattermate.chat

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by the ChatterMate team 