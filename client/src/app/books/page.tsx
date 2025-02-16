import Link from "next/link";

import { TBookShort } from "../../../utils/types/book/book-short.type";
import { fetcher } from "../../lib/fetcher";
import { PagedResponse } from '../../../utils/types/default/paged-response';

const BookPage = async () => {
    const books = await fetcher<PagedResponse<TBookShort>>("/books", {
        cache: 'no-store'
    });

    if (books.data.length === 0) console.log(books);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-2">
            <span className="text-3xl">Books page</span>
            <div className="grid grid-cols-3 gap-2">
                {books.data.map((book) => (
                    <Link key={book.id} href={`/books/${book.id}`}>
                        {book.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BookPage;
