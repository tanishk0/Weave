"use client";

import { ArrowUp, Loader2 } from "lucide-react";

interface ComposerSendButtonProps {
  onClick: () => void;
  disabled: boolean;
  isSubmitting: boolean;
}

export const ComposerSendButton = ({
  onClick,
  disabled,
  isSubmitting,
}: ComposerSendButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex h-10 w-10 items-center justify-center cursor-pointer rounded-md bg-black text-white disabled:cursor-default disabled:opacity-70"
    >
      {isSubmitting ? (
        <Loader2 className="h-5 w-5 animate-spin opacity-100" />
      ) : (
        <ArrowUp className="h-5 w-5" />
      )}
    </button>
  );
};
