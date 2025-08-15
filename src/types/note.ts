
export interface NoteData {
    notes: Note,
    totalPages: string,
}

export interface Note {
    id: string,
    tag: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
}

export interface NoteUpdateData {
    id: string;
    title: string;
    content: string,
    tag: string,
}

export interface NoteFormType {
    title?: string,
    content?: string,
    tag?: ("Todo" | "Work" | "Personal" | "Meeting" | "Shopping")[]
}

export type NoteId = Note["id"];
