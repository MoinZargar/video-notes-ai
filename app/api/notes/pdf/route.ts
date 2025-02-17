import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { del } from '@vercel/blob';
import { NextResponse } from 'next/server';
import db from '@/lib/prisma'; 
import { generateNotesFromPDF } from '@/lib/notes';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = Number(session?.user?.id);
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        // Generate a token for the client to upload the file
        return {
          allowedContentTypes: ['application/pdf'],
          tokenPayload: clientPayload
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        try {
          
            const { course } = JSON.parse(tokenPayload as string);
          // Generate notes using the blob URL
          const notes = await generateNotesFromPDF(blob.pathname,blob.url);
          console.log(notes);
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
          await del(blob.url);
        } catch (error) {
          throw new Error('Failed to generate notes or update database');
        }
      },
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}