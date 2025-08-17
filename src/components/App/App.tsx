
import css from './App.module.css'
import { useState } from 'react'
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from '../../services/noteService';
import { useDebouncedCallback } from "use-debounce";
import { NoteData } from '../../types/note'

import Pagination from '../Pagination/Pagination'
import NoteList from "../NoteList/NoteList"
import SearchBox from '../SearchBox/SearchBox'
import Modal from '../Modal/Modal'
import NoteForm from '../NoteForm/NoteForm';

export default function App() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false)

    const [searchQuery, setSearchQuery] = useState<string>("");
    const debouncedSetSearchQuery = useDebouncedCallback(setSearchQuery, 300);
    const [currentPage, setCurrentPage] = useState<number>(1);

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
                    <SearchBox text={searchQuery} onSearch={debouncedSetSearchQuery} />
                    {totalPages > 1 &&
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                        />
                    }
                    <button className={css.button} onClick={openModal}>Create note +</button>
                </header>

                {/* {data && <NoteList notes={data.notes} />} */}
                {/* {data && data?.notes && <NoteList notes={data.notes} />} */}
                {/* {data && <NoteList notes={data.notes} />} */}
                {data && data.notes.length > 0 && <NoteList notes={data.notes} />}


                {/* {totalPages > 1 && isLoading && data && <NoteList notes={data} />} //тут не рендерить розиітку */}
                {/* {totalPages > 1 && isLoading && data && <NoteList notes={data.notes} />} */}

                {/* {isLoading ? < NoteList notes={data.note} /> : "No unread messages"} */}
                {/* {isLoading && <NoteList notes={data.note} />} */}

                {/* {data?.notes.length > 0 ? < NoteList notes={data} /> : "No unread messages"} */}
                {/* {data?.notes === data ? < NoteList notes={data} /> : "No unread messages"} */}

                {isModalOpen && (
                    < Modal onClose={closeModal}>
                        <NoteForm onSuccess={closeModal} />
                    </Modal>
                )}
            </div >
        </>
    )
}