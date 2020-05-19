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

  let currentCreation = {
    leftOutsideAccessory: null,
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
    rightOutsideAccessory: null,
    ...arms.parts[0],
    ...eyes.parts[0],
    ...heads.parts[0],
    ...mouthsAndNoses.parts[0],
  };

  function removeParts(creation, propList) {
    const copy = { ...creation };
    for (const prop of propList) {
      copy[prop] = null;
    }
    return copy;
  }

  function mapCreation(creation, ...parts) {
    return Object.assign({}, creation, ...parts);
  }

  function setCurrentCreation(...parts) {
    currentCreation = mapCreation(currentCreation, ...parts);
  }

  function formatCreation(creation, ...creationParts) {
    const parts = Object.entries(mapCreation(creation, ...creationParts)).map(
      ([, val]) => val || '',
    );
    return parts.join('');
  }

  function getSideProps(side, props) {
    return props.filter((prop) => prop.startsWith(side));
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
      items={heads.parts}
      on:select={(e) => setCurrentCreation(e.detail)}
      let:item>
      {formatCreation(mapCreation(currentCreation, item))}
      <div slot="controls">
        <ListControls
          sides
          on:clear={() => setCurrentCreation(removeParts(currentCreation, heads.props))}
          on:clear-left={() => setCurrentCreation(removeParts(currentCreation, getSideProps('left', heads.props)))}
          on:clear-right={() => setCurrentCreation(removeParts(currentCreation, getSideProps('right', heads.props)))} />

      </div>
    </PartList>

    <PartList
      title="eyes"
      items={eyes.parts}
      on:select={(e) => setCurrentCreation(e.detail)}
      let:item>
      {formatCreation(mapCreation(currentCreation, item))}
    </PartList>

    <PartList
      title="mouths/noses"
      items={mouthsAndNoses.parts}
      on:select={(e) => setCurrentCreation(e.detail)}
      on:clear={() => setCurrentCreation(removeParts(currentCreation, mouthsAndNoses.props))}
      let:item>
      {formatCreation(mapCreation(currentCreation, item))}
      <div slot="controls">
        <ListControls
          on:clear={() => setCurrentCreation(removeParts(currentCreation, mouthsAndNoses.props))} />
      </div>
    </PartList>

    <PartList
      title="arms"
      items={arms.parts}
      on:clear={() => setCurrentCreation(removeParts(currentCreation, arms.props))}
      on:select={(e) => setCurrentCreation(e.detail)}
      let:item>
      {formatCreation(mapCreation(currentCreation, item))}
      <div slot="controls">
        <ListControls
          sides
          on:clear={() => setCurrentCreation(removeParts(currentCreation, arms.props))}
          on:clear-left={() => setCurrentCreation(removeParts(currentCreation, getSideProps('left', arms.props)))}
          on:clear-right={() => setCurrentCreation(removeParts(currentCreation, getSideProps('right', arms.props)))} />
      </div>
    </PartList>

    <PartList
      title="accessories"
      items={accessories.parts}
      on:clear={() => setCurrentCreation(removeParts(currentCreation, accessories.props))}
      on:select={(e) => setCurrentCreation(e.detail)}
      let:item>
      {formatCreation(mapCreation(currentCreation, item))}
      <div slot="controls">
        <ListControls
          sides
          on:clear={() => setCurrentCreation(removeParts(currentCreation, accessories.props))}
          on:clear-left={() => setCurrentCreation(removeParts(currentCreation, getSideProps('left', accessories.props)))}
          on:clear-right={() => setCurrentCreation(removeParts(currentCreation, getSideProps('right', accessories.props)))} />
      </div>
    </PartList>
  </div>

</div>
