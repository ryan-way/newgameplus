import { writable, derived } from 'svelte/store';
import type { Writable, Readable } from 'svelte/store'
import { TicTacToe } from '$lib/gamestate/tictactoe';
import type { Board, Winner, Move } from '$lib/gamestate/tictactoe';
import type { ITicTacToeSolver } from '$lib/solver/tictactoe-solver';
import { TicTacToeSolver } from '$lib/solver/tictactoe-solver';

type Store = {
  board: Readable<Board>,
  winner: Readable<Winner>,
  isGameOver: Readable<boolean>
}


export class TicTacToeStore implements ITicTacToeStore {
  readonly gameStateManager: TicTacToe = new TicTacToe(
    [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ]);

  readonly board: Writable<Board> =
    writable(this.gameStateManager.Board);
  readonly winner: Writable<Winner> =
    writable(this.gameStateManager.Winner);
  readonly isGameOver: Writable<boolean> =
    writable(this.gameStateManager.GameOver);

  readonly boardReadable: Readable<Board> =
    derived(this.board, $board => $board);
  readonly winnerReadable: Readable<Winner> =
    derived(this.winner, $winner => $winner);
  readonly isGameOverReadable: Readable<boolean> =
    derived(this.isGameOver, $isGameOver => $isGameOver);

  constructor(
    readonly aiServiceClient: ITicTacToeSolver = new TicTacToeSolver()
  ) {
    
  }

  Play(move: Move) {
    this.gameStateManager.Move(move);
    this.board.set(this.gameStateManager.Board);
    this.winner.set(this.gameStateManager.Winner);
    this.isGameOver.set(this.gameStateManager.GameOver);
  }

  async getComputerMove(): Promise<Move> {
    return this.aiServiceClient.getBestMove(this.gameStateManager.Board);
  }

  Reset() {
    this.gameStateManager.Reset();
    this.board.set(this.gameStateManager.Board);
    this.winner.set(this.gameStateManager.Winner);
    this.isGameOver.set(this.gameStateManager.GameOver);
  }

  getStores(): Store {
    return {
      board: this.boardReadable,
      winner: this.winnerReadable,
      isGameOver: this.isGameOverReadable
    }
  }
}

export interface ITicTacToeStore {
  Play(move: Move): void;
  Reset(): void;
  getStores(): Store;
  getComputerMove(): Promise<Move>;
}

let store: ITicTacToeStore;

export function getStore(): ITicTacToeStore {
  store = store ?? new TicTacToeStore();
  return store;
}

export function setStore(newStore: ITicTacToeStore) {
  store = newStore;
}
