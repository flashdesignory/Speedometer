import { useLayoutEffect } from "react";
import Image from "next/image";
import styles from "./image-container.module.css";

export default function ImageContainer({ src, alt, width, height, id }) {
    useLayoutEffect(() => {
        window.dispatchEvent(new CustomEvent("image-ready", { detail: { id } }));
    }, []);

    function handleLoadingComplete() {
        window.dispatchEvent(new CustomEvent("image-loaded", { detail: { id } }));
    }

    return (
        <div className={styles["image-container"]}>
            <Image className={styles.image} src={`./${src}`} alt={alt} width={width} height={height} onLoadingComplete={handleLoadingComplete} />
        </div>
    );
}
