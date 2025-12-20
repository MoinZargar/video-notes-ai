// lib/transcribe.ts
import { getYouTubeVideoId } from "@/lib/videoId";

const CLOUDFLARE_WORKER_URL = process.env.NEXT_PUBLIC_CLOUDFLARE_WORKER_URL || '';

export const transcribeVideo = async (
  videoUrl: string
): Promise<string[] | undefined> => {
  try {
    const video_id = getYouTubeVideoId(videoUrl);
    
    console.log(`Fetching transcript via Cloudflare Worker for: ${video_id}`);

    if (!CLOUDFLARE_WORKER_URL) {
      throw new Error('CLOUDFLARE_WORKER_URL is not configured');
    }
    
    const response = await fetch(
      `${CLOUDFLARE_WORKER_URL}?video_id=${video_id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch transcript');
    }

    const data = await response.json();
    
    if (!data.success || !data.transcript) {
      throw new Error('Invalid response from worker');
    }

    console.log(`✓ Successfully fetched ${data.segment_count} segments`);
    
    return data.transcript;
  } catch (error: any) {
    console.error('Error fetching transcript:', error);
    throw error;
  }
};