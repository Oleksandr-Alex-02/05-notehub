
import css from './App.module.css'
import { useState } from 'react'
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes, NoteData } from '../../services/noteService';
import { useDebouncedCallback } from "use-debounce";

import SearchBox from '../SearchBox/SearchBox'
import Pagination from '../Pagination/Pagination'
import NoteList from "../NoteList/NoteList"
import NoteForm from '../NoteForm/NoteForm';
import Modal from '../Modal/Modal'

export default function App() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false)

    const [inputValue, setInputValue] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const debouncedSetSearchQuery = useDebouncedCallback((value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    }, 300);

    const { data } = useQuery<NoteData>({
        queryKey: ["notes", currentPage, searchQuery],
        queryFn: () => fetchNotes(currentPage, searchQuery),
        placeholderData: keepPreviousData,
    })

    const totalPages = data?.totalPages || 0;

    return (
        <>
            <div className={css.app}>
                <header className={css.toolbar}>
                    <SearchBox text={inputValue}
                        onChange={(value) => {
                            setInputValue(value);
                            debouncedSetSearchQuery(value);
                        }}
                    />
                    {totalPages > 1 &&
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                        />
                    }
                    <button className={css.button} onClick={openModal}>Create note +</button>
                </header>
                {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
                {isModalOpen && (
                    < Modal onClose={closeModal}>
                        <NoteForm onSuccess={closeModal} />
                    </Modal>
                )}
            </div >
        </>
    )
}