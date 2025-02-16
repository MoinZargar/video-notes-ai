
import { videoNotesModel } from "@/lib/config/videoNotes";

export const generateVideoNotes = async (transcript: string[] | undefined) => {
    try {
        const input= transcript?transcript:""
        const result = await videoNotesModel.generateContent(input);
        const notes = result.response.text();
        if (!notes) {
            throw new Error("Something went wrong while generating notes")
        }
        return notes;
    } catch (error: any) {
        throw new Error(error.errorDetails[1]?.message)
    }
}

