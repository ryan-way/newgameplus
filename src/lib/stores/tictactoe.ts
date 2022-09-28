import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store'
import { TicTacToe } from '$lib/gamestate/tictactoe';
import type { Board, Winner, Move } from '$lib/gamestate/tictactoe';
import type { AppRouter } from '$lib/ai/router';
import { createTRPCClient } from '@trpc/client';


const game: TicTacToe = new TicTacToe([[' ', ' ', ' '],[' ', ' ', ' '],[' ', ' ', ' ']]);
const aiRouter = createTRPCClient<AppRouter>({
  url: 'http://localhost:3000/trpc'
});

const _board: Writable<Board> = writable(game.Board);
const _winner: Writable<Winner> = writable(game.Winner);
const _isGameOver: Writable<boolean> = writable(game.GameOver);


function Play(move: Move) {
  game.Move(move);
  _board.set(game.Board);
  _winner.set(game.Winner);
  _isGameOver.set(game.GameOver);
}

async function getBestMove(): Promise<Move> {
  return await aiRouter.query('tictactoe', { board: game.Board }) as Move;
}

function Reset() {
  game.Reset();
  _board.set(game.Board);
  _winner.set(game.Winner);
  _isGameOver.set(game.GameOver);
}

const board = derived(_board, $_board => $_board);
const winner = derived(_winner, $_winner => $_winner);
const isGameOver = derived(_isGameOver, $_isGameOver => $_isGameOver);

export { Reset, Play, board, winner, isGameOver, getBestMove }
