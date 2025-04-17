import Link from "next/link";

import "./HeaderNavLink.styles.css";

type HeaderNavLinkProps = {
    text: string;
    href: string;
};

const HeaderNavLink = ({ text, href }: HeaderNavLinkProps) => {
    return <Link className='nav-link' href={href}>{text}</Link>;
};

export { HeaderNavLink };
