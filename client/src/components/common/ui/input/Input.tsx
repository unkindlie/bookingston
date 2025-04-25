import { ComponentPropsWithRef } from "react";

import { InputLabel } from "./inner/InputLabel";

import "./Input.styles.css";

type InputPropsWithLabel = ComponentPropsWithRef<"input"> & {
    labelText?: string;
};

const Input = ({ ref, labelText, required, ...props }: InputPropsWithLabel) => {
    return (
        <>
            {labelText && (
                <div className='label-row'>
                    <InputLabel>{labelText}</InputLabel>
                    {required && <span>*</span>}
                </div>
            )}
            <input ref={ref} {...props} />
        </>
    );
};

export { Input };
