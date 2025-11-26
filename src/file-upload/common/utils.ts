import { OllamaEmbeddings } from '@langchain/ollama';
import { PineconeStore } from '@langchain/pinecone';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { Pinecone as PineconeClient } from '@pinecone-database/pinecone';
import { envs } from 'src/config';
import { IngestResponse } from './types';
import { Logger } from '@nestjs/common';

export function getNameSpace(filePath: string) {
  const namespace = filePath.split('/').pop()!.replace('.pdf', '');
  return namespace;
}

export const ingest = async (filePath: string, namespace: string): Promise<IngestResponse> => {
  const logger = new Logger('Inges process');
  const pdfFilePath = filePath;

  const loader = new PDFLoader(pdfFilePath, {
    splitPages: true,
  });
  const rawDocuments = await loader.load();
  console.log('Original documents length: ', rawDocuments.length);

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 600,
    chunkOverlap: 100,
  });
  const docs = await textSplitter.splitDocuments(rawDocuments);
  console.log('Splitted documents length: ', docs.length);

  const embeddings = new OllamaEmbeddings({
    model: 'all-minilm',
  });

  const pinecone = new PineconeClient({
    apiKey: envs.pinecone.apiKey,
  });

  const pineconeIndex = pinecone.Index(envs.pinecone.indexName);
  const vectorStore = new PineconeStore(embeddings, {
    pineconeIndex,
    maxConcurrency: 5,
    namespace,
  });

  if (docs.length) {
    try {
      await vectorStore.addDocuments(docs);
      const result = { success: true, message: 'Documents added to vector store', documentsSize: docs.length };
      logger.log(result);

      return result;
    } catch (e: unknown) {
      console.log(e);
      const result = {
        success: false,
        message: 'Error while adding documentos to vector store',
        documentsSize: docs.length,
      };
      logger.error(result);

      return result;
    }
  } else {
    const result = {
      success: false,
      message: 'Theres no documents to add to vector store',
      documentsSize: docs.length,
    };
    logger.error(result);

    return result;
  }
};
