import { SortOrder } from '../enums';

export const uniq = <T>(array: T[]): T[] => [...new Set(array)];

export const uniqBy = <T, K extends keyof T>(array: T[], key: K): T[] => {
  const seen = new Set<T[K]>();
  return array.filter((item) => {
    const value = item[key];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
};

export const toArray = <T>(item: T | T[]): T[] =>
  Array.isArray(item) ? item : [item];

export const isArrayHasElement = <T>(items?: T[]): boolean => {
  return !!(items && items.length > 0);
};

export const checkSameElement = (elements: string[]): boolean => {
  if (elements.length === 0) return false;
  return elements.every((element) => element === elements[0]);
};

export const arraysEqual = <T>(a: T[], b: T[]) =>
  a.length === b.length && a.every((value, index) => value === b[index]);

export const sortBy = <T, K extends keyof T>(
  array: T[],
  key: K,
  order: SortOrder,
): T[] => {
  return [...array].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (aValue === bValue) return 0;

    const result = aValue > bValue ? 1 : -1;
    return order === SortOrder.ASC ? result : -result;
  });
};

export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];

  for (let index = 0; index < array.length; index += size) {
    chunks.push(array.slice(index, index + size));
  }

  return chunks;
}
