import { Link } from "react-router-dom";
import styles from "./error.module.scss";

export default function Error404() {
    return (
        <main className={styles.errorpage}>
            <h1 className={styles.title}>404! Page not found</h1>
            <Link to="/">
                <button className={styles.actionbtn}>Go to dashboard</button>
            </Link>
        </main>
    );
}
