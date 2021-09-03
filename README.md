# Proof of Concept of Cross-App Communication between 1 Mongo database and 2 Meteor apps.

This demo serves as a proof of concept of the following: 1. It's possible to have two Meteor clients share the same database 2. It's possible for two Meteor clients to communicate with each other directly using postMessage.

## Usage

1. `cd` into `svelte-parent-app` and run it on port 5000 with `meteor run --port 5000`

2. `cd` into `react-child-app` and run it on port 3000 with `meteor run --port 3000`

3. Once both apps have started, go to `localhost:5000` on your web browser.

4. Things to try out:
   a. Sending messages to display or alert between the two apps (uses postMessage).
   b. Modifying the count on either app from the other app (uses postMessage).
   c. Deleting items from the shared foods collection on either app (uses the shared database).

## APIs and postMessage

The APIs for direct communication between both clients take in an object inside the postMessage call. The object has the format `{functionName, {args}`, where `functionName` is the name of a function in the receiving API and `{args}` is an optional object which specifies the arguments to be run with that function, as key-value pairs.

## Database

Both the parent and child app use the same database to keep track of a collection `FoodColection`. You can see that if you delete an item of the collection on either app, the change will be immediately reflected on the other app.

## Troubleshooting

If you encounter errors on starting up either app, reset them using `meteor reset` and start them up again following the usage instructions.
