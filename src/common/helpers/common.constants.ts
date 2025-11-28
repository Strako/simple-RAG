import { Pinecone as PineconeClient } from '@pinecone-database/pinecone';
import { OllamaEmbeddings } from '@langchain/ollama';
import { envs } from 'src/config';
export const ZERO = 0;
export const PROJECT_NAME = 'Simple RAG';
export const SWAGGER_URL = 'api/v1/docs';

export const MAX_REQUEST_BY_MINUTE = 60;
export const ONE_MINUTE_TO_MS = 60000;
export const MAX_RESUME_SIZE_IN_MB = 25;
export const OK_RESPONSE = 'Ok';
export const ONE_KB = 1024;
export const FIFTY_MB = 50;

export const EMBEDDINGS = new OllamaEmbeddings({
  model: 'all-minilm',
});

export const PINECONE = new PineconeClient({
  apiKey: envs.pinecone.apiKey,
});

export const PINECONE_INDEX = PINECONE.Index(envs.pinecone.indexName);

export const SIMILARITY_RESULTS_K = 5;

export const ERROR_DELETING = 'Error deleting file:';
export const ALLOWED_TYPES = 'application/pdf';
export const SUCCESS_DELETING = 'File successfully deleted:';
export const NO_FILE = 'No file uploaded';
export const INVALID_FILE = 'Invalid file type, upload a .pdf';
export const FILE_TOO_LARGE = 'File is too large!';
