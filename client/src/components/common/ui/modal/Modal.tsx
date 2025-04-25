"use client";

import { useCallback, MouseEvent, useRef, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";

import "./Modal.styles.css";

type TModalProps = Partial<{
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
    close: boolean;
}>;

const Modal = ({ open, onClose, title, children, close }: TModalProps) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const handleClose = useCallback(
        (e: MouseEvent<HTMLOrSVGElement>) => {
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
                <div className="modal-header">
                    <span className="modal-title">{title}</span>
                    {close && (
                        <MdOutlineClose onClick={handleClose} size={18} />
                    )}
                </div>
                {children}
            </div>
        </div>
    );
};

export { Modal };
