import { Decimal } from 'decimal.js';

export function getRandomNumber(length: number): string {
  return (
    Math.floor(Math.random() * (9 * Math.pow(10, length - 1))) +
    Math.pow(10, length - 1)
  ).toString();
}

type GroupByResult<T, K extends string | number | symbol> = Record<K, T[]>;

export function groupBy<T, K extends string | number | symbol>(
  array: T[],
  keySelector: (item: T) => K,
): GroupByResult<T, K> {
  return array.reduce<GroupByResult<T, K>>(
    (result, item) => {
      const key = keySelector(item);
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item);
      return result;
    },
    {} as GroupByResult<T, K>,
  );
}

export function getNextFormattedNumber(currentIndex: number): string {
  return (currentIndex + 1).toString().padStart(6, '0');
}

export function roundNumberWithTwoDecimals(value: number): number {
  if (value === Infinity || !value) {
    return 0;
  }

  return Math.round(value * 100) / 100;
}

export function roundNumberWithNDecimals(
  value: number,
  digits: number,
): number {
  const tenToN = 10 ** digits;
  return Math.round(value * tenToN) / tenToN;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hasAnyFieldValue<T extends Record<string, any>>(
  object: T,
  fields: (keyof T)[],
): boolean {
  return fields.some(
    (field) => object[field] !== undefined && object[field] !== null,
  );
}

export const calculatePercentage = (
  part: number,
  total: number,
  decimalPlaces = 2,
): number => {
  if (total === 0) return 0;

  const percentage = (part / total) * 100;
  return Number.parseFloat(percentage.toFixed(decimalPlaces));
};

export function sumBy<T>(items: T[], selector: (item: T) => number): number {
  return items.reduce((sum, item) => sum + selector(item), 0);
}

export const convertRateToPercent = (rate: number): number => {
  return new Decimal(rate)
    .mul(100)
    .toDecimalPlaces(3, Decimal.ROUND_HALF_UP)
    .toNumber();
};

export const convertPercentToRate = (percent: number): number => {
  return new Decimal(percent)
    .div(100)
    .toDecimalPlaces(6, Decimal.ROUND_HALF_UP)
    .toNumber();
};

export function sumDecimal<T>(
  items: T[],
  selector: (item: T) => string | number | Decimal,
): number {
  return items
    .reduce((accumulator, item) => {
      return accumulator.add(new Decimal(selector(item) || 0));
    }, new Decimal(0))
    .toDecimalPlaces(2, Decimal.ROUND_HALF_UP)
    .toNumber();
}

export function divideNumber(number1: number, number2: number) {
  return number2 === 0 ? 0 : number1 / number2;
}

/**
 * Get value from a map by key, return 0 if not found.
 */
export function getNumberFromMap(
  map: Map<string, number>,
  key: string,
): number {
  return roundNumberWithTwoDecimals(map.get(key) || 0);
}

export const formatDecimal = (value: number) =>
  Decimal(value).toFixed(Decimal.ROUND_CEIL);

type CalculateTaxFromTotal = {
  amountBeforeTax: number;
  gstAmount: number;
  pstAmount: number;
};

/**
 * Calculate the amount before taxes and GST/PST details using Decimal.js.
 * @param amount The amount including taxes.
 * @param gstRate The GST rate (e.g. 0.1 for 10%).
 * @param pstRate The PST rate (e.g. 0.2 for 20%).
 */
export function calculateTaxFromTotal(
  amount: number,
  gstRate: number,
  pstRate: number,
): CalculateTaxFromTotal {
  const totalRate = new Decimal(1).add(gstRate).add(pstRate);
  const amountBeforeTax = new Decimal(amount).div(totalRate).toDecimalPlaces(2);
  const gstAmount = amountBeforeTax.mul(gstRate).toDecimalPlaces(2);
  const pstAmount = Decimal(amount).minus(amountBeforeTax).minus(gstAmount);

  return {
    amountBeforeTax: amountBeforeTax.toNumber(),
    gstAmount: gstAmount.toNumber(),
    pstAmount: pstAmount.toNumber(),
  };
}
