export const sumByKind = (log, kind) => {
  return log
    .filter((transaction) => transaction.kind === kind)
    .reduce((acc, transaction) => acc + Number(transaction.amount), 0);
};
