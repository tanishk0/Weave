"use client";

import { RefObject } from "react";

interface ComposerFileInputProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ComposerFileInput = ({
  fileInputRef,
  onChange,
}: ComposerFileInputProps) => {
  return (
    <input
      ref={fileInputRef}
      type="file"
      hidden
      multiple
      accept="image/*,.pdf,.doc,.docx,.txt, audio/*"
      onChange={onChange}
    />
  );
};
