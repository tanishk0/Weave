"use client";

import { Mic } from "lucide-react";
import { useRef, useState } from "react";

interface ComposerMicButtonProps {
  onTranscriptReady: (transcript: string) => void;
}

export const ComposerMicButton = ({
  onTranscriptReady,
}: ComposerMicButtonProps) => {
  const [isRecording, setIsRecording] = useState(false);

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
    return transcript;
  };

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        streamRef.current?.getTracks().forEach((track) => track.stop());

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

        try {
          const transcript = await transcribeAudio(audioFile);
          if (transcript) {
            onTranscriptReady(transcript);
          }
        } catch (error) {
          console.error("Transcription error:", error);
        } finally {
          setIsRecording(false);
        }
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Microphone access denied:", error);
    }
  };

  return (
    <Mic
      onClick={toggleRecording}
      className={`h-5 w-5 cursor-pointer ${
        isRecording ? "text-red-500" : "text-zinc-600"
      }`}
    />
  );
};
