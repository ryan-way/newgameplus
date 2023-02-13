import { beforeEach, describe, expect, it } from 'vitest';
import {
  TicTacToeBoard,
  TicTacToeMove,
  SimpleTicTacToeBoardScorer,
  TicTacToeMinimaxState,
} from '../../../src/compute/tictactoe';

describe('TicTacToe Minimax State', () => {
  let board: TicTacToeBoard = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ];
  let state: TicTacToeMinimaxState;
  beforeEach(() => {
    board = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ];
    const scorer = new SimpleTicTacToeBoardScorer();
    state = new TicTacToeMinimaxState(board, scorer);
  });

  it('should have done as true if game ending conditions met', () => {
    board[0][0] = 'X';
    board[0][1] = 'X';
    board[0][2] = 'X';

    expect(state.done()).toBeTruthy();
  });

  it('should have done as false if game ending conditions not met', () => {
    expect(state.done()).toBeFalsy();
  });

  it('should update board when move is made', () => {
    state.move(0);

    expect(board[0][0]).toBe('X');
  });

  it('should alternate between O and X tokens with every move', () => {
    state.move(0);
    state.move(1);

    expect(board[0][0]).toBe('X');
    expect(board[0][1]).toBe('O');
  });

  it('should revert moves when revert is called', () => {
    state.move(0);

    expect(board[0][0]).toBe('X');

    state.revert();

    expect(board[0][0]).toBe(' ');
  });

  it('should return all moves when moves is called at start', () => {
    const FULL_MOVE_LIST: TicTacToeMove[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const moves = state.moves();

    expect(moves).toStrictEqual(FULL_MOVE_LIST);
  });

  it('should not return moves that have already been made when moves is called', () => {
    const expectedMoveList: TicTacToeMove[] = [0, 2, 3, 4, 5, 6, 7, 8];
    state.move(1);
    const moves = state.moves();

    expect(moves).toStrictEqual(expectedMoveList);
  });
});
