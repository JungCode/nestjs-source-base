export const isInputNumber = (input: string): boolean => {
  if (input.trim() === '') return false;

  return new RegExp(/^[+-]?\d+(\.\d+)?$/).test(input);
};
