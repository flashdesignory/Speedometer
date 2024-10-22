import Header from "@/partials/header/header";
import Main from "@/partials/main/main";
import Footer from "@/partials/footer/footer";

import styles from "./layout.module.css";

export default function Layout({ children }) {
    return (
        <div className={styles.layout}>
            <Header />
            <Main>{children}</Main>
            <Footer />
        </div>
    );
}
