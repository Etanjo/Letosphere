import {letters} from './letters'
import { writable, get } from 'svelte/store';
export let rows = writable([
    [],
    [],
    [],
    [],
    [],
  ])
export let graveyard = writable([]);
export function getRows () {
  return rows;
}
let cellCount = 0
export class Cell{
  letter: object
  id: number
  selected = false
  clickable = true
  constructor(list, onStart){
    let letterNumber = Math.round(Math.random()*(letters.length-1))
    this.letter = letters[letterNumber]
    this.id = cellCount
    cellCount+=1
    if(onStart){
    list.push(this)}
  }
}

function makeCells(row:number){
  let $rows = get(rows)
  for(let i=0; i<5; i++)
  {new Cell($rows[row], true)}
  rows.update(($r)=>$r)
}
makeCells(0)
makeCells(1)
makeCells(2)
makeCells(3)
makeCells(4)