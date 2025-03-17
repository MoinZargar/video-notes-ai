import { chatModel, generationConfig } from "@/lib/config/chatAI";
import { ChatMessage } from "@/types/chat";

export const chatBot = async (message: string, history: ChatMessage[]): Promise<string> => {
    try {
        const chatSession = chatModel.startChat({
            generationConfig,
            history:[
                ...history,
            ]
        });

        const result = await chatSession.sendMessage(message)
        if (!result.response.text()) {
            throw new Error("Something went wrong while generating response")
        }
        return result.response.text();
    } catch (error: any) {
        console.log(error.stack)
        console.log(error?.response?.data?.message)
        throw new Error("Something went wrong while generating response")
    }
}

