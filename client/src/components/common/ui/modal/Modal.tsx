"use client";

import { useCallback, MouseEvent, useRef, useEffect } from "react";

import "./Modal.styles.css";

type TModalProps = Partial<{
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
}>;

const Modal = ({ open, onClose, title, children }: TModalProps) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const handleClose = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            if (e.target === e.currentTarget) {
                ref.current?.classList.replace(
                    "modal-container",
                    "modal-closed",
                );
                const timeout = setTimeout(() => onClose?.(), 300);
                return () => clearTimeout(timeout);
            }
        },
        [onClose],
    );

    useEffect(() => {
        if (open) {
            const timeout = setTimeout(() =>
                ref.current?.classList.replace(
                    "modal-closed",
                    "modal-container",
                ),
            );
            return () => clearTimeout(timeout);
        }
    }, [open]);

    return (
        <div onClick={handleClose} ref={ref} className="modal-closed">
            <div className="modal">
                <span className="modal-title">{title}</span>
                {children}
            </div>
        </div>
    );
};

export { Modal };
