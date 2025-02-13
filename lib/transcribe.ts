import { Innertube } from 'youtubei.js/web';
import { getYouTubeVideoId } from "@/lib/videoId"

export const transcribeVideo = async (videoUrl: string): Promise<string[] | undefined> => {
  const youtube = await Innertube.create({
    lang: 'en',
    location: 'US',
    retrieve_player: false,
  });

  const video_id = getYouTubeVideoId(videoUrl);

  try {
    const info = await youtube.getInfo(video_id);
    const title = info.primary_info?.title.text;
    const transcriptData = await info.getTranscript();
    const transcript =
      transcriptData?.transcript?.content?.body?.initial_segments.map(
        (segment) => segment.snippet.text
      );
    const filteredTranscript = transcript?.filter((text): text is string => text !== undefined);
    return filteredTranscript;
  } catch (error) {
    console.error('Error fetching transcript:', error);
    throw error;
  }
};