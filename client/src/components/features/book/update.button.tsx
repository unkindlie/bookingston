"use client";

import { TBookDetailed } from "../../../../utils/types/book/book-detailed.type";
import { revalidateBook } from '../../../lib/actions';

type UpdateButtonProps = {
    book: TBookDetailed;
};

export const UpdateButton = ({ book }: UpdateButtonProps) => {
    const date = new Date()
    const updateBook = async () => {
        await fetch("/api/books/edit", {
            method: 'PUT',
            body: JSON.stringify({
                ...book,
                price: book.price.toString(),
                name: date.toUTCString(),
                description: 'asfosihfoidhfisdhfpidsjifdpfdspfhdspfdsipjfdsipjfpidshjfipdshfidsjfipdsjp9fsupfsdup',
            }),
        });
        revalidateBook(book.id)
    };

    return <button onClick={updateBook}>Revalidate</button>;
};
