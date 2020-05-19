<script>
  import CopyButton from '../components/CopyButton.svelte';
  import emojis from '../emojis.json';
  import EmojiList from '../components/EmojiList.svelte';
  import PartList from '../components/creator/PartList.svelte';
  import ListControls from '../components/creator/ListControls.svelte';
  import { recently } from '../stores.js';
  import arms from '../parts/arms.json';
  import eyes from '../parts/eyes.json';
  import heads from '../parts/heads.json';
  import mouthsAndNoses from '../parts/mouthsAndNoses.json';
  import accessories from '../parts/accessories.json';
  import CloseIcon from '../components/icons/Close.svelte';

  import * as Utils from '../components/creator/utils.js';

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

  .creation {
    margin-top: 2rem;
    display: inline-block;
    font-size: 2rem;
    padding: 1rem;
    border: 0.2rem dashed white;
  }

  .parts {
    margin: 4rem 2rem 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
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
  <title>copymoji - creator</title>
</svelte:head>

<div class="wrapper">
  <div class="creation">
    <CopyButton>
      <span class="created-emoji">{formattedCreation}</span>
    </CopyButton>
  </div>

  <div class="parts">
    <PartList
      title="heads"
      parts={heads}
      template={creation}
      allowEmpty
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
      title="accessories"
      parts={accessories}
      template={creation}
      allowEmpty
      sides
      on:clear={(e) => (creation = e.detail)}
      on:select={(e) => (creation = e.detail)} />
  </div>

</div>
