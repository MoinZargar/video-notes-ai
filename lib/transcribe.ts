import {YoutubeTranscript } from 'youtube-transcript';
import { getYouTubeVideoId } from "@/lib/videoId"
import { TranscribeAPIResponse } from "@/types/transcribe"

export const transcribeVideo = async (videoUrl: string): Promise<string> => {
    try {
        const transcript:TranscribeAPIResponse = await YoutubeTranscript.fetchTranscript(videoUrl);
        const transcription = transcript
            .map(entry => entry.text)
            .join(' ');
        if (!transcription) {
            throw new Error("Failed to transcribe video")
        }
        return transcription;

    } catch (error:any) {
        throw new Error(error?.message || "Failed to transcribe video")
    }
}
