"use client";

import { useEffect, useState } from "react";
import { PlaybookSidebar, Topic, KnowledgeEntry } from "./PlaybookSidebar";
import { PlaybookContent } from "./PlaybookContent";

interface PlaybookContainerProps {
  playbookId: string;
}

export function PlaybookContainer({ playbookId }: PlaybookContainerProps) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<KnowledgeEntry | null>(null);

  const fetchPlaybook = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/playbook/${playbookId}`);
      const data = await res.json();
      if (res.ok && data.topics) {
        setTopics(data.topics);
        // Select first entry if none is selected
        const firstEntry = data.topics?.[0]?.knowledgeEntries?.[0];
        if (firstEntry && !selectedEntry) {
          setSelectedEntry(firstEntry);
        }
      }
    } catch (err) {
      console.error("Failed to load playbook topics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaybook();
  }, [playbookId]);

  return (
    <div className="flex w-full h-full overflow-hidden">
      <PlaybookSidebar
        topics={topics}
        selectedEntryId={selectedEntry?.id}
        onSelectEntry={(entry) => setSelectedEntry(entry)}
        loading={loading}
      />
      <PlaybookContent entry={selectedEntry} />
    </div>
  );
}
