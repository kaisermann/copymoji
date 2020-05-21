<script>
  export let template;
  export let part

</script>

<style>
  .control-btn.active {
    background-color: white;
    color: black;
    outline: 1px solid black;
  }

  .control-btn:disabled {
    opacity: 0.2;
  }

  .side-btns {
    visibility: hidden;
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
  }
</style>

<div class="side-btns">
  <button
    title="only add left side"
    class="btn control-btn"
    class:active={Utils.hasSpecificPart(template, part, leftProps)}
    disabled={Utils.hasSideParts('left', part) === false}
    on:click={() => {
      if (Utils.hasSpecificPart(template, part, leftProps)) {
        dispatch('clear', Utils.removeParts(template, leftProps));
      } else {
        dispatch('select', Utils.assign(template, Utils.ignoreParts(part, rightProps)));
      }
    }}>
    L
  </button>
  <button
    title="only add right side"
    class="btn control-btn"
    class:active={Utils.hasSpecificPart(template, part, rightProps)}
    disabled={Utils.hasSideParts('right', part) === false}
    on:click={() => {
      if (Utils.hasSpecificPart(template, part, rightProps)) {
        dispatch('clear', Utils.removeParts(template, rightProps));
      } else {
        dispatch('select', Utils.assign(template, Utils.ignoreParts(part, leftProps)));
      }
    }}>
    R
  </button>
</div>
