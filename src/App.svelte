<script lang="ts">
  import GameBoard from './components/GameBoard.svelte'
  import WordLine from './components/WordLine.svelte'
  import {gameState, lastClick} from './store'
  import StartPopup from './components/StartPopup.svelte'
  


  let gameStarted = false;
  
</script>

<main>
  <div>
  <h1>LETOSPHERE</h1>
  <h4><a href= 'https://github.com/Etanjo/Letosphere/commits/main' target= '_blank' >Patch Notes</a></h4>
    {#if gameStarted == true}
      <p>Score: {$gameState.score}</p>
      <WordLine/>
      <GameBoard/>
    {:else}
      <StartPopup on:click={()=>gameStarted=true}/>  
    {/if}
    
  </div>
</main>

<style>
  h1 {
    font-size: 40px;
    color: #00B1CC;
    text-shadow: 1px 1px 3px
  }
  a{
    color: #00B1CC;
    text-shadow: 1px 1px 3px;
    text-decoration: none;
  }
  p{
    
  }
  div {
    border: 1px solid #eee;
    padding: 2em;
    margin: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
