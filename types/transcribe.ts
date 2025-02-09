export interface TranscribeRequestBody {
    videoUrl: string;
}

export type TranscribeAPIResponse = {
    text: string;
    duration: number;
    offset: number;
    lang?: string | undefined;
}[];




