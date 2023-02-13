import { beforeEach, describe, expect, it } from 'vitest';
import { SimpleTicTacToeBoardScorer } from '../../../src/compute/tictactoe/scorer';
import { TicTacToeBoard } from '../../../src/compute/tictactoe/types';

describe('Simple TicTacToe Scorer', () => {
  let scorer: SimpleTicTacToeBoardScorer;
  beforeEach(() => {
    scorer = new SimpleTicTacToeBoardScorer();
  });

  it('should score zero when game is not done', () => {
    const board: TicTacToeBoard = [
      ['X', ' ', 'O'],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ];
    expect(scorer.score(board)).toBe(0);
  });

  describe('should score 1 when X wins', () => {
    it('horizontally', () => {
      const board1: TicTacToeBoard = [
        ['X', 'X', 'X'],
        [' ', ' ', ' '],
        [' ', ' ', ' '],
      ];
      expect(scorer.score(board1)).toBe(1);

      const board2: TicTacToeBoard = [
        [' ', ' ', ' '],
        ['X', 'X', 'X'],
        [' ', ' ', ' '],
      ];
      expect(scorer.score(board2)).toBe(1);

      const board3: TicTacToeBoard = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        ['X', 'X', 'X'],
      ];
      expect(scorer.score(board3)).toBe(1);
    });
    it('vertically', () => {
      const board1: TicTacToeBoard = [
        ['X', ' ', ' '],
        ['X', ' ', ' '],
        ['X', ' ', ' '],
      ];
      expect(scorer.score(board1)).toBe(1);

      const board2: TicTacToeBoard = [
        [' ', 'X', ' '],
        [' ', 'X', ' '],
        [' ', 'X', ' '],
      ];
      expect(scorer.score(board2)).toBe(1);

      const board3: TicTacToeBoard = [
        [' ', ' ', 'X'],
        [' ', ' ', 'X'],
        [' ', ' ', 'X'],
      ];
      expect(scorer.score(board3)).toBe(1);
    });
    it('diagonally', () => {
      const board1: TicTacToeBoard = [
        ['X', ' ', ' '],
        [' ', 'X', ' '],
        [' ', ' ', 'X'],
      ];
      expect(scorer.score(board1)).toBe(1);

      const board2: TicTacToeBoard = [
        [' ', ' ', 'X'],
        [' ', 'X', ' '],
        ['X', ' ', ' '],
      ];
      expect(scorer.score(board2)).toBe(1);
    });
  });
});
