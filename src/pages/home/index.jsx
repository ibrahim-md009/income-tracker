import Header from "./Header";
import Body from "./body";

const Home = () => {
  return (
    <main className="mr-[15%] h-screen w-[85%] px-3 py-3">
      <div className="flex flex-col">
        <Header />
        <Body />
      </div>
    </main>
  );
};
export default Home;
