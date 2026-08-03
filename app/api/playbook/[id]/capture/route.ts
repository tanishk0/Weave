// app/api/playbook/[id]/capture/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { parseFile } from "@/lib/parser/unstructured";
import { processCapture } from "@/lib/ai/extract";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: playbookId } = await params;
    try {
        const session = await getSession();

        if (!session) {
            return NextResponse.json({ error: "Unauthorized: Please log in first" }, { status: 401 });
        }

        const formData = await req.formData();
        const text = formData.get("text") as string;
        const files = formData.getAll("files") as File[];
        let extractedText = text;

        if (files.length > 0) {
            extractedText += "\n" + await parseFile(files[0]);
        }

        // Fetch existing topics for this playbook to pass to AI
        const existingTopics = await prisma.topic.findMany({
            where: {
                playbookId,
                userId: session.user.id,
            },
        });

        // Single AI call to extract title, markdown, and suggested topic
        console.time("processCapture");
        const aiResult = await processCapture(
            extractedText,
            existingTopics.map((t) => t.title)
        );
        console.timeEnd("processCapture");

        // DB check: Does suggested topic exist?
        const suggestedTopicName = aiResult.topic.trim();
        let topic = existingTopics.find(
            (t) => t.title.toLowerCase() === suggestedTopicName.toLowerCase()
        );

        if (!topic) {
            topic = await prisma.topic.create({
                data: {
                    title: suggestedTopicName,
                    playbookId,
                    userId: session.user.id,
                },
            });
        }

        // Save raw capture record
        await prisma.capture.create({
            data: {
                text: extractedText,
                userId: session.user.id,
                createdAt: new Date(),
            },
        });

        // Save knowledge entry
        const knowledgeEntry = await prisma.knowledgeEntry.create({
            data: {
                title: aiResult.title,
                content: aiResult.markdown,
                userId: session.user.id,
                topicId: topic.id,
            },
        });

        return NextResponse.json({ success: true, knowledgeEntry });
    } catch (error: any) {
        console.error("Failed to create capture:", error);
        return NextResponse.json(
            { error: error?.message || "Failed to save capture" },
            { status: 500 }
        );
    }
}


