import { ReactNode } from "react";
import { AuthTopBar } from "../components/AuthTopBar";
import { DottedBackground } from "@/components/common/DottedBackground";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-[#fafafa] flex flex-col relative overflow-hidden">
      <DottedBackground />

      <div className="relative z-10">
        <AuthTopBar />
      </div>

      {/* Centered content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        {children}
      </div>
    </main>
  );
}