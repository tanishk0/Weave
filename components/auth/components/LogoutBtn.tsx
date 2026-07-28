"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LucideLogOut } from "lucide-react";

export function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();
        router.push("/");
        router.refresh();
    };

    return (<button
        onClick={handleLogout} className="flex gap-2 items-center cursor-pointer text-sm px-2 py-1 rounded-md hover:bg-muted transition-colors">
        <LucideLogOut className="w-4 h-4" />
        <span className="">Logout</span>
    </button>)
}