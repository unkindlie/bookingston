"use client";

import { useCallback, MouseEvent } from "react";

import "./Modal.styles.css";
import { cnMerge } from "../../../../lib/clsx";

type TModalProps = Partial<{
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
}>;

const Modal = ({ open, onClose, title, children }: TModalProps) => {
    const handleClose = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            if (e.target === e.currentTarget) {
                onClose?.();
            }
        },
        [onClose],
    );

    return (
        <div
            className={cnMerge(open ? "modal-container" : "modal-closed")}
            onClick={handleClose}
        >
            <div className="modal">
                <span className="modal-title">{title}</span>
                {children}
            </div>
        </div>
    );
};

export { Modal };
