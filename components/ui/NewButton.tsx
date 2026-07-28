import { Plus } from "lucide-react";

export const NewButton = () => {
    return (
        <button className="text-white p-2 rounded-lg flex w-14 items-center bg-black cursor-pointer">
            <Plus className="w-3 h-3 shrink-0 stroke-[2.25]" />
            <p className="text-xs">New</p>
        </button>
    );
};