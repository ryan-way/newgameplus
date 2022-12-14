import { expect, describe, beforeEach, it } from 'vitest';
import { render, RenderResult } from '@testing-library/svelte';
import Index from '../../src/routes/+page.svelte';

describe('Index', () => {
  let renderedComponent: RenderResult<Index>;

  beforeEach(() => {
    renderedComponent = render(Index);
  });

  describe('once the component has been rendered', () => {
    it('Should render proper header', () => {
      expect(renderedComponent.getByText('New Game Plus')).not.toBeNull();
    });

    it('Should render Tic Tac Toe option', () => {
      const tictactoe = renderedComponent.getByText('Tic Tac Toe');
      expect(tictactoe).not.toBeNull();
    });

    it('Should render Counter option', () => {
      const tictactoe = renderedComponent.getByText('Counter');
      expect(tictactoe).not.toBeNull();
    });
  });
});
