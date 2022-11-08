<script lang="ts">
  import ClickableTile from 'carbon-components-svelte/src/Tile/ClickableTile.svelte';
  import trpcClient from '../trpc/client';


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
