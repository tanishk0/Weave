import { useState } from "react";

type PlaybookModalProps = {
    onClose: () => void;
    onCreate: (title: string) => Promise<void>;
};

export const PlaybookModal = ({ onClose, onCreate }: PlaybookModalProps) => {
    const [title, setTitle] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onCreate(title);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-smh-screen w-screen flex justify-center items-center">
            <div className="p-4 rounded-md bg-white">
                <p className="text-md font-semibold tracking-tight">Create New Playbook</p>

                <form onSubmit={handleSubmit}>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Playbook name"
                        className="p-2 outline-none border border-slate-200 rounded-md my-3 text-sm"
                    />

                    <div className="flex">
                        <button type="submit" className="flex cursor-pointer items-center rounded-lg bg-black px-4 py-2 text-sm text-white">Create</button>
                        <button type="button" onClick={onClose} className="text-sm px-5 py-2 text-red-600 cursor-pointer font-medium">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};