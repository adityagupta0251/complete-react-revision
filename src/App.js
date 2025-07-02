import { useState } from "react";

export default function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);

  async function getAdvice() {
    const res   = await fetch("https://api.adviceslip.com/advice");
    const data  = await res.json();
    setAdvice(data.slip.advice);

    setCount((c) => {
      const next = c + 1;

      if (next >= 23) {
        console.log(`You have reached the limit to read ${next} pieces of advice`);
      }

      return next;           // ***always return the new state***
    });
  }

  return (
    <>
      <h1>Welcome to Our simple API fetching for advices in React</h1>
      <h2>{advice}</h2>

      <button onClick={getAdvice} disabled={count >= 23}> {count >= 23 ? "Limit reached" : "Get Advice"} </button>
      <p>
        You have read <strong>{count}</strong> piece{count !== 1 && "s"} of advice
      </p>
    </>
  );
}
