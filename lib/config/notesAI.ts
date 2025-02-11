import { GoogleGenerativeAI } from "@google/generative-ai";

const notesAI = new GoogleGenerativeAI(process.env.GEMINI_NOTES_API_KEY || "");
const notesModel = notesAI.getGenerativeModel({ model: "gemini-2.0-flash-lite-preview-02-05" });

export { notesModel };