/**
 * @jest-environment jsdom
 */

import { render, RenderResult } from '@testing-library/svelte';
import Index from './index.svelte';

describe('Index', () => {
  let renderedComponent: RenderResult<Index>;

  beforeEach(() => {
    renderedComponent = render(Index);
  })


  describe('once the component has been rendered', () => {
    test('should show the proper heading', () => {
      expect(renderedComponent.getByText(/Welcome to the Game App/)).toBeInTheDocument();
    })
    test('should render tictactoe link', () => {
      expect(renderedComponent.getByText(/Tic Tac Toe/)).toBeInTheDocument();
    })
  })

});
