import React, { useState, useEffect } from "react";
import { store, useGlobalState } from "state-pool";
import { PARENT_URL, CHILD_URL } from "/public/constants";
import { Message } from "./Message";
import { Form } from "./Form";
import { Counter } from "./Counter";

// function useForceUpdate() {
//   const [value, setValue] = useState(0); // integer state
//   return () => setValue((value) => value + 1); // update the state to force render
// }

store.setState("count", 0); // Create "count" global state
store.setState("incomingMessageText", "");

export const App = () => {
  //getters and setters for reactive vars
  const [incomingMessageText, setIncomingMessageText] = useGlobalState(
    "incomingMessageText"
  );

  const [count, setCount] = useGlobalState("count");

  const [state, setState] = useState(0);

  //verify that component has loaded (for debugging purposes)
  useEffect(() => {
    console.log("child loaded, logging from child itself!");
    // window.removeEventListener("message", API, false);
    window.addEventListener("message", API, false);

    // console.log(window.getEventListners());
  }); //now this will only run once

  //function that displays message
  function displayMessage(args) {
    //sanity check
    console.log(`displayMessage function triggered with args ${args}!`);

    //check messageText is string and different from current
    if (
      typeof args.messageText === "string" &&
      args.messageText != incomingMessageText
    ) {
      //check message is actually different before calling this
      setIncomingMessageText(args.messageText);
      console.log(incomingMessageText);
    }
  }

  //function that alerts message
  function alertMessage(args) {
    //sanity check
    console.log(`alertMessage function triggered with args ${args}!`);

    //check args and alert
    if (typeof args.messageText === "string") {
      alert(args.messageText);
    }
  }

  //function that increments count
  const incrementCount = () => {
    console.log("here!");
    setCount(count + 1);
    console.log(count);
    console.log(incomingMessageText);
  };

  // //function that decrements count
  function decrementCount() {
    console.log("decrement function triggered!");
    setCount(count - 1);
  }

  //API
  const API = (message) => {
    //record state value upon entering API
    let original_state = state;

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
      window.removeEventListener("message", API, false);

      //this also means that each API call must trigger exactly one state change

      //sanity check
      console.log("incoming message in child API from parent!");
      console.log(message);

      //parse input
      functionName = message.data.function;
      args = message.data.args;

      console.log(functionName, args);

      //call appropriate function
      if (functionAdapter[functionName]) {
        if (args) {
          functionAdapter[functionName](args);
        } else {
          functionAdapter[functionName]();
        }
      } else {
        throw new Error("invalid function name");
      }

      // force re-render
      setState(state + 1);

      // console.log("forcing re-render!");
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
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
    </div>
  );
};
