import {YoutubeTranscript } from 'youtube-transcript';
import { TranscribeAPIResponse } from "@/types/transcribe"

export const transcribeVideo = async (videoUrl: string): Promise<string> => {
    try {
        const transcript = await YoutubeTranscript.fetchTranscript(videoUrl);
        return transcript.map(entry => entry.text).join(' ');
    } catch (error: any) {
        console.error("Error in transcribeVideo:", error.message);
        throw new Error('Failed to fetch transcript: ' + error.message);
    }
};
