import { DottedBackground } from "@/components/common/DottedBackground";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { PlaybookProvider } from "@/context/PlaybookContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <PlaybookProvider>
            <div className="flex h-screen">
                <DottedBackground enableSpotlight={false}/>
                <Sidebar/>
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </PlaybookProvider>
    );
}