import phraseText from './phrasesEn.txt?raw';
export let phrases = phraseText.split(/\n/);
phrases = phrases.map(
  (p)=>p.toLowerCase()
        .replace(/^\s*/,'') // leading whitespace
        .replace(/\s*$/,'') // trailing whitespace
        .replace(/\s+/g,' ') // multiple white spaces
);

export function findPhraseContainingText (text) {
  return phrases.filter(
    /* -1 index = not present */
    (p)=>p.indexOf(text)>-1
  )
}

export function findPhraseContainingWord (word) {
  /* \b in a RegExp is a word boundary */
  let regexp = new RegExp(`\\b${word}\\b`);
  return phrases.filter(
    /* -1 index = not present */
    (p)=>p.search(regexp)>-1
  )
}