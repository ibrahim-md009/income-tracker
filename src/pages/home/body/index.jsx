import Form from "./Form";
import Statistics from "./Statistics";
import Summary from "./Summary";
import Expensis from "./Expensis";
import Transactions from "./transactions";

const Body = () => {
  return (
    <section className="mt-5 h-screen">
      <div className="flex h-full justify-between gap-3">
        <Form />

        <div className="b flex flex-1 flex-col gap-5">
          <Statistics />

          <div className="flex max-h-[40%] gap-3">
            <Summary />
            <Expensis />
          </div>

          <Transactions />
        </div>
      </div>
    </section>
  );
};

export default Body;
