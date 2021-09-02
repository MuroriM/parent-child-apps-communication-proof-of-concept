<script>
  //imports
  import DisplayMessageForm from "./DisplayMessageForm";
  import AlertMessageForm from "./AlertMessageForm";
  import CounterButtons from "./CounterButtons"
  import { iFrameLoaded } from "./stores";

  //top-level vars
  $: incomingMessageText = "";

  //verify that iFrame has loaded
  const oniFrameLoad = () => {
    iFrameLoaded.set(true);
    if(iFrameLoaded){
      console.log('child iFrame loaded, logging from parent!');
    }
  }

  //event listener to receive messages from child and update message text
  window.addEventListener("message", function (message) {
    if (message.origin === "http://localhost:3000") {
      console.log("incoming messsage in parent from child!");
      console.log(message);
      incomingMessageText = message.data;
    }
  });

</script>


<div class="container">
  <h1>Svelte Parent App</h1>
  {#if (!incomingMessageText)}
    <h2>Listening for messages...</h2>
  {:else}
    <h2>Message received: {incomingMessageText}</h2>
  {/if}

  <DisplayMessageForm />
  <AlertMessageForm />
  <CounterButtons />

  <iframe on:load={oniFrameLoad} id='iframe' title="react-child-app" src="http://localhost:3000/" sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation allow-modals"></iframe>

</div>

