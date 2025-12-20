export interface NotesRequestBody {
    videoUrl: string;
    course: string;
}

export interface NotesResponse {
    notes: string;
}
