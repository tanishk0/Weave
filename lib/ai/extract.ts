// lib/ai/extract.ts

import { GoogleGenAI } from "@google/genai";
import { EXTRACT_PROMPT } from "./prompts";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function extractKnowledge(text: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: `${EXTRACT_PROMPT}\n\nInput:\n${text}`,
  });

  const output = response.text?.trim();

  if (!output) {
    throw new Error("No response from AI");
  }

  try {
    return JSON.parse(output);
  } catch {
    throw new Error("AI returned invalid JSON");
  }
}