import { GoogleGenerativeAI } from "@google/generative-ai";
import { videoNotesPrompt } from "@/lib/constants";

const videoNotesAI = new GoogleGenerativeAI(process.env.GEMINI_VIDEO_NOTES_API_KEY || "");
const videoNotesModel = videoNotesAI.getGenerativeModel({
     model: "gemini-2.0-flash-lite-preview-02-05", 
     systemInstruction: videoNotesPrompt
    });

export { videoNotesModel };