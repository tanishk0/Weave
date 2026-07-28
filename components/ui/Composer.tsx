"use client";

import { ArrowUp, Mic, Paperclip } from "lucide-react";
import { useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export const Composer = () => {
  const [text, setText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  // Add with your other refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
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

    setText((prev) =>
      prev ? `${prev}\n${transcript}` : transcript
    );
  };

  const toggleRecording = async () => {
    // Stop recording
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      return;
    }

    try {
      // Ask for microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;

      const recorder = new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      // Save audio chunks while recording
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      // Recording finished
      recorder.onstop = async () => {
        // Release the microphone
        streamRef.current?.getTracks().forEach((track) => track.stop());

        // Convert recorded chunks into a File
        const audioFile = new File(
          [
            new Blob(audioChunksRef.current, {
              type: "audio/webm",
            }),
          ],
          "recording.webm",
          {
            type: "audio/webm",
          }
        );

        await transcribeAudio(audioFile);

        // TODO:
        // Send audioFile to /api/transcribe
        // Receive transcript
        // setText((prev) => prev + transcript);

        setIsRecording(false);
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Microphone access denied:", error);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    for (const file of droppedFiles) {
      if (file.type.startsWith("audio/")) {
        await transcribeAudio(file);
      } else {
        setFiles((prev) => [...prev, file]);
      }
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

  const handleSend = () => {
    console.log("Text:", text);
    console.log("Files:", files);

    // Reset composer
    setText("");
    setFiles([]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div onDrop={handleDrop}
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
        <TextareaAutosize
          minRows={1}
          maxRows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste anything here..."
          className="w-full resize-none overflow-hidden border-none text-md outline-none placeholder:font-medium placeholder:text-zinc-400"
        />

        {files.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="rounded-md bg-zinc-100 px-3 py-1 text-sm text-zinc-700"
              >
                {file.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        hidden
        multiple
        accept="image/*,.pdf,.doc,.docx,.txt, audio/*"
        onChange={async (e) => {
          const selectedFiles = e.currentTarget.files;

          if (!selectedFiles) return;

          for (const file of Array.from(selectedFiles)) {
            if (file.type.startsWith("audio/")) {
              await transcribeAudio(file);
            } else {
              setFiles((prev) => [...prev, file]);
            }
          }
        }}
      />

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <div className="flex gap-5">
          <Mic
            onClick={toggleRecording}
            className={`h-5 w-5 cursor-pointer ${isRecording ? "text-red-500" : "text-zinc-600"
              }`}
          />

          <Paperclip
            onClick={() => fileInputRef.current?.click()}
            className="h-5 w-5 cursor-pointer text-zinc-600"
          />
        </div>

        <div className="h-8 w-px bg-zinc-300" />

        <button
          onClick={handleSend}
          className="flex h-10 w-10 items-center justify-center rounded-md bg-black text-white"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};