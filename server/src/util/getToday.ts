export default (): string => {
  return new Date().toISOString().split('T')[0];
};
