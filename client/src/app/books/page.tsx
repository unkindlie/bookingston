import Link from "next/link";

import { TBookShort } from "../../../utils/types/book/book-short.type";
import { fetcher } from "../../lib/fetcher";
import { TPagedData } from "../../../utils/types/default/paged-response.type";
import styles from "./styles.module.css";

const BookPage = async () => {
    const books = await fetcher<TPagedData<TBookShort>>("/books", {
        cache: "no-store",
    });

    return (
        <div className={styles.main}>
            <h1>Books page</h1>
            <div className={styles.booksContainer}>
                {books.data?.items.map((book) => (
                    <Link key={book.id} href={`/books/${book.id}`}>
                        {book.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BookPage;
