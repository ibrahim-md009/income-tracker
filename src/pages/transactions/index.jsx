import TransactionsHeader from "../home/body/transactions/TransactionsHeader";
import Table from "../home/body/transactions/Table";

const Transactions = () => {
  return (
    <main className="relative mr-[15%] h-screen w-[85%] px-3 py-3">
      <div>
        <div className="flex min-h-0 flex-1 flex-col gap-2 rounded-lg bg-cyan-100 p-2">
          <TransactionsHeader />
          <Table />
        </div>
      </div>
    </main>
  );
};
export default Transactions;
