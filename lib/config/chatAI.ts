import  {GoogleGenerativeAI, HarmCategory, HarmBlockThreshold,} from "@google/generative-ai";
import { chatPrompt } from "../constants";
import { safetySettings } from "@/lib/constants";

  const apiKey = process.env.GEMINI_CHAT_API_KEY;
  const chatAI = new GoogleGenerativeAI(apiKey || "");

  const chatModel = chatAI.getGenerativeModel({
    model: "gemini-2.0-flash-lite",
    systemInstruction:chatPrompt,
    safetySettings:safetySettings,
  
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
export { chatModel, generationConfig };