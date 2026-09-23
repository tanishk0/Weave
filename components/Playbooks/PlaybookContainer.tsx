"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlaybookSidebar, Topic } from "./PlaybookSidebar";
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
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

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
        setSelectedTopic((currentTopic) =>
          data.topics.find((topic: Topic) => topic.id === currentTopic?.id) ??
          data.topics[0] ??
          null
        );
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
        selectedTopicId={selectedTopic?.id}
        onSelectTopic={setSelectedTopic}
        loading={loading}
      />
      <PlaybookContent topic={selectedTopic} onCaptureComplete={fetchPlaybook} />
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
