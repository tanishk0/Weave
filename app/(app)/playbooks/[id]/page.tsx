import { DottedBackground } from "@/components/common/DottedBackground";
import { BookOpen } from "lucide-react";
import {getSession} from "@/lib/auth";
import {redirect} from "next/navigation";

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
        <div className="w-screen h-screen bg-red-200 p-20">
            <DottedBackground enableSpotlight={false} />
            <div className="flex items-center justify-between w-full">
                <h1 className="flex items-center gap-2 text-lg font-medium">
                    
                </h1>
            </div>
        </div>
    );
};