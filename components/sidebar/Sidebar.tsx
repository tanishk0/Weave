"use client";

import { NewButton } from "../ui/NewButton";
import { Inbox, Settings, UserCircle } from "lucide-react";
import { Playbooks } from "./Playbooks";
import { LogoutButton } from "../auth/components/LogoutBtn";
import { useState } from "react";
import { usePlaybooks } from "@/context/PlaybookContext";
import { PlaybookModal } from "../Playbooks/PlaybookModal";

export const Sidebar = () => {
    const { playbooks, createPlaybook, editPlaybook, deletePlaybook } = usePlaybooks();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreatePlaybook = async (title: string) => {
        setIsModalOpen(false);
        await createPlaybook(title);
    };

    return (
        <div className="h-full w-52 bg-white shadow-sm border-r border-slate-200 flex flex-col p-4 justify-between">
            <div className="flex flex-col justify-between">
                <div className="flex justify-end">
                    <NewButton className="w-full" onClick={() => setIsModalOpen(true)} />
                </div>
                <div className="ml-1 hover:bg-slate-200/60 p-2 mt-2 flex items-center gap-2 cursor-pointer rounded-md transition-colors">
                    <Inbox className="w-4 h-4 text-slate-700" />
                    <p className="text-sm font-medium text-slate-800">Inbox</p>
                </div>

                <div className="mt-4">
                    <Playbooks playbooks={playbooks} onDeletePlaybook={deletePlaybook} onEditPlaybook={editPlaybook} />
                </div>
            </div>

            {isModalOpen && (
                <PlaybookModal
                    onClose={() => setIsModalOpen(false)}
                    onCreate={handleCreatePlaybook}
                />
            )}
            <div className="flex flex-col justify-between w-full">
                <div className="flex gap-2 items-center px-3 py-1.5 transition cursor-pointer hover:bg-slate-200/60 rounded-md transition-colors">
                    <Settings className="w-4.5 h-4.5 text-slate-700" />
                    <p className="text-sm font-medium text-slate-800">Settings</p>
                </div>
                <div className="flex gap-2 items-center transition px-3 py-1.5 cursor-pointer hover:bg-slate-200/60 rounded-md transition-colors">
                    <UserCircle className="w-4.5 h-4.5 text-slate-700" />
                    <p className="text-sm font-medium text-slate-800">Account</p>
                </div>
                <div className="flex gap-2 items-center transition px-3 py-1.5 cursor-pointer hover:bg-red-100 rounded-md transition-colors">
                    <LogoutButton className="text-red-600 text-sm" />
                </div>
            </div>
        </div>
    );
}
