import { NextResponse } from "next/server";
import { generateVideoNotes } from "@/lib/notes";
import db from "@/lib/prisma";
import { NotesRequestBody } from "@/types/notes";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request){

    try {
        const body: NotesRequestBody = await req.json();
        const { transcript, videoUrl, course } = body;
        const session= await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        if (!transcript || !videoUrl) {
            return NextResponse.json({ error: 'Transcript and videoUrl is required' }, { status: 400 });
        }
        const notes = await generateVideoNotes(transcript);
        const userId = Number(session.user.id);
        const Course = await db.course.findFirst({
            where: {
                userId: userId,
                name: course
            }
        })
        if (!Course) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }
        const courseId = Number(Course.id);        

        if (!notes) {
            return NextResponse.json({ error: 'Failed to generate notes' }, { status: 400 });
        }


        const note = await db.notes.create({
            data: {
                videoUrl: videoUrl,
                content: notes,
                source: "video",
                userId: userId,
                courseId: courseId
            }
        })
        

        return NextResponse.json({
            success: true,
            message: "Notes generated successfully"
        }, { status: 200 });

    } catch(error:any) {
        console.log(error.stack)
        return NextResponse.json({ error: error }, { status: 500 });
    }

}