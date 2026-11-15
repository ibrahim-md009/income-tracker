import Header from "./Header";
import Body from "./body";

const Home = () => {
  return (
    <main className="mr-[20%] min-h-screen w-[80%] p-6">
      <div className="flex flex-col gap-6">
        <Header />
        <Body />
      </div>
    </main>
  );
};
export default Home;
