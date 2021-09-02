<script>
    import { iFrameLoaded } from "/imports/api/stores"

    const increment = () => {
        console.log('one increment trigger on parent')
        if(iFrameLoaded){
            document.getElementById('iframe').contentWindow.postMessage({function: 'incrementCount'}, "http://localhost:3000/")
        }
        else{
            throw new Meteor.Error('iFrame not loaded yet!')
        }
        return;
    }

    const decrement = () => {
        if(iFrameLoaded){
            document.getElementById('iframe').contentWindow.postMessage({function: 'decrementCount'}, "http://localhost:3000/")
        }
        else{
            throw new Meteor.Error('iFrame not loaded yet!')
        }
    }
</script>

<div>
    <h3>Change count on child app:</h3>
    <button on:click={increment}>+</button>
    <button on:click={decrement}>-</button>
</div>
