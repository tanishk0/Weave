import { GoogleGenAI } from "@google/genai";
import { TOPIC_PROMPT } from "./prompts";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export interface TopicDecision {
  action: "existing" | "new";
  topic: string;
}

export async function chooseTopic(
  knowledge: string,
  existingTopics: string[]
): Promise<TopicDecision> {
  const prompt = `
${TOPIC_PROMPT}

Existing Topics:
${existingTopics.length ? existingTopics.join("\n") : "None"}

Knowledge:
${knowledge}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite", 
    contents: prompt,
  });

  const text = response.text!
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(text) as TopicDecision;
}