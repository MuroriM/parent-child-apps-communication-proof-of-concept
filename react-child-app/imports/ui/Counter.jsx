import React from "react";
import { useGlobalState } from "state-pool";

export const Counter = () => {
  const [count, setCount] = useGlobalState("count");

  return (
    <div>
      <h2>The current count is: {count}</h2>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>

      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        -
      </button>
    </div>
  );
};
