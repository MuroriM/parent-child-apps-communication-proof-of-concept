import React, { useState, useEffect } from "react";
import { store, useGlobalState } from "state-pool";
import { PARENT_URL, CHILD_URL } from "/public/constants";
import { Message } from "./Message";
import { Form } from "./Form";
import { Counter } from "./Counter";

//Global state variables
store.setState("count", 0); // Create "count" global state
store.setState("incomingMessageText", "");

export const App = () => {
  //getters and setters for reactive vars
  const [incomingMessageText, setIncomingMessageText] = useGlobalState(
    "incomingMessageText"
  );
  const [count, setCount] = useGlobalState("count");
  const [state, setState] = useState(0); //will be used to force update

  //verify that component has loaded (for debugging purposes)
  useEffect(() => {
    console.log("child loaded, logging from child itself!");
    window.addEventListener("message", API, false);
  });

  //function that displays message
  function displayMessage(args) {
    //sanity check
    console.log(
      `displayMessage function triggered on child with args ${args}!`
    );

    //check messageText is string
    if (typeof args.messageText === "string") {
      //check message is actually different before calling this
      setIncomingMessageText(args.messageText);
    }
  }

  //function that alerts message
  function alertMessage(args) {
    //sanity check
    console.log(`alertMessage function triggered on child with args ${args}!`);

    //check args and alert
    if (typeof args.messageText === "string") {
      alert(args.messageText);
    }
  }

  //function that increments count
  const incrementCount = () => {
    console.log("increment function triggered on child!");
    setCount(count + 1);
    console.log(incomingMessageText);
  };

  // //function that decrements count
  function decrementCount() {
    console.log("decrement function triggered on child!");
    setCount(count - 1);
  }

  //API
  const API = (message) => {
    // function adapter
    const functionAdapter = {
      displayMessage,
      alertMessage,
      incrementCount,
      decrementCount,
    };

    //check message origin and delegate to appropriate handler
    if (message.origin === PARENT_URL) {
      //remove event listener if API triggered, as it will be re-initiated on DOM reload
      //this is absolutely necessary or each successive call will create duplicates and crash the app
      //this also means you must force a re-render at the end of the call handling to re-initiate the event listener
      window.removeEventListener("message", API, false);

      //sanity check
      console.log("incoming message in child API from parent!");
      console.log(message);

      //parse input
      functionName = message.data.function;
      args = message.data.args;

      //call appropriate function
      if (functionAdapter[functionName]) {
        functionAdapter[functionName](args);
      } else {
        throw new Error("invalid function name");
      }

      // force re-render
      setState(state + 1);
    } else if (message.origin === CHILD_URL) {
      //sanity check
      console.log("incoming message in child API from own URL");
    } else {
      //permission denied
      throw new Error("invalid parent URL, permission denied");
    }
  };

  return (
    <div>
      <h1> React Child App</h1>
      <Message />
      <Counter />
      <Form />
    </div>
  );
};
