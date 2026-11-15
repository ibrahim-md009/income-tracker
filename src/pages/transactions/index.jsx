import TransactionsHeader from "./TransactionsHeader";
import Table from "./Table";
import Header from "../../components/layout/Header";
import Button from "../../components/ui/Button";
import { filterByMonth } from "../../utils/stats";
import { getCurrentMonthKey, getMonthName } from "../../utils/dates";
import { useStore } from "../../store/useStore";

const Transactions = () => {
  const transactionsLog = useStore((s) => s.transactionsLog);
  const selectedMonthKey = useStore((s) => s.selectedMonthKey);

  const countOfTransactions = filterByMonth(
    transactionsLog,
    selectedMonthKey,
  ).length;
  return (
    <main className="relative mr-[20%] h-screen w-[80%] px-3 py-3">
      <div className="flex h-screen flex-col gap-10">
        <Header
          title="المعاملات"
          subTitle={`${countOfTransactions} معاملة في ${getMonthName(getCurrentMonthKey())}`}
        >
          <Button
            className="bg-card border-line-strong text-fg! w-30 border"
            text="تصدير PDF"
          />
        </Header>

        <div className="flex min-h-0 flex-1 flex-col gap-2 rounded-lg p-2">
          <TransactionsHeader />
          <Table />
        </div>
      </div>
    </main>
  );
};
export default Transactions;
