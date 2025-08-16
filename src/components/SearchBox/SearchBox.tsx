
import css from './SearchBox.module.css'

interface SearchBoxProps {
    text: string;
    onSearch: (newSearchQuery: string) => void;
}

export default function SearchBox({ onSearch, text }: SearchBoxProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <>
            <input
                onChange={handleChange}
                className={css.input}
                type="text"
                defaultValue={text}
                placeholder="Search notes"
            />
        </>

    )
}