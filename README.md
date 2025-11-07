# Simple RAG Backend

> 🚧 **Project Status: Under Construction**
>
> This project is currently in active development. The core infrastructure has been initialized, but key features are still being implemented.

## Overview

A NestJS-based backend service for building a Retrieval-Augmented Generation (RAG) system. This application enables users to upload PDF documents, process them into vector embeddings, store them in a vector database, and query the documents using natural language with AI-powered responses.

## Architecture

This project implements a RAG pipeline with the following components:

- **Document Processing**: PDF upload, chunking, and embedding generation
- **Vector Storage**: Pinecone integration for similarity search
- **AI Integration**: Groq API for generating contextual responses
- **Database**: PostgreSQL for metadata and application data
- **API**: RESTful endpoints built with NestJS

## Tech Stack

- **Framework**: NestJS 11.x
- **Language**: TypeScript 5.x
- **Database**: PostgreSQL (via TypeORM)
- **Vector DB**: Pinecone (via @langchain/pinecone)
- **AI/ML**:
  - LangChain for document processing and embeddings
  - Ollama for local LLM support
  - Groq API for response generation
- **Document Processing**: pdf-parse for PDF extraction
- **Infrastructure**: Docker & Docker Compose

## Current Status

### ✅ Completed

- [x] NestJS project initialization
- [x] PostgreSQL database setup with Docker
- [x] TypeORM configuration and migrations
- [x] API versioning (v1)
- [x] Swagger documentation setup
- [x] Security middleware (Helmet, CORS, Throttling)
- [x] Global exception handling
- [x] Environment configuration
- [x] Basic module structure

### 🚧 In Progress / Planned

#### File Upload & Processing

- [ ] `POST /api/v1/file/upload` - Upload PDF files
- [ ] Multer integration for file handling
- [ ] PDF text extraction and chunking
- [ ] Embedding generation from document chunks
- [ ] Vector storage in Pinecone

#### Collection Management

- [ ] `GET /api/v1/collections` - List all document collections/indexes
- [ ] `GET /api/v1/collections/:id` - Get collection details
- [ ] Collection metadata storage

#### Chat/Query Interface

- [ ] `POST /api/v1/chat/completions` - Query documents with natural language
  - Accept prompt and collection/index ID
  - Generate query embeddings
  - Perform similarity search in vector DB
  - Send context to Groq API with system prompt
  - Return AI-generated response

#### Frontend (Separate Repository)

- [ ] Next.js application for user interface
- [ ] PDF upload interface
- [ ] Collection/index selection
- [ ] Chat interface for querying documents
- [ ] Response display

## Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- Pinecone account and API key
- Groq API key

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd simple-RAG
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=3030
NODE_ENV=develop

# Database
POSTGRES_USERNAME=postgres
POSTGRES_PASSWORD=simplerag
POSTGRES_HOST=localhost
POSTGRES_PORT=5435
POSTGRES_DATABASE=simplerag
POSTGRES_LOG=true

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=365d

# Pinecone
PINECONE_API_KEY=your-pinecone-key
PINECONE_ENVIRONMENT=your-environment
PINECONE_INDEX_NAME=your-default-index

# Groq API
GROQ_API_KEY=your-groq-key
```

4. Start the database:

```bash
docker-compose up -d
```

5. Run database migrations:

```bash
npm run migration:run
```

## Running the Application

```bash
# Development mode with hot-reload
npm run start:dev

# Production mode
npm run build
npm run start:prod

# Debug mode
npm run start:debug
```

The API will be available at `http://localhost:3030`

## API Documentation

Once the server is running, access the Swagger documentation at:

```
http://localhost:3030/api/docs
```

## Database Management

### Migrations

```bash
# Generate a new migration
npm run migration:generate --name=MigrationName

# Create an empty migration
npm run migration:create --name=MigrationName

# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert
```

### PgAdmin

Access PgAdmin at `http://localhost:8282`

- Email: `admin@simplerag.com`
- Password: `simplerag`

## Project Structure

```
src/
├── common/              # Shared utilities, decorators, filters
│   ├── decorators/      # Custom decorators
│   ├── enums/          # Enums and constants
│   ├── filters/        # Exception filters
│   └── helpers/        # Helper functions
├── config/             # Configuration files
│   ├── db-config.ts    # Database configuration
│   ├── envs.ts         # Environment variables
│   ├── swagger.ts      # Swagger setup
│   └── typeorm.ts      # TypeORM configuration
├── helloworld/         # Example module (to be replaced)
├── migrations/         # Database migrations
└── main.ts            # Application entry point
```

## Planned API Endpoints

### File Management

```
POST   /api/v1/file/upload          Upload and process PDF
GET    /api/v1/file/:id              Get file metadata
DELETE /api/v1/file/:id              Delete file and embeddings
```

### Collections

```
GET    /api/v1/collections           List all collections
GET    /api/v1/collections/:id       Get collection details
DELETE /api/v1/collections/:id       Delete collection
```

### Chat

```
POST   /api/v1/chat/completions      Query documents with AI
```

## Development Workflow

1. **Document Upload Flow**:
   - User uploads PDF via API
   - Backend extracts text using pdf-parse
   - Text is chunked into manageable segments
   - Embeddings are generated for each chunk
   - Embeddings stored in Pinecone with metadata

2. **Query Flow**:
   - User sends query with collection ID
   - Query is converted to embedding
   - Similarity search performed in Pinecone
   - Relevant chunks retrieved
   - Context sent to Groq API with system prompt
   - AI-generated response returned to user

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

## Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## Docker Support

Build and run with Docker:

```bash
# Build image
docker build -t simple-rag-backend .

# Run container
docker run -p 3030:3030 simple-rag-backend
```

## Contributing

This project is under active development. Contributions are welcome once the core features are implemented.

## Roadmap

1. **Phase 1** (Current): Infrastructure setup ✅
2. **Phase 2**: File upload and processing module
3. **Phase 3**: Vector database integration
4. **Phase 4**: Chat/query endpoint with Groq integration
5. **Phase 5**: Frontend development (Next.js)
6. **Phase 6**: Testing and optimization
7. **Phase 7**: Deployment and documentation

## License

UNLICENSED - Private project

## Support

For questions or issues, please open an issue in the repository.

---

**Note**: This README will be updated as features are implemented and the project evolves.
