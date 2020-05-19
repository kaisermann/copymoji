<script>
  import EmojiList from '../components/EmojiList.svelte';
  import { getEmojiList } from '../modules/emojis.js';
  import { getTitle } from '../stores.js';
</script>

<svelte:head>
  <title>{$getTitle('copymoji')}</title>
</svelte:head>

<EmojiList emojis={getEmojiList()} />
