
import css from './Modal.module.css'
import { createPortal } from 'react-dom'

import NoteForm from '../NoteForm/NoteForm';

interface ModalProps {
    onClose: () => void;
}

export default function Modal({ onClose }: ModalProps) {

    return createPortal(
        <>
            <div
                className={css.backdrop}
                role="dialog"
                aria-modal="true"
            >
                <div className={css.modal}>
                    <button onClick={onClose}>Create note +</button>
                    {/*  */}
                    <NoteForm />
                </div>
            </div>
        </>,
        document.body
    )
}