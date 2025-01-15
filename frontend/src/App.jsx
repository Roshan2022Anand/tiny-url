import ShortUrlInfo from "./components/ShortUrlInfo";
import ShortUrlMaker from "./components/ShortUrlMaker";

const App = () => {
  return (
    <>
      <header className="text-center">
        <h1 className="text-[4vw] text-blue-400 font-bold">URL shortner</h1>
      </header>
      <main>
        <ShortUrlMaker />
        <ShortUrlInfo />
      </main>
    </>
  );
};

export default App;
