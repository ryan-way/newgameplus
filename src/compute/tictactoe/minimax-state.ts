import { MinimaxState } from '../algorithms';
import { TicTacToeBoard, TicTacToeBoardScorer, TicTacToeMove, TicTacToeToken } from './types';

export class TicTacToeMinimaxState implements MinimaxState<TicTacToeMove> {
  readonly FULL_MOVE_LIST: TicTacToeMove[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  private moveList: TicTacToeMove[];
  private player: boolean;

  constructor(private board: TicTacToeBoard, private scorer: TicTacToeBoardScorer) {
    const flat = board.flat();
    const O = flat.filter(x => x == 'O').length;
    const X = flat.filter(x => x == 'X').length;
    this.player = X == O;
    this.moveList = this.FULL_MOVE_LIST.filter(move => this.getToken(move) !== ' ');
  }

  revert() {
    const move = this.moveList.pop();
    if (move === undefined) {
      console.log('Attempting to revert when no moves has been made');
      return;
    }
    this.setToken(move as TicTacToeMove, ' ');
    this.player = !this.player;
  }

  turn() {
    return this.player;
  }

  moves(): TicTacToeMove[] {
    const set = new Set([...this.moveList]);
    return this.FULL_MOVE_LIST.filter(x => !set.has(x));
  }

  printBoard() {
    console.log(JSON.stringify(this.board));
  }

  score() {
    return this.scorer.score(this.board);
  }

  move(move: TicTacToeMove) {
    this.setToken(move, this.player ? 'X' : 'O');
    this.player = !this.player;
    this.moveList.push(move);
  }

  private setToken(move: TicTacToeMove, token: TicTacToeToken) {
    const row = Math.floor(move / 3);
    const col = move % 3;

    this.board[row][col] = token;
  }

  private getToken(move: TicTacToeMove) {
    const row = Math.floor(move / 3);
    const col = move % 3;

    return this.board[row][col];
  }

  done(): boolean {
    return this.score() != 0 || this.moveList.length == 9;
  }
}
