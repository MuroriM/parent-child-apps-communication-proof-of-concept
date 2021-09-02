import React, { useState } from "react";
import { PARENT_URL } from "/public/constants";

export const AlertMessageForm = () => {
  const [outgoingMessageText, setOutgoingMessageText] = useState("");

  //event handler to send message to parent app
  const handleSubmit = (event) => {
    event.preventDefault();
    window.parent.postMessage(
      {
        function: "alertMessage",
        args: { messageText: outgoingMessageText },
      },
      PARENT_URL
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>
          <label>Send a message to alert on the parent app: </label>
        </h3>
        <br />
        <input
          type="text"
          placeholder="Type message to send"
          value={outgoingMessageText}
          onChange={(e) => setOutgoingMessageText(e.target.value)}
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};
