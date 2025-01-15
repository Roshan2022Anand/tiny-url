import { useRef, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";
// localhost: 5000 / d29236;
const ShortUrlInfo = () => {
  const inputRef = useRef(null);

  const [urlCLicks, seturlCLicks] = useState(0);
  const [loading, setloading] = useState(false);

  const getShortUrlInfo = async () => {
    const url = inputRef.current.value;
    if (!url) return;
    setloading(true);
    seturlCLicks(0);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/clicks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      const { error, message, clicks } = data;
      if (error) toast.error(error);

      seturlCLicks(clicks);
      toast.success(message);
    } catch {
      toast.error("Something went wrong, please try again");
    }
    setloading(false);
  };

  return (
    <section className="flex flex-col items-center gap-3 mt-5">
      <p>Enter your short url here to get more info</p>
      <article className=" flex items-center bg-blue-700 w-fit rounded-md p-2">
        <input
          ref={inputRef}
          type="text"
          className="border-b-2 border-white bg-transparent focus:outline-none"
        />
        <button
          className="bg-blue-500 rounded-md px-2 py-1"
          onClick={getShortUrlInfo}
        >
          {loading ? <FiLoader /> : "Get info"}
        </button>
      </article>
      {urlCLicks > 0 && (
        <article>
          The total clicks on the{" "}
          <span className="text-blue-400">{inputRef.current.value}</span> is{" "}
          <span className="font-bold border-b-2 border-blue-400">{urlCLicks}</span>
        </article>
      )}
    </section>
  );
};

export default ShortUrlInfo;
