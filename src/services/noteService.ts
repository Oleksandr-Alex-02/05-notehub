
import axios from 'axios';
import { NoteData, NoteId } from "../types/note"

const VITE_NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";


export const getNote = async () => {
    const res = await axios.get<NoteData[]>(
        "/notes", {
        params: {
            // totalPages: totalPages,
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
        "/notes", {
        params: {
            id: noteId,
        },
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${VITE_NOTEHUB_TOKEN}`,
        }
    }
    );
    return res.data;
}

export const postNote = async () => {
    const res = await axios.post<NoteData>(
        "/notes", {
        params: {
            "title": "Sample Note",
            "content": "",
            "tag": "Todo",
        },
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