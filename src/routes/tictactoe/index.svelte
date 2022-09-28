<script lang="ts">
  import { Tile, Modal, ComboBox, Toggle, Button } from 'carbon-components-svelte';
  import { Reset, Play, board, winner, isGameOver, getBestMove } from '$lib/stores/tictactoe';
  import type { Move } from '$lib/gamestate/tictactoe';
  import { onMount } from 'svelte';

  type State = 'newgame' | 'playing' | 'gameover';
  type Settings = { opponent: 'Player' | 'Computer', first: boolean };

  let state: State = 'newgame';
  let settings: Settings = {
    opponent: 'Player',
    first: true,
  }

  let selectedId: string = '0';

  isGameOver.subscribe(gameOver => {
    if (gameOver) 
      state = 'gameover'
  });

  $: settings.opponent = selectedId === '0' ? 'Player' : 'Computer';

  async function play(rowIdx: number, cellIdx: number) {
    let move = (rowIdx*3 + cellIdx) as Move;
    console.log("Performing Move at: ", [rowIdx, cellIdx]);
    Play(move as Move);
    if (settings.opponent == 'Computer') {
      move = await getBestMove();
      console.log(move);
      Play(move);
    }
  }

  async function reset() {
    state = 'playing';
    Reset();

    if (settings.opponent == 'Computer' && !settings.first) {
      let move = await getBestMove();
      console.log(move);
      Play(move);
    }
  }

  onMount(() => {
  }) 
</script>

<main>
  <h2>Tic Tac Toe</h2>
  {#each $board as row, rowIdx}
    <row>
      {#each row as cell, cellIdx}
        <Tile on:click={() => play(rowIdx, cellIdx)}
          light={(rowIdx + cellIdx) % 2 === 0}>
          <h2>{cell}</h2>
        </Tile>
      {/each}
    </row>
  {/each}
  <Button on:click={() => {
    state = 'newgame';
  }}>New Game</Button>
  <p>Playing: {settings.opponent}</p>
  {#if settings.opponent == 'Computer'}
    <p>Player is going: {settings.first? 'first' : 'second'}</p>
  {/if}
  <p>Game State: {state}</p>
  <Modal
    size="lg"
    open={state == 'newgame'}
    on:submit={reset}
    on:click:button--secondary={() => state = 'playing'}
    hasScrollingContent
    primaryButtonText="Start"
    secondaryButtonText="Go Back"
    modalHeading="New Game">
    <ComboBox
      bind:selectedId
      items={[
        { id: '0', text: 'Player'},
        { id: '1', text: 'Computer'}
        ]}
      titleText="Opponent">
    </ComboBox> 
    {#if settings.opponent == 'Computer'}
      <Toggle
          bind:toggled={settings.first}>
        <span slot="labelA">Go Second</span>
        <span slot="labelB">Go First</span>
      </Toggle>
    {/if}
  </Modal>
  <Modal
      size="lg"
      open={state == 'gameover'}
      on:submit={() => {
        state = 'newgame';
        Reset();
      }}
      secondaryButtons={[{ text: "Go Back" }, { text: "Play Again" }]}
      on:click:button--secondary={({detail}) => {
        if (detail.text == 'Play Again') Reset();
        state = 'playing'
      }}
      primaryButtonText="New Game"
      secondaryButtonText="Go Back"
      modalHeading="Game Over"
        >
      The winner is {$winner}
  </Modal>
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
