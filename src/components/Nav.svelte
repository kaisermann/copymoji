<script>
  export let segment;
</script>

<style>
  nav {
    padding: 0 0.4rem;
    text-align: right;
  }

  .selected {
    font-weight: bold;
    text-decoration: none;
    transform: scale(1.05);
  }

  a {
    display: inline-block;
    padding: 0.8rem 0.4rem 0;
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
