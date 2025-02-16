import  {GoogleGenerativeAI, HarmCategory, HarmBlockThreshold,} from "@google/generative-ai";

  const apiKey = process.env.GEMINI_CHAT_API_KEY;
  const chatAI = new GoogleGenerativeAI(apiKey || "");
  
  const chatModel = chatAI.getGenerativeModel({
    model: "gemini-2.0-flash-lite-preview-02-05",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
export { chatModel, generationConfig };