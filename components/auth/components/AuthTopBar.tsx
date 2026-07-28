"use client";

import Logo from "@/components/Navbar/Logo";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AuthTopBar = () => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <div className="h-18 px-8 w-full bg-white p-4 border-b border-gray-100 flex justify-between items-center relative z-50">
      <Logo />
      <div className="flex items-center justify-end gap-3">
        <p className="text-sm font-normal text-zinc-600">
          {isLoginPage ? "Don't have an account?" : "Already have an account?"}
        </p>
        <Link
          href={isLoginPage ? "/signup" : "/login"}
          className="flex items-center gap-1 text-sm font-medium underline text-zinc-900 hover:text-black transition-colors"
        >
          <span>{isLoginPage ? "Sign up" : "Log in"}</span>
          <ArrowRight className="text-black" size={14} />
        </Link>
      </div>
    </div>
  );
};