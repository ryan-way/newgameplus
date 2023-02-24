<script lang="ts">
  import Button from '$lib/components/button.svelte';
  import { computeService } from '$lib/service';
  import { Board, Token } from './types';

  let board: Board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ];

  let token: Token = 'X';

  let computing: boolean = false;

  function onClick(row: number, col: number) {
    if (computing) return;
    if (gameOver()) return;
    board[row][col] = token;
    token = token == 'X' ? 'O' : 'X';
  }

  async function computerMove() {
    if (computing) return;
    if (gameOver()) return;
    computing = true;
    const move = await computeService.tictactoe(board);
    const [row, col] = moveToIndexes(move);
    board[row][col] = token;
    token = token == 'X' ? 'O' : 'X';
    computing = false;
  }

  function moveToIndexes(move: number): [number, number] {
    return [Math.floor(move / 3), move % 3];
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

  function reset() {
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

  <div class="place-self-center w-72 h-72 grid grid-cols-3 grid-rows-3 pb-20">
    {#each board as row, rowIdx}
      {#each row as cell, cellIdx}
        <span class={calcClass(cellIdx, rowIdx)} on:click={() => onClick(rowIdx, cellIdx)}>
          {cell}
        </span>
      {/each}
    {/each}
  </div>

  <Button testid="reset" on:click={computerMove}>
    {'Computer Move'}
  </Button>

  <Button testid="reset" on:click={reset}>
    {'New Game'}
  </Button>
</main>

<style></style>
