import { configureStore } from "@reduxjs/toolkit";

import { themeReducer } from "./slices/theme.slice";
import { bookApi } from "../services/books.api";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        [bookApi.reducerPath]: bookApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(bookApi.middleware),
});

export type RootState = ReturnType<(typeof store)["getState"]>;
export type AppDispatch = typeof store.dispatch;
