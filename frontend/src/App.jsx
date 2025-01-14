import { useRef, useState } from "react";
import { toast } from "react-toastify";

const App = () => {
  const inputRef = useRef(null);

  const [shortUrl, setshortUrl] = useState("");

  const createShortUrl = async () => {
    setshortUrl("");
    const url = inputRef.current.value;
    if (!url) return;

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/short`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    const { error, shortUrl, message } = await res.json();
    if (error) {
      toast.error(error);
      return;
    }
    setshortUrl(shortUrl);
    toast.success(message);
  };

  return (
    <>
      <header className="text-center">
        <h1 className="text-[4vw] text-blue-400 font-bold">URL shortner</h1>
      </header>
      <main className="flex flex-col items-center gap-3 mt-5">
        <p>enter the https URL to shorten.</p>
        <section className=" flex items-center bg-blue-700 w-fit rounded-md p-2">
          <input
            ref={inputRef}
            type="text"
            className="border-b-2 border-white bg-transparent focus:outline-none"
            required
          />
          <button
            className="bg-blue-500 rounded-md px-2 py-1"
            onClick={createShortUrl}
          >
            Shorten
          </button>
        </section>
        {shortUrl && (
          <section>
            <p>Here is your short URL</p>
            <p>
              Actual url :
              <a href={`${inputRef.current.value}`}>{inputRef.current.value}</a>
            </p>
            <p>
              Short url : <a href={`${shortUrl}`}>{shortUrl}</a>
            </p>
          </section>
        )}
      </main>
    </>
  );
};

export default App;
