import classNames from "classnames";
import { useDataContext } from "@/context/data-context";

import styles from "./categories.module.css";

export default function Categories() {
    const { data, category, updateCategory } = useDataContext();

    const tags = new Set(["all"]);
    for (const item of data.items) {
        for (const tag of item.tags)
            tags.add(tag);
    }

    function handleClick(event) {
        const category = event.target.getAttribute("data-category");
        updateCategory(category);
    }

    return (
        <div className={styles.container}>
            {Array.from(tags).map((tag) =>
                <button className={classNames(styles.button, { [styles.active]: category === tag })} key={`category-button-${tag}`} data-category={tag} onClick={handleClick}>
                    {tag}
                </button>
            )}
        </div>
    );
}
