import { useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import ImageDisplay from "../image-display/image-display";
import styles from "./masonry-layout.module.css";

import { useResizeObserver } from "@/hooks/use-resize-observer/use-resize-observer";
import { useThrottle } from "@/hooks/use-throttle/use-throttle";
import Modal from "@/partials/modal/modal";

export const getNewHeight = (width, height, targetWidth) => (height / width) * targetWidth;

export default function MasonryLayout({ data = { items: [] } }) {
    const [selectedImage, setSelectedImage] = useState(null);

    useLayoutEffect(() => {
        window.dispatchEvent(new CustomEvent("gallery-ready", { detail: { id: "masonry" } }));
    }, []);

    function closeModal() {
        setSelectedImage(null);
    }

    const numColumns = useRef(3);
    function rebuild() {
        const columns = [];
        // create an array for each column
        for (let i = 0; i < numColumns.current; i++)
            columns[i] = [];

        // push element data in the appropriate column
        for (let i = 0; i < data.items.length; i++) {
            const index = i % numColumns.current;
            columns[index].push(data.items[i]);
        }

        return columns;
    }

    const [columns, setColumns] = useState(rebuild());

    const customStyles = {
        width: "100%",
        height: "auto",
    };

    const [sizes, setSizes] = useState(
        data.items.reduce((accumulator, item) => {
            accumulator[item.id] = { width: 0, height: 0 };
            return accumulator;
        }, {})
    );

    const [containerWidth, setContainerWidth] = useState(-1);
    const { elementRef, disconnect } = useResizeObserver({
        callback: useThrottle(handleOnResize, 0),
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
        /* if (containerWidth >= 1363)
            numColumns.current = 5;
        else if (containerWidth >= 1111)
            numColumns.current = 4;
        else if (containerWidth >= 859 )
            numColumns.current = 3;
        else
            numColumns.current = 2; */

        const COLUMNS_LOOKUP = {
            __proto__: null,
            721: 3,
            1111: 4,
            1363: 5,
        };

        let selectedKey = 0;
        Object.keys(COLUMNS_LOOKUP).forEach((num) => {
            // console.log(num, num / containerWidth)
            const val = num / containerWidth;
            if (val < 1)
                selectedKey = Math.max(selectedKey, num);
        });

        numColumns.current = COLUMNS_LOOKUP[selectedKey] ?? 2;

        setColumns(rebuild());

        const newWidth = containerWidth / numColumns.current;
        const newSizes = data.items.map((entry) => {
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
