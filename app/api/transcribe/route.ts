import { NextResponse } from 'next/server';
import { transcribeVideo } from '@/lib/transcribe';
import { TranscribeRequestBody } from '@/types/transcribe';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body: TranscribeRequestBody = await req.json();
    const { videoUrl } = body;
    const session= await getServerSession(authOptions)
    if (!session) {
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

    const transcript = await transcribeVideo(videoUrl);
    console.log("transcript in route", transcript)
    
    const response= {
      success: true,
      transcript,
    };


    return NextResponse.json(response, { status: 200 });

  } catch (error:any) {
    console.log("error", error)
    throw new Error(error)
  }
}
