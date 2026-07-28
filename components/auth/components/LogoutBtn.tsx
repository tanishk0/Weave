"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LucideLogOut } from "lucide-react";

type LogoutButtonProps = {
    className?: string;
    iconSize?: number;
};

export function LogoutButton({ className, iconSize = 16 }: LogoutButtonProps) {
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();
        router.push("/");
        router.refresh();
    };

    return (
        <button
            onClick={handleLogout} className={`flex gap-1 items-center cursor-pointer px-1 rounded-md transition-colors ${className}`} >
            <LucideLogOut size={iconSize} />
            <span className="">Logout</span>
        </button >
    )
}