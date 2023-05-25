<script>
  export let letter = {}
  export let id
  export let selected = false;
  export let nonAdjacent = false;
  export let clickable = true
  import {gameState,lastClick,addressChanges} from '../store'
  export let rn 
  export let cn
  import {rows, Cell} from '../lists/rows'
  export let onThing
  import {flip} from 'svelte/animate'

  $: {
    updateAdjacency($lastClick)
    
    
  }
  $: updatePosition($gameState.successfulSubmit)
  $: checkBelow($addressChanges)

  function updateAdjacency (coord) {
    
      if(Math.abs(coord[0]-rn)==1&&Math.abs(coord[1]-cn)==0){
        nonAdjacent = false
    }   else if(Math.abs(coord[0]-rn)==0&&Math.abs(coord[1]-cn)==1){
        nonAdjacent = false
    }   else if($gameState.clicked == true){
        nonAdjacent= true
    }  else if($gameState.clicked == false){
        nonAdjacent = false
    }}
  
  
  export function checkClick(){ 
    if($gameState.clicked == false){
      /* If nothing is selected */
      $gameState.clicked = true
      $gameState.stack = [...$gameState.stack,[rn,cn]]
      $gameState.text = $gameState.text+letter.letter
   
      selected = true
    } else if($gameState.clicked==true&&$lastClick[0]==rn&&$lastClick[1]==cn){
      /* If we're clicking the last one again */
      $gameState.stack.pop()
      $gameState = $gameState
      $gameState.text = $gameState.text.substring(0,$gameState.text.length-1)
      
      selected = false
      if($gameState.stack.length == 0){
        $gameState.clicked = false
        
      }

    }else if(nonAdjacent==false && selected == false){
      $gameState.stack = [...$gameState.stack,[rn,cn]]
      $gameState.text = $gameState.text+letter.letter
   
      selected = true
      } 
  }
  function updatePosition(thing){

    if(thing==true){
      
      nonAdjacent=false
      if(selected==true){
        $gameState.score+=letter.value
        
        if(rn==0){
          //debugger;
          let newSelf = new Cell(rows[0], false)
          rows[rn][cn] = newSelf 
          
          onThing()
        }
        else{
          $addressChanges = [...$addressChanges, {rn,cn}]
          
        }
        $gameState.letterCount+=1
        selected = false
        
      }
      }
    }
    
  
  function checkBelow(list)
  {
    let nextRow = rn+1
    let change = list.find((o)=>o.rn==nextRow&&o.cn==cn)
    if(change){
        let self = rows[rn][cn]
      if(rn==0){
        rows[rn][cn] = new Cell(rows[0], false)
        rows[nextRow][cn] = self
    $addressChanges = [
          ...$addressChanges.filter((o)=>o!=change)
        ]
      }else{
        rows[rn][cn].id = $gameState.fakeID
        rows[nextRow][cn]=self
        $gameState.fakeID+=1
          $addressChanges = [
          ...$addressChanges.filter((o)=>o!=change),
          {rn,cn}
        ]
      }
        onThing()
        rn = nextRow
  }}
</script>

<div class:selected on:click ={()=>checkClick()}  class:nonAdjacent>
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