import Link from "next/link";

import styles from "./styles.module.css";

export default function Home() {
    return (
        <main className={styles.mainSector}>
            <h1>Bookingston</h1>
            <Link className={styles.link} href={"/books"}>
                Go to books
            </Link>
        </main>
    );
}
