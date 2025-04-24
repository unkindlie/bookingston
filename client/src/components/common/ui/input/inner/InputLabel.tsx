import { ComponentPropsWithRef } from "react";

import { cnMerge } from "../../../../../lib/clsx";

import "./InputLabel.styles.css";

const InputLabel = ({
    ref,
    className,
    ...props
}: ComponentPropsWithRef<"label">) => (
    <label
        className={cnMerge("input-label", className!)}
        ref={ref}
        {...props}
    />
);

export { InputLabel };
