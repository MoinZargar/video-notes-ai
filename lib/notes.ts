import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateNotes = async (transcript: string) => {
    try {
        const prompt = `Generate comprehensive exam-focused notes from the following transcript. Create clear, detailed explanations that will help a student master all concepts for their exams. Structure the notes with main topics, headings, and subheadings. Focus exclusively on topics covered in the transcript. Include key points, definitions, examples, and explanations that ensure complete concept clarity. Present only the educational content, without any introductory text or meta-commentary.

Transcript:
${transcript}`;
        const result = await model.generateContent(prompt);
        return result.response.text()

    } catch (error:any) {
        throw new Error( error.errorDetails[1]?.message)
    }
}

