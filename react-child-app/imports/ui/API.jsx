import { PARENT_URL, CHILD_URL } from "/public/constants";
import { Message } from "./Message";

import React from "react";

const functionAdapter = { test };

function test(args) {
  console.log(`test function triggered with args ${args}!`);
  <Message message={args[0]} />;
}

window.addEventListener("message", function (message) {
  //check message origin and delegate to appropriate handler
  if (message.origin === PARENT_URL) {
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
  } else if (message.origin === CHILD_URL) {
    //sanity check
    console.log("incoming message in child API from own URL");
    console.log(message);
  } else {
    //permission denied
    throw new Error("invalid parent URL, permission denied");
  }
});
