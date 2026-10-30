export const percentChange = (first, second) =>
  second === 0 ? "ـــ" : (((first - second) / second) * 100).toFixed(1) + "%";
