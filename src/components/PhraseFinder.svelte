<script>
  import PhraseList from './PhraseList.svelte'
  import {phrases,findPhraseContainingText, findPhraseContainingWord} from '../lists/phrases'
  let withText = [];
  let withWord = [];
  let search = '';
  /* Our phrase dictionary has curly apostrophes */
  $: search = search.replace("'","’")
  $: withText = findPhraseContainingText(search);
  $: withWord = findPhraseContainingWord(search);
</script>

<input type="text" bind:value={search}>

{#if search && withWord.length}
  <div>
    Phrases Containing Word "{search}"
    <PhraseList phrases={withWord}/>
  </div>
{/if}
{#if search && withText.length && withText.length != withWord.length}
  <div>
    Phrases Containing text "{search}"
    <PhraseList phrases={withText}/>
  </div>
{/if}
<div>All Phrases:
  <PhraseList {phrases}/>
</div>
