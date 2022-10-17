/**
 * @jest-environment jsdom
 */
import { jest } from '@jest/globals';
import { render, RenderResult, fireEvent, act } from '@testing-library/svelte';
import Index from '../../../src/routes/tictactoe/index.svelte';
import { writable } from 'svelte/store';
import type { ITicTacToeStore } from '$lib/stores/tictactoe'
import { setStore } from '$lib/stores/tictactoe'
import type { Board, Winner } from '$lib/gamestate/tictactoe';

const emptyBoard: Board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

const board = writable(emptyBoard);
const isGameOver = writable(false);
const winner = writable(undefined as Winner);

const storeMock: ITicTacToeStore = {
  Play: jest.fn(),
  Reset: jest.fn(),
  getStores: jest.fn(() => {
    return {
      board: board,
      winner: winner,
      isGameOver: isGameOver
    }
  }),
  getComputerMove: jest.fn(),
}

function resetMock() {
  storeMock.Play = jest.fn();
  storeMock.Reset = jest.fn();
  storeMock.getStores = jest.fn(() => {
    return {
      board: board,
      winner: winner,
      isGameOver: isGameOver
    }
  });
  storeMock.getComputerMove = jest.fn();
}

describe('Index', () => {
  let renderedComponent: RenderResult<Index>;

  beforeAll(() => {
    setStore(storeMock);
  })

  beforeEach(() => {
    resetMock();
    renderedComponent = render(Index);
  })

  describe('once the component has been rendered', () => {
    test('should show the proper heading', () => {
      expect(renderedComponent.getByText(/Tic Tac Toe/)).toBeInTheDocument();
    });

    test('should contain new game button', () => {
      expect(renderedComponent.getByText(/New Game/)).toBeInTheDocument();
    });

    test('should contain Opponent group', () => {
      expect(renderedComponent.getByText(/Opponent/)).toBeInTheDocument();
    });

    test('should contain Human option', () => {
      expect(renderedComponent.getByText(/Human/)).toBeInTheDocument();
    });

    test('should contain Computer option', () => {
      expect(renderedComponent.getByText(/Computer/)).toBeInTheDocument();
    });

    test('should contain First Turn group', () => {
      expect(renderedComponent.getByText(/First Turn/)).toBeInTheDocument();
    });

    test('should contain You option', () => {
      expect(renderedComponent.getByText(/You/)).toBeInTheDocument();
    });

    test('should contain Them option', () => {
      expect(renderedComponent.getByText(/Them/)).toBeInTheDocument();
    });

    test('getStores should be called', () => {
      expect(storeMock.getStores).toHaveBeenCalled();
    });

    describe('board should', () => {
      test('not contain X\'s', () => {
        expect(renderedComponent.queryAllByText('X')).toHaveLength(0);
      });

      test('not contain O\'s', () => {
       expect(renderedComponent.queryAllByText('O')).toHaveLength(0);
      });

      test('should all contain \' \'', () => {
        const cells = renderedComponent.queryAllByRole('cell');
        expect(cells).toHaveLength(9);
        cells.forEach(cell => expect(cell.innerHTML).toBe(' '));
      });
    });

    describe('When a cell is clicked', () => {
      test('Play function should be called', async () => {
        const cells = renderedComponent.queryAllByRole('cell');
        await fireEvent.click(cells[0]);
        expect(storeMock.Play).toHaveBeenCalled();
      });
    });

    describe('When the new game button is pressed', () => {
      test('Reset function should be called', async () => {
        const button = renderedComponent.getByText(/New Game/);
        await fireEvent.click(button);
        expect(storeMock.Reset).toHaveBeenCalled();
      });
    });

    describe('When the board is updated', () => {
      test('with an X, X should be rendered', async () => {
        const playBoard: Board = [
          ['X', ' ', ' '],
          [' ', ' ', ' '],
          [' ', ' ', ' '],
        ]
        await act(() => {
          board.set(playBoard);
        })
        expect(renderedComponent.getByText('X')).toBeInTheDocument();
      });

      test('with an O, O should be rendered', async () => {
        const playBoard: Board = [
          ['O', ' ', ' '],
          [' ', ' ', ' '],
          [' ', ' ', ' '],
        ]
        await act(() => {
          board.set(playBoard);
        });
        expect(renderedComponent.getByText('O')).toBeInTheDocument();
      });
    });

    describe('When the game is over', () => {
      test('New Game button now says Reset', async () => {
        await act(() => {
          isGameOver.set(true);
        });

        expect(renderedComponent.getByText(/Start Over/)).toBeInTheDocument();
        expect(renderedComponent.queryByText(/New Game/)).toBeNull();
      })

      describe('and computer wins', () => {
        test('computer is displayed as winner', async () => {
          await(act(() => {
            winner.set(2);
            isGameOver.set(true);
          }));

          expect(renderedComponent.getByText(/The winner is Computer/)).toBeInTheDocument();
        })
      })

      describe('and player wins', () => {
        test('player is displayed as winner', async () => {
          await(act(() => {
            winner.set(1);
            isGameOver.set(true);
          }));

          expect(renderedComponent.getByText(/The winner is Player/)).toBeInTheDocument();
        })
      })
    })

    test.skip('should match snapshot', () => {
      // Svelte randomly generates some id's when generating html
      // this causes the test to file most of the time
      // (In theory it could pass if the randomly generated id's were the same)
      // Once that can be bypassed, snapshot tests will work
      expect(renderedComponent.container.innerHTML).toMatchSnapshot();
    });
  });

});

