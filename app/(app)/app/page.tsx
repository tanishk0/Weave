import { Button } from "@/components/ui/Buttons";
import { Composer } from "@/components/ui/Composer";
import { SearchBar } from "@/components/ui/SearchBar";
import { getSession } from "@/lib/auth";
import { BellCheck } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getSession();
    if(!session) redirect("/login");
    
    return (
        <div className="p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-center">
                <div className="">
                    <h2 className="text-3xl font-semibold">Good morning, Tanishq!</h2>
                </div>
                <div className="flex items-center gap-6">
                    <SearchBar />
                </div>
            </div>
            <Composer />
        </div>
    )
}