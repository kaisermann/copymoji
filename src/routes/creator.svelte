<script>
  import CopyButton from '../components/CopyButton.svelte';
  import EmojiList from '../components/EmojiList.svelte';
  import PartList from '../components/creator/PartList.svelte';
  import { recently, getTitle } from '../stores.js';
  import CloseIcon from '../components/icons/Close.svelte';
  import * as Utils from '../components/creator/utils.js';

  import arms from '../emojis/parts/arms.json';
  import eyes from '../emojis/parts/eyes.json';
  import heads from '../emojis/parts/heads.json';
  import mouthsAndNoses from '../emojis/parts/mouthsAndNoses.json';
  import cheeks from '../emojis/parts/cheeks.json';
  import accessories from '../emojis/parts/accessories.json';

  let creation = Utils.assign(
    Utils.getEmpty(),
    arms.list[0],
    eyes.list[0],
    heads.list[0],
    mouthsAndNoses.list[0],
  );

  $: formattedCreation = Utils.format(creation);
</script>

<style>
  .wrapper {
    text-align: center;
  }

  .creation-section {
    position: sticky;
    top: 0;
    background-color: black;
    padding: 1.5rem 0;
    z-index: 2;
  }

  .creation {
    display: inline-block;
    font-size: 2rem;
    padding: 1rem;
    border: 0.2rem dashed white;
  }

  .parts {
    margin: 4rem 2rem 0;
    grid-gap: 1rem;
    justify-content: center;
  }

  .created-emoji {
    font-size: clamp(2rem, 4vw, 4rem);
  }

  @media (max-width: 800px) {
    .parts {
      grid-template-columns: 1fr;
    }
  }
</style>

<svelte:head>
  <title>{$getTitle('creator')}</title>
</svelte:head>

<div class="wrapper">
  <div class="creation-section">
    <div class="creation">
      <CopyButton content={formattedCreation} let:content>
        <span class="created-emoji">{content}</span>
      </CopyButton>
    </div>
  </div>

  <div class="parts">
    <PartList
      title="heads"
      parts={heads}
      template={creation}
      allowEmpty
      sides
      on:clear={(e) => (creation = e.detail)}
      on:select={(e) => (creation = e.detail)} />

    <PartList
      title="eyes"
      parts={eyes}
      sides
      template={creation}
      on:select={(e) => (creation = e.detail)} />

    <PartList
      title="mouths/noses"
      parts={mouthsAndNoses}
      template={creation}
      allowEmpty
      on:clear={(e) => (creation = e.detail)}
      on:select={(e) => (creation = e.detail)} />

    <PartList
      title="arms"
      parts={arms}
      template={creation}
      allowEmpty
      sides
      on:clear={(e) => (creation = e.detail)}
      on:select={(e) => (creation = e.detail)} />

    <PartList
      title="cheeks"
      parts={cheeks}
      template={creation}
      allowEmpty
      sides
      on:clear={(e) => (creation = e.detail)}
      on:select={(e) => (creation = e.detail)} />

    <PartList
      title="accessories"
      parts={accessories}
      template={creation}
      allowEmpty
      sides
      on:clear={(e) => (creation = e.detail)}
      on:select={(e) => (creation = e.detail)} />
  </div>

</div>
