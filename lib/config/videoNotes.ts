import { GoogleGenerativeAI } from "@google/generative-ai";
import { videoNotesPrompt } from "@/lib/constants";

const videoNotes = new GoogleGenerativeAI(process.env.GEMINI_NOTES_API_KEY || "");
const videoNotesModel = videoNotes.getGenerativeModel({
     model: "gemini-2.0-flash-lite-preview-02-05", 
     systemInstruction: videoNotesPrompt
    });

export { videoNotesModel };