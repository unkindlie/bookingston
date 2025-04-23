import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { TResponse } from "../../utils/types/default/response.type";
import { TBookShort } from "../../utils/types/book/book-short.type";
import { TPagedData } from "../../utils/types/default/paged-response.type";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const bookApi = createApi({
    reducerPath: "book",
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getBooks: builder.query<TResponse<TPagedData<TBookShort>>, void>({
            query: () => "books",
        }),
    }),
});

export const { useGetBooksQuery } = bookApi;
