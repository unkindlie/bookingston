"use client";

import { useState } from "react";
import { RiUser3Fill } from "react-icons/ri";

import { HeaderLogo } from "./inner/HeaderLogo";
import { HeaderNavLink } from "./inner/HeaderNavLink";
import { Modal } from "../ui/modal/Modal";
import { useModal } from "../../../hooks/use-modal";

import "./Header.styles.css";
import { Input } from "../ui/input/Input";

const Header = () => {
    const { open, invertOpen } = useModal();
    const [text, setText] = useState("");

    return (
        <>
            <header>
                <div className="header-links">
                    <HeaderLogo />
                    <nav>
                        <HeaderNavLink href="/books" text="Книги" />
                        <HeaderNavLink href="/promos" text="Пропозиції" />
                    </nav>
                </div>
                <div className="header-buttons">
                    <RiUser3Fill size={24} onClick={invertOpen} />
                </div>
            </header>
            <Modal open={open} onClose={invertOpen} title="Авторизація">
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
            </Modal>
        </>
    );
};

export { Header };
