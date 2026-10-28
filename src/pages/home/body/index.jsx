import Form from "./Form";
import Statistics from "./Statistics";
import Summary from "./Summary";
import Expenses from "./Expenses";
import Transactions from "./transactions";
import { useStore } from "../../../store/useStore";
const Body = () => {
  const editingId = useStore((s) => s.editingId);
  return (
    <section className="mt-5 h-screen">
      <div className="flex h-full justify-between gap-3">
        <Form key={editingId} />

        <div className="flex min-h-0 flex-1 flex-col gap-5">
          <Statistics />

          <div className="flex max-h-[40%] gap-3">
            <Summary />
            <Expenses />
          </div>

          <Transactions />
        </div>
      </div>
    </section>
  );
};

export default Body;
