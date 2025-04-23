"use client";

import Image from "next/image";

import { useGetBooksQuery } from "../../../../services/books.api";

const BookOutput = () => {
    const { data: bookResponse, isError, error } = useGetBooksQuery();

    if (isError || !bookResponse) {
        console.log(error);

        return <span>Error</span>;
    }

    if (bookResponse.data) return (
        <Image
            alt="image"
            src={bookResponse.data.items[0].imageUrl}
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: '25%', height: 'auto' }}
        />
    );
};

export { BookOutput };
