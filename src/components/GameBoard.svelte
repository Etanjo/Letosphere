<script>
  import{gameState, wordReset} from '../store'
  import Letter from './Letter.svelte'
  import {letters} from '../lists/letters.ts'
  import {getRows} from '../lists/rows.ts'
  import {flip} from 'svelte/animate'
  import { crossfade } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  let rows = getRows();
  
  function updateRows(){
    console.log('row time!!')
    rows = rows
  }
  $:{
    console.log($gameState.addressChanges)
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
</script>

<main>
  <div class = board>
    {#each rows as row, rn}

    {#each row as cell, cn 
      (cell.id)}
      <div animate:flip in:receive={{key:cell.id}} out:send={{key:cell.id}}>
      <Letter  letter = {cell.letter} {rn} {cn} id={cell.id} onThing={()=>updateRows()}></Letter>
      </div>
    {/each}
    {/each}
  </div>
</main>

<style>
  div.board{
    display: inline-grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;

  }
</style>