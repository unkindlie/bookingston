import Link from "next/link";

import styles from "./AppLogo.module.css";

const AppLogo = () => {
    return (
        <Link href={"/"} className={styles.logo}>
            Bookingston
        </Link>
    );
};

export { AppLogo };
