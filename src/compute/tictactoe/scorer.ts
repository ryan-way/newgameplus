import { TicTacToeBoard, TicTacToeBoardScorer } from './types';

export class SimpleTicTacToeBoardScorer implements TicTacToeBoardScorer {
  score(board: TicTacToeBoard): number {
    const [me, them] = ['X', 'O'];

    for (const [who, score] of [
      [me, 1],
      [them, -1],
    ]) {
      // rows
      if (board.some(row => row.every(x => x == who))) {
        return score as number;
      }

      // columns
      if ([...board.keys()].some(num => board.every(x => x[num] == who))) {
        return score as number;
      }

      // diags
      if ([...board.keys()].every(num => board[num][num] == who)) {
        return score as number;
      }

      if ([...board.keys()].every(num => board[num][board.length - num - 1] == who)) {
        return score as number;
      }
    }

    return 0;
  }
}
