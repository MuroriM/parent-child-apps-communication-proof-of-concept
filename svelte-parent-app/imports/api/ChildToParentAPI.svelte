<script>
import { PARENT_URL, CHILD_URL } from "/public/constants";
import { incomingMessageText, count } from "/imports/api/stores";

//function that displays message, takes in a "messageText" argument
function displayMessage(args) {
  //sanity check
  console.log(`displayMessage function triggered on parent with args ${args}!`);

  //check messageText is string
  if (typeof args.messageText === "string") {
    incomingMessageText.set(args.messageText);
  }
}

//function that alerts message, takes in a "messageText" argument
function alertMessage(args) {
  //sanity check
  console.log(`alertMessage function triggered on parent with args ${args}!`);

  //check args and alert
  if (typeof args.messageText === "string") {
    alert(args.messageText);
  }
}

//function that increments count
const incrementCount = () => {
  console.log("incrementCount function triggered on parent!");
  count.set($count + 1);
};

//function that decrements count
const decrementCount = () => {
  console.log("decrementCount function triggered on parent!");
  count.set($count - 1);
};

//message handler
window.addEventListener("message", function (message) {
  //function adapter
  const functionAdapter = {
    displayMessage,
    alertMessage,
    incrementCount,
    decrementCount,
  };

  if (message.origin === CHILD_URL) {
    //sanity check
    console.log("incoming message in parent MessageHandler from child!");
    console.log(message);

    //parse input
    functionName = message.data.function;
    args = message.data.args;

    //call appropriate function
    if (functionAdapter[functionName]) {
      functionAdapter[functionName](args);
    } else {
      throw new Error("invalid function name");
    }
  } else if (message.origin === PARENT_URL) {
    //sanity check
    console.log("incoming message in parent MessageHandler from own URL");
  } else {
    //permission denied
    throw new Error("invalid parent URL, permission denied");
  }
});
</script>
