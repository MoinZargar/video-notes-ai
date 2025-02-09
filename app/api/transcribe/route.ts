import { NextResponse } from 'next/server';
import { transcribeVideo } from '@/lib/transcribe';
import { TranscribeRequestBody } from '@/types/transcribe';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body: TranscribeRequestBody = await req.json();
    const { videoUrl } = body;

    if (!videoUrl) {
      return NextResponse.json(
        { error: 'Video URL is required' },
        { status: 400 }
      );
    }

    const transcript = await transcribeVideo(videoUrl);
    if (!transcript) {
      return NextResponse.json({ error: 'Failed to transcribe video' }, { status: 500 });
    }
    const response= {
      success: true,
      transcript,
    };


    return NextResponse.json(response, { status: 200 });

  } catch (error:any) {
    throw new Error(error?.response?.data?.message || "Failed to transcribe video")
  }
}
