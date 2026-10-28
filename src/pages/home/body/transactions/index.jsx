import Table from "./Table";
import TransactionsHeader from "./TransactionsHeader";

const Transactions = () => {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2 rounded-lg bg-cyan-100 p-2">
      <TransactionsHeader />
      <Table />
    </div>
  );
};
export default Transactions;
