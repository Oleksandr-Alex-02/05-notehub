
import css from './Modal.module.css'
import { createPortal } from 'react-dom'


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

                </div>
            </div>
        </>,
        document.body
    )
}