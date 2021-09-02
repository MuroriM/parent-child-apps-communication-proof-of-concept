<script>
    import { incomingMessageText } from "/imports/api/stores"
</script>

<div>
    {#if (!$incomingMessageText)}
        <h2>Listening for messages...</h2>
    {:else}
        <h2>Message received from child: {$incomingMessageText}</h2>
    {/if}
</div>
