<script lang="ts">
  import 'carbon-components-svelte/css/g90.css';
  import { onMount } from 'svelte';
  import { ClickableTile, Link } from 'carbon-components-svelte';

  let ready: boolean = false;
  onMount(() => (ready = true));
</script>

<div class="dragbar" />

<nav>
  <ClickableTile href="/" light><h2>Home</h2></ClickableTile>
</nav>
<main>
  {#if ready}
    <slot />
  {/if}
</main>

<style>
  main {
    padding: 10%;
  }
  .dragbar {
    -webkit-app-region: drag;
    position: absolute;
    z-index: 100;
    height: 40px;
    width: 100%;
  }
</style>
