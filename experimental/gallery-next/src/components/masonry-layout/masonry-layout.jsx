import { useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import ImageDisplay from "../image-display/image-display";
import styles from "./masonry-layout.module.css";

import { useResizeObserver } from "@/hooks/use-resize-observer/use-resize-observer";
import { useThrottle } from "@/hooks/use-throttle/use-throttle";
import Modal from "@/partials/modal/modal";
import { useDataContext } from "@/context/data-context";

export const getNewHeight = (width, height, targetWidth) => (height / width) * targetWidth;

export default function MasonryLayout() {
    const { data, category } = useDataContext();
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImages, setCurrentImages] = useState(category === "all" ? data.items : data.items.filter(item => item.tags.includes(category)));
    const [sizes, setSizes] = useState(
        currentImages.reduce((accumulator, item) => {
            accumulator[item.id] = { width: 0, height: 0 };
            return accumulator;
        }, {})
    );
    const [containerWidth, setContainerWidth] = useState(-1);
    const { elementRef, disconnect } = useResizeObserver({
        callback: useThrottle(handleOnResize, 0),
    });
    const numColumns = useRef(5);

    const customStyles = {
        width: "100%",
        height: "auto",
    };

    useLayoutEffect(() => {
        const newImages = category === "all" ? data.items : data.items.filter(item => item.tags.includes(category));
        setCurrentImages(newImages);
        resize(containerWidth, newImages);
        window.dispatchEvent(new CustomEvent("gallery-changed", { detail: { id: "masonry", category } }));
    }, [category]);

    function handleOnResize(entries) {
        for (let entry of entries) {
            if (containerWidth === entry.contentRect.width)
                return;

            disconnect();
            setContainerWidth(entry.contentRect.width);
            resize(entry.contentRect.width);
        }
    }

    function rebuild(images) {
        const columns = [];
        // create an array for each column
        for (let i = 0; i < numColumns.current; i++)
            columns[i] = [];

        // push element data in the appropriate column
        for (let i = 0; i < images.length; i++) {
            const index = i % numColumns.current;
            columns[index].push(images[i]);
        }

        return columns;
    }

    const [columns, setColumns] = useState(rebuild(currentImages));

    function resize(width, images = currentImages) {
        const COLUMNS_LOOKUP = {
            __proto__: null,
            721: 3,
            1111: 4,
            1363: 5,
        };

        let selectedKey = 0;
        Object.keys(COLUMNS_LOOKUP).forEach((num) => {
            const val = num / width;
            if (val < 1)
                selectedKey = Math.max(selectedKey, num);
        });

        numColumns.current = COLUMNS_LOOKUP[selectedKey] ?? 2;

        setColumns(rebuild(images));

        const newWidth = width / numColumns.current;
        const newSizes = images.map((entry) => {
            const item = { ...entry.image };
            item.height = getNewHeight(item.width, item.height, newWidth);
            item.width = newWidth;
            item.id = entry.id;
            return item;
        });

        setSizes(
            newSizes.reduce((accumulator, item) => {
                accumulator[item.id] = { width: item.width, height: item.height };
                return accumulator;
            }, {})
        );
    }

    function handleOnClick(data) {
        setSelectedImage(data);
    }

    function closeModal() {
        setSelectedImage(null);
    }

    return (
        <>
            <div className={styles["masonry-container"]} ref={elementRef}>
                <div className={styles["masonry-content"]}>
                    {columns.map((column, index) => {
                        return (
                            <div key={`masonry-column-${index}`} className={styles["masonry-column"]}>
                                {column.map((item) =>
                                    <ImageDisplay key={item.id} id={`masonry-${item.id}`} data={item} width={sizes[item.id].width} height={sizes[item.id].height} containerStyles={customStyles} onClick={handleOnClick}/>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            {selectedImage ? createPortal(<Modal onClose={closeModal} data={selectedImage} />, document.getElementById("modal-container")) : null}
        </>
    );
}
