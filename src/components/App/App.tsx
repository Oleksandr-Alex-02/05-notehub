
import css from './App.module.css'

import NoteList from "../NoteList/NoteList"
import SearchBox from '../SearchBox/SerchBox'
// import Modal from '../Modal/Modal'

export default function App() {

    return (
        <>
            <div className={css.app}>
                <header className={css.toolbar}>
                    <SearchBox />
                    {/* Пагінація */}
                    <button className={css.button}>Create note +</button>
                </header>
                <NoteList />
                {/* <Modal /> */}
            </div>
        </>
    )
}