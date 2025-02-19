import { useState } from "react";
import { createPortal } from "react-dom";
import ImageDisplay from "../image-display/image-display";
import styles from "./justified-layout.module.css";

import { useResizeObserver } from "@/hooks/use-resize-observer/use-resize-observer";
import { useThrottle } from "@/hooks/use-throttle/use-throttle";
import Modal from "@/partials/modal/modal";

export default function JustifiedLayout({ data = { items: [] }, imageMaxHeight = 480 }) {
    const [selectedImage, setSelectedImage] = useState(null);

    function closeModal() {
        setSelectedImage(null);
    }

    const [sizes, setSizes] = useState(
        data.items.map(() => ({
            width: 0,
            height: 0,
        }))
    );
    const [containerWidth, setContainerWidth] = useState(-1);
    const { elementRef, disconnect } = useResizeObserver({
        callback: useThrottle(handleOnResize, 250),
    });

    function handleOnResize(entries) {
        for (let entry of entries) {
            if (containerWidth === entry.contentRect.width)
                return;

            disconnect();
            setContainerWidth(entry.contentRect.width);
            resize(entry.contentRect.width);
        }
    }

    function resize(containerWidth) {
        let row = [];
        let currentWidth = 0;
        const newSizes = data.items.map((entry, index) => {
            const item = { ...entry.image };
            row.push(item);
            currentWidth += Math.ceil((imageMaxHeight / item.height) * item.width);

            if (currentWidth >= containerWidth || index === sizes.length - 1) {
                const height = Math.floor((containerWidth / currentWidth) * imageMaxHeight);
                row.forEach((image) => {
                    const width = Math.floor((height / image.height) * image.width);
                    image.width = width;
                    image.height = height;
                });
                row = [];
                currentWidth = 0;
            }
            return item;
        });

        setSizes(newSizes);
    }

    function handleOnClick(data) {
        setSelectedImage(data);
    }

    return (
        <>
            <div className={styles["justified-layout-container"]} ref={elementRef}>
                <div className={styles["justified-layout-content"]}>
                    {data.items.map((item, index) =>
                        <ImageDisplay key={item.id} id={`justified-${item.id}`} data={item} width={sizes[index].width} height={sizes[index].height} onClick={handleOnClick}/>
                    )}
                </div>
            </div>
            {selectedImage ? createPortal(<Modal onClose={closeModal} data={selectedImage} />, document.getElementById("modal-container")) : null}
        </>
    );
}
