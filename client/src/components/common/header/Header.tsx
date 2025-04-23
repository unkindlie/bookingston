"use client";

import { RiUser3Fill } from "react-icons/ri";

import { HeaderLogo } from "./inner/HeaderLogo";
import { HeaderNavLink } from "./inner/HeaderNavLink";
import { Modal } from "../ui/modal/Modal";
import { useModal } from "../../../hooks/use-modal";

import "./Header.styles.css";

const Header = () => {
    const { open, invertOpen } = useModal();

    return (
        <>
            <header>
                <div className="header-links">
                    <HeaderLogo />
                    <nav>
                        <HeaderNavLink href="/books" text="Книги" />
                    </nav>
                </div>
                <div className="header-buttons">
                    <RiUser3Fill size={24} onClick={invertOpen} />
                </div>
            </header>
            <Modal open={open} onClose={invertOpen} title="Авторизація" />
        </>
    );
};

export { Header };
