import { Plus } from "lucide-react";

export const NewButton = () => {
    return (
        <button className="text-white p-2 rounded-md flex w-full items-center bg-black cursor-pointer">
            <Plus className="w-4.5 h-4.5 stroke-[2.5] mr-2" />
            <p className="text-sm">New Playbook</p>
        </button>
    );
};