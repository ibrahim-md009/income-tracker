import Header from "./Header";
import Body from "./body";

const Home = () => {
  return (
    <main className="min-h-screen w-full p-4 pb-36 lg:mr-[20%] lg:w-[80%] lg:p-6 lg:pb-6">
      <div className="flex flex-col gap-6">
        <Header />
        <Body />
      </div>
    </main>
  );
};
export default Home;
