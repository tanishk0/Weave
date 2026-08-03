"use client";

import { FolderOpen, FileText, ChevronRight, Loader2 } from "lucide-react";

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
  selectedEntryId?: string;
  onSelectEntry: (entry: KnowledgeEntry) => void;
  loading?: boolean;
}

export function PlaybookSidebar({
  topics,
  selectedEntryId,
  onSelectEntry,
  loading = false,
}: PlaybookSidebarProps) {
  return (
    <div className="w-72 border-r border-slate-200 bg-white p-4 overflow-y-auto flex flex-col gap-4 shrink-0 h-full">
      <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        Topics & Entries
      </h2>

      {loading ? (
        <div className="flex items-center justify-center p-8 text-slate-400">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      ) : !topics.length ? (
        <div className="text-sm text-slate-400 italic p-4 text-center">
          No topics or entries yet.
        </div>
      ) : (
        topics.map((topic) => (
          <div key={topic.id} className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 px-2 py-1 bg-slate-100 rounded-md">
              <FolderOpen className="w-3.5 h-3.5 text-slate-500" />
              <span>{topic.title}</span>
            </div>
            <div className="flex flex-col gap-0.5 ml-2">
              {topic.knowledgeEntries?.map((entry) => {
                const isSelected = selectedEntryId === entry.id;
                return (
                  <button
                    key={entry.id}
                    onClick={() => onSelectEntry(entry)}
                    className={`flex items-center justify-between text-left text-xs px-2.5 py-1.5 rounded-md transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-indigo-50 text-indigo-700 font-medium"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <FileText className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{entry.title}</span>
                    </div>
                    {isSelected && (
                      <ChevronRight className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
