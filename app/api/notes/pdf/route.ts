import { del } from '@vercel/blob';
import { NextResponse } from 'next/server';
import db from '@/lib/prisma'; 
import { generateNotesFromPDF } from '@/lib/notes';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request): Promise<NextResponse> {

  try {
    const session = await getServerSession(authOptions);
    
    const userId = Number(session?.user?.id);
    const { blobUrl, course } = await req.json();
    const notes = await generateNotesFromPDF(blobUrl);
    
    const courseData = await db.course.findFirst({
        where: {
          name: course,
          userId: userId
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

  } catch (error:any) {
    console.log("error", error.stack)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}