
import css from './NoteList.module.css'
import { Note, } from '../../types/note'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote, } from '../../services/noteService';

interface NoteListProps {
    notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
    const queryClient = useQueryClient();

    const deleteTaskMutation = useMutation({
        mutationFn: (id: string) => deleteNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });

    // const updateTaskMutation = useMutation({
    //     mutationFn: (updatedNote: NoteUpdateData) => patchNote(updatedNote),
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ["notes"] });
    //     },
    // });

    // const handleUpdate = (note: Note) => {
    //     updateTaskMutation.mutate({
    //         id: note.id,
    //         content: note.content,
    //         tag: note.tag,
    //         title: note.title,
    //     });
    // };

    return (
        <ul className={css.list}>
            {notes.map((note) => (
                < li key={note.id} className={css.listItem}>
                    <h2 className={css.title}>{note.title}</h2>
                    <p className={css.content}>{note.content}</p>
                    <div className={css.footer}>
                        <span className={css.tag}>{note.tag}</span>
                        <button onClick={() => deleteTaskMutation.mutate(note.id)} className={css.button}>Delete</button>
                    </div>
                </li>
            ))}
        </ul >
    )
}



