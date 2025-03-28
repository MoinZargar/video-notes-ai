import { NextResponse } from 'next/server';
import { transcribeVideo } from '@/lib/transcribe';
import { TranscribeRequestBody } from '@/types/transcribe';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request): Promise<NextResponse> {
  const session = await getServerSession(authOptions);
  try {
    const body: TranscribeRequestBody = await req.json();
    const { videoUrl } = body;

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    if (!videoUrl) {
      return NextResponse.json(
        { error: 'Video URL is required' },
        { status: 400 }
      );
    }

    const transcript: string[] | undefined = await transcribeVideo(videoUrl);
    return NextResponse.json({ success: true, transcript }, { status: 200 });

  } catch (error: any) {
    console.error("API Error:", error.message);
    return NextResponse.json(
      { error: error.message || 'Failed to transcribe video' },
      { status: 500 }
    );
  }
  finally {
    console.log("user ", session?.user?.email)
  } 
}
