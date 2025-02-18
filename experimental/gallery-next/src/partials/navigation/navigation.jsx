import { NavLink } from "react-router-dom";
import classNames from "classnames";
import JustifiedIcon from "@/assets/justified-icon";
import MasonryIcon from "@/assets/masonry-icon";
import styles from "./navigation.module.css";
import Toggle from "../toggle/toggle";
import OrientationIcon from "@/assets/orientation-icon";

export default function Navigation({ callback }) {
    return (
        <nav className={styles["page-navigation"]} aria-label="main menu">
            <div className={styles["page-navigation-row"]}>
                <div className={styles["page-navigation-column-center"]}>
                    <NavLink to="/" id="nav-link-justified" className={({ isActive }) => classNames(styles["page-navigation-button"], { [styles.active]: isActive })}>
                        <JustifiedIcon />
                    </NavLink>
                    <NavLink to="/masonry" id="nav-link-masonry" className={({ isActive }) => classNames(styles["page-navigation-button"], { [styles.active]: isActive })}>
                        <MasonryIcon />
                    </NavLink>
                    <Toggle icon={OrientationIcon} callback={callback}/>
                </div>
            </div>
        </nav>
    );
}
