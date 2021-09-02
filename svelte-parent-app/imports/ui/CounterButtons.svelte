<script>
    import { iFrameLoaded } from "./stores"

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
    <h3>Change count on child</h3>
    <button on:click|preventDefault={increment}>+</button>
    <button on:click|preventDefault={decrement}>-</button>
</div>
