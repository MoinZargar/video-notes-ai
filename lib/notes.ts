import { prompt } from "@/lib/constants";
import { notesModel } from "@/lib/config/notesAI";

export const generateNotes = async (transcript: string[] | undefined) => {
    try {
        const inputPrompt = prompt + transcript
        const result = await notesModel.generateContent(inputPrompt);
        const notes = result.response.text();
        if (!notes) {
            throw new Error("Something went wrong while generating notes")
        }
        return notes;
    } catch (error: any) {
        throw new Error(error.errorDetails[1]?.message)
    }
}
