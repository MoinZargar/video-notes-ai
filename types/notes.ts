export interface NotesRequestBody {
    videoUrl: string;
    transcript: string[] | undefined;
    course: string;
}

export interface NotesResponse {
    notes: string;
}
