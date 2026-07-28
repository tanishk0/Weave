"use client";

import Image from "next/image";

type GoogleButtonProps = {
  onClick: () => void;
  isLoading?: boolean;
};

export const GoogleButton = ({
  onClick,
  isLoading = false,
}: GoogleButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Image
        src="/google.svg"
        alt="Google"
        width={18}
        height={18}
      />

      <span>Continue with Google</span>
    </button>
  );
};