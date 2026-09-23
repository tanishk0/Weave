import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar/Navbar";
import HowItWorksView from "./HowItWorksView";

export const metadata: Metadata = {
  title: "How it works - Weave",
  description: "Learn how Weave captures, extracts, organizes, and lets you use your personal knowledge base with AI.",
};

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="w-full">
        <Navbar />
      </div>
      <HowItWorksView />
    </div>
  );
}
