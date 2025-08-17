
import css from './App.module.css'
import { useState } from 'react'
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from '../../services/noteService';
import { useDebouncedCallback } from "use-debounce";

import ReactPaginate from 'react-paginate';
import NoteList from "../NoteList/NoteList"
import SearchBox from '../SearchBox/SearchBox'
import Modal from '../Modal/Modal'

export default function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false)

    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSetSearchQuery = useDebouncedCallback(setSearchQuery, 300);
    const [currentPage, setCurrentPage] = useState(1);


    const { data, isLoading } = useQuery({
        queryKey: ["notes", currentPage, searchQuery],
        queryFn: () => fetchNotes(currentPage, searchQuery),
        placeholderData: keepPreviousData,
    })

    console.log(data?.notes)
    const totalPages = data?.totalPages || 0;

    return (
        <>
            <div className={css.app}>
                <header className={css.toolbar}>
                    <SearchBox text={searchQuery} onSearch={debouncedSetSearchQuery} />
                    {totalPages > 1 &&
                        < ReactPaginate
                            pageCount={totalPages}
                            pageRangeDisplayed={5}
                            marginPagesDisplayed={1}
                            onPageChange={({ selected }) => setCurrentPage(selected + 1)}
                            forcePage={currentPage - 1}
                            containerClassName={css.pagination}
                            activeClassName={css.active}
                            nextLabel="→"
                            previousLabel="←"
                        />
                    }
                    <button className={css.button} onClick={openModal}>Create note +</button>
                </header>

                {/* {data && <NoteList notes={data.notes} />} */}
                {/* {data && data?.notes && <NoteList notes={data.notes} />} */}
                {data && data?.notes.length > 0 && <NoteList notes={data.notes} />}

                {/* {totalPages > 1 && isLoading && data && <NoteList notes={data} />} //тут не рендерить розиітку */}
                {/* {totalPages > 1 && isLoading && data && <NoteList notes={data.notes} />} */}

                {/* {isLoading ? < NoteList notes={data.note} /> : "No unread messages"} */}
                {/* {isLoading && <NoteList notes={data.note} />} */}

                {/* {data?.notes.length > 0 ? < NoteList notes={data} /> : "No unread messages"} */}
                {/* {data?.notes === data ? < NoteList notes={data} /> : "No unread messages"} */}

                {isModalOpen && <Modal onSuccess={closeModal} />}
            </div>
        </>
    )
}