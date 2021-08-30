# Proof of Concept of Messages being Sent from Parent Svelte App to Child React App using postMessage, and vice-versa

## Usage

1. `cd` into `react-child-app` and run it on port 3000 with `meteor run --port 3000`

2. `cd` into `svelte-parent-app` and run it on port 5000 with `meteor run --port 5000`

3. Once both apps have started, go to `localhost:5000` on your web browser.

4. Send messages from the parent app to the child app using the outer "Send Message" form.

5. Send messages from the child app to the parent app using the inner "Send Message" form, inside the iFrame.
