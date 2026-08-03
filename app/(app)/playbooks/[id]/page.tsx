import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PlaybookContainer } from "@/components/Playbooks/PlaybookContainer";

export default async function PlaybookPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const session = await getSession();
    if (!session) {
        redirect("/login");
    }

    const { id: playbookId } = await params;

    return (
        <div className="w-screen h-screen">
            <PlaybookContainer playbookId={playbookId} />
        </div>
    );
}

