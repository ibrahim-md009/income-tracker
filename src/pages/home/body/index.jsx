import Statistics from "./Statistics";
import Summary from "./Summary";
import Expenses from "./Expenses";
import Transactions from "./Transactions";
import { useStore } from "../../../store/useStore";
import { filterByMonth } from "../../../utils/stats";

const Body = () => {
  const transactionsLog = useStore((s) => s.transactionsLog);
  const selectedMonthKey = useStore((s) => s.selectedMonthKey);
  const monthTransactions = filterByMonth(transactionsLog, selectedMonthKey);

  return (
    <section className="flex flex-col gap-6">
      <Statistics />

      <div className="flex h-80 gap-4">
        <Summary />
        <Expenses log={monthTransactions} />
      </div>

      <Transactions />
    </section>
  );
};

export default Body;
