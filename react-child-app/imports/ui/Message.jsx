import React from "react";
import { useGlobalState } from "state-pool";

export const Message = () => {
  const [incomingMessageText] = useGlobalState("incomingMessageText");
  return (
    <div>
      {incomingMessageText ? (
        <h2>Message received from parent: {incomingMessageText}</h2>
      ) : (
        <h2>Listening for messages...</h2>
      )}
    </div>
  );
};
