
import css from './NoteForm.module.css'
import { useId } from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';


interface FormValues {
    title: string,
    content: string,
    tag: string,
}


const initialValues: FormValues = {
    title: "",
    content: "",
    tag: "",
};


export default function NoteForm() {
    // const fieldId = useId();


    const handleSubmit = (formData: FormData) => {
        console.log(formData.values);

    };

    return (
        < Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className={css.form} >
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
                    <button type="button" className={css.cancelButton}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={css.submitButton}
                    // disabled="false"
                    >
                        Create note
                    </button>
                </div>
            </Form>
        </Formik>
    )
}

// interface OrderFormValues {
//     username: string;
//     email: string;
// }

// const initialValues: OrderFormValues = {
//     username: 'Jacob',
//     email: 'j.mercer@mail.com',
// };

// export default function NoteForm() {
//     const fieldId = useId();

// const handleSubmit = (
//     values: OrderFormValues,
//     actions: FormikHelpers<OrderFormValues>
// ) => {
//     console.log('Order data:', values);
//     actions.resetForm();
// };

//     return (
//         <Formik initialValues={initialValues} onSubmit={handleSubmit}>
//             <Form>
//                 <fieldset >
//                     <legend >Client Info</legend>

//                     <label htmlFor={`${fieldId}-username`}>Name</label>
//                     <Field type="text" name="username" id={`${fieldId}-username`}
//                     />
//                     <label htmlFor={`${fieldId}-email`}>Email</label>
//                     <Field type="email" name="email" id={`${fieldId}-email`}
//                     />
//                 </fieldset>
//                 <button type="submit">Place order</button>
//             </Form>
//         </Formik>
//     );
// }
