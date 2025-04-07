import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: "soft-pink",
    reducers: {},
});

const themeReducer = themeSlice.reducer;
const themeActions = themeSlice.actions;

export { themeReducer, themeActions };
