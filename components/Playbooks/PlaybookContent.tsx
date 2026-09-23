"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Composer } from "@/components/composer/Composer";
import { FileText } from "lucide-react";
import { Topic } from "./PlaybookSidebar";

interface PlaybookContentProps {
  topic: Topic | null;
  onCaptureComplete?: () => void;
}

export function PlaybookContent({ topic, onCaptureComplete }: PlaybookContentProps) {
  const combinedContent = topic?.knowledgeEntries
    .map((entry) => entry.content.trim())
    .filter(Boolean)
    .join("\n\n");

  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden">
      {/* Content Viewer Area */}
      <div className="flex-1 overflow-y-auto p-8 relative z-10 ">
        {topic ? (
          <div className="max-w-3xl mx-auto flex flex-col gap-4 bg-white/90 backdrop-blur-xs p-6 rounded-xl border border-slate-200/80 shadow-xs">
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-3 border-slate-200">
              {topic.title}
            </h2>
            <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  table: ({ ...props }) => (
                    <div className="overflow-x-auto my-4 rounded-lg border border-slate-200 shadow-xs">
                      <table className="min-w-full divide-y divide-slate-200 text-sm" {...props} />
                    </div>
                  ),
                  thead: ({ ...props }) => (
                    <thead className="bg-slate-50 text-slate-700 font-semibold" {...props} />
                  ),
                  tbody: ({ ...props }) => (
                    <tbody className="divide-y divide-slate-200 bg-white" {...props} />
                  ),
                  tr: ({ ...props }) => (
                    <tr className="hover:bg-slate-50/50 transition-colors" {...props} />
                  ),
                  th: ({ ...props }) => (
                    <th className="px-4 py-3 text-left font-semibold text-slate-900" {...props} />
                  ),
                  td: ({ ...props }) => (
                    <td className="px-4 py-3 text-slate-700 align-top" {...props} />
                  ),
                }}
              >
                {combinedContent}
              </ReactMarkdown>
            </article>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-2">
            <FileText className="w-10 h-10 stroke-1" />
            <p className="text-sm font-medium">
              Select a topic to view its knowledge.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Composer */}
      <div className="p-4 border-t border-slate-200/80 bg-white/80 backdrop-blur-md flex justify-center shrink-0 relative z-10">
        <div className="w-full">
          <Composer onCaptureComplete={onCaptureComplete} />
        </div>
      </div>
    </div>
  );
}
