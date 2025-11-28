import { EMBEDDINGS, PINECONE_INDEX, SIMILARITY_RESULTS_K } from './../../common/helpers/common.constants';
import { PineconeStore } from '@langchain/pinecone';

export async function similaritySearch(querie: string, namespace: string) {
  const vectorStore = new PineconeStore(EMBEDDINGS, {
    pineconeIndex: PINECONE_INDEX,
    maxConcurrency: 5,
    namespace,
  });

  const results = await vectorStore.similaritySearch(querie, SIMILARITY_RESULTS_K);
  return results.map((doc) => doc.pageContent);
}

export function getMessage(context: string, querie: string) {
  return `
Analyze the information provided in the context and the user's query carefully.  
Answer the query **using only the facts contained in the context**, and reason step by step if needed.  

Context: ${context}  
User Query: ${querie}  

- Do not invent, assume, or add any information that is not present in the context.  
- If the answer cannot be determined from the context, respond with: "I don't know."  
- Provide a concise and clear answer, explaining your reasoning only based on the context.`;
}
