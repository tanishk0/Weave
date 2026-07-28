import { DottedBackground } from "../common/DottedBackground";
import { NewButton } from "../ui/NewButton";
import { Inbox, Settings, UserCircle } from "lucide-react";
import { Playbooks } from "./Playbooks";
import { SearchBar } from "../ui/SearchBar";
import { LogoutButton } from "../auth/components/LogoutBtn";

export const Sidebar = () => {
    const playbooks = [
        { id: "1", name: "UI Design" },
        { id: "2", name: "Branding" },
        { id: "3", name: "AI Development" },
        { id: "4", name: "Marketing" },
    ];
    return (
        <div className="h-full w-64 bg-white shadow-sm border-r border-slate-200 flex flex-col p-4 justify-between">
            <div className="flex flex-col justify-between">
                <div className="flex justify-end">
                    <NewButton />
                </div>
                <div className="ml-1 hover:bg-slate-200/60 p-2 mt-2 flex items-center gap-2 cursor-pointer rounded-md transition-colors">
                    <Inbox className="w-4 h-4 text-slate-700" />
                    <p className="text-sm font-medium text-slate-800">Inbox</p>
                </div>

                <div className="mt-4">
                    <Playbooks playbooks={playbooks} />
                </div>
            </div>
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
                    <LogoutButton className="text-red-600 text-sm"/>
                </div>
            </div>
        </div>
    );
}
