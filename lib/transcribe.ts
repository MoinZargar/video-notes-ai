// lib/transcribe.ts
import { getYouTubeVideoId } from "@/lib/videoId";

// Free CORS proxy services
const FREE_PROXIES = [
  'https://corsproxy.io/?',
  'https://api.allorigins.win/raw?url=',
  'https://api.codetabs.com/v1/proxy?quest=',
];

export const transcribeVideo = async (
  videoUrl: string
): Promise<string[] | undefined> => {
  try {
    const video_id = getYouTubeVideoId(videoUrl);
    
    console.log(`Fetching transcript for: ${video_id}`);
    
    // Try multiple methods in order
    const methods = [
      () => fetchWithRotatingProxies(video_id),
      () => fetchViaEmbed(video_id),
      () => fetchDirectWithDelay(video_id),
    ];

    for (let i = 0; i < methods.length; i++) {
      try {
        console.log(`Trying method ${i + 1}...`);
        const transcript = await methods[i]();
        
        if (transcript && transcript.length > 0) {
          console.log(`✓ Successfully fetched ${transcript.length} segments`);
          return transcript;
        }
      } catch (error: any) {
        console.log(`Method ${i + 1} failed:`, error.message);
        continue;
      }
    }

    throw new Error('All methods failed to fetch transcript');
    
  } catch (error: any) {
    console.error('Error fetching transcript:', error);
    throw error;
  }
};

// Method 1: Try multiple free CORS proxies
async function fetchWithRotatingProxies(videoId: string): Promise<string[]> {
  for (const proxy of FREE_PROXIES) {
    try {
      console.log(`Trying proxy: ${proxy.substring(0, 30)}...`);
      
      // Fetch video page through proxy
      const videoPageUrl = `https://www.youtube.com/watch?v=${videoId}`;
      const proxiedUrl = proxy + encodeURIComponent(videoPageUrl);
      
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(proxiedUrl, {
        headers: getRandomHeaders(),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`Proxy returned ${response.status}`);
      }

      const html = await response.text();
      
      // Extract caption tracks
      const captionUrl = extractCaptionUrl(html);
      
      if (!captionUrl) {
        throw new Error('No caption URL found');
      }

      // Fetch transcript XML through proxy
      const transcriptController = new AbortController();
      const transcriptTimeout = setTimeout(() => transcriptController.abort(), 10000);
      
      const transcriptResponse = await fetch(
        proxy + encodeURIComponent(captionUrl),
        {
          headers: getRandomHeaders(),
          signal: transcriptController.signal,
        }
      );

      clearTimeout(transcriptTimeout);

      if (!transcriptResponse.ok) {
        throw new Error(`Transcript fetch failed: ${transcriptResponse.status}`);
      }

      const xml = await transcriptResponse.text();
      const transcript = parseTranscriptXML(xml);

      if (transcript.length > 0) {
        console.log(`✓ Proxy worked!`);
        return transcript;
      }

    } catch (error: any) {
      console.log(`Proxy failed: ${error.message}`);
      continue;
    }
  }

  throw new Error('All proxies failed');
}

// Method 2: Try via embed page
async function fetchViaEmbed(videoId: string): Promise<string[]> {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  
  for (const proxy of FREE_PROXIES) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch(
        proxy + encodeURIComponent(embedUrl),
        {
          headers: getRandomHeaders(),
          signal: controller.signal,
        }
      );

      clearTimeout(timeout);

      if (!response.ok) continue;

      const html = await response.text();
      const captionUrl = extractCaptionUrl(html);

      if (!captionUrl) continue;

      const transcriptController = new AbortController();
      const transcriptTimeout = setTimeout(() => transcriptController.abort(), 10000);
      
      const transcriptResponse = await fetch(
        proxy + encodeURIComponent(captionUrl),
        {
          headers: getRandomHeaders(),
          signal: transcriptController.signal,
        }
      );

      clearTimeout(transcriptTimeout);

      if (!transcriptResponse.ok) continue;

      const xml = await transcriptResponse.text();
      const transcript = parseTranscriptXML(xml);

      if (transcript.length > 0) {
        return transcript;
      }
    } catch (error) {
      continue;
    }
  }

  throw new Error('Embed method failed');
}

// Method 3: Direct fetch with random delays
async function fetchDirectWithDelay(videoId: string): Promise<string[]> {
  // Random delay between 1-3 seconds
  await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  
  const response = await fetch(
    `https://www.youtube.com/watch?v=${videoId}`,
    {
      headers: getRandomHeaders(),
      signal: controller.signal,
    }
  );

  clearTimeout(timeout);

  if (!response.ok) {
    throw new Error(`Direct fetch failed: ${response.status}`);
  }

  const html = await response.text();
  const captionUrl = extractCaptionUrl(html);

  if (!captionUrl) {
    throw new Error('No caption URL found');
  }

  const transcriptController = new AbortController();
  const transcriptTimeout = setTimeout(() => transcriptController.abort(), 10000);
  
  const transcriptResponse = await fetch(captionUrl, {
    headers: getRandomHeaders(),
    signal: transcriptController.signal,
  });

  clearTimeout(transcriptTimeout);

  if (!transcriptResponse.ok) {
    throw new Error(`Transcript fetch failed: ${transcriptResponse.status}`);
  }

  const xml = await transcriptResponse.text();
  return parseTranscriptXML(xml);
}

// Helper: Extract caption URL from HTML
function extractCaptionUrl(html: string): string | null {
  try {
    const captionsMatch = html.match(/"captionTracks"\s*:\s*(\[[\s\S]*?\])/);
    
    if (!captionsMatch) {
      return null;
    }

    let captionsJson = captionsMatch[1];
    let depth = 0;
    let endIndex = 0;
    
    for (let i = 0; i < captionsJson.length; i++) {
      if (captionsJson[i] === '[') depth++;
      if (captionsJson[i] === ']') depth--;
      if (depth === 0) {
        endIndex = i + 1;
        break;
      }
    }
    
    captionsJson = captionsJson.substring(0, endIndex);
    const captionTracks = JSON.parse(captionsJson);
    
    const track = captionTracks.find((t: any) => 
      t.languageCode?.startsWith('en') && t.kind !== 'asr'
    ) || captionTracks.find((t: any) => 
      t.languageCode?.startsWith('en')
    ) || captionTracks[0];

    return track?.baseUrl || null;
  } catch (error) {
    console.error('Error extracting caption URL:', error);
    return null;
  }
}

// Helper: Parse transcript XML
function parseTranscriptXML(xml: string): string[] {
  const transcript: string[] = [];
  
  // Try <text> tags
  const textRegex = /<text[^>]*>([\s\S]*?)<\/text>/g;
  let match;

  while ((match = textRegex.exec(xml))) {
    if (match[1]) {
      const text = decodeHTMLEntities(match[1]).trim();
      if (text) transcript.push(text);
    }
  }

  // Try <p> tags if no <text> tags found
  if (transcript.length === 0) {
    const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/g;
    while ((match = pRegex.exec(xml))) {
      if (match[1]) {
        const text = decodeHTMLEntities(match[1]).trim();
        if (text) transcript.push(text);
      }
    }
  }

  return transcript;
}

// Helper: Get random headers to avoid detection
function getRandomHeaders() {
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15',
  ];

  const acceptLanguages = [
    'en-US,en;q=0.9',
    'en-GB,en;q=0.9',
    'en-US,en;q=0.9,es;q=0.8',
  ];

  return {
    'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)],
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': acceptLanguages[Math.floor(Math.random() * acceptLanguages.length)],
    'Accept-Encoding': 'gzip, deflate, br',
    'DNT': '1',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Cache-Control': 'max-age=0',
  };
}

// Helper: Decode HTML entities
function decodeHTMLEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ');
}