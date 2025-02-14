import { chatModel, generationConfig } from "@/lib/config/chatAI";
import { chatPrompt } from "./constants";
import { ChatMessage } from "@/types/chat";

export const chatBot = async (message: string, history: ChatMessage[]): Promise<string> => {
    try {
        const chatSession = chatModel.startChat({
            generationConfig,
            history: [
                {
                    role: "user",
                    parts: [
                        { text: chatPrompt },
                    ],
                },
                ...history,
            ],
        });

        const result = await chatSession.sendMessage(message)
        if (!result.response.text()) {
            throw new Error("Something went wrong while generating response")
        }
        return result.response.text();
    } catch (error: any) {
        console.log(error)
        throw new Error(error?.response?.data?.message || "Something went wrong while generating response")
    }
}

