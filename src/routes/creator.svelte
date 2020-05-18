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

  function formatCreation(creation, ...creationParts) {
    const parts = Object.entries(mapCreation(creation, ...creationParts)).map(
      ([, val]) => val || '',
    );
    return parts.join('');
  }

  $: formattedCreation = formatCreation(currentCreation);
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

  @media (max-width: 640px) {
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

</div>
