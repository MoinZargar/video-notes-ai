// Server-side direct YouTube transcript fetcher
// Exports a single method `transcribeVideo` that fetches the watch page,
// extracts `ytInitialPlayerResponse`, retrieves the caption `baseUrl`,
// then fetches and parses captions (VTT or timedtext XML).

import { getYouTubeVideoId } from "@/lib/videoId";

export const transcribeVideo = async (
  videoUrl: string
): Promise<string[] | undefined> => {
  const videoId = getYouTubeVideoId(videoUrl);

  // Helper functions are scoped inside the single exported method to keep
  // the module surface to only one exported symbol as requested.
  const extractPlayerResponse = (html: string) => {
    const key = 'ytInitialPlayerResponse';
    const idx = html.indexOf(key);
    if (idx === -1) return null;
    const start = html.indexOf('{', idx);
    if (start === -1) return null;

    let i = start;
    let brace = 0;
    for (; i < html.length; i++) {
      const ch = html[i];
      if (ch === '{') brace++;
      else if (ch === '}') {
        brace--;
        if (brace === 0) {
          const jsonStr = html.slice(start, i + 1);
          try {
            return JSON.parse(jsonStr);
          } catch (e) {
            return null;
          }
        }
      }
    }
    return null;
  };

  const parseVtt = (vtt: string) => {
    const lines = vtt.split(/\r?\n/);
    const blocks: string[] = [];
    let buffer: string[] = [];

    for (const raw of lines) {
      const line = raw.trim();
      if (!line) {
        if (buffer.length) {
          blocks.push(buffer.join(' ').replace(/\s+/g, ' ').trim());
          buffer = [];
        }
        continue;
      }
      if (/^\d+$/.test(line) || line.includes('-->')) continue;
      buffer.push(line);
    }

    if (buffer.length) blocks.push(buffer.join(' ').replace(/\s+/g, ' ').trim());
    return blocks;
  };

  const parseTimedText = (xml: string) => {
    const matches = [...xml.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)];
    return matches.map((m) => decodeHtmlEntities(m[1].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()));
  };

  const decodeHtmlEntities = (str: string) => {
    if (!str) return str;
    str = str.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
    return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  };

  try {
    const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    if (!res.ok) throw new Error(`Failed to fetch video page: ${res.status}`);

    const html = await res.text();
    const playerResponse = extractPlayerResponse(html);

    const captionTracks = playerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
    if (!captionTracks || !captionTracks.length) {
      throw new Error('No captions found on this video');
    }

    const track = captionTracks.find((t: any) => t.languageCode === 'en' || (t.vssId && t.vssId.includes('en'))) || captionTracks[0];
    let baseUrl = track.baseUrl as string;

    if (!baseUrl.includes('fmt=')) baseUrl += '&fmt=vtt';

    const captionRes = await fetch(baseUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    if (!captionRes.ok) throw new Error(`Failed to fetch captions: ${captionRes.status}`);

    const body = await captionRes.text();
    let segments: string[] = [];

    if (body.trim().startsWith('WEBVTT')) {
      segments = parseVtt(body);
    } else if (body.trim().startsWith('<')) {
      segments = parseTimedText(body);
    } else {
      segments = [body];
    }

    return segments;
  } catch (error) {
    console.error('Error fetching direct transcript:', error);
    throw error;
  }
};