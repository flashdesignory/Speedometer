import { useState } from "react";
import classNames from "classnames";
import styles from "./toggle.module.css";

export default function Toggle({ icon, callback, id }) {
    const [isActive, setIsActive] = useState(false);
    const IconComponent = icon;

    function toggleState() {
        callback(!isActive);
        setIsActive(!isActive);
    }

    return <button id={id} className={classNames(styles["toggle"], { [styles.active]: isActive })} onClick={toggleState}>{IconComponent ? <IconComponent /> : null}</button>;
}
