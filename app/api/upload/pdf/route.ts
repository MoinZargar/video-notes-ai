import { authOptions } from '@/lib/auth';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if(!session || !userId){
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {

        // Strict authentication check
        if (!session || !session.user || !session.user.id) {
          throw new Error('Unauthorized upload attempt');
        }

        const controlledPathname = `users/${session.user.id}/${Date.now()}-${pathname}`;

        return {
          pathname: controlledPathname,
          allowedContentTypes: ['application/pdf'],
          tokenPayload: JSON.stringify({ userId: session.user.id }),
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log('File uploaded successfully:', blob.url);
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