import Image from 'next/image';
import styles from "./image-container.module.css";

export default function ImageContainer({src, alt, width, height}) {
    return (
        <div className={styles["image-container"]}>
            <Image className={styles.image} src={src} alt={alt} width={width} height={height} />
        </div>
    )
}