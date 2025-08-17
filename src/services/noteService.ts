
import axios from 'axios';
import { NoteData, NoteId, NoteFormType } from "../types/note"

const VITE_NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";


export const getNote = async (currentPage: number, searchQuery: string) => {
    const res = await axios.get<NoteData>(
        "/notes", {
        params: {
            search: searchQuery,
            page: currentPage,
        },
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${VITE_NOTEHUB_TOKEN}`,
        }
    }
    );
    return res.data;
};

export const deleteNote = async (noteId: NoteId) => {
    const res = await axios.delete<NoteData>(
        `/notes/${noteId}`, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${VITE_NOTEHUB_TOKEN}`,
        }
    }
    );
    return res.data;
}

export const postNote = async (noteData: NoteFormType) => {
    const res = await axios.post<NoteData>(
        "/notes", noteData, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${VITE_NOTEHUB_TOKEN}`,
        }
    }
    );
    return res.data;
}

interface NoteUpdate {
    id: NoteId,
    title: string,
    content: string,
    tag: string,
}

export const patchNote = async (noteUpdate: NoteUpdate) => {
    const res = await axios.patch<NoteData>(
        '/note/ ${ noteUpdate }', noteUpdate, {
        params: {

        },
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${VITE_NOTEHUB_TOKEN}`,
        }
    });
    return res.data;
}