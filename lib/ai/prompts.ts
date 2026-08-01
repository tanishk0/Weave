export const EXTRACT_PROMPT = `
You are an expert knowledge extraction system.

Given raw input, extract only useful information.

Return ONLY valid JSON.

{
  "title": "...",
  "markdown": "..."
}

Rules:
- No markdown outside the JSON.
- No explanations.
- No code fences.
- Preserve all important information.
- Remove fluff and repetition.
- markdown must be valid Markdown.
`;