<script>
  import emojis from '../emojis.json';
  import EmojiList from '../components/EmojiList.svelte';
</script>

<svelte:head>
  <title>copymoji</title>
</svelte:head>

<EmojiList {emojis} />
