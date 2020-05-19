<script>
  import emojis from '../emojis.json';
  import EmojiList from '../components/EmojiList.svelte';
  import { recently } from '../stores.js';
</script>

<style>

</style>

<svelte:head>
  <title>copymoji - recently</title>
</svelte:head>

<EmojiList emojis={$recently} />
