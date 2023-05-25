import {writable, derived} from 'svelte/store'
import {isWord} from './lists/words'
export let gameState = writable({
  text:'',
  score: 0,
  clicked: false,
  stack: [],
  successfulSubmit: false,
  letterCount: 0,
  fakeID: 0.01,
  totalLetters: 0
})

gameState.text+='l'
console.log(gameState.text)

export const lastClick = derived(
  gameState,
  ($gameState)=>{
    if ($gameState.stack.length) {
      return $gameState.stack.slice(-1)[0]
    } else {
      return []
    }
  }
  );

export function submitWord(){
  
    gameState.update(
      ($gameState)=>{
        if(isWord($gameState.text)){
        $gameState.successfulSubmit = true
        
        return $gameState
        console.log($gameState.successfulSubmit, $gamestate.text.length)
        }else{
          return $gameState
        }
      }
    )
  }

export let addressChanges = writable([])

export function wordReset(v){
  gameState.update(
    ($gameState)=>{
    if(v == $gameState.text.length){
      $gameState.text = ''
      $gameState.successfulSubmit = 0
      $gameState.clicked = false
      $gameState.totalLetters+=$gameState.letterCount
      console.log('total letters:', $gameState.totalLetters)
      $gameState.letterCount = 0
    }
    return $gameState
  
    }
  )
}

  