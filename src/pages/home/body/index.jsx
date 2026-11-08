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
    <section className="mt-5 h-screen">
      <div className="flex h-full justify-between gap-3">
        <div className="flex min-h-0 flex-1 flex-col gap-5">
          <Statistics />

          <div className="flex max-h-[60%] gap-3">
            <Summary />
            <Expenses log={monthTransactions} />
          </div>

          <Transactions />
        </div>
      </div>
    </section>
  );
};

export default Body;
