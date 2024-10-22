import ImageContainer from "../image-container/image-container";

import { useSize } from "@/hooks/use-size/use-size";

import styles from "./image-display.module.css";

export default function ImageDisplay({ data, width, height, containerStyles = {} }) {
    const { maxWidth, maxHeight, aspectRatio } = useSize({ width, height });
    const customStyles = {
        maxWidth: `${maxWidth}px`,
        maxHeight: `${maxHeight}px`,
        aspectRatio,
        ...containerStyles
    };

    if (maxWidth === 0 || maxHeight === 0) {
        return null;
    }

    return (
        <div className={styles["display-image-container"]} style={customStyles}>
            <div className={styles["display-image-content"]}>
                <ImageContainer {...data.image} />
            </div>
        </div>
    );
}
