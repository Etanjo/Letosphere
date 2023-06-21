<script>
  export let correct = false;
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
  button{
    background-color: #DDDEE4;
    color: #00B1CC;
    transition: all 300ms;
    border: 2px solid #00B1CC;
    border-radius: 5px;

  }
  button:active{
    color: #DDDEE4;
    background-color: #00B1CC;
    border: 2px solid #DDDEE4;
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