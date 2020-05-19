<script>
  import emojis from '../emojis.json';
  import EmojiList from '../components/EmojiList.svelte';
  import { recently, getTitle } from '../stores.js';
</script>

<style>

</style>

<svelte:head>
  <title>{$getTitle('recently')}</title>
</svelte:head>

<EmojiList emojis={$recently} />
