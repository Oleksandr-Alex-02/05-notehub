
import css from './Modal.module.css'
import { createPortal } from 'react-dom'
import { useEffect } from 'react';

import NoteForm from '../NoteForm/NoteForm';


interface ModalProps {
    onSuccess: () => void,
}

export default function Modal({ onSuccess }: ModalProps) {

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.code === 'Escape') onSuccess();
        };
        window.addEventListener('keydown', handleEsc);
        return () => { window.removeEventListener('keydown', handleEsc) }
    }, [onSuccess]);

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'auto'
        }
    });

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onSuccess();
    }

    return createPortal(
        <>
            <div
                onClick={handleBackdropClick}
                className={css.backdrop}
                role="dialog"
                aria-modal="true"
            >
                <div className={css.modal}>
                    <NoteForm onSuccess={onSuccess} />
                </div>
            </div>
        </>,
        document.body
    )
}