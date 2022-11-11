import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { render, RenderResult, fireEvent, act } from '@testing-library/svelte';
import Index from '../../../src/routes/tictactoe/+page.svelte';
import { writable } from 'svelte/store';
import type { ITicTacToeStore } from '$lib/stores/tictactoe';
import { getStore } from '$lib/stores/tictactoe';
import type { Board, Winner } from '$lib/gamestate/tictactoe';

const emptyBoard: Board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' '],
];

const board = writable(emptyBoard);
const isGameOver = writable(false);
const winner = writable(undefined as Winner);

vi.mock('$lib/stores/tictactoe', () => {
  const store: ITicTacToeStore = {
    Play: vi.fn(),
    Reset: vi.fn(),
    getStores: vi.fn(() => {
      return {
        board: board,
        winner: winner,
        isGameOver: isGameOver,
      };
    }),
    getComputerMove: vi.fn(),
  };

  return {
    getStore: () => {
      return store;
    },
  };
});

describe('Index', () => {
  let renderedComponent: RenderResult<Index>;
  let store;

  beforeEach(() => {
    renderedComponent = render(Index);
    store = getStore();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('once the component has been rendered', () => {
    it('should show the proper heading', () => {
      expect(renderedComponent.getByText(/Tic Tac Toe/)).not.toBeNull();
    });

    it('should contain new game button', () => {
      expect(renderedComponent.getByText(/New Game/)).not.toBeNull();
    });

    it('should contain Opponent group', () => {
      expect(renderedComponent.getByText(/Opponent/)).not.toBeNull();
    });

    it('should contain Human option', () => {
      expect(renderedComponent.getByText(/Human/)).not.toBeNull();
    });

    it('should contain Computer option', () => {
      expect(renderedComponent.getByText(/Computer/)).not.toBeNull();
    });

    it('should contain First Turn group', () => {
      expect(renderedComponent.getByText(/First Turn/)).not.toBeNull();
    });

    it('should contain You option', () => {
      expect(renderedComponent.getByText(/You/)).not.toBeNull();
    });

    it('should contain Them option', () => {
      expect(renderedComponent.getByText(/Them/)).not.toBeNull();
    });

    it('getStores should be called', () => {
      expect(store.getStores).toHaveBeenCalled();
    });

    describe('board should', () => {
      it("not contain X's", () => {
        expect(renderedComponent.queryAllByText('X')).toHaveLength(0);
      });

      it("not contain O's", () => {
        expect(renderedComponent.queryAllByText('O')).toHaveLength(0);
      });

      it("should all contain ' '", () => {
        const cells = renderedComponent.queryAllByRole('cell');
        expect(cells).toHaveLength(9);
        cells.forEach(cell => expect(cell.innerHTML).toBe(' '));
      });
    });

    describe('When a cell is clicked', () => {
      it('Play function should be called', async () => {
        const cells = renderedComponent.queryAllByRole('cell');
        await fireEvent.click(cells[0]);
        expect(store.Play).toHaveBeenCalled();
      });
    });

    describe('When the new game button is pressed', () => {
      it('Reset function should be called', async () => {
        const button = renderedComponent.getByText(/New Game/);
        await fireEvent.click(button);
        expect(store.Reset).toHaveBeenCalled();
      });
    });

    describe('When the board is updated', () => {
      it('with an X, X should be rendered', async () => {
        const playBoard: Board = [
          ['X', ' ', ' '],
          [' ', ' ', ' '],
          [' ', ' ', ' '],
        ];
        await act(() => {
          board.set(playBoard);
        });
        expect(renderedComponent.getByText('X')).not.toBeNull();
      });

      it('with an O, O should be rendered', async () => {
        const playBoard: Board = [
          ['O', ' ', ' '],
          [' ', ' ', ' '],
          [' ', ' ', ' '],
        ];
        await act(() => {
          board.set(playBoard);
        });
        expect(renderedComponent.getByText('O')).not.toBeNull();
      });
    });

    describe('When the game is over', () => {
      it('New Game button now says Reset', async () => {
        await act(() => {
          isGameOver.set(true);
        });

        expect(renderedComponent.getByText(/Start Over/)).not.toBeNull();
        expect(renderedComponent.queryByText(/New Game/)).toBeNull();
      });

      describe('and computer wins', () => {
        it('computer is displayed as winner', async () => {
          await act(() => {
            winner.set(2);
            isGameOver.set(true);
          });

          expect(renderedComponent.getByText(/The winner is Computer/)).not.toBeNull();
        });
      });

      describe('and player wins', () => {
        it('player is displayed as winner', async () => {
          await act(() => {
            winner.set(1);
            isGameOver.set(true);
          });

          expect(renderedComponent.getByText(/The winner is Player/)).not.toBeNull();
        });
      });
    });

    it.skip('should match snapshot', () => {
      // Svelte randomly generates some id's when generating html
      // this causes the test to file most of the time
      // (In theory it could pass if the randomly generated id's were the same)
      // Once that can be bypassed, snapshot tests will work
      expect(renderedComponent.container.innerHTML).toMatchSnapshot();
    });
  });
});
