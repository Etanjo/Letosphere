<script>
  import{gameState, wordReset} from '../store'
  import Letter from './Letter.svelte'
  import {letters} from '../lists/letters'
  import {rows, graveyard} from '../lists/rows'
  import {flip} from 'svelte/animate'
  import { crossfade, fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import {lastClick} from '../store'
  import {Cell} from '../lists/rows'
  
  $: console.log('Row change',$rows)
  function updateRows(){
    $rows = $rows
  }

 
  $: wordReset($gameState.letterCount)
  	const [send, receive] = crossfade({
		duration: d => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});
    function checkSelected(r,c,stack,cell){
      let v = false
        for(let i =0; i<stack.length; i++){
          let myrow = stack[i][0];
          let mycol = stack[i][1];
          if(stack[i][0]==r&&stack[i][1]==c){
            v=true
            return v
            cell.selected = v
          }
        }
      
      
    }
    function checkAdjacency(r,c,stack,cell){
      let v = true
      if(stack.length >0){
      if(Math.abs(stack[stack.length-1][0]-r)==1&&stack[stack.length-1][1]==c){
        v=true
      }else if(Math.abs(stack[stack.length-1][1]-c)==1&&stack[stack.length-1][0]==r){
        v=true
      }else{
        v=false
      }
      }
      cell.clickable=v
      return v
    }
    
function onclick (cell, rn, cn) {
    if($gameState.clicked == false){
      /* If nothing is selected */
      $gameState.clicked = true
      $gameState.stack = [...$gameState.stack,[rn,cn]]
      $gameState.text = $gameState.text+cell.letter.letter
      cell.selected = true
    } else if($gameState.clicked==true&&$lastClick[0]==rn&&$lastClick[1]==cn){
      /* If we're clicking the last one again */
      $gameState.stack.pop()
      $gameState = $gameState
      $gameState.text = $gameState.text.substring(0,$gameState.text.length-1)
      
      cell.selected = false
      if($gameState.stack.length == 0){
        $gameState.clicked = false
        
      }

    }else if(cell.clickable==true && cell.selected == false){
      $gameState.stack = [...$gameState.stack,[rn,cn]]
      $gameState.text = $gameState.text+cell.letter.letter
   
      cell.selected = true
      } else{
        cell.selected=false
      }
  }
      function handleSubmit(cause){
        //checking for selected cells
        if(cause==true){
        for(let r = 0; r<5;r++){
          for(let c = 0;c<5;c++){
            if($rows[r][c].selected){
              $gameState.score+=$rows[r][c].letter.value
              $rows[r][c]=null
            }
          }
        }
        //checking for cells to drop
        for(let r = 4; r>=0;r--){
          for(let c = 0;c<5;c++){
            if (!$rows[r][c]) {
					let delta = -1;
					while (r+delta>0&&!$rows[r + delta][c]) {delta -= 1
          console.log(r,c,delta)}
          if(r+delta>=0){
					$rows[r][c] = $rows[r+delta][c];
					$rows[r+delta][c] = null;}
      }}}
        //check for missing top cell
        for(let r = 0;r<5;r++){
          for(let c = 0;c<5;c++){
            if(!$rows[r][c]){
              $rows[r][c] = new Cell()
            }
          }}
        $gameState.stack = []
        $gameState.text = '';
        $gameState.successfulSubmit= false;
      
      
    }}
    function clearRow(r){
      console.log('clearing')
      for(let c = 0; c<5;c++){
        $rows[r][c] = null
      }
      for(let c = 0;c<5;c++){
            if(!$rows[r][c]){
              $rows[r][c] = new Cell()
            }
          }
    }

      function clearBottomRow(){
        if($gameState.score>=8){
          clearRow(4)
          $gameState.score-=8
        }
      }
      function clearBoard(){
        if($gameState.score>=40){
          for(let r = 0;r<5;r++){
            clearRow(r)
          }
          $gameState.score-=40
        }
      }
      $: handleSubmit($gameState.successfulSubmit)
</script>

<main>
  <div class = power-ups>
    <button on:click={()=>clearBottomRow()}>CLEAR BOTTOM ROW (8 points)</button>
    <button on:click={()=>clearBoard()}>CLEAR BOARD (40 points)</button>
  </div>
  <div class = board>
    {#each $rows as row, rn}

    {#each row as cell, cn 
      (cell.id)}
      <!-- <div animate:flip in:receive={{key:cell.id}} out:send={{key:cell.id}} class={cell.id}> -->
      <div animate:flip  in:receive={{key:cell.id}} out:send={{key:cell.id}}>
      <Letter on:click={()=>onclick(cell,rn,cn)}
         cell = {cell}
        {rn} {cn}
          nonAdjacent={!checkAdjacency(rn,cn,$gameState.stack,cell)}  
          selected={checkSelected(rn,cn,$gameState.stack,cell)}   
          onThing={()=>updateRows()}></Letter>
      </div>
    {/each}
    {/each}
  </div>
  <div class="graveyard">
    {#each $graveyard as cell (cell.id)}
      <div animate:flip in:receive={{key:cell.id}}>{cell.letter.letter}</div>
    {/each}
  </div>
</main>

<style>
  div.board{
    display: inline-grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;

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
  .power-ups{
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 5px;
  }
</style>