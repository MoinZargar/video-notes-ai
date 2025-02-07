export interface TranscribeRequestBody {
    videoUrl: string;
}

export interface TranscribeResponse {
    success: boolean;
    transcript: string;
}


