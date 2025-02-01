ChatterMate is an open-source AI-powered customer service platform that provides
intelligent chatbot capabilities with human handoff, role-based access control,
and seamless third-party integrations.

## Environment Variables

Create a `.env` file in the root directory with:

```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
FIREBASE_CREDENTIALS_PATH=path/to/firebase-credentials.json
```

## Firebase Setup

1. Go to Firebase Console
2. Create a new project or select existing
3. Go to Project Settings > Service Accounts
4. Generate new private key
5. Save the JSON file as `firebase-credentials.json` in backend root
6. Add the file path to `.env`

## Features

- 🤖 **AI-Powered Responses**: Context-aware AI that learns from your documentation
- 👥 **Human Handoff**: Seamless transition to human agents when needed
- 🔌 **Deep Integration**: Connect with Jira, Zendesk, Slack, and more
- 🎨 **Custom Theming**: Fully customizable chat interface
- 🔐 **Role-Based Access**: Granular control over user permissions
- 📊 **Analytics Dashboard**: Real-time monitoring and insights
- 💾 **Smart Memory**: Maintains conversation context across sessions
- 📚 **Custom Training**: Train the AI with your domain knowledge
- 🌐 **Open Source**: Self-hostable and community-driven

## Quick Start

### Prerequisites

- Python 3.8+
- PostgreSQL
- Vue Js (for frontend)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/chattermate/chattermate.git
cd chattermate
```

2. Create and activate virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
.\venv\Scripts\activate  # Windows
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your configuration
```

5. Initialize the database:

```bash
alembic upgrade head
```

6. Run the development server:

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

## Project Structure

```
chattermate/
├── app/
│   ├── api/            # API endpoints
│   ├── core/           # Core functionality
│   ├── models/         # Database models
│   ├── schemas/        # Pydantic schemas
│   └── services/       # Business logic
├── static/            # Static files
├── alembic/           # Database migrations
├── tests/            # Test suite
└── requirements.txt   # Dependencies
```

## API Documentation

Once the server is running, you can access:

- Interactive API docs: `http://localhost:8000/docs`
- Alternative docs: `http://localhost:8000/redoc`

## Configuration

Key environment variables:

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/chattermate
SECRET_KEY=your-secret-key
CORS_ORIGINS=["https://yourdomain.com"]
```

## Deployment

### Self-Hosted

1. Set up a PostgreSQL database
2. Configure environment variables
3. Run database migrations
4. Start the application server
5. Set up a reverse proxy (nginx recommended)

### Cloud Hosting

Detailed deployment guides available for:

- AWS
- Google Cloud
- DigitalOcean
- Heroku

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
6. Create migration, if necessary
   `alembic revision --autogenerate -m "Describe your changes"`

### Development Guidelines

- Follow PEP 8 style guide
- Write tests for new features
- Update documentation as needed
- Add type hints to new functions
- Use meaningful commit messages

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 ChatterMate

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Support

- 📚 Documentation: [docs.chattermate.chat](https://docs.chattermate.chat)
- 💬 Discord: [Join our community](https://discord.gg/chattermate)
- 🐛 Issues: [GitHub Issues](https://github.com/chattermate/chattermate/issues)
- 📧 Email: support@chattermate.chat

## Acknowledgments

- Thanks to all contributors
- Built with FastAPI and Socket.IO
- Inspired by the open-source community

---

Made with ❤️ by the ChatterMate team

```

This README includes:
1. Project overview and features
2. Installation and setup instructions
3. Project structure
4. Configuration details
5. Deployment guides
6. Contribution guidelines
7. MIT License
8. Support information
9. Clear formatting and emojis for better readability


```
