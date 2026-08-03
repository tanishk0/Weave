import { DottedBackground } from "@/components/common/DottedBackground";
import { BookOpen } from "lucide-react";
import {getSession} from "@/lib/auth";
import {redirect} from "next/navigation";
import { Composer } from "@/components/composer/Composer";

export default async function PlaybookPage() {
    try{
        const session = await getSession();
        if (!session){
            throw new Error(
                "Session not found"
            )
        }
    }
    catch(error){
        console.log(error);
        redirect("/login");
    }
    return (
        <div className="w-screen h-screen p-20">
            <DottedBackground enableSpotlight={false} />
            <div className="flex flex-col items-center justify-between w-full h-full     bg-red-200">
                <h1 className="flex items-center gap-2 text-lg font-medium">
                    Hello
                </h1>
                <Composer />
            </div>
        </div>
    );
};