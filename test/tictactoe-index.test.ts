/**
 * @jest-environment jsdom
 */

import { render, RenderResult } from '@testing-library/svelte';
import Index from '../src/routes/tictactoe/index.svelte';

describe('Index', () => {
  let renderedComponent: RenderResult<Index>;

  beforeEach(() => {
    renderedComponent = render(Index);
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

