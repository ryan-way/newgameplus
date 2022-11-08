<script lang="ts">
  import ClickableTile from 'carbon-components-svelte/src/Tile/ClickableTile.svelte';
  import type { AppRouter } from './../trpc';
  import { ipcLink } from './../trpc/link';
  import { createTRPCClient } from '@trpc/client';

  /* let trpcClient = createTRPCClient<AppRouter>({ */
  /*   links: [ipcLink()], */
  /* }); */

  /* async function test() { */
  /*   console.log('sanity check'); */
  /*   const { count } = await trpcClient.query('count-first'); */

  /*   console.log('first count is:', count); */

  /*   const newCount = await trpcClient.query('compute-count', count); */

  /*   console.log('new count is:', newCount); */
  /* } */

  /* test(); */

  let games = [
    { name: 'Tic Tac Toe', link: '/tictactoe' },
    { name: 'Counter', link: '/counter' },
  ];
</script>

<main>
  <h2>Welcome to the Game App</h2>
  {#each games as game}
    <ClickableTile href={game.link}>
      {game.name}
    </ClickableTile>
  {/each}
</main>

<style></style>
