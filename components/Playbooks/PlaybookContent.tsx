"use client";

import ReactMarkdown from "react-markdown";
import { Composer } from "@/components/composer/Composer";
import { FileText } from "lucide-react";
import { KnowledgeEntry } from "./PlaybookSidebar";

interface PlaybookContentProps {
  entry: KnowledgeEntry | null;
}

export function PlaybookContent({ entry }: PlaybookContentProps) {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* Content Viewer Area */}
      <div className="flex-1 overflow-y-auto p-8 bg-white">
        {entry ? (
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-3 border-slate-200">
              {entry.title}
            </h2>
            <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
              <ReactMarkdown>{entry.content}</ReactMarkdown>
            </article>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-2">
            <FileText className="w-10 h-10 stroke-1" />
            <p className="text-sm font-medium">
              Select a knowledge entry from the sidebar to view its content.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Composer */}
      <div className="p-4 border-t border-slate-200 bg-white flex justify-center shrink-0">
        <div className="w-full max-w-3xl">
          <Composer />
        </div>
      </div>
    </div>
  );
}
