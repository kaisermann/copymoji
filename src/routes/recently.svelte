<script>
  import EmojiList from '../components/EmojiList.svelte';
  import { recently, getTitle } from '../stores.js';
</script>

<svelte:head>
  <title>{$getTitle('recently')}</title>
</svelte:head>

<EmojiList emojis={$recently} />
