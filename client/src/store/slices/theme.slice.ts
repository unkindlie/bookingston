import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    themeValue: "soft-pink",
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setOtherValue: (state) => {
            state.themeValue = "soft-blue";
        },
    },
});

const themeReducer = themeSlice.reducer;
const themeActions = themeSlice.actions;

export { themeReducer, themeActions };
