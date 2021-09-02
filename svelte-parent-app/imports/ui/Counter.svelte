<script>
    import {count} from "/imports/api/stores";
</script>

<div>
    <h2>The current count is: {$count}</h2>
    <button
      on:click={() => {
        count.set($count + 1);
      }}
    >
      +
    </button>

    <button
      on:click={() => {
        count.set($count - 1);
      }}
    >
      -
    </button>
</div>