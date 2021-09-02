import React, { useEffect } from "react";
import { ParentToChildAPI } from "../api/ParentToChildAPI";
import { Message } from "./Message";
import { Form } from "./Form";
import { Counter } from "./Counter";

export const App = () => {
  useEffect(() => {
    console.log("child loaded, logging from child itself!");
  });

  return (
    <div>
      <ParentToChildAPI />
      <h1> React Child App</h1>
      <Message />
      <Counter />
      <Form />
    </div>
  );
};
