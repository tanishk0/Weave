import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";


export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getSession();

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized: Please login first" }, { status: 401 }
            )
        }
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: "Playbook ID is required" }, { status: 400 }
            )
        }

        const playbook = await prisma.playbook.findFirst({
            where: { id, userId: session.user.id },
        });

        if (!playbook) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        await prisma.playbook.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Failed to delete playbook:", error);
        return NextResponse.json(
            { error: error?.message || "Failed to delete playbook" },
            { status: 500 }
        );
    }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try{
        const session = await getSession();

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized: Please login first" }, { status: 401 }
            )
        }
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: "Playbook ID is required" }, { status: 400 }
            )
        }

        const playbook = await prisma.playbook.findFirst({
            where: { id, userId: session.user.id },
        });

        if (!playbook) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }
        const { title } = await req.json();
        await prisma.playbook.update({
            where: { id },
            data: { title },
        });

        return NextResponse.json({ success: true });
    }catch(error: any) {
        console.error("Failed to update playbook:", error);
        return NextResponse.json(
            { error: error?.message || "Failed to update playbook" },
            { status: 500 }
        );
    }
}