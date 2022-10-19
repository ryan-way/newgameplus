<script lang="ts">
  import Counter from '$lib/Counter.svelte';
  import Logo from '$lib/Logo.svelte';
  import { browser } from '$app/env';
  import type { AppRouter } from '../electron/trpc';
  import { createTRPCClient } from '@trpc/client';

  let desktop: string;
  let sveltekitCount = 0;
  let electronCount = 0;

  let sveltekitClient = createTRPCClient<AppRouter>({
    url: 'http://localhost:3000/trpc',
  });

  let electronClient = createTRPCClient<AppRouter>({
    url: 'http://localhost:3001/trpc',
  });

  function onSveltekitClick() {
    sveltekitClient.query('count', sveltekitCount).then(res => {
      console.log('Sveltekit result:', JSON.stringify(res));
      sveltekitCount = res.num;
    });
  }

  function onElectronClick() {
    electronClient.query('count', electronCount).then(res => {
      console.log('Electron result:', JSON.stringify(res));
      electronCount = res.num;
    });
  }

  if (window.electron && browser) {
    window.electron.receive('from-main', (data: any) => {
      desktop = `Received Message "${data}" from Electron`;
      console.log(desktop);
    });
  }

  const agent = window.electron ? 'Electron' : 'Browser';
</script>

<main>
  <Logo />

  <h1>Hello {agent}!</h1>

  <Counter id="0" {agent} />

  {#if desktop}
    <br />
    <br />
    {desktop}
  {/if}
  <section>
    <p>Sveltekit Count is {sveltekitCount}</p>
    <button on:click={onSveltekitClick}>Test SvelteKit</button>
  </section>

  <section>
    <p>Electron Count is {electronCount}</p>
    <button on:click={onElectronClick}>Test Electron</button>
  </section>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }

  :global(body) {
    margin: 0;
    padding: 0;
  }

  main {
    padding: 2em 1em 1em 1em;
    text-align: center;
    animation: fade 1s;
    margin: 0 auto;
  }

  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
