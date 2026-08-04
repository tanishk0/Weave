import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
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

    const playbook = await prisma.playbook.findFirst({
        where: { id: playbookId, userId: session.user.id },
    });

    if (!playbook) {
        redirect("/app");
    }

    return (
        <div className="w-screen h-screen">
            <PlaybookContainer playbookId={playbookId} />
        </div>
    );
}


