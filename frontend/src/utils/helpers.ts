export const rangeWithStep = (start: number, stepValue: number, steps: number) =>
    Array(steps)
        .fill(0)
        .map((v, i) => start + i * stepValue);
