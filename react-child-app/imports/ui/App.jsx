import React, { useState, useEffect } from "react";
import { store, useGlobalState } from "state-pool";
import { PARENT_URL, CHILD_URL } from "/public/constants";
import { Message } from "./Message";
import { Form } from "./Form";
import { Counter } from "./Counter";

store.setState("count", 0); // Create "count" global state

export const App = () => {
  //getters and setters for reactive vars
  const [incomingMessageText, setIncomingMessageText] = useState("");
  const [count, setCount] = useGlobalState("count");

  //verify that component has loaded (for debugging purposes)
  useEffect(() => {
    console.log("child loaded, logging from child itself!");
    window.addEventListener("message", API, false);
  });

  //function that displays message
  function displayMessage(args) {
    //sanity check
    console.log(`displayMessage function triggered with args ${args}!`);

    //check args and setIncomingMessageText
    if (typeof args.messageText === "string") {
      setIncomingMessageText(args.messageText);
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
  function incrementCount() {
    console.log("");
    setCount(count + 1);
    return;
  }

  // //function that decrements count
  function decrementCount() {
    console.log("decrement function triggered!");
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
      window.removeEventListener("message", API, false);

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
    } else if (message.origin === CHILD_URL) {
      //sanity check
      console.log("incoming message in child API from own URL");
    } else {
      //permission denied
      throw new Error("invalid parent URL, permission denied");
    }
    // window.removeEventListener("message", receiveMessage);
  };

  return (
    <div>
      <h1> React Child App</h1>
      <Message message={incomingMessageText} />
      <Counter />
      <Form />
    </div>
  );
};
