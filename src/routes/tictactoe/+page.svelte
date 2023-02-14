<script lang="ts">
  import Button from '$lib/components/button.svelte';
  import { computeService } from '$lib/service';

  let showSettings = true;

  enum Mode {
    PvC = 'PvC',
    PvP = 'PvP',
    CvC = 'CvC',
  }

  type Token = 'X' | 'O' | ' ';
  type Row = [Token, Token, Token];
  type Board = [Row, Row, Row];

  let board: Board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ];

  let mode: Mode = Mode.PvC;

  let first: boolean = true;

  let token: Token = 'X';

  let computingMove = false;

  function toggleToken() {
    token = token == 'X' ? 'O' : 'X';
  }

  function playMove(move: number) {
    if (move > 8 || move < 0) {
      console.error('Move out of bounds: ', move);
      return;
    }

    board[Math.floor(move / 3)][move % 3] = token;
    toggleToken();
  }

  function toggle() {
    showSettings = !showSettings;
    console.log('Toggling Settings');

    if (showSettings == false) {
      console.log('Resetting Game');
      resetGame();
    }
  }

  function resetGame() {
    resetBoard();

    console.log(
      'Starting game with settings',
      JSON.stringify({
        Mode: mode.toString(),
        First: first,
      })
    );

    if ((mode == Mode.PvC && first == false) || mode == Mode.CvC) {
      playComputerMove();
    }
  }

  function gameOver() {
    return !board.flat().some(x => x === ' ') || gameWon();
  }

  function gameWon() {
    return (
      board.some(row => row.every(token => token === row[0]) && row[0] != ' ') ||
      [0, 1, 2].some(
        num => board.every(row => row[num] == board[0][num]) && board[0][num] != ' '
      ) ||
      (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') ||
      (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[1][1] != ' ')
    );
  }

  async function playComputerMove() {
    console.log('Playing Computer Move');
    computingMove = true;
    let move = await computeService.tictactoe(board);
    await new Promise(res => setTimeout(res, 500));
    playMove(move);
    computingMove = false;

    if (mode === Mode.CvC && !gameOver()) playComputerMove();
  }

  function onClick(row: number, cell: number) {
    if (mode === Mode.CvC) return;
    if (computingMove == true) return;
    if (board[row][cell] !== ' ') return;
    if (gameOver()) return;

    console.log('Playing Human Move');
    playMove(row * 3 + cell);

    if (mode !== Mode.PvP && !gameOver()) playComputerMove();
  }

  function resetBoard() {
    token = 'X';
    board = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ];
  }

  function calcClass(cell: number, row: number) {
    return (
      ((cell + row) % 2 == 0 ? 'bg-[#504945]' : 'bg-[#665C54]') + ' text-5xl hover:bg-[#458688]'
    );
  }
</script>

<main class="grid">
  <h2 class="text-5xl pb-20 align-middle" data-testid="counter">Tic Tac Toe</h2>

  {#if showSettings}
    <div class="pb-10">
      <p>Mode</p>
      <input type="radio" bind:group={mode} value={Mode.PvC} id="PvC" />
      <label for="PvC">PvC</label>
      <input type="radio" bind:group={mode} value={Mode.PvP} id="PvP" />
      <label for="PvP">PvP</label>
      <input type="radio" bind:group={mode} value={Mode.CvC} id="CvC" />
      <label for="CvC">CvC</label>
    </div>

    <div class="pb-20">
      <label for="first">First?</label>
      <input type="checkbox" value="true" bind:checked={first} />
    </div>
  {:else}
    <div class="place-self-center w-72 h-72 grid grid-cols-3 grid-rows-3 pb-20">
      {#each board as row, rowIdx}
        {#each row as cell, cellIdx}
          <span class={calcClass(cellIdx, rowIdx)} on:click={() => onClick(rowIdx, cellIdx)}>
            {cell}
          </span>
        {/each}
      {/each}
    </div>
  {/if}

  <Button testid="reset" on:click={toggle}>
    {showSettings ? 'Start' : 'New Game'}
  </Button>
</main>

<style></style>
