export const roundTo100th = num => roundTo(num, 100);
export const roundTo10th = num => roundTo(num, 10);
export const roundToWhole = num => roundTo(num, 1);
const roundTo = (num, multiplier) => Math.round(num * multiplier) / multiplier;
