import { Lazy } from './lazy.utils';

export const isNotNil = <T>(value: T | null | undefined): value is T =>
  value !== null && value !== undefined;

export const isNil = <T>(
  value: T | null | undefined,
): value is null | undefined => !isNotNil(value);

export const isNumericString = (value: string): boolean =>
  !Number.isNaN(Number(value)) && value !== '';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const normalizeValue = (value: any): string | null => {
  if (isNil(value) || value.toString().trim() === '') {
    return null;
  }

  const stringValue = value.toString().trim();

  // Check if it's a numeric string
  if (isNumericString(stringValue)) {
    // Convert to number and back to remove trailing zeros
    return Number(stringValue).toString();
  }

  return stringValue;
};

export const isPromise = <T>(value: T | Promise<T>): value is Promise<T> =>
  value &&
  typeof value == 'object' &&
  (value instanceof Promise || 'then' in value);

export const isLazy = (value: unknown): value is Lazy<unknown> =>
  typeof value == 'object' && value instanceof Lazy;
