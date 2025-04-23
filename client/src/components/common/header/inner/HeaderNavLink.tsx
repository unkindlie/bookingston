import Link from "next/link";

import "./HeaderNavLink.styles.css";

type HeaderNavLinkProps = {
    text: string;
    href: string;
};

const HeaderNavLink = ({ text, href }: HeaderNavLinkProps) => (
    <Link className="nav-link" href={href}>
        {text}
    </Link>
);

export { HeaderNavLink };
