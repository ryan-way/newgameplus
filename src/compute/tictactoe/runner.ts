import { MinimaxRunner } from '../algorithms';
import { TicTacToeMinimaxState } from './minimax-state';
import { SimpleTicTacToeBoardScorer } from './scorer';
import { TicTacToeBoard, TicTacToeMove } from './types';

export class TicTacToeMinimaxRunner extends MinimaxRunner<TicTacToeMove> {
  constructor(board: TicTacToeBoard, depth: number) {
    const scorer = new SimpleTicTacToeBoardScorer();
    const minimaxState = new TicTacToeMinimaxState(board, scorer);
    super(minimaxState, depth);
  }
}
