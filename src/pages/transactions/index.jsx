import TransactionsHeader from "./TransactionsHeader";
import Table from "./Table";
import Header from "../../components/layout/Header";
import Button from "../../components/ui/Button";
import { filterByMonth } from "../../utils/stats";
import { getCurrentMonthKey, getMonthName } from "../../utils/dates";
import { useStore } from "../../store/useStore";
import EmptyTransactions from "../../components/ui/EmptyTransactions";

const Transactions = () => {
  const transactionsLog = useStore((s) => s.transactionsLog);
  const selectedMonthKey = useStore((s) => s.selectedMonthKey);
  const setIstransactionFormOpen = useStore((s) => s.setIstransactionFormOpen);

  const countOfTransactions = filterByMonth(
    transactionsLog,
    selectedMonthKey,
  ).length;

  return (
    <main className="relative min-h-screen w-full p-4 pb-36 lg:mr-[20%] lg:h-screen lg:w-[80%] lg:p-6 lg:pb-6">
      {countOfTransactions === 0 ? (
        <EmptyTransactions onAction={() => setIstransactionFormOpen(true)} />
      ) : (
        <div className="flex flex-col gap-6 lg:h-full">
          <Header
            title="المعاملات"
            subTitle={`${countOfTransactions} معاملة في ${getMonthName(getCurrentMonthKey())}`}
          >
            <Button
              className="bg-card border-line-strong text-fg! w-30 border"
              text="تصدير PDF"
            />
          </Header>

          <div className="flex min-h-0 flex-1 flex-col gap-4">
            <TransactionsHeader />
            <Table />
          </div>
        </div>
      )}
    </main>
  );
};
export default Transactions;
