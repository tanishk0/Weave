import { DottedBackground } from "@/components/common/DottedBackground";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { SearchBar } from "@/components/ui/SearchBar";


export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <DottedBackground enableSpotlight={false}/>
            <Sidebar/>
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}