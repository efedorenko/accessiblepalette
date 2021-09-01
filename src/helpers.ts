const roundTo = (num: number, multiplier: number): number => Math.round(num * multiplier) / multiplier;

export const roundTo100th = (num: number): number => roundTo(num, 100);

export const roundTo10th = (num: number): number => roundTo(num, 10);

export const roundToWhole = (num: number): number => roundTo(num, 1);
