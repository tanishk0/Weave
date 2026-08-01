import { UnstructuredClient } from "unstructured-client";
import { Strategy } from "unstructured-client/sdk/models/shared";

const client = new UnstructuredClient({
  security: {
    apiKeyAuth: process.env.UNSTRUCTURED_API_KEY || "",
  },
  ...(process.env.UNSTRUCTURED_SERVER_URL
    ? { serverURL: process.env.UNSTRUCTURED_SERVER_URL }
    : {}),
});

/**
 * Parses a file (Images, PDFs, DOCX, TXT, CSV, etc.) using Unstructured API.
 * Returns the extracted plain text from the file elements.
 */
export async function parseFile(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const response = await client.general.partition({
      partitionParameters: {
        files: {
          content: buffer,
          fileName: file.name,
        },
        strategy: Strategy.Auto,
      },
    });

    if (Array.isArray(response)) {
      return response
        .map((el) => (typeof el === "object" && el !== null ? el.text || "" : ""))
        .filter(Boolean)
        .join("\n\n");
    } else if (typeof response === "string") {
      return response;
    } else if (
      response &&
      typeof response === "object" &&
      "elements" in response &&
      Array.isArray((response as any).elements)
    ) {
      return (response as any).elements
        .map((el: any) => (typeof el === "object" && el !== null ? el.text || "" : ""))
        .filter(Boolean)
        .join("\n\n");
    }

    return "";
  } catch (error) {
    console.error("Error parsing file with Unstructured:", error);
    if (file.type.startsWith("text/") || isTextFile(file.name)) {
      try {
        return await file.text();
      } catch (fallbackError) {
        console.error("Fallback text reading failed:", fallbackError);
      }
    }
    throw error;
  }
}

function isTextFile(fileName: string): boolean {
  const textExtensions = [
    ".txt",
    ".md",
    ".csv",
    ".json",
    ".js",
    ".ts",
    ".tsx",
    ".jsx",
    ".html",
    ".css",
    ".xml",
    ".yaml",
    ".yml",
    ".env",
    ".py",
    ".sh",
  ];
  return textExtensions.some((ext) => fileName.toLowerCase().endsWith(ext));
}