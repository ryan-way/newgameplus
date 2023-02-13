export type TicTacToeMove = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type TicTacToeToken = 'X' | 'O' | ' ';
type TicTacToeRow = [TicTacToeToken, TicTacToeToken, TicTacToeToken];
export type TicTacToeBoard = [TicTacToeRow, TicTacToeRow, TicTacToeRow];

export interface TicTacToeBoardScorer {
  score(board: TicTacToeBoard): number;
}
