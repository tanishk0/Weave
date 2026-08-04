// lib/ai/extract.ts

import { GoogleGenAI } from "@google/genai";
import { CAPTURE_PROMPT } from "./prompts";
import { chunkText } from "./chunk";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export interface ProcessCaptureResult {
  title: string;
  markdown: string;
  topic: string;
}

async function processSingleChunk(
  text: string,
  existingTopics: string[]
): Promise<ProcessCaptureResult> {
  const topicsList = existingTopics.length > 0 ? existingTopics.join(", ") : "None";

  const prompt = `${CAPTURE_PROMPT}

Existing Topics in this Playbook:
${topicsList}

Input Text:
${text}`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  const output = response.text?.trim();

  if (!output) {
    throw new Error("No response from AI");
  }

  try {
    return JSON.parse(output) as ProcessCaptureResult;
  } catch {
    const cleaned = output.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleaned) as ProcessCaptureResult;
  }
}

export async function processCapture(
  text: string,
  existingTopics: string[]
): Promise<ProcessCaptureResult> {
  const chunks = await chunkText(text);

  if (chunks.length === 1) {
    return processSingleChunk(chunks[0], existingTopics);
  }

  // Process each chunk through AI
  const results = await Promise.all(
    chunks.map((chunk) => processSingleChunk(chunk, existingTopics))
  );

  return {
    title: results[0].title,
    topic: results[0].topic,
    markdown: results.map((r) => r.markdown).join("\n\n---\n\n"),
  };
}
