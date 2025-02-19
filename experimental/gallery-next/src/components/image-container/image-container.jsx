import { useLayoutEffect } from "react";
import Image from "next/image";
import styles from "./image-container.module.css";

export default function ImageContainer({ src, alt, width, height, id }) {
    useLayoutEffect(() => {
        const imageEvent = new CustomEvent("image-ready", {
            detail: { id }
        });
        window.dispatchEvent(imageEvent);
    }, []);
    return (
        <div className={styles["image-container"]}>
            <Image className={styles.image} src={`./${src}`} alt={alt} width={width} height={height} />
        </div>
    );
}
