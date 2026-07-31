"use client";

import { useState } from "react";
import { NewButton } from "@/components/ui/NewButton";
import { PlaybookModal } from "@/components/Playbooks/PlaybookModal";
import { usePlaybooks } from "@/context/PlaybookContext";

export const PlaybookActions = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { createPlaybook } = usePlaybooks();

    const handleCreatePlaybook = async (title: string) => {
        setIsModalOpen(false);
        await createPlaybook(title);
    };

    return (
        <>
            <NewButton
                text="Create New Playbook"
                className="w-52"
                onClick={() => setIsModalOpen(true)}
            />

            {isModalOpen && (
                <PlaybookModal
                    onClose={() => setIsModalOpen(false)}
                    onCreate={handleCreatePlaybook}
                />
            )}
        </>
    );
};