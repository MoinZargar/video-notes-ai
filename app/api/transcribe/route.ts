import { NextResponse } from 'next/server';
import { TranscribeRequestBody } from '@/types/transcribe';

// Helpful debug to confirm module loads during import
console.log('> Loading /api/transcribe route');

export async function POST(req: Request): Promise<NextResponse> {
  // Lazy imports to avoid import-time failures that can prevent Next from seeing the HTTP methods
  const [{ getServerSession }, { authOptions }] = await Promise.all([
    import('next-auth'),
    import('@/lib/auth'),
  ]);

  const { transcribeVideo } = await import('@/lib/transcribe');

  const session = await getServerSession(authOptions);

  try {
    const body: TranscribeRequestBody = await req.json();
    const { videoUrl } = body;

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!videoUrl) {
      return NextResponse.json({ error: 'Video URL is required' }, { status: 400 });
    }

    const transcript: string[] | undefined = await transcribeVideo(videoUrl);
    return NextResponse.json({ success: true, transcript }, { status: 200 });

  } catch (error: any) {
    console.error('API Error:', error?.message || error);
    return NextResponse.json({ error: error?.message || 'Failed to transcribe video' }, { status: 500 });
  } finally {
    console.log('user', session?.user?.email);
  }
}
