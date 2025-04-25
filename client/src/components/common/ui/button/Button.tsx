import { cnMerge } from "../../../../lib/clsx";
import "./Button.styles.css";

import { ComponentPropsWithRef } from "react";

const Button = ({ className, ...props }: ComponentPropsWithRef<"button">) => (
    <button className={cnMerge("button-default", className)} {...props} />
);

export { Button };
