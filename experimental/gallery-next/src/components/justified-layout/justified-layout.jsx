import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import ImageDisplay from "../image-display/image-display";
import styles from "./justified-layout.module.css";

import { useResizeObserver } from "@/hooks/use-resize-observer/use-resize-observer";
import { useThrottle } from "@/hooks/use-throttle/use-throttle";
import Modal from "@/partials/modal/modal";
import { useDataContext } from "@/context/data-context";

export default function JustifiedLayout() {
    const { data, category } = useDataContext();
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImages, setCurrentImages] = useState(category === "all" ? data.items : data.items.filter(item => item.tags.includes(category)));
    const [sizes, setSizes] = useState(
        currentImages.map(() => ({
            width: 0,
            height: 0,
        }))
    );
    const [containerWidth, setContainerWidth] = useState(-1);
    const { elementRef, disconnect } = useResizeObserver({
        callback: useThrottle(handleOnResize, 250),
    });

    useLayoutEffect(() => {
        const newImages = category === "all" ? data.items : data.items.filter(item => item.tags.includes(category));
        setCurrentImages(newImages);
        resize(containerWidth, newImages);
        window.dispatchEvent(new CustomEvent("gallery-ready", { detail: { id: "masonry" } }));
    }, [category]);

    useLayoutEffect(() => {
        window.dispatchEvent(new CustomEvent("gallery-ready", { detail: { id: "masonry" } }));
    }, []);

    function handleOnResize(entries) {
        for (let entry of entries) {
            if (containerWidth === entry.contentRect.width)
                return;

            disconnect();
            setContainerWidth(entry.contentRect.width);
            resize(entry.contentRect.width);
        }
    }

    function resize(width, images = currentImages) {
        let row = [];
        let currentWidth = 0;
        const newSizes = images.map((entry, index) => {
            const item = { ...entry.image };
            row.push(item);
            currentWidth += Math.ceil((data.imageMaxHeight / item.height) * item.width);

            if (currentWidth >= width || index === sizes.length - 1) {
                const height = Math.floor((width / currentWidth) * data.imageMaxHeight);
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

    function closeModal() {
        setSelectedImage(null);
    }

    return (
        <>
            <div className={styles["justified-layout-container"]} ref={elementRef}>
                <div className={styles["justified-layout-content"]}>
                    {currentImages.map((item, index) =>
                        <ImageDisplay key={item.id} id={`justified-${item.id}`} data={item} width={sizes[index].width} height={sizes[index].height} onClick={handleOnClick}/>
                    )}
                </div>
            </div>
            {selectedImage ? createPortal(<Modal onClose={closeModal} data={selectedImage} />, document.getElementById("modal-container")) : null}
        </>
    );
}
