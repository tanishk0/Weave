"use client";

import { X } from "lucide-react";

interface ComposerFileListProps {
  files: File[];
  onRemoveFile: (index: number) => void;
}

export const ComposerFileList = ({
  files,
  onRemoveFile,
}: ComposerFileListProps) => {
  if (files.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {files.map((file, index) => (
        <div
          key={index}
          className="flex items-center gap-2 rounded-md bg-zinc-100 px-3 py-1 text-sm text-zinc-700"
        >
          <span>{file.name}</span>

          <button
            type="button"
            onClick={() => onRemoveFile(index)}
            className="cursor-pointer text-zinc-500 hover:text-red-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
