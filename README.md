# Proof of Concept of Messages being Sent from Parent Svelte App to Child React App using postMessage, and vice-versa

## Usage

1. `cd` into `react-child-app` and run it on port 3000 with `meteor run --port 3000`

2. `cd` into `svelte-parent-app` and run it on port 5000 with `meteor run --port 5000`

3. Once both apps have started, go to `localhost:5000` on your web browser.

4. Try out sending messages to display or alert between the two apps. Try out modifying the count on either app from the other app.
