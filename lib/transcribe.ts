// @ts-ignore
import {YoutubeTranscript } from 'youtube-transcript';
import { TranscribeAPIResponse } from "@/types/transcribe"

export const transcribeVideo = async (videoUrl: string): Promise<string> => {
    try {
        const transcript:TranscribeAPIResponse = await YoutubeTranscript.fetchTranscript(videoUrl);
        const transcription = transcript
            .map(entry => entry.text)
            .join(' ');
        
        return transcription;

    } catch (error:any) {
        console.log("error in transcribeVideo", error)
        throw new Error(error)
    }
}
