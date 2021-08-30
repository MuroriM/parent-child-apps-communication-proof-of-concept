<script>
  let iFrameLoaded = false;
  let outgoingMessageText = "";
  $: incomingMessageText = "";

  //verify that iFrame has loaded
  const oniFrameLoad = () => {
    iFrameLoaded = true;
    console.log('child iFrame loaded, logging from parent!');
  }

  window.addEventListener("message", function (message) {
    if (message.origin === "http://localhost:3000") {
      console.log("incoming messsage in parent from child!");
      console.log(message);
      incomingMessageText = message.data;
    }
  });

  //event handler to send message to child app
  const handleSubmit = () => {
    //check that iFrame has loaded before accessing it and sending message
    if(iFrameLoaded){
      console.log('Sending message from parent to child!');
      document.getElementById('iframe').contentWindow.postMessage(outgoingMessageText, "http://localhost:3000/")
    }
    else{
      console.log('iFrame not loaded yet!')
    }
  }

</script>


<div class="container">
  <h1>Svelte Parent App</h1>
  {#if (!incomingMessageText)}
    <h2>Listening for messages...</h2>
  {:else}
    <h2>Message received: {incomingMessageText}</h2>
  {/if}

  <form on:submit|preventDefault={handleSubmit}>
    <label for="html">Send a message to the child app: </label>
    <br />
    <input type="text" name="text" placeholder="Type message to send" bind:value={outgoingMessageText}/>
    <button type="submit">Send Message</button>
  </form>

  <iframe on:load={oniFrameLoad} id='iframe' title="react-child-app" src="http://localhost:3000/" sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation"></iframe>

</div>

