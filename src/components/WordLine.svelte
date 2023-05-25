<script>
  export let correct = true;
  export let incorrect = false;
  import {gameState} from '../store'
  import {submitWord} from '../store'
</script>
<div class:correct class:incorrect>
  {#if $gameState.text}
    {$gameState.text}
    <button on:click={()=>submitWord()}>SUBMIT</button>
  {/if}
</div>
<style>
  div{
    width: 100%;
    height: 80px;
    color: #494B5B;
    text-align: center;
    text-transform: capitalize;
  }
  div::after{
    display: block;
    width: 90%;
    background-color: #494B5B;
    height: 3px;
    position: absolute;
    content:' ';
  }
  @keyframes Correct{
    0%{color:#494B5B}
    25%{color: lightgreen}
    75%{color: #494B5B}
  }
  div.correct{
    animation-name: Correct;
    animation-duration: 2s;
  animation-iteration-count: infinite;
  }
</style>