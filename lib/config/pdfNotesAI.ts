import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { pdfNotesPrompt } from "@/lib/constants";

const pdfNotesAI = new GoogleGenerativeAI(process.env.GEMINI_PDF_NOTES_API_KEY || "");
const fileManager = new GoogleAIFileManager(process.env.GEMINI_PDF_NOTES_API_KEY || "");
const pdfNotesModel = pdfNotesAI.getGenerativeModel({ 
    model: 'gemini-2.0-flash-lite-preview-02-05',
    systemInstruction: pdfNotesPrompt
});

export { fileManager, pdfNotesModel };
