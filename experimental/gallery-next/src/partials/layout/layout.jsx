import { useState } from "react";
import Header from "@/partials/header/header";
import Main from "@/partials/main/main";
import Footer from "@/partials/footer/footer";

import styles from "./layout.module.css";
import Navigation from "@/partials/navigation/navigation";

export default function Layout({ children }) {
    const [customStyles, setCustomStyles] = useState({ width: "100%" });

    function callback(isActive) {
        setCustomStyles({ width: isActive ? "400px" : "100%" });
    }
    return (
        <div className={styles.layout} id="layout" style={customStyles}>
            <Header />
            <Navigation callback={callback} />
            <Main>{children}</Main>
            <Footer />
        </div>
    );
}
