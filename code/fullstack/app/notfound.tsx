import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="not-found-title">
        <p className={styles.eyebrow}>Page not found</p>
        <h1 className={styles.code} id="not-found-title">
          404
        </h1>
        <h2 className={styles.heading}>This page went missing.</h2>
        <p className={styles.message}>
          The link may be incorrect, or the page may have been moved.
        </p>
        <Link className={styles.homeLink} href="/">
          Go back home
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </section>
    </main>
  );
}
