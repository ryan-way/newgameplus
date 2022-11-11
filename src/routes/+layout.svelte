<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';

  let ready: boolean = false;
  onMount(() => (ready = true));
</script>

<div class="dragbar" />

<main class="bg-[#282828] block w-screen h-screen text-neutral-200 text-3xl font-mono">
  <nav class="bg-[#3c3836] flex shadow-lg">
    <a href="/" class="hover:bg-[#b16286] hover:text-[#3c3836] p-5">Home</a>
  </nav>
  <section class="h-5/6 p-20 align-middle text-center">
    {#if ready}
      <slot />
    {/if}
  </section>
</main>

<style>
</style>
