<script lang="ts">
	import Counter from '$lib/Counter.svelte';
	import Logo from '$lib/Logo.svelte';
	import { browser } from '$app/env';
  import type { AppRouter } from '../electron/trpc';
  import { createTRPCClient } from '@trpc/client';

	let desktop: string;
  let test1: string;
  let test2: string;

  const client = createTRPCClient<AppRouter>({
    url: 'http://localhost:3001/trpc',
  });

  client.query('hello', 'something')
    .then(res => {
      console.log("test1 result:", JSON.stringify(res));
      test1 = res.greet;
  }).catch(() => console.log("test1 error"));

  client.query('hello', 'something else')
    .then(res => {
      console.log("test2 result:", JSON.stringify(res));
      test2 = res.greet;
    }).catch(() => console.log("test2 error"));

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
    {#if test1}
      {test1}
    {/if}
  </section>

  <section>
    {#if test2}
      {test2}
    {/if}
  </section>
</main>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
