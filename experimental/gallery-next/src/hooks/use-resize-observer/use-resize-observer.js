import { useRef, useEffect } from "react";

export function useResizeObserver({ callback }) {
    const elementRef = useRef(undefined);
    let resizeObserver = useRef(undefined);

    useEffect(
        function () {
            const element = elementRef.current;
            resizeObserver.current = new ResizeObserver(callback);
            resizeObserver.current.observe(element);

            return function () {
                if (resizeObserver.current) {
                    resizeObserver.current.unobserve(element);
                }
            };
        },
        [callback]
    );

    function disconnect() {
        if (resizeObserver.current) {
            resizeObserver.current.disconnect();
        }
    }

    return { elementRef, disconnect };
}
