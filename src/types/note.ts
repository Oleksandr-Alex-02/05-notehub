
export interface Note {
    id: string,
    tag: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
}

export interface NoteFormType {
    title: string,
    tag: string,
    content?: string,
}
