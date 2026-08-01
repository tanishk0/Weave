"use client";

import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { ComposerTextarea } from "./ComposerTextarea";
import { ComposerFileList } from "./ComposerFileList";
import { ComposerMicButton } from "./ComposerMicButton";
import { ComposerPaperclipButton } from "./ComposerPaperclipButton";
import { ComposerSendButton } from "./ComposerSendButton";

export const Composer = () => {
  const [text, setText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { startUpload } = useUploadThing("mediaUploader");

  const removeFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleTranscriptReady = (transcript: string) => {
    setText((prev) => (prev ? `${prev}\n${transcript}` : transcript));
  };

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const normalFiles: File[] = [];

    for (const file of droppedFiles) {
      if (file.type.startsWith("audio/")) {
        try {
          const formData = new FormData();
          formData.append("file", file);
          const response = await fetch("/api/transcribe", {
            method: "POST",
            body: formData,
          });
          if (response.ok) {
            const { text: transcript } = await response.json();
            if (transcript) handleTranscriptReady(transcript);
          }
        } catch (err) {
          console.error("Transcription error on drop:", err);
        }
      } else {
        normalFiles.push(file);
      }
    }

    if (normalFiles.length > 0) {
      handleFilesSelected(normalFiles);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = () => {
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSend = async () => {
    if (!text.trim() && files.length === 0) return;

    try {
      setIsSubmitting(true);

      const formData = new FormData();

      formData.append("text", text);

      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/captures", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to save capture");
      }

      setText("");
      setFiles([]);
    } catch (error) {
      console.error("Error submitting composer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      className={`flex items-end gap-4 rounded-xl border-2 p-4 transition ${isDragging
        ? "border-blue-500 bg-blue-50"
        : "border-zinc-300 bg-white"
        }`}
    >
      {/* Left Section */}
      <div className="flex-1">
        <ComposerTextarea
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <ComposerFileList files={files} onRemoveFile={removeFile} />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <div className="flex gap-5">
          <ComposerMicButton onTranscriptReady={handleTranscriptReady} />
          <ComposerPaperclipButton
            onFilesSelected={handleFilesSelected}
            onTranscriptReady={handleTranscriptReady}
          />
        </div>

        <div className="h-8 w-px bg-zinc-300" />

        <ComposerSendButton
          onClick={handleSend}
          disabled={isSubmitting || (!text.trim() && files.length === 0)}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};