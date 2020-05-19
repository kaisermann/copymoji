<script>
  import Nav from '../components/Nav.svelte';

  export let segment;
</script>

<style>
  .wrapper {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-row-gap: 1rem;
    height: 100vh;
  }

  main {
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>

<div class="wrapper">
  <Nav {segment} />

  <main>
    <slot />
  </main>
</div>
