import { prompt } from "@/lib/constants";
import { model } from "@/lib/config/genAI";

export const generateNotes = async (transcript: string) => {
    try {
        const inputPrompt = prompt + transcript
        const result = await model.generateContent(inputPrompt);
        const notes = result.response.text();
        console.log("notes", notes)
        return notes;
    } catch (error: any) {
        throw new Error(error.errorDetails[1]?.message)
    }
}
