import { React, useEffect, useRef, useState } from "react";
import { customAlphabet } from "nanoid";

const Home = () => {
  const [data, setData] = useState({});
  const [alphabet, setAlphabet] = useState("");

  const password = useRef(null);
  const form = useRef(null);

  useEffect(() => {
    const options = [...new FormData(form.current)].reduce(
      (l, [k, v]) => ({ ...l, [k]: v }),
      {}
    );

    setData({
      length: options.length,
      similar: options.similar === "on",
      symbols: options.symbols === "on",
      numbers: options.numbers === "on",
      lower: options.lower === "on",
      upper: options.upper === "on",
    });
  }, []);

  useEffect(() => {
    setAlphabet(
      (data.upper ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "") +
        (data.lower ? "abcdefghijklmnopqrstuvwxyz" : "") +
        (data.numbers ? "0123456789" : "") +
        (data.symbols ? "@#$%&" : "")
    );
  }, [data]);

  const updateData = (e) => {
    if (e.target.type === "checkbox") {
      setData({ ...data, [e.target.name]: e.target.checked });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const copyPassword = (e) => {
    if (password.current.value.length > 0) {
      e.target.innerText = "Copied!";
      navigator.clipboard.writeText(password.current.value);
    } else {
      e.target.innerText = "⚠⚠⚠";
    }

    setTimeout(() => {
      e.target.innerText = "Copy";
    }, 500);
  };

  const validatePassword = (pass) => {
    if (data.upper && !pass.match(/[A-Z]/)) return false;

    if (data.lower && !pass.match(/[a-z]/)) return false;

    if (data.numbers && !pass.match(/[0-9]/)) return false;

    if (data.symbols && !pass.match(/[@#$%&]/)) return false;

    if (data.similar && new Set(pass.split("")).size !== pass.length)
      return false;

    return true;
  };

  const generate = (e) => {
    e.preventDefault();

    if (!data.length?.length) {
      password.current.value = "INVALID LENGTH";
      return;
    }

    if (!data.symbols && !data.numbers && !data.lower && !data.upper) {
      password.current.value = "INVALID CHARACTERS";
      return;
    }

    let pass = "";

    do {
      pass = customAlphabet(alphabet, Number(data.length))();
    } while (!validatePassword(pass));

    password.current.value = pass;
  };

  return (
    <main className="h-screen w-screen px-8 py-4 flex flex-col items-center">
      <h1>Password Generator</h1>
      <form ref={form} className="grid grid-cols-2 gap-x-12">
        <label className="" htmlFor="length">
          Password Length:
        </label>
        <input
          onChange={updateData}
          type="number"
          name="length"
          id="length"
          max="256"
          min="6"
          defaultValue={12}
        />

        <label className="" htmlFor="symbols">
          Include Symbols:
        </label>
        <p>
          <input
            onChange={updateData}
            className="mr-4"
            type="checkbox"
            name="symbols"
            id="symbols"
            defaultChecked={true}
          />
          (e.g. @#$%&)
        </p>

        <label className="" htmlFor="numbers">
          Include Numbers:
        </label>
        <p>
          <input
            onChange={updateData}
            className="mr-4"
            type="checkbox"
            name="numbers"
            id="numbers"
            defaultChecked={true}
          />
          (e.g. 12345)
        </p>

        <label className="" htmlFor="lower">
          Include Lowercase:
        </label>
        <p>
          <input
            onChange={updateData}
            className="mr-4"
            type="checkbox"
            name="lower"
            id="lower"
            defaultChecked={true}
          />
          (e.g. abcd)
        </p>

        <label className="" htmlFor="upper">
          Include Uppercase:
        </label>
        <p>
          <input
            onChange={updateData}
            className="mr-4"
            type="checkbox"
            name="upper"
            id="upper"
            defaultChecked={true}
          />
          (e.g. ABCD)
        </p>

        <label className="" htmlFor="similar">
          Exclude Similar Characters:
        </label>
        <p>
          <input
            onChange={updateData}
            className="mr-4"
            type="checkbox"
            name="similar"
            id="similar"
            defaultChecked={false}
          />
        </p>

        <button onClick={generate} className="col-span-2" type="submit">
          Generate Password
        </button>

        <div className="col-span-2 flex gap-2">
          <input
            ref={password}
            className="grow"
            type="text"
            id="password"
            placeholder="your strong password"
            disabled
          />
          <button
            className="w-16 text-center"
            onClick={copyPassword}
            type="button"
          >
            Copy
          </button>
        </div>
      </form>
    </main>
  );
};

export default Home;
