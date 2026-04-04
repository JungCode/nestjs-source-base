import { roundNumberWithTwoDecimals } from './algorithm';

export const standardHour = (
  measurementValue: number,
  standardPerHour: number,
): number => {
  const result = standardPerHour === 0 ? 0 : measurementValue / standardPerHour;
  return roundNumberWithTwoDecimals(result);
};

export const productRequiredQty = (
  measurementValue: number,
  coverage: number,
): number => {
  const result = coverage === 0 ? 0 : measurementValue / coverage;
  return roundNumberWithTwoDecimals(result);
};

export const fullEstimationPrice = (
  costBeforeMarkup: number,
  markup: number,
): number => {
  const result = markup === 0 ? 0 : costBeforeMarkup / markup;
  return roundNumberWithTwoDecimals(result);
};

export const discountEstimationPrice = (
  fullPrice: number,
  discountRate: number,
): number => {
  return fullPrice * discountRate;
};
