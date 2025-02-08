import { NextResponse } from 'next/server';
import { transcribeVideo } from '@/lib/transcribe';
import { TranscribeRequestBody, TranscribeResponse } from '@/types/transcribe';

export async function POST(req: Request) {
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
    const response: TranscribeResponse = {
      success: true,
      transcript,
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error:any) {
    throw new Error(error?.response?.data?.message || "Failed to transcribe video")
  }
}
