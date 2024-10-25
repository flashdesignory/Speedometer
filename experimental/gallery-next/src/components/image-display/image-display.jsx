import ImageContainer from "../image-container/image-container";

import { useSize } from "@/hooks/use-size/use-size";

import styles from "./image-display.module.css";

export default function ImageDisplay({ data, width, height, containerStyles = {}, onClick }) {
    const { maxWidth, maxHeight, aspectRatio } = useSize({ width, height });
    const customStyles = {
        maxWidth: `${maxWidth}px`,
        maxHeight: `${maxHeight}px`,
        aspectRatio,
        ...containerStyles,
    };

    function handleOnClick() {
        onClick(data);
    }

    if (maxWidth === 0 || maxHeight === 0)
        return null;

    return (
        <div className={styles["display-image-container"]} style={customStyles} id={data.id}>
            <div className={styles["display-image-content"]} onClick={handleOnClick} >
                <ImageContainer {...data.image} />
            </div>
        </div>
    );
}
