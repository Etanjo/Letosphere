<script context="module">
  let idcount = 0;
</script>
<script>
  let myid = idcount;
  idcount += 1;
  export let phrases;
  let show = false;
  function toggleList (e) {
    e.preventDefault();
    show = !show;
  }
</script>

<a on:click={toggleList} href={`#phrase-list-${myid}`}>
  {phrases.length} phrases!
</a>
{#if show}
<ul id={`phrase-list${myid}`}>
  {#each phrases as phrase}
    <li>{phrase}</li>
  {/each}
</ul>
{/if}