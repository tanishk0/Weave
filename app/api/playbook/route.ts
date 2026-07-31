import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const session = await getSession();

        if (!session) {
            return NextResponse.json({ error: "Unauthorized: Please log in first" }, { status: 401 });
        }

        const body = await req.json();
        const { title } = body;

        const playbook = await prisma.playbook.create({
            data: {
                title: title,
                userId: session.user.id,
                createdAt: new Date(),
            },
        });

        return NextResponse.json({ success: true, playbook });
    } catch (error: any) {
        console.error("Failed to create playbook:", error);
        return NextResponse.json(
            { error: error?.message || "Failed to save playbook" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const session = await getSession();

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized: Please login first" }, { status: 401 }
            )
        }

        const playbooks = await prisma.playbook.findMany({
            where: {
                userId: session.user.id,
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                captures: true,
            },
        });

        return NextResponse.json({ success: true, playbooks });

    } catch (error: any) {
        console.error("Failed to fetch playbooks:", error);
        return NextResponse.json(
            { error: error?.message || "Failed to fetch playbooks" },
            { status: 500 }
        );
    }
}

