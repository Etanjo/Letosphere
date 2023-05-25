<script lang="ts">
    import {words, getWordsThatStartWith, isWord} from '../lists/words.ts';
    let entry = '';
    let valid = false;
    let hasFocus;
    let completions = [];
    $: if (entry) {      
      completions = getWordsThatStartWith(entry)
    } else {
      completions = [];
    }
  $: {
    
    valid = entry && isWord(entry);
    console.log('Check validity of',entry,'=>',valid);
  }

  let refocused = false;

  function focus () {
    refocused  =  true;
    hasFocus = true;
  }
  function unfocus () {
    refocused = false;
    setTimeout(
      ()=>{
        if (!refocused) {
          hasFocus = false;
        }
      },
      300
    );
  }
  function handleKey (e) {
    if (e.key=='Tab' && completions) {
      let currentIndex = completions.indexOf(entry);
      if (completions.length > currentIndex+1) {
        entry = completions[currentIndex+1];
        e.preventDefault();
      }
    }
    if (e.key=='Enter' && completions) {
      entry = completions[0];
      e.preventDefault();
    }
  }
</script>
<div class:valid>
<input on:keydown={handleKey} on:focus={focus} on:blur={unfocus} bind:value={entry}> 

  
{#if hasFocus}
<ul>
  {#each completions as completion,n}
    {#if n < 10}
    <li on:click={()=>{entry=completion}}>{completion}</li>
    {/if}
  {/each}
</ul>
{/if}
</div>

<style>
  input {    
    border-color: transparent;
    outline: none;
  }  
  div {
    border: 3px solid grey;
    margin: 0;
    padding: 0;
    display: grid;
    place-content: center;
    justify-content:stretch;
    align-items:stretch;
    max-width: 20em;
    height: 2em;
  }
  div:focus-within {
    border-color: blue;
  }
  .valid,.valid:focus-within {
    border-color: green;
  }
  
  div {
    position: relative;
    text-align: left;
  }
  
  ul {
    position: absolute;
    top: 1.5em;
    right: 0;
    font-size: 16px;
    padding-left: 0;
    background-color: #fffd;
  }
  li {
    list-style: none;
  }
</style>