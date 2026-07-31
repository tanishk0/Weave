import { Plus } from "lucide-react";

interface NewButtonProps {
    className?: string;
    text?: string;
    disabled?: boolean;
    onClick?: () => void;

}

export const NewButton = ({ className = "", text, onClick }: NewButtonProps) => {
    return (
        <button 
        onClick={onClick}
        className={`text-white p-2 rounded-md flex items-center bg-black cursor-pointer ${className}`}>
            <Plus className="w-4.5 h-4.5 stroke-[2.5] mr-2" />
            <p className="text-sm">{text || "New Playbook"}</p>
        </button>
    );
};