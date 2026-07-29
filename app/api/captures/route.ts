// app/api/captures/route.ts
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
        const { text, files } = body;

        const capture = await prisma.capture.create({
            data: {
                text: text || null,
                files: files || [], // Save file array/metadata as JSON
                userId: session.user.id,
                createdAt: new Date(),
            },
        });

        return NextResponse.json({ success: true, capture });
    } catch (error: any) {
        console.error("Failed to create capture:", error);
        return NextResponse.json(
            { error: error?.message || "Failed to save capture" }, 
            { status: 500 }
        );
    }
}

