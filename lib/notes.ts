
import { videoNotesModel } from "@/lib/config/videoNotesAI";
import { fileManager, pdfNotesModel } from "./config/pdfNotesAI";
import { getYouTubeVideoId } from "@/lib/videoId";

export const generateNotesFromVideo = async (videoUrl: string): Promise<string> => {
    try {
        // Extract video ID and construct full YouTube URL
        const videoId = getYouTubeVideoId(videoUrl);
        const fullVideoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        
        console.log(`Generating notes from video: ${videoId}`);
        
        // Generate notes directly from video URL
        const result = await videoNotesModel.generateContent(fullVideoUrl);
        const notes = result.response.text();
        
        if (!notes || notes.trim().length === 0) {
            throw new Error("Failed to generate notes from video");
        }
        
        console.log(`Successfully generated notes (${notes.length} characters)`);
        
        return notes;
        
    } catch (error: any) {
        console.log("Error generating notes:", error.stack);
        
        
        if (error.message?.includes('API key')) {
            throw new Error('API key is not configured properly');
        }
        
        if (error.message?.includes('quota')) {
            throw new Error('API quota exceeded. Please try again later.');
        }
        
        if (error.message?.includes('SAFETY')) {
            throw new Error('Video content was blocked by safety filters');
        }
        
        if (error.message?.includes('token count exceeds')) {
            throw new Error('Video is too long. Please try a shorter video.');
        }
        
        if (error.errorDetails?.[0]?.message) {
            console.log("error details:", error.errorDetails[0].message);
        }
        
        throw new Error("Something went wrong while processing video");
    }
}

export const generateNotesFromPDF= async (fileUrl: string):Promise<string>  => {
    try {

        const pdfResp = await fetch(fileUrl)
            .then((response) => response.arrayBuffer());

            const result = await pdfNotesModel.generateContent([
                {
                    inlineData: {
                        data: Buffer.from(pdfResp).toString("base64"),
                        mimeType: "application/pdf",
                    },
                },
                'Please generate notes from the given pdf file according to the system instruction',
            ]);
            const notes = result.response.text();
            return notes;

    } catch (error: any) {
        console.log("error", error.stack)
        throw new Error("Something went wrong while processing pdf")
    }
}
