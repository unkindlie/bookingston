import { ComponentPropsWithRef } from "react";

import "./Input.styles.css";
import { InputLabel } from "./inner/InputLabel";

type InputPropsWithLabel = ComponentPropsWithRef<"input"> & {
    labelText?: string;
};

const Input = ({ ref, labelText, ...props }: InputPropsWithLabel) => {
    return (
        <>
            {labelText && <InputLabel>{labelText}</InputLabel>}
            <input ref={ref} {...props} />
        </>
    );
};

export { Input };
