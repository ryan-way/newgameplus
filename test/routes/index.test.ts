/**
 * @jest-environment jsdom
 */
import { jest } from '@jest/globals';
import { render, RenderResult, fireEvent, act } from '@testing-library/svelte';
import Index from '../../src/routes/index.svelte'


describe('Index', () => {
  let renderedComponent: RenderResult<Index>;

  beforeEach(() => {
    renderedComponent = render(Index);
  })

  describe('once the component has been rendered', () => {
    test('Should render proper header', () => {
      expect(renderedComponent.getByText('Welcome to the Game App')).toBeInTheDocument();
    })
    test('Should render Tic Tac Toe option', () => {
      const tictactoe = renderedComponent.getByText('Tic Tac Toe');
      expect(tictactoe).toBeInTheDocument();
    })
  })
})
