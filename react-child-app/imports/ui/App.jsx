import React, { useEffect } from "react";
import { ParentToChildAPI } from "/imports/api/ParentToChildAPI";
import { Message } from "/imports/ui/Message";
import { Foods } from "/imports/ui/Foods";
import { DisplayMessageForm } from "/imports/ui/DisplayMessageForm";
import { AlertMessageForm } from "/imports/ui/AlertMessageForm";
import { Counter } from "/imports/ui/Counter";
import { ParentCounterButtons } from "/imports/ui/ParentCounterButtons";
import "/imports/api/stores";
import { useTracker } from "meteor/react-meteor-data";

import { FoodsCollection } from "/public/sharedCollections";

export const App = () => {
  //verify that child app has loaded
  useEffect(() => {
    console.log("child loaded, logging from child itself!");
  });

  useTracker(() => {
    console.log(FoodsCollection.find({}).fetch());
  });

  return (
    <div>
      <ParentToChildAPI />
      <h1> React Child App</h1>
      <Message />
      <Counter />
      <Foods />
      <DisplayMessageForm />
      <AlertMessageForm />
      <ParentCounterButtons />
    </div>
  );
};
