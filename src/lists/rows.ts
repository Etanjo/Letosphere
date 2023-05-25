import {letters} from './letters.ts'

export let rows = [
    [],
    [],
    [],
    [],
    [],
  ]

export function getRows () {
  return rows;
}
let cellCount = 0
export class Cell{
  letter: object
  id: number
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
  for(let i=0; i<5; i++)
  {new Cell(rows[row], true)}
}
makeCells(0)
makeCells(1)
makeCells(2)
makeCells(3)
makeCells(4)