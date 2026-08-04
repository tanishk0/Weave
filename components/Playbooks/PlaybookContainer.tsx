"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlaybookSidebar, Topic, KnowledgeEntry } from "./PlaybookSidebar";
import { PlaybookContent } from "./PlaybookContent";
import { Sidebar } from "../sidebar/Sidebar";
import { PlaybookProvider } from "@/context/PlaybookContext";

import { DottedBackground } from "../common/DottedBackground";

interface PlaybookContainerProps {
  playbookId: string;
}

function PlaybookContainerInner({ playbookId }: PlaybookContainerProps) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<KnowledgeEntry | null>(null);

  const router = useRouter();

  const fetchPlaybook = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/playbook/${playbookId}`);
      if (!res.ok) {
        router.push("/app");
        return;
      }
      const data = await res.json();
      if (data.topics) {
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
    <div className="flex w-full h-full overflow-hidden relative">
      <DottedBackground enableSpotlight={false} />
      <Sidebar />
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

export function PlaybookContainer(props: PlaybookContainerProps) {
  return (
    <PlaybookProvider>
      <PlaybookContainerInner {...props} />
    </PlaybookProvider>
  );
}

