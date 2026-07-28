import { Composer } from "@/components/ui/Composer";
import { SearchBar } from "@/components/ui/SearchBar";
import { BellCheck } from "lucide-react";

export default function Home() {
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