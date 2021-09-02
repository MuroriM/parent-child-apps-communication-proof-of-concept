import React from "react";
import { PARENT_URL } from "/public/constants";

export const ParentCounterButtons = () => {
  const increment = () => {
    window.parent.postMessage(
      {
        function: "incrementCount",
      },
      PARENT_URL
    );
  };

  const decrement = () => {
    window.parent.postMessage(
      {
        function: "decrementCount",
      },
      PARENT_URL
    );
  };

  return (
    <div>
      <h3>Change count on parent app:</h3>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
};
