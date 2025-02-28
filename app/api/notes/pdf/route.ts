import { del } from '@vercel/blob';
import { NextResponse } from 'next/server';
import db from '@/lib/prisma';
import { generateNotesFromPDF } from '@/lib/notes';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { checkUsage } from '@/app/actions/checkUsage';
import { error } from 'console';
import { stat } from 'fs';

export async function POST(req: Request): Promise<NextResponse> {
  const { blobUrl, course } = await req.json();
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const dailyUsage = await checkUsage('pdf')
    if(!dailyUsage.allowed){
       return NextResponse.json({ error : dailyUsage.message},{ status:402 })
    }
    if (!blobUrl || !course) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const userId = Number(session.user.id);
    const notes = await generateNotesFromPDF(blobUrl);

    const courseData = await db.course.findFirst({
      where: {
        userId: userId,
        name: course
      }
    })

    if (!courseData) {
      throw new Error('Course not found');
    }
    const NotesData = await db.notes.create({
      data: {
        content: notes,
        source: "pdf",
        courseId: courseData.id,
        userId: userId
      }
    })
    // Delete the blob after processing
    await del(blobUrl);
    return NextResponse.json({ message: 'Notes created successfully' }, {status: 200});

  } catch (error: any) {
    console.log("error", error.stack)
    await del(blobUrl);
    return NextResponse.json(
      { error: error?.message || "Something went wrong while processing pdf" },
      { status: 500 }
    );
  }
}