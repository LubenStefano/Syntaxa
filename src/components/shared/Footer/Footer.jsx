import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.brand}>SYNTAXA</span>
        <span className={styles.copy}>© 2026</span>
      </div>
    </footer>
  );
}