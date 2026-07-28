"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PlaybookItem } from "./PlaybookItems";

interface Playbook {
  id: string;
  name: string;
}

interface PlaybooksProps {
  playbooks: Playbook[];
}

export function Playbooks({
  playbooks,
}: PlaybooksProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <section className="flex min-h-0 flex-1 flex-col max-h-[calc(100vh-16rem)] overflow-y-auto">

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-between px-3 py-2"
      >
        <span className="text-xs font-semibold text-zinc-700">
          Playbooks
        </span>

        <ChevronDown
          size={16}
          className={`transition ${
            collapsed ? "-rotate-90" : ""
          }`}
        />
      </button>

      {!collapsed && (
        <div className="flex-1 overflow-y-auto space-y-1 pb-20">
          {playbooks.map((playbook) => (
            <PlaybookItem
              key={playbook.id}
              id={playbook.id}
              name={playbook.name}
            />
          ))}
        </div>
      )}
    </section>
  );
}