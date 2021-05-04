export const isNumber = (number: string): boolean => {
  return !/[^\d]/g.test(number);
};
