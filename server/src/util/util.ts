export const isNumber = (number: string) => {
  return !/[^\d]/g.test(number);
};
