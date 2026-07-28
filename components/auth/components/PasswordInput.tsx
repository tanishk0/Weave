"use client";

import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

type PasswordInputProps = {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
};

export const PasswordInput = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  required = false,
  autoComplete = "current-password",
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col w-full gap-1.5">
      <label htmlFor={name} className="text-xs sm:text-[13px] font-semibold text-zinc-800">
        {label}
      </label>

      <div className="flex items-center gap-2.5 h-10 px-3.5 border-2 border-zinc-200 rounded-lg bg-white focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-100 transition-all">
        <Lock className="w-4 h-4 text-zinc-700 shrink-0 stroke-[2.25]" />

        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          className="w-full text-[13px] text-zinc-700 bg-transparent placeholder:font-semibold outline-none"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="text-zinc-400 hover:text-zinc-600 transition-colors p-0.5 flex items-center justify-center cursor-pointer"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4 stroke-[1.75]" />
          ) : (
            <Eye className="w-4 h-4 stroke-[1.75]" />
          )}
        </button>
      </div>

      <p className="text-[10px] ml-0.5 text-zinc-400 font-normal leading-tight mt-0.5">
        Use at least 8 characters with a mix of letters, numbers & symbols.
      </p>
    </div>
  );
};