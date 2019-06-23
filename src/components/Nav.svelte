<script>
  export let segment;
</script>

<style>
  .goto-recently {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
  .goto-main {
    position: absolute;
    left: 1rem;
    top: 1rem;
  }

  .goto-main,
  .goto-recently {
    transition: all 0.6s ease;
  }
</style>

<template>
  <nav>
    <a class="goto-main" class:selected={segment === undefined} href=".">
      home
    </a>
    <a
      class="goto-recently"
      class:selected={segment === 'recently'}
      href="recently">
      recently
    </a>
  </nav>
</template>
