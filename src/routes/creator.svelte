<script>
  import CopyButton from '../components/CopyButton.svelte';
  import emojis from '../emojis.json';
  import EmojiList from '../components/EmojiList.svelte';
  import PartList from '../components/creator/PartList.svelte';
  import { recently } from '../stores.js';

  import arms from '../parts/arms.json';
  import eyes from '../parts/eyes.json';
  import heads from '../parts/heads.json';
  import mouthsAndNoses from '../parts/mouthsAndNoses.json';

  let currentCreation = {
    leftOutsideArm: null,
    leftFace: null,
    leftInsideArm: null,
    leftCheek: null,
    leftEye: null,
    mouth: null,
    nose: null,
    rightEye: null,
    rightCheek: null,
    rightInsideArm: null,
    rightFace: null,
    rightOutsideArm: null,
    ...arms[0],
    ...eyes[0],
    ...heads[0],
    ...mouthsAndNoses[0],
  };

  function mapCreation(creation, ...parts) {
    return Object.assign({}, creation, ...parts);
  }

  function mapCurrentCreation(...parts) {
    return (currentCreation = mapCreation(currentCreation, ...parts));
  }

  function formatCreation(creation) {
    const parts = Object.entries(creation).map(([, val]) => val || '');
    return parts.join('');
  }

  $: formattedCreation = formatCreation(currentCreation);
</script>

<style>
  .wrapper {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .parts {
    flex-grow: 1;
    padding-left: 2rem;
  }

  .creation-col {
    width: 40%;
    font-size: 2rem;
  }

  .formatted-creation {
    padding: 0.2rem;
    top: 50%;
    position: sticky;
    transform: translateY(-50%);
  }

  .creation {
    font-size: 3rem;
  }
</style>

<svelte:head>
  <title>copymoji - creator</title>
</svelte:head>

<div class="wrapper">
  <div class="parts">
    <PartList
      title="heads"
      items={heads}
      on:select={(e) => mapCurrentCreation(e.detail)}
      let:item>
      {formatCreation(mapCreation(currentCreation, item))}
    </PartList>
    <PartList
      title="eyes"
      items={eyes}
      on:select={(e) => mapCurrentCreation(e.detail)}
      let:item>
      {formatCreation(mapCreation(currentCreation, item))}
    </PartList>
    <PartList
      title="mouths/noses"
      items={mouthsAndNoses}
      on:select={(e) => mapCurrentCreation(e.detail)}
      let:item>
      {formatCreation(mapCreation(currentCreation, item))}
    </PartList>

    <PartList
      title="arms"
      items={arms}
      on:select={(e) => mapCurrentCreation(e.detail)}
      let:item>
      {formatCreation(mapCreation(currentCreation, item))}
    </PartList>
  </div>

  <div class="creation-col">
    <div class="formatted-creation">
      <CopyButton>
        <span class="creation">{formattedCreation}</span>
      </CopyButton>
    </div>
  </div>
</div>
