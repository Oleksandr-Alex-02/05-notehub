
import css from './App.module.css'
import { useState } from 'react'
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getNote } from '../../services/noteService';
import ReactPaginate from 'react-paginate';


import NoteList from "../NoteList/NoteList"
import SearchBox from '../SearchBox/SearchBox'
import Modal from '../Modal/Modal'


export default function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false)

    const [currentPage, setCurrentPage] = useState(1);

    const { data } = useQuery({
        queryKey: ["notes", currentPage],
        queryFn: () => getNote(currentPage),
        placeholderData: keepPreviousData,
    })

    const totalPages = data?.totalPages || 0;

    return (
        <>
            <div className={css.app}>
                <header className={css.toolbar}>
                    <SearchBox />
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
                {data?.notes && <NoteList notes={data.notes} />}
                {isModalOpen && <Modal onSuccess={closeModal} />}
            </div>
        </>
    )
}
// пошук