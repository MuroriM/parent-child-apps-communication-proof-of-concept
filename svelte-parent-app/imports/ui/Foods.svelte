<script>
    import { FoodsCollection } from "/imports/db/FoodsCollection";
    import Food from "/imports/ui/Food";

    const subscriber = Meteor.subscribe('foods');

    let foods = [];

    $m: {
        foods = FoodsCollection.find({}).fetch();
    }


</script>

<div>
    <h2>
        Foods Collection:
    </h2>
    <ul>
        {#each foods as food}
            <Food key={food._id} food = {food} />
        {/each}
    </ul>
</div>
