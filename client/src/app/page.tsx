"use client";

import { BookOutput } from "../components/features/book/book-data-output/BookOutput";
import styles from "./styles.module.css";

export default function Home() {
    return (
        <main className={styles.mainSector}>
            <BookOutput />
        </main>
    );
}
