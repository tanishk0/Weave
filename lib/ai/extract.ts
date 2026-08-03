// lib/ai/extract.ts

import { GoogleGenAI } from "@google/genai";
import { CAPTURE_PROMPT } from "./prompts";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export interface ProcessCaptureResult {
  title: string;
  markdown: string;
  topic: string;
}

export async function processCapture(
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
    model: "gemini-2.5-flash",
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