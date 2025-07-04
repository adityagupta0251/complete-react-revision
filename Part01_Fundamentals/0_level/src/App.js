import { useState, useEffect } from "react";

export default function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);

  // Fetch one slip of advice
  async function getAdvice() {
    try {
      const res = await fetch("https://api.adviceslip.com/advice", {
        cache: "no-cache",            // avoid browser caching the response
      });
      const data = await res.json();
      setAdvice(data.slip.advice);
      setCount((c) => c + 1);         // increment counter safely
    } catch (err) {
      console.error(err);
      setAdvice("Failed to fetch advice. Please try again.");
    }
  }

  // Run once on mount
  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <div>
      <h1>Advice Generator</h1>
      <p>{advice}</p>
      <button onClick={getAdvice}>Get Advice</button>
      <Message count={count} />
    </div>
  );
}

// Presentational component for the read counter
function Message({ count }) {
  return (
    <p>
      You have read <strong>{count}</strong> pieces of advice.
    </p>
  );
}
