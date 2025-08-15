
import css from './NoteForm.module.css'
// import { useId } from 'react';
// import { Formik, Form, Field, FormikHelpers } from 'formik';

import { Note, NoteUpdateData } from '../../types/note'
import { useMutation, useQueryClient } from "@tanstack/react-query";


interface ModalProps {
    onClose: () => void
}

export default function NoteForm({ onClose }: ModalProps) {
    const queryClient = useQueryClient();

    const updateTaskMutation = useMutation({
        mutationFn: (updatedNote: NoteUpdateData) => postNote(updatedNote),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });

    const handleUpdate = (note: Note) => {
        updateTaskMutation.mutate({
            id: note.id,
            content: note.content,
            tag: note.tag,
            title: note.title,
        });
    };


    return (
        <form onSubmit={handleUpdate} className={css.form}>
            <div className={css.formGroup}>
                <label htmlFor="title">Title</label>
                <input id="title" type="text" name="title" className={css.input} />
                {/* <span name="title" className={css.error} /> */}
            </div>

            <div className={css.formGroup}>
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    name="content"
                    rows={8}
                    className={css.textarea}
                />
                {/* <span name="content" className={css.error} /> */}
            </div>

            <div className={css.formGroup}>
                <label htmlFor="tag">Tag</label>
                <select id="tag" name="tag" className={css.select}>
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
                {/* <span name="tag" className={css.error} /> */}
            </div>

            <div className={css.actions}>
                <button onClick={onClose} type="button" className={css.cancelButton}>
                    Cancel
                </button>
                <button
                    // onClick={handleUpdate()}
                    type="submit"
                    className={css.submitButton}
                    disabled={false}
                >
                    Create note
                </button>
            </div>
        </form>

    )
}

