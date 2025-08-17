
export interface NoteData {
    notes: Note,
    totalPages: number,
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
    title: string;
    tag: string,
    content: string,
}

export interface NoteFormType {
    title: string,
    tag?: string,
    content?: string,
}

export type NoteId = Note["id"];

// ("Todo" | "Work" | "Personal" | "Meeting" | "Shopping")[]