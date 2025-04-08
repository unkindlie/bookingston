"use client";

import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../store/store";
import { themeActions } from "../../../store/slices/theme.slice";

const ReducerTest = () => {
    const value = useSelector((state: RootState) => state.theme.themeValue);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div>
            <span>{value}</span>
            <button onClick={() => dispatch(themeActions.setOtherValue())}>
                Click me
            </button>
        </div>
    );
};

export { ReducerTest };
