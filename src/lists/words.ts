import wordText from './wordsEn.txt?raw';
export let words = wordText.split('\n')
words = words.map(
  (w)=>w
    .toLowerCase() // lower case
    .replace(/^\s*/,'') // remove leading spaces
    .replace(/\s*$/,'') // remove trailing spaces
);

export function isWord (w) {
  return words.indexOf(w)>-1
}

export function getWordsThatStartWith (beginning) {
  return words.filter(
    (w)=>w.indexOf(beginning)==0
  )
}

export function getWordsThatContain (fragment) {
  return words.filter(
    (w)=>w.indexOf(fragment)>-1
  )
}


