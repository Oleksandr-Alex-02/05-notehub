
import axios from 'axios';
import { Note } from "../types/note"

const VITE_NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

interface NoteResponse {
    results: Note[];
}

export const getNote = async () => {
    const res = await axios.get<NoteResponse>(
        "/notes", {
        params: {
            //  
        },
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${VITE_NOTEHUB_TOKEN}`,
        }
    }
    );
    return res.data;
};