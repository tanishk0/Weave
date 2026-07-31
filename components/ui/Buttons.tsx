"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

type ButtonProps = {
  text: string;
  href: string;
  icon?: LucideIcon;
  className?: string;
};

export const Button = ({
  text,
  href,
  icon: Icon,
  className = "",
}: ButtonProps) => {
  return (
    <Link
      href={href}
      className={className + `flex cursor-pointer items-center rounded-lg bg-black px-5 py-3 text-sm text-white`}
    >
      {text}
      {Icon && <Icon className="h-4 w-4" />}
    </Link>
  );
};