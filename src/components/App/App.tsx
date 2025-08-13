
import css from './App.module.css'
import { useState } from 'react'
import { useQuery } from "@tanstack/react-query";
import { getNote } from '../../services/noteService';

import NoteList from "../NoteList/NoteList"
import SearchBox from '../SearchBox/SerchBox'
import Modal from '../Modal/Modal'
import NoteForm from '../NoteForm/NoteForm';

export default function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false)

    const { data } = useQuery({
        queryKey: ["notes"],
        queryFn: getNote,
        // enabled: false,
    })

    console.log(data)

    return (
        <>
            <div className={css.app}>
                <header className={css.toolbar}>
                    <SearchBox />
                    {/* Пагінація */}
                    <button className={css.button} onClick={openModal}>Create note +</button>
                </header>
                {data?.results && <NoteList notes={data.results} />}
                {isModalOpen &&
                    <Modal onClose={closeModal}>
                        <NoteForm />
                    </Modal>}
            </div>
        </>
    )
}