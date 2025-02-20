import { del } from '@vercel/blob';
import { NextResponse } from 'next/server';
import db from '@/lib/prisma';
import { generateNotesFromPDF } from '@/lib/notes';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request): Promise<NextResponse> {
  const { blobUrl, course } = await req.json();
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
    return NextResponse.json({ message: 'Notes created successfully' });

  } catch (error: any) {
    console.log("error", error.stack)
    await del(blobUrl);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}