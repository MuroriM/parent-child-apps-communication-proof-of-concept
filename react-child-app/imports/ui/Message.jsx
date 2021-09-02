import React from "react";
import { store, useGlobalState } from "state-pool";

export const Message = () => {
  const [incomingMessageText] = useGlobalState("incomingMessageText");
  return (
    <div>
      {incomingMessageText ? (
        <h2>Message received: {incomingMessageText}</h2>
      ) : (
        <h2>Listening for messages...</h2>
      )}
    </div>
  );
};
