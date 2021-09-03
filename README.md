# Proof of Concept of Messages being Sent from Parent Svelte App to Child React App using postMessage, and vice-versa

This demo serves as a proof of concept that it is possible to have two meteor clients communicate with each other directly using postMessage. In this demo you can send messages between a parent app and a child app in an iFrame. These messages can be displayed on the other app, sent as alerts to the other app, or

## Usage

1. `cd` into `svelte-parent-app` and run it on port 5000 with `meteor run --port 5000`

2. `cd` into `react-child-app` and run it on port 3000 with `meteor run --port 3000`

3. Once both apps have started, go to `localhost:5000` on your web browser.

4. Things to try out:
   a. Sending messages to display or alert between the two apps.
   b. Modifying the count on either app from the other app.
   c. Deleting items from the shared foods collection on either app.

## API

The API for each app accepts an object inside the postMessage call. The object has the format `{functionName, {args}`, where `functionName` is the name of a function in the receiving API and `{args}` is an optional object which specifies the arguments to be run with that function, as key-value pairs.
