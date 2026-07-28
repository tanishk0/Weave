import GetStarted from "./GetStarted"
import Link from "next/link"
import Logo from "./Logo"
import { LogoutButton } from "../auth/components/LogoutBtn";
import { Button } from "../ui/Buttons";
import { getSession } from "@/lib/auth";

export const Navbar = async () => {
    const session = await getSession();
    const navLinks = [
        { name: "How it works?", href: "/how-it-works" },
        { name: "Features", href: "/features" },
    ];
    return (
        <nav className="h-18 w-full bg-white p-4 border-b border-gray-100 flex justify-between items-center relative z-50">
            <Logo />
            <div className="flex gap-4 cursor-pointer text-sm w-50 justify-between">
                {navLinks.map((link) => (
                    <Link href={link.href} key={link.name}>{link.name}</Link>
                ))}
            </div>
            {session ? (
                <div className="flex gap-2 items-center justify-between w-[250px]">
                    <LogoutButton />
                    <Button
                        text="Open Weave"
                        href="/app"
                    />
                </div>
            ) : (
                <div className="flex gap-2 items-center justify-between w-[210px]">
                    <Link href="/login">
                        <div className="cursor-pointer">Log in</div>
                    </Link>
                    <Link href="/signup">
                        <GetStarted text="Get started free" showArrow={false} />
                    </Link>
                </div>
            )}
        </nav>
    )
}