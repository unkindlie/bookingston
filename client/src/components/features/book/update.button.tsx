"use client";

import { TBookEdit } from '../../../../utils/types/book/book-edit.type';
import { revalidateBook } from "../../../lib/actions";
import styles from "./update.button.module.css";

type UpdateButtonProps = {
    book: TBookEdit;
};

export const UpdateButton = ({ book }: UpdateButtonProps) => {
    const updateBook = async () => {
        await fetch("/api/books/edit", {
            method: "PUT",
            body: JSON.stringify({
                ...book,
                description:
                    "asfosihfoidhfisdhfpidsjifdpfdspfhdspfdsipjfdsipjfpidshjfipdshfidsjfipdsjp9fsupfsdup",
            }),
        });
        revalidateBook(book.id);
    };

    return (
        <button className={styles.updateButton} onClick={updateBook}>
            Revalidate
        </button>
    );
};
