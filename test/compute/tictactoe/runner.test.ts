import { beforeEach, describe, expect, it } from 'vitest';
import { TicTacToeBoard, TicTacToeMinimaxRunner } from '../../../src/compute/tictactoe';

describe('TicTacToe Minimax Runner', () => {
  it('should recommend winning horzontal win', () => {
    const board: TicTacToeBoard = [
      ['X', 'X', ' '],
      ['O', 'O', ' '],
      [' ', ' ', ' '],
    ];
    const depth = 10;

    const runner = new TicTacToeMinimaxRunner(board, depth);

    expect(runner.Run()).toBe(2);
  });

  it('should recommend diagonal win', () => {
    const board: TicTacToeBoard = [
      ['X', ' ', ' '],
      ['O', 'X', ' '],
      [' ', 'O', ' '],
    ];
    const depth = 10;

    const runner = new TicTacToeMinimaxRunner(board, depth);

    expect(runner.Run()).toBe(8);
  });

  it('should recommend inverse diagonal win', () => {
    const board: TicTacToeBoard = [
      [' ', ' ', 'X'],
      ['O', 'X', ' '],
      [' ', 'O', ' '],
    ];
    const depth = 10;

    const runner = new TicTacToeMinimaxRunner(board, depth);

    expect(runner.Run()).toBe(6);
  });

  it('should recommend vertical win for O', () => {
    const board: TicTacToeBoard = [
      ['X', 'O', 'X'],
      ['X', 'O', ' '],
      [' ', ' ', ' '],
    ];
    const depth = 10;

    const runner = new TicTacToeMinimaxRunner(board, depth);

    expect(runner.Run()).toBe(7);
  });

  it('should recommend the best starting move', () => {
    const board: TicTacToeBoard = [
      ['O', 'X', ' '],
      [' ', 'X', ' '],
      ['X', 'O', ' '],
    ];
    const depth = 10;

    const runner = new TicTacToeMinimaxRunner(board, depth);

    expect(runner.Run()).toBe(2);
  });

  it('should recommend the best starting move', () => {
    const board: TicTacToeBoard = [
      ['X', 'O', 'X'],
      [' ', ' ', ' '],
      [' ', ' ', 'O'],
    ];
    const depth = 10;

    const runner = new TicTacToeMinimaxRunner(board, depth);

    expect(runner.Run()).toBe(6);
  });

  it('should recommend the best starting move', () => {
    const board: TicTacToeBoard = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ];
    const depth = 10;

    const runner = new TicTacToeMinimaxRunner(board, depth);

    expect(runner.Run()).toBe(0);
  });
});
