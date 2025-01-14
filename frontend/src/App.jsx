import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { FiLoader } from "react-icons/fi";
const App = () => {
  const inputRef = useRef(null);

  const [shortUrl, setshortUrl] = useState("");
  const [loading, setloading] = useState(false);

  const createShortUrl = async () => {
    const url = inputRef.current.value;
    if (!url) return;
    setloading(true);
    setshortUrl("");
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/short`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const { error, shortUrl, message } = await res.json();
      if (error) toast.error(error);
      else {
        setshortUrl(shortUrl);
        toast.success(message);
      }
    } catch {
      toast.error("Something went wrong, please try again");
    }
    setloading(false);
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
            {loading ? <FiLoader /> : "Shorten"}
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
              Short url : <a>{shortUrl}</a>
            </p>
          </section>
        )}
      </main>
    </>
  );
};

export default App;
