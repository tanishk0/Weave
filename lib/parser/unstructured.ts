import { UnstructuredClient } from "unstructured-client";
import { Strategy } from "unstructured-client/sdk/models/shared";

function getUnstructuredServerURL(): string | undefined {
  let url = process.env.UNSTRUCTURED_SERVER_URL || process.env.UNSTRUCTURED_API_URL;
  if (!url) {
    return "https://api.unstructuredapp.io";
  }
  // Fix web dashboard domain if accidentally provided
  if (url.includes("platform.unstructuredapp.io")) {
    url = url.replace("platform.unstructuredapp.io", "api.unstructuredapp.io");
  }
  // Strip trailing /api/v1 or trailing slashes since the SDK appends /general/v0/general
  url = url.replace(/\/api\/v1\/?$/, "").replace(/\/+$/, "");
  return url || "https://api.unstructuredapp.io";
}

const client = new UnstructuredClient({
  security: {
    apiKeyAuth: process.env.UNSTRUCTURED_API_KEY || "",
  },
  serverURL: getUnstructuredServerURL(),
});

/**
 * Parses a file (Images, PDFs, DOCX, TXT, CSV, etc.) using Unstructured API.
 * Returns the extracted plain text from the file elements.
 */
export async function parseFile(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    console.log(`[Unstructured] Parsing file: ${file.name} (${file.type}, ${file.size} bytes)`);

    const response = await client.general.partition({
      partitionParameters: {
        files: {
          content: buffer,
          fileName: file.name,
        },
        strategy: Strategy.Auto,
      },
    });

    console.log("[Unstructured] Partition call successful");

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