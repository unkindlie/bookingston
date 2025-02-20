import { TBookDetailed } from "../../../../utils/types/book/book-detailed.type";
import { fetcher } from "../../../lib/fetcher";
import { UpdateButton } from "../../../components/features/book/update.button";
import styles from "./styles.module.css";

const fetchFunc = async (id: string) =>
    await fetcher<TBookDetailed>(`/books/${id}`, {
        next: { tags: [`book-${id}`] },
    });

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    const book = await fetchFunc(id);

    return {
        title: book.name,
        description:
            book.description ??
            "There is no description for that book for now.",
    };
};

const BookDetailedPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    const book = await fetchFunc(id);

    return (
        <div className={styles.bookDescription}>
            <h1>{book.name}</h1>
            <span>
                {book.description ?? "There is no description for that moment."}
            </span>
            <span>Price: {book.price} UAH</span>
            <span>Quantity: {book.quantity} pcs</span>
            <UpdateButton book={book} />
        </div>
    );
};

export default BookDetailedPage;
