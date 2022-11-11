import { expect } from 'vitest';
import { render, RenderResult } from '@testing-library/svelte';
import Index from '../src/routes/+page.svelte';

describe('Index', () => {
  let renderedComponent: RenderResult<Index>;

  beforeEach(() => {
    renderedComponent = render(Index);
  });

  describe('once the component has been rendered', () => {
    test('should show the proper heading', () => {
      expect(renderedComponent.getByText(/New Game Plus/)).not.toBeNull();
    });
    test('should render tictactoe link', () => {
      const element = renderedComponent.getByText(/Tic Tac Toe/);
      expect(element).not.toBeNull();
      expect(element.hasAttribute('href'));
      expect(element.getAttribute('href')).toBe('/tictactoe');
    });
  });
});
