/**
 * @jest-environment jsdom
 */
import { jest } from '@jest/globals';
import { render, RenderResult } from '@testing-library/svelte';
import Index from '../src/routes/tictactoe/index.svelte';
import { readable, writable } from 'svelte/store';
import type { ITicTacToeStore } from '$lib/stores/tictactoe'
import type { Board, Winner, Move } from '$lib/gamestate/tictactoe';

const emptyBoard: Board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

const storeMock: ITicTacToeStore = {
  Play: jest.fn(),
  Reset: jest.fn(),
  getStores: () => {
    return {
      board: writable(emptyBoard),
      winner: writable(undefined as Winner),
      isGameOver: writable(false)
    }
  },
  getComputerMove: jest.fn(),
}

describe('Index', () => {
  let renderedComponent: RenderResult<Index>;

  beforeEach(() => {
    renderedComponent = render(Index, { store: storeMock });
  })

  describe('once the component has been rendered', () => {
    test('should show the proper heading', () => {
      expect(renderedComponent.getByText(/Tic Tac Toe/)).toBeInTheDocument();
    })

    test('should contain new game button', () => {
      expect(renderedComponent.getByText(/New Game/)).toBeInTheDocument();
    })

    test('should be playing computer', () => {
      expect(renderedComponent.getByText(/Playing: Computer/)).toBeInTheDocument();
    })

    test('should be playing first', () => {
      expect(renderedComponent.getByText(/Player is going: first/)).toBeInTheDocument();
    })

    test('game state should be: playing', () => {
      expect(renderedComponent.getByText(/Game State: playing/)).toBeInTheDocument();
    })
  })


});

