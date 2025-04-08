import Link from "next/link";

import { ReducerTest } from "../components/features/test/ReducerTest";
import styles from "./styles.module.css";

export default function Home() {
    return (
        <main className={styles.mainSector}>
            <h1>Bookingston</h1>
            <Link className={styles.link} href={"/books"}>
                Go to books
            </Link>
            <ReducerTest />
        </main>
    );
}
