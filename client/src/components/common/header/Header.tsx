import { HeaderLogo } from "./inner/HeaderLogo";
import { HeaderNavLink } from "./inner/HeaderNavLink";
import "./Header.styles.css";

const Header = () => {
    return (
        <header>
            <HeaderLogo />
            <nav>
                <HeaderNavLink href="/books" text="Книги" />
            </nav>
        </header>
    );
};

export { Header };
