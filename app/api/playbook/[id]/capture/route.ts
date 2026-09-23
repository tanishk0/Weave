// app/api/playbook/[id]/capture/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { parseFile } from "@/lib/parser/unstructured";
import { processCapture } from "@/lib/ai/extract";
import { chooseTopic } from "@/lib/ai/topic";

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

        // Extract the knowledge first, then classify it against the current topics.
        console.time("processCapture");
        const aiResult = await processCapture(extractedText);
        console.timeEnd("processCapture");

        const topicDecision = await chooseTopic(
            `${aiResult.title}\n\n${aiResult.markdown}`,
            existingTopics.map((topic) => topic.title)
        );

        const selectedTopicName = topicDecision.topic.trim();
        let topic = existingTopics.find(
            (candidate) => candidate.title.toLocaleLowerCase() === selectedTopicName.toLocaleLowerCase()
        );

        if (topicDecision.action === "existing" && !topic) {
            throw new Error("AI selected an existing topic that is no longer available");
        }

        if (!topic) {
            topic = await prisma.topic.create({
                data: {
                    title: selectedTopicName,
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
                playbookId,
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


