import { PARENT_URL, CHILD_URL } from "/public/constants";
import { useGlobalState } from "state-pool";
import { useState, useEffect } from "react";

export const ParentToChildAPI = () => {
  //getters and setters for reactive vars
  const [incomingMessageText, setIncomingMessageText] = useGlobalState(
    "incomingMessageText"
  );
  const [count, setCount] = useGlobalState("count");
  const [state, setState] = useState(0); //will be used to force update

  //add message event listener
  useEffect(() => {
    window.addEventListener("message", MessageHandler, false);
  });

  //function that displays message
  function displayMessage(args) {
    //sanity check
    console.log(
      `displayMessage function triggered on child with args ${args}!`
    );

    //check messageText is string
    if (typeof args.messageText === "string") {
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
    console.log("incrementCount function triggered on child!");
    setCount(count + 1);
  };

  // //function that decrements count
  function decrementCount() {
    console.log("decrementCount function triggered on child!");
    setCount(count - 1);
  }

  //MessageHandler
  const MessageHandler = (message) => {
    // function adapter
    const functionAdapter = {
      displayMessage,
      alertMessage,
      incrementCount,
      decrementCount,
    };

    //check message origin and delegate to appropriate handler
    if (message.origin === PARENT_URL) {
      //remove event listener if MessageHandler triggered, as it will be re-initiated on DOM reload
      //this is absolutely necessary or each successive call will create duplicates and crash the app
      //this also means you must force a re-render at the end of the call handling to re-initiate the event listener
      window.removeEventListener("message", MessageHandler, false);

      //sanity check
      console.log("incoming message in child MessageHandler from parent!");
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
      console.log("incoming message in child MessageHandler from own URL");
    } else {
      //permission denied
      throw new Error("invalid parent URL, permission denied");
    }
  };
  return null;
};
