export interface ChatWindowSizeType {
    width: string
    height: string
}

export interface ChatMessagePart {
    text: string
}

export interface ChatMessage {
    role: 'user' | 'model'
    parts: ChatMessagePart[]
}
export interface ChatRequestBody {
    message: string
    history: ChatMessage[]
}

export interface ChatWindowSize {
    width: string
    height: string
}



