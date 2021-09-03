import React, { useEffect } from "react";
import { ParentToChildAPI } from "/imports/api/ParentToChildAPI";
import { Message } from "/imports/ui/Message";
import { DisplayMessageForm } from "/imports/ui/DisplayMessageForm";
import { AlertMessageForm } from "/imports/ui/AlertMessageForm";
import { Counter } from "/imports/ui/Counter";
import { ParentCounterButtons } from "/imports/ui/ParentCounterButtons";
import "/imports/api/stores";
import { Mongo } from "meteor/mongo";
// import { Meteor } from "meteor/meteor";

export const App = () => {
  //verify that child app has loaded
  useEffect(() => {
    console.log("child loaded, logging from child itself!");
    // Meteor.connection._stores["foods"]._getCollection();
  });

  return (
    <div>
      <ParentToChildAPI />
      <h1> React Child App</h1>
      <Message />
      <Counter />
      <DisplayMessageForm />
      <AlertMessageForm />
      <ParentCounterButtons />
    </div>
  );
};
