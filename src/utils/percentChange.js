export const percentChange = (first, second) => {
  if (second === 0 || first === 0) {
    return "ـــ";
  }

  const result = (((first - second) / second) * 100).toFixed();

  return Number(result);
};
