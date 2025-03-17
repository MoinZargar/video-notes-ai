import  {GoogleGenerativeAI, HarmCategory, HarmBlockThreshold,} from "@google/generative-ai";
import { chatPrompt } from "../constants";

  const apiKey = process.env.GEMINI_CHAT_API_KEY;
  const chatAI = new GoogleGenerativeAI(apiKey || "");

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ];

  const chatModel = chatAI.getGenerativeModel({
    model: "gemini-2.0-flash-lite",
    systemInstruction:chatPrompt,
    safetySettings,
  
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
export { chatModel, generationConfig };