<script>
    import { FoodsCollection } from "/imports/db/FoodsCollection"
    export let key;
    export let food;

    const deleteFood = () => {
        FoodsCollection.remove(food._id);
    }

</script>

<p>{food.name}</p>
<button on:click={deleteFood}>X</button>
