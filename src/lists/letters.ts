export let letters = [
  
]

class Letter{
  letter: string
  value: number
  count: number
  constructor(letter:string,value:number){
    this.value = value;
    
    this.letter = letter;
    this.count = 6-value;
    for(let i = 0; i<this.count; i++){
      letters.push(this)
    }
    
  }}
    
new Letter('a',1)
new Letter('b', 3)
new Letter('c', 2)
new Letter('d', 2)
new Letter('e', 1)
new Letter('f', 3)
new Letter('g', 3)
new Letter('h', 3)
new Letter('i', 1)
new Letter('j', 5)
new Letter('k', 4)
new Letter('l', 2)
new Letter('m', 3)
new Letter('n', 1)
new Letter('o', 1)
new Letter('p', 3)
new Letter('q', 5)
new Letter('r', 1)
new Letter('s', 1)
new Letter('t', 1)
new Letter('u', 2)
new Letter('v', 5)
new Letter('w', 4)
new Letter('x', 5)
new Letter('y', 4)
new Letter('z', 5)
