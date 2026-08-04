import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export interface ChunkOptions {
  chunkSize?: number;
  chunkOverlap?: number;
  threshold?: number;
}

const DEFAULT_THRESHOLD = 10000;
const DEFAULT_CHUNK_SIZE = 2000;
const DEFAULT_CHUNK_OVERLAP = 200;

/**
 * Reusable utility to chunk text using LangChain's RecursiveCharacterTextSplitter.
 * Chunking only takes place if the text exceeds 10k characters (or the custom threshold).
 *
 * @param text The input text to chunk
 * @param options Optional chunking parameters (chunkSize, chunkOverlap, threshold)
 * @returns Promise resolving to an array of text chunks
 */
export async function chunkText(
  text: string,
  options?: ChunkOptions
): Promise<string[]> {
  if (!text) {
    return [];
  }

  const threshold = options?.threshold ?? DEFAULT_THRESHOLD;

  // Chunking should only take place if characters are more than 10k
  if (text.length <= threshold) {
    return [text];
  }

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: options?.chunkSize ?? DEFAULT_CHUNK_SIZE,
    chunkOverlap: options?.chunkOverlap ?? DEFAULT_CHUNK_OVERLAP,
  });

  return await splitter.splitText(text);
}
