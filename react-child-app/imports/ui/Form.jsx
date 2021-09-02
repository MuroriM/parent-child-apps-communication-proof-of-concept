import React, { useState } from "react";

export const Form = () => {
  const [outgoingMessageText, setOutgoingMessageText] = useState("");

  //event handler to send message to parent app
  const handleSubmit = (event) => {
    event.preventDefault();
    window.parent.postMessage(outgoingMessageText, "http://localhost:5000/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Send a message to the parent app: </label>
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
