export const setValueToArrayMap = <K, T>(
  map: Map<K, T[]>,
  key: K,
  data: T,
): Map<K, T[]> => {
  const value = map.get(key);

  if (value) {
    value.push(data);
    map.set(key, value);
  } else {
    map.set(key, [data]);
  }

  return map;
};

export const countValueInMap = <T>(
  map: Map<T, number>,
  key: T,
  data: number,
): Map<T, number> => {
  const value = map.get(key);

  if (value) map.set(key, value + data);
  else map.set(key, data);

  return map;
};

export function progressiveSum<T extends object>(
  durations: T[],
  key: keyof T,
): T[] {
  return durations.reduce<T[]>((accumulator, current, index) => {
    const previousValue =
      index > 0 ? (accumulator[index - 1][key] as number) : 0;
    accumulator.push({
      ...current,
      [key]: previousValue + (current[key] as number),
    });
    return accumulator;
  }, []);
}

export function findKeyByArrayValue<T, U>(
  map: Map<T, U[]>,
  value: U,
): T | undefined {
  for (const [key, values] of map.entries()) {
    if (values.includes(value)) {
      return key;
    }
  }
  return undefined;
}
