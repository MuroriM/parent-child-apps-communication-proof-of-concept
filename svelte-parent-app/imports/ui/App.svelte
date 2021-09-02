<script>
  //imports
  import Message from "/imports/ui/Message";
  import Counter from "/imports/ui/Counter";
  import DisplayMessageForm from "/imports/ui/DisplayMessageForm";
  import AlertMessageForm from "/imports/ui/AlertMessageForm";
  import ChildCounterButtons from "/imports/ui/ChildCounterButtons"
  import { iFrameLoaded } from "/imports/api/stores";
  import ChildToParentAPI from "/imports/api/ChildToParentAPI"

  //verify that iFrame has loaded
  const oniFrameLoad = () => {
    iFrameLoaded.set(true);
    if(iFrameLoaded){
      console.log('child iFrame loaded, logging from parent!');
    }
  }

</script>


<div class="container">
  <ChildToParentAPI />
  <h1>Svelte Parent App</h1>
  <Message />
  <Counter />
  <DisplayMessageForm />
  <AlertMessageForm />
  <ChildCounterButtons />
  <br />

  <div>
    <iframe on:load={oniFrameLoad} id='iframe' title="react-child-app" src="http://localhost:3000/" width="600" height="300" sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation allow-modals"></iframe>
  </div>

</div>

