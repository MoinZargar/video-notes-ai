import { GoogleGenerativeAI } from "@google/generative-ai";
import { videoNotesPrompt } from "@/lib/constants";
import { safetySettings } from "@/lib/constants";

const videoNotesAI = new GoogleGenerativeAI(process.env.GEMINI_VIDEO_NOTES_API_KEY || "");
const videoNotesModel = videoNotesAI.getGenerativeModel({
     model: "gemini-2.5-flash-lite", 
     systemInstruction: videoNotesPrompt,
     safetySettings: safetySettings,
    });

export { videoNotesModel };