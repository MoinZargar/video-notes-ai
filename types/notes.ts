export interface NotesRequestBody {
    videoUrl: string;
    transcript: string;
    course: string;
}

interface Note {
    id: string;
    title: string;
    content: string;
    type: 'text' | 'formula' | 'code';
}

export interface NotesType {
    id: string;
    title: string;
    notes: Note[];
}