"use client";

import TextareaAutosize from "react-textarea-autosize";

interface ComposerTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const ComposerTextarea = ({
  value,
  onChange,
}: ComposerTextareaProps) => {
  return (
    <TextareaAutosize
      minRows={1}
      maxRows={8}
      value={value}
      onChange={onChange}
      placeholder="Paste anything here..."
      className="w-full resize-none overflow-hidden border-none text-md outline-none placeholder:font-medium placeholder:text-zinc-400"
    />
  );
};
