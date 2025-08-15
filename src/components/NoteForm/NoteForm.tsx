

// треба зробити відправку форми.

import css from './NoteForm.module.css'
import { useId } from 'react';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';

import { postNote } from '../../services/noteService'
import { NoteUpdateData, NoteFormType } from '../../types/note'
import { useMutation, useQueryClient } from "@tanstack/react-query";


interface ModalProps {
    onClose: () => void
}

const initialValues: NoteFormType = {
    title: "",
    content: "",
    tag: [],
};

export default function NoteForm({ onClose }: ModalProps) {
    const fieldId = useId();
    const queryClient = useQueryClient();

    const updateNoteMutation = useMutation({
        mutationFn: (updatedNote: NoteUpdateData) => postNote(updatedNote),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });

    // const handleUpdate = (note: Note) => {
    //     updateTaskMutation.mutate({
    //         id: note.id,
    //         content: note.content,
    //         tag: note.tag,
    //         title: note.title,
    //     });
    // };

    const handleSubmit = async (
        values: NoteFormType,
        formikHelpers: FormikHelpers<NoteFormType>
    ) => {
        // await new Promise((r) => setTimeout(r, 1500));

        console.log(values);
        formikHelpers.resetForm();
    };

    return (

        < Formik initialValues={initialValues} onSubmit={handleSubmit} className={css.form} >
            <Form>
                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-title`}>Title</label>
                    <Field id={`${fieldId}-title`} type="text" name="title" className={css.input} />
                    <ErrorMessage
                        name="title"
                        component="span"
                        className={css.error}
                    />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-content`}>Content</label>
                    <Field
                        as="textarea"
                        id={`${fieldId}-content`}
                        name="content"
                        rows={8}
                        className={css.textarea}
                    />
                    <ErrorMessage
                        name="content"
                        component="span"
                        className={css.error}
                    />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-tag`}>Tag</label>
                    <Field as="select" id={`${fieldId}-tag`} name="tag" className={css.select}>
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </Field>
                    <ErrorMessage
                        name="tag"
                        component="span"
                        className={css.error}
                    />
                </div>

                <div className={css.actions}>
                    <button onClick={onClose} type="button" className={css.cancelButton}>
                        Cancel
                    </button>
                    <button
                        // onClick={onClose}
                        type="submit"
                        className={css.submitButton}
                        disabled={false}
                    >
                        Create note
                    </button>
                </div>
            </Form>
        </Formik >

    )
}

