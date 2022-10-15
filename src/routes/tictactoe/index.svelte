<script lang="ts">
  import Modal from 'carbon-components-svelte/src/Modal/Modal.svelte';
  import Tile from 'carbon-components-svelte/src/Tile/Tile.svelte';
  import Toggle from 'carbon-components-svelte/src/Toggle/Toggle.svelte';
  import Button from 'carbon-components-svelte/src/Button/Button.svelte';
  import ComboBox from 'carbon-components-svelte/src/ComboBox/ComboBox.svelte';
  import RadioButtonGroup from 'carbon-components-svelte/src/RadioButtonGroup/RadioButtonGroup.svelte';
  import RadioButton from 'carbon-components-svelte/src/RadioButton/RadioButton.svelte';
  import { getStore } from '$lib/stores/tictactoe';
  import type { ITicTacToeStore } from '$lib/stores/tictactoe';
  import type { Move } from '$lib/gamestate/tictactoe';
  import { onMount } from 'svelte';

  export let store: ITicTacToeStore = getStore();
  const { board, winner, isGameOver } = store.getStores();


  let mode: 'PvP' | 'PvC' = 'PvC';
  let humanFirst: boolean = true;

  async function play(rowIdx: number, cellIdx: number) {
    let move = (rowIdx*3 + cellIdx) as Move;
    console.log("Performing Move at: ", [rowIdx, cellIdx]);
    store.Play(move as Move);
    if (mode == 'PvC') {
      move = await store.getComputerMove();
      console.log(move);
      store.Play(move);
    }

    console.log($board);
  }

  async function reset() {
    store.Reset();

    if (mode == 'PvC' && !humanFirst) {
      let move = await store.getComputerMove();
      console.log(move);
      store.Play(move);
    }
  }

  $: opponent = mode == 'PvP'? 'Player 2' : 'Computer';
  $: player = mode == 'PvP' ? 'Player 1' : 'Player 2';

  onMount(() => {
    humanFirst = true;
    mode = 'PvC';
  })

</script>

<main>
  <h2>Tic Tac Toe</h2>
  <div role="board">
  {#each $board as row, rowIdx}
    <row>
      {#each row as cell, cellIdx}
        <Tile on:click={() => play(rowIdx, cellIdx)}
          light={(rowIdx + cellIdx) % 2 === 0}>
          <h2 role="cell">{cell}</h2>
        </Tile>
      {/each}
    </row>
  {/each}
  </div>
  <Button on:click={() => {
    reset();
    }}>{$isGameOver ? 'Start Over' : 'New Game' }</Button>
  <br/>
  {#if $isGameOver}
    <h4>The winner is {$winner == 1? player : opponent}</h4>
    <br/>
  {/if}
  <RadioButtonGroup legendText="Opponent" bind:selected={mode}>
    <RadioButton labelText="Human" value='PvP' />
    <RadioButton labelText="Computer" value='PvC' />
  </RadioButtonGroup>
  {#if mode == 'PvC'}
    <br/>
    <RadioButtonGroup legendText="First Turn" bind:selected={humanFirst}>
      <RadioButton labelText="You" value={true} />
      <RadioButton labelText="Them" value={false} />
    </RadioButtonGroup>
  {/if}
</main>

<style>
  main {
    display: grid;
    justify-content: center;
    text-align: center;
  }

  row {
    display: flex;
  }
</style>
