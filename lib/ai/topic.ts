import { GoogleGenAI } from "@google/genai";
import { TOPIC_PROMPT } from "./prompts";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export interface TopicDecision {
  action: "existing" | "new";
  topic: string;
}

function parseTopicDecision(output: string): TopicDecision {
  const parsed: unknown = JSON.parse(
    output.replace(/```json/gi, "").replace(/```/g, "").trim()
  );

  if (
    !parsed ||
    typeof parsed !== "object" ||
    !("action" in parsed) ||
    !("topic" in parsed) ||
    (parsed.action !== "existing" && parsed.action !== "new") ||
    typeof parsed.topic !== "string" ||
    !parsed.topic.trim()
  ) {
    throw new Error("AI returned an invalid topic decision");
  }

  return { action: parsed.action, topic: parsed.topic.trim() };
}

export async function chooseTopic(
  knowledge: string,
  existingTopics: string[]
): Promise<TopicDecision> {
  const prompt = `
${TOPIC_PROMPT}

Existing Topics:
${existingTopics.length ? JSON.stringify(existingTopics) : "None"}

Knowledge:
${knowledge}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: {
        type: "object",
        properties: {
          action: { type: "string", enum: ["existing", "new"] },
          topic: { type: "string" },
        },
        required: ["action", "topic"],
        additionalProperties: false,
      },
    },
  });

  const text = response.text?.trim();

  if (!text) {
    throw new Error("No response from AI while choosing a topic");
  }

  return parseTopicDecision(text);
}
