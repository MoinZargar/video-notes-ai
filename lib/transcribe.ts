// First install: npm install youtube-transcript-plus

import { fetchTranscript } from 'youtube-transcript-plus';
import { getYouTubeVideoId } from "@/lib/videoId";

/**
 * Simple approach using youtube-transcript-plus
 */
export const transcribeVideo = async (
  videoUrl: string
): Promise<string[] | undefined> => {
  try {
    const video_id = getYouTubeVideoId(videoUrl);
    
    // Fetch transcript using the library
    const transcriptData = await fetchTranscript(video_id, {
      lang: 'en', // Language preference
    });

    // Extract text from transcript segments
    const transcript = transcriptData.map((segment) => segment.text);
    return transcript;
  } catch (error) {
    console.error('Error fetching transcript:', error);
    throw error;
  }
};

/**
 * Advanced approach with custom proxy
 */
export const transcribeVideoWithProxy = async (
  videoUrl: string,
  proxyServerUrl: string
): Promise<string[] | undefined> => {
  try {
    const video_id = getYouTubeVideoId(videoUrl);
    
    // Custom fetch function that routes through your proxy
    const customFetch = async ({ url, lang, userAgent }: any) => {
      return fetch(`${proxyServerUrl}?url=${encodeURIComponent(url)}`, {
        headers: {
          ...(lang && { 'Accept-Language': lang }),
          'User-Agent': userAgent,
        },
      });
    };

    // Fetch transcript with custom fetch handlers
    const transcriptData = await fetchTranscript(video_id, {
      lang: 'en',
      videoFetch: customFetch,
      playerFetch: async ({ url, method, body, headers, lang, userAgent }: any) => {
        return fetch(`${proxyServerUrl}?url=${encodeURIComponent(url)}`, {
          method,
          headers: {
            ...(lang && { 'Accept-Language': lang }),
            'User-Agent': userAgent,
            ...headers,
          },
          body,
        });
      },
      transcriptFetch: customFetch,
    });

    // Extract text from transcript segments
    const transcript = transcriptData.map((segment) => segment.text);
    
    return transcript;
  } catch (error) {
    console.error('Error fetching transcript:', error);
    throw error;
  }
};