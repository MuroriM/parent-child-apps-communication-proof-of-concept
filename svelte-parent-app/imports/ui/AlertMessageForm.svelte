<script>
    import { iFrameLoaded } from "../api/stores"
    
    $: outgoingMessageText = "";

    //event handler to send message to child app
    const handleSubmit = () => {
    //check that iFrame has loaded before accessing it and sending message
    if(iFrameLoaded){
        console.log('Sending message to display from parent to child!');
        document.getElementById('iframe').contentWindow.postMessage({function: 'alertMessage', args: {messageText: outgoingMessageText}}, "http://localhost:3000/")
    }
    else{
        throw new Meteor.Error('iFrame not loaded yet!')
    }
    }
</script>

<div>
    <form on:submit|preventDefault={handleSubmit}>
        <h3><label for="html">Send a message to alert on the child app: </label></h3>
        <br />
        <input type="text" name="text" placeholder="Type message to send" bind:value={outgoingMessageText}/>
        <button type="submit">Send Message</button>
    </form>
</div>
