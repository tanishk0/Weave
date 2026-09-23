"use client";

import { FolderOpen, ChevronRight, Loader2 } from "lucide-react";

export interface KnowledgeEntry {
  id: string;
  title: string;
  content: string;
  createdAt?: string;
}

export interface Topic {
  id: string;
  title: string;
  knowledgeEntries: KnowledgeEntry[];
}

interface PlaybookSidebarProps {
  topics: Topic[];
  selectedTopicId?: string;
  onSelectTopic: (topic: Topic) => void;
  loading?: boolean;
}

export function PlaybookSidebar({
  topics,
  selectedTopicId,
  onSelectTopic,
  loading = false,
}: PlaybookSidebarProps) {
  return (
    <div className="w-52 border border-slate-300 bg-white p-4 overflow-y-auto flex flex-col gap-4 shrink-0 m-4 rounded-md"> 
      <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        Topics
      </h2>

      {loading ? (
        <div className="flex items-center justify-center p-8 text-slate-400">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      ) : !topics.length ? (
        <div className="text-sm text-slate-400 italic p-4 text-center">
          No topics yet.
        </div>
      ) : (
        topics.map((topic) => {
          const isSelected = selectedTopicId === topic.id;

          return (
            <button
              key={topic.id}
              onClick={() => onSelectTopic(topic)}
              className={`flex items-center justify-between gap-1.5 rounded-md px-2 py-1.5 text-left text-xs font-semibold transition-colors cursor-pointer ${
                isSelected
                  ? "bg-indigo-50 text-indigo-700"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span className="flex items-center gap-1.5 truncate">
                <FolderOpen className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{topic.title}</span>
              </span>
              {isSelected && (
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              )}
            </button>
          );
        })
      )}
    </div>
  );
}
