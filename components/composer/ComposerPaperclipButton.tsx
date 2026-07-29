"use client";

import { Paperclip } from "lucide-react";
import { useRef } from "react";

interface ComposerPaperclipButtonProps {
  onFilesSelected: (files: File[]) => void;
  onTranscriptReady: (transcript: string) => void;
}

export const ComposerPaperclipButton = ({
  onFilesSelected,
  onTranscriptReady,
}: ComposerPaperclipButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const transcribeAudio = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/transcribe", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Transcription failed");
    }

    const { text: transcript } = await response.json();
    return transcript;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.currentTarget.files;
    if (!selectedFiles) return;

    const normalFiles: File[] = [];

    for (const file of Array.from(selectedFiles)) {
      if (file.type.startsWith("audio/")) {
        try {
          const transcript = await transcribeAudio(file);
          if (transcript) {
            onTranscriptReady(transcript);
          }
        } catch (err) {
          console.error("Audio transcription error:", err);
        }
      } else {
        normalFiles.push(file);
      }
    }

    if (normalFiles.length > 0) {
      onFilesSelected(normalFiles);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <Paperclip
        onClick={() => fileInputRef.current?.click()}
        className="h-5 w-5 cursor-pointer text-zinc-600"
      />
      <input
        ref={fileInputRef}
        type="file"
        hidden
        multiple
        accept="image/*,.pdf,.doc,.docx,.txt, audio/*"
        onChange={handleFileChange}
      />
    </>
  );
};
