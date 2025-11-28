# Simple RAG Backend

> ✅ **Project Status: Core Features Implemented**
>
> The main RAG pipeline is functional! PDF upload, embedding generation, vector storage, and AI-powered querying are working. Frontend development is the next phase.

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
- **Embeddings**: Ollama (all-minilm model) for local embedding generation
- **AI/ML**:
  - LangChain for document processing, chunking, and vector operations
  - Groq API (openai/gpt-oss-20b model) for response generation
- **Document Processing**:
  - Multer for file upload handling
  - LangChain PDFLoader for PDF text extraction
  - RecursiveCharacterTextSplitter for intelligent chunking
- **Infrastructure**: Docker & Docker Compose
- **API Documentation**: Swagger/OpenAPI

## Current Status

### ✅ Completed Features

#### Infrastructure

- [x] NestJS project initialization
- [x] PostgreSQL database setup with Docker
- [x] TypeORM configuration and migrations
- [x] API versioning (v1)
- [x] Swagger/OpenAPI documentation
- [x] Security middleware (Helmet, CORS, Throttling)
- [x] Global exception handling and filters
- [x] Environment configuration with validation
- [x] Husky pre-commit hooks

#### File Upload & Processing

- [x] `POST /api/v1/files/upload` - Upload PDF files ✅
- [x] Multer integration with disk storage
- [x] File validation (type, size up to 50MB)
- [x] PDF text extraction using LangChain PDFLoader
- [x] Intelligent text chunking (600 chars, 100 overlap)
- [x] Embedding generation using Ollama (all-minilm)
- [x] Vector storage in Pinecone with namespace support
- [x] Automatic file cleanup after processing

#### Query Interface

- [x] `POST /api/v1/queries` - Query documents with AI ✅
- [x] Similarity search in Pinecone (top 5 results)
- [x] Context-aware prompt engineering
- [x] Groq API integration for response generation
- [x] Structured response with success status

#### Health & Monitoring

- [x] `GET /api/v1/health/status` - Health check endpoint

### 🚧 Planned Features

#### Collection Management

- [ ] `GET /api/v1/collections` - List all namespaces/collections
- [ ] `GET /api/v1/collections/:namespace` - Get collection details
- [ ] `DELETE /api/v1/collections/:namespace` - Delete collection
- [ ] Collection metadata storage in PostgreSQL

#### Enhanced File Management

- [ ] `GET /api/v1/files` - List uploaded files
- [ ] `GET /api/v1/files/:id` - Get file metadata
- [ ] `DELETE /api/v1/files/:id` - Delete file and embeddings
- [ ] File metadata persistence in database

#### Frontend (Separate Repository)

- [ ] Next.js application for user interface
- [ ] PDF upload interface with drag-and-drop
- [ ] Namespace/collection browser
- [ ] Chat interface for querying documents
- [ ] Response display with source citations
- [ ] File management dashboard

## Prerequisites

- **Node.js** 18+ and npm
- **Docker** and Docker Compose
- **Ollama** installed locally with `all-minilm` model
  ```bash
  # Install Ollama: https://ollama.ai
  # Pull the embedding model
  ollama pull all-minilm
  ```
- **Pinecone** account and API key (free tier available)
- **Groq** API key (free tier available)

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

# JWT (for future authentication)
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=365d

# Pinecone Configuration
PINECONE_API_KEY=your-pinecone-api-key
PINECONE_ENVIRONMENT=your-pinecone-environment
PINECONE_INDEX_NAME=your-pinecone-index-name

# Groq API
GROQ_API_KEY=your-groq-api-key
```

**Important Notes:**

- Create a Pinecone index with dimension **384** (matches all-minilm embeddings)
- Pinecone index name is used as the default, but namespaces are dynamically created per file
- Each uploaded file creates a unique namespace based on the filename

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

Once the server is running, access the interactive Swagger documentation at:

```
http://localhost:3030/api/v1/docs
```

### Available Endpoints

#### Health Check

```http
GET /api/v1/health/status
```

Returns the application status.

#### File Upload

```http
POST /api/v1/files/upload
Content-Type: multipart/form-data

Body:
- file: [PDF file, max 50MB]
```

**Response:**

```json
{
  "success": true,
  "message": "Documents added to vector store",
  "filepath": "uploads/1234567890-document.pdf",
  "namespace": "1234567890-document"
}
```

#### Query Documents

```http
POST /api/v1/queries
Content-Type: application/json

Body:
{
  "querie": "What is the main topic of the document?",
  "namespace": "1234567890-document"
}
```

**Response:**

```json
{
  "success": true,
  "completition": "Based on the provided context, the main topic..."
}
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
├── common/                    # Shared utilities, decorators, filters
│   ├── decorators/            # Custom decorators (@Public, etc.)
│   ├── enums/                 # Enums (NODE_ENV, etc.)
│   ├── filters/               # Exception filters
│   └── helpers/               # Constants and helper functions
│       └── common.constants.ts # Pinecone, Ollama, and app constants
├── config/                    # Configuration files
│   ├── db-config.ts           # PostgreSQL configuration
│   ├── envs.ts                # Environment variable validation
│   ├── swagger.ts             # Swagger/OpenAPI setup
│   └── typeorm.ts             # TypeORM configuration
├── file-upload/               # File upload module ✅
│   ├── common/
│   │   ├── types.ts           # TypeScript interfaces
│   │   └── utils.ts           # PDF processing, chunking, embedding
│   ├── dto/                   # Data transfer objects
│   ├── file-upload.controller.ts
│   ├── file-upload.service.ts
│   └── file-upload.module.ts
├── queries/                   # Query/chat module ✅
│   ├── common/
│   │   ├── gro-utils.ts       # Groq API integration
│   │   └── utils.ts           # Similarity search, prompt engineering
│   ├── dto/                   # Data transfer objects
│   ├── queries.controller.ts
│   ├── queries.service.ts
│   └── queries.module.ts
├── health/                    # Health check module ✅
│   ├── health.controller.ts
│   ├── health.service.ts
│   └── health.module.ts
├── migrations/                # Database migrations
├── app.module.ts              # Root application module
└── main.ts                    # Application entry point
```

## How It Works

### Document Processing Pipeline

1. **Upload**: User uploads a PDF file via `POST /api/v1/files/upload`
2. **Validation**: File is validated (PDF type, max 50MB)
3. **Storage**: File temporarily saved to `./uploads` directory
4. **Extraction**: PDF text extracted using LangChain PDFLoader with page splitting
5. **Chunking**: Text split into chunks (600 characters, 100 overlap) using RecursiveCharacterTextSplitter
6. **Embedding**: Each chunk converted to 384-dimensional vector using Ollama (all-minilm)
7. **Storage**: Vectors stored in Pinecone with unique namespace (based on filename)
8. **Cleanup**: Original PDF file deleted after successful processing

### Query Pipeline

1. **Query Submission**: User sends query with namespace via `POST /api/v1/queries`
2. **Embedding**: Query converted to vector using same Ollama model
3. **Similarity Search**: Top 5 most relevant chunks retrieved from Pinecone
4. **Context Building**: Retrieved chunks combined into context
5. **Prompt Engineering**: Context and query formatted with system instructions
6. **AI Generation**: Groq API (openai/gpt-oss-20b) generates response based on context
7. **Response**: AI-generated answer returned to user

### Key Features

- **Namespace Isolation**: Each PDF gets its own namespace for isolated querying
- **Intelligent Chunking**: Overlapping chunks preserve context across boundaries
- **Local Embeddings**: Ollama runs locally for fast, private embedding generation
- **Context-Aware AI**: Groq model only answers based on provided context
- **Automatic Cleanup**: Temporary files removed after processing

## Configuration Details

### Embedding Configuration

- **Model**: Ollama all-minilm
- **Dimensions**: 384
- **Chunk Size**: 600 characters
- **Chunk Overlap**: 100 characters
- **Similarity Results**: Top 5 chunks (K=5)

### File Upload Limits

- **Max File Size**: 50MB
- **Allowed Types**: PDF only (`application/pdf`)
- **Storage**: Temporary disk storage in `./uploads`
- **Naming**: `{timestamp}-{originalname}`

### Rate Limiting

- **Limit**: 60 requests per minute per IP
- **Window**: 60 seconds

### AI Model

- **Provider**: Groq
- **Model**: openai/gpt-oss-20b
- **Behavior**: Context-aware, only answers from provided documents

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

1. **Phase 1**: Infrastructure setup ✅
2. **Phase 2**: File upload and processing module ✅
3. **Phase 3**: Vector database integration ✅
4. **Phase 4**: Chat/query endpoint with Groq integration ✅
5. **Phase 5**: Collection management API (In Progress)
6. **Phase 6**: File metadata persistence
7. **Phase 7**: Frontend development (Next.js)
8. **Phase 8**: Testing and optimization
9. **Phase 9**: Deployment and production setup

## Usage Example

### 1. Upload a PDF Document

```bash
curl -X POST http://localhost:3030/api/v1/files/upload \
  -F "file=@/path/to/document.pdf"
```

**Response:**

```json
{
  "success": true,
  "message": "Documents added to vector store",
  "filepath": "uploads/1734567890-document.pdf",
  "namespace": "1734567890-document"
}
```

### 2. Query the Document

```bash
curl -X POST http://localhost:3030/api/v1/queries \
  -H "Content-Type: application/json" \
  -d '{
    "querie": "What are the main conclusions?",
    "namespace": "1734567890-document"
  }'
```

**Response:**

```json
{
  "success": true,
  "completition": "Based on the provided context, the main conclusions are..."
}
```

## Troubleshooting

### Ollama Connection Issues

```bash
# Ensure Ollama is running
ollama serve

# Verify all-minilm model is installed
ollama list
ollama pull all-minilm
```

### Pinecone Dimension Mismatch

- Ensure your Pinecone index has dimension **384** (matches all-minilm)
- Create index: `Dimension: 384, Metric: cosine`

### File Upload Fails

- Check file size (max 50MB)
- Verify file type is PDF
- Ensure `./uploads` directory exists and is writable

### Query Returns "I don't know"

- Verify the namespace matches the uploaded file
- Check if embeddings were successfully stored in Pinecone
- Try more specific queries related to document content

## License

UNLICENSED - Private project

## Support

For questions or issues, please open an issue in the repository.

---

**Note**: This README will be updated as features are implemented and the project evolves.
