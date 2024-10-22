import styles from "./footer.module.css";

export default function Footer() {
    return <div className={styles.footer}>© {new Date().getFullYear()}</div>;
}
