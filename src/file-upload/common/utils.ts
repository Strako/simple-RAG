import { PineconeStore } from '@langchain/pinecone';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';

import { IngestResponse } from './types';
import { Logger } from '@nestjs/common';
import { EMBEDDINGS, PINECONE_INDEX } from 'src/common/helpers';

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
  logger.log('Original documents length: ', rawDocuments.length);

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 600,
    chunkOverlap: 100,
  });
  const docs = await textSplitter.splitDocuments(rawDocuments);
  logger.log('Splitted documents length: ', docs.length);

  const vectorStore = new PineconeStore(EMBEDDINGS, {
    pineconeIndex: PINECONE_INDEX,
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
