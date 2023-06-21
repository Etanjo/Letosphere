<script>
  export let cell = {}
  export let letter = cell.letter
  export let id = cell.id;
  export let clickable = cell.clickable
  export let nonAdjacent = !clickable;
  import {gameState,lastClick,addressChanges} from '../store'
  export let rn 
  export let cn
  export let selected = $gameState.stack.indexOf({rn,cn})>-1
  import {rows, Cell, graveyard} from '../lists/rows'
  export let onThing

</script>

<div class={letter.letter} class:selected on:click  class:nonAdjacent>
  <p>{letter.letter}</p>
</div>

<style>
  div{
    border: 3px solid #00B1CC;
    border-radius: 50%;
    background-color: #DDDEE4;
    color: #00B1CC;
    width: 90px;
    height: 90px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-size: 30px;
    transition: all 250ms;
  }

  div.selected{
        background-color: #00B1CC ;
    color: #DDDEE4;
    border: 3px solid #DDDEE4;
    font-weight: bold;
  }
  .nonAdjacent{
    background-color: #B10906;
    color: #DDDEE4;
    border: 3px solid #DDDEE4;
  }
</style>