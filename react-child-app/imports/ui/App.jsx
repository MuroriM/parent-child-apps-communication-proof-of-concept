import React, { useState, useEffect } from "react";

export const App = () => {
  //getters and setters for incoming and outgoing messages text
  const [incomingMessageText, setIncomingMessageText] = useState("");
  const [outgoingMessageText, setOutgoingMessageText] = useState("");

  //verify that component has loaded (for debugging purposes)
  useEffect(() => {
    console.log("child loaded, logging from child itself!");
  });

  //incoming message event listener
  window.addEventListener("message", function (message) {
    if (message.origin === "http://localhost:5000") {
      console.log("incoming message in child from parent!");
      console.log(message);
      setIncomingMessageText(message.data);
    }
  });

  //event handler to send message to parent app
  const handleSubmit = (event) => {
    event.preventDefault();
    window.parent.postMessage(outgoingMessageText, "http://localhost:5000/");
  };

  return (
    <div>
      <h1> React Child App</h1>
      {incomingMessageText ? (
        <h2>Message received: {incomingMessageText}</h2>
      ) : (
        <h2>Listening for messages...</h2>
      )}

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
