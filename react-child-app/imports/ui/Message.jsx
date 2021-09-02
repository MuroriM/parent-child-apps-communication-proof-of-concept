import React from "react";

export const Message = (props) => {
  messageText = props.message;

  return (
    <div>
      {messageText ? (
        <h2>Message received: {messageText}</h2>
      ) : (
        <h2>Listening for messages...</h2>
      )}
    </div>
  );
};
