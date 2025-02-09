export interface NotesRequestBody {
    videoUrl: string;
    transcript: string;
    course: string;
}

export interface NotesResponse {
    notes: string;
}
