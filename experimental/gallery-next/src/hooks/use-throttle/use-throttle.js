export function useThrottle(
    fn,
    delay,
    options = { leading: true, trailing: true }
) {
    const { leading, trailing } = options;
    let last = 0;
    let timeout;

    return function (...args) {
        const now = new Date().getTime();
        clearTimeout(timeout);

        if (!leading && last === 0) {
            last = now;
        }

        if (now - last < delay) {
            if (trailing) {
                const difference = now - last;
                const leftOverDelay = delay - difference;
                timeout = setTimeout(() => fn.apply(this, args), leftOverDelay);
            }
            return;
        }

        last = now;
        fn.apply(this, args);
    };
}
