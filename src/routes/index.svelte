<script lang="ts">
  import ClickableTile from 'carbon-components-svelte/src/Tile/ClickableTile.svelte';
  import type { AppRouter } from './../electron/trpc';
  import { createTRPCClient } from '@trpc/client';
  import type { TRPCLink, LinkRuntimeOptions } from '@trpc/client';
  import { transformRPCResponse, TRPCAbortError, TRPCClientError } from '@trpc/client';

  /* export function ipcLink(): TRPCLink<AppRouter> { */
  /*   return (runtime: LinkRuntimeOptions) => { */
  /*     return ({ op, prev, onDestroy }) => { */
  /*       const promise = (window as any).electronTRPC.rpc(op); */
  /*       let isDone = false; */

  /*       const prevOnce: typeof prev = result => { */
  /*         if (isDone) { */
  /*           return; */
  /*         } */
  /*         isDone = true; */
  /*         prev(result); */
  /*       }; */

  /*       onDestroy(() => { */
  /*         prevOnce(TRPCClientError.from(new TRPCAbortError(), { isDone: true })); */
  /*       }); */

  /*       promise */
  /*         .then((envelope: any) => { */
  /*           const response = transformRPCResponse({ envelope, runtime }); */
  /*           prevOnce(response); */
  /*         }) */
  /*         .catch((cause: any) => { */
  /*           prevOnce(TRPCClientError.from(cause)); */
  /*         }); */
  /*     }; */
  /*   }; */
  /* } */

  /* let trpcClient = createTRPCClient<AppRouter>({ */
  /*   links: [ipcLink()], */
  /* }); */

  /* trpcClient */
  /*   .query('count-first') */
  /*   .then(result => { */
  /*     console.log(result); */
  /*   }) */
  /*   .catch(err => console.error(err)); */

  let games = [{ name: 'Tic Tac Toe', link: '/tictactoe' }];
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
