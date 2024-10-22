const gcd = (a, b) => (b ? gcd(b, a % b) : a);

const getAspectRatioForStyles = (width, height) => {
    const divisor = gcd(width, height);
    return `${width / divisor}/${height / divisor}`;
};

export function useSize({ width, height }) {
    const maxWidth = width;
    const maxHeight = height;
    const aspectRatio = getAspectRatioForStyles(width, height);

    return { maxWidth, maxHeight, aspectRatio };
}
