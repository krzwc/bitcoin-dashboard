export const rangeWithStep = (start: number, stepValue: number, steps: number) =>
    Array(steps)
        .fill(0)
        .map((v, i) => start + i * stepValue);

const calculateDiff = (referencePrice: number, currentPrice: number) => currentPrice - referencePrice;

export const presentDiff = (referencePrice: number, currentPrice: number) => {
    const diff = Number(calculateDiff(referencePrice, currentPrice).toFixed(2));

    return diff > 0 ? `+${diff}` : diff;
};

const calculatePercentage = (referencePrice: number, currentPrice: number) =>
    Number(calculateDiff(referencePrice, currentPrice)) / referencePrice;

export const presentPercentage = (referencePrice: number, currentPrice: number) => {
    const perc = Number(calculatePercentage(referencePrice, currentPrice).toFixed(2));

    return perc > 0 ? `+${perc}%` : `${perc}%`;
};
