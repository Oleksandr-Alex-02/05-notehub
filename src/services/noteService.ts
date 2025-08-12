
import axios from 'axios';
import { Note } from "../types/note"

// const VITE_NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api/notes?tag=Todo";

// export const getNote = async () => {
//     const res = await axios.get<Note[]>("/notes");
//     return res.data;
// }

axios.defaults.baseURL = "https://62584f320c918296a49543e7.mockapi.io";

export const getNote = async () => {
    const res = await axios.get<Note[]>("/tasks");
    return res.data;
};