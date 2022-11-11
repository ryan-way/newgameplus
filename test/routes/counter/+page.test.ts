import { expect } from 'vitest';
import { render, RenderResult, fireEvent } from '@testing-library/svelte';
import { countService, computeService } from '$lib/service';
import { tick } from 'svelte';
import Counter from '../../../src/routes/counter/+page.svelte';

vi.mock('$lib/service', () => {
  const countService = {
    first: vi.fn(() => Promise.resolve({ id: 1, count: 0 })),
    update: vi.fn(),
  };

  const computeService = {
    count: vi.fn(x => Promise.resolve(x + 1)),
  };
  return {
    countService,
    computeService,
  };
});

describe('Counter', () => {
  let renderedComponent: RenderResult<Counter>;

  describe('when the component is rendered', () => {
    beforeEach(() => {
      countService.first = vi.fn(() => Promise.resolve(null));
      renderedComponent = render(Counter);
    });

    test('count should not be rendered', () => {
      expect(() => renderedComponent.getByTestId('count')).toThrow();
    });

    test('increment button should not be rendered', () => {
      expect(() => renderedComponent.getByTestId('increment')).toThrow();
    });

    test('decrement button should not be rendered', () => {
      expect(() => renderedComponent.getByTestId('decrement')).toThrow();
    });

    test('reset button should not be rendered', () => {
      expect(() => renderedComponent.getByTestId('reset')).toThrow();
    });

    test('should show the proper heading', () => {
      const element = renderedComponent.getByTestId('counter');
      expect(element).not.toBeNull();
      expect(element.innerHTML).toMatchSnapshot();
    });

    test('should match snapshot', () => {
      expect(renderedComponent.innerHTML).toMatchSnapshot();
    });
  });

  describe('after count has returned', () => {
    beforeEach(() => {
      countService.first = vi.fn(() => Promise.resolve({ id: 1, count: 0 }));
      renderedComponent = render(Counter);
    });

    describe('updated component', () => {
      test('should render increment button', () => {
        const element = renderedComponent.getByTestId('increment');
        expect(element).not.toBeNull();
        expect(element.innerHTML).toMatchSnapshot();
      });

      test('should render decrement button', () => {
        const element = renderedComponent.getByTestId('decrement');
        expect(element).not.toBeNull();
        expect(element.innerHTML).toMatchSnapshot();
      });

      test('should render reset button', () => {
        const element = renderedComponent.getByTestId('reset');
        expect(element).not.toBeNull();
        expect(element.innerHTML).toMatchSnapshot();
      });

      test('should render counter as zero', () => {
        const element = renderedComponent.getByTestId('count');
        expect(element).not.toBeNull();
        expect(element.innerHTML).toMatchSnapshot();
      });

      test('should match snapshot', () => {
        expect(renderedComponent.innerHTML).toMatchSnapshot();
      });

      describe('when a button is clicked', () => {
        test('increment should render 1', async () => {
          const increment = renderedComponent.getByTestId('increment');

          await fireEvent.click(increment);
          await tick();

          const count = renderedComponent.getByTestId('count');
          expect(count.innerHTML).toBe('1');
        });

        test('decrement should render -1', async () => {
          const decrement = renderedComponent.getByTestId('decrement');
          expect(decrement).not.toBeNull();

          await fireEvent.click(decrement);
          await tick();

          const count = renderedComponent.getByTestId('count');
          expect(count.innerHTML).toBe('-1');
        });

        test('reset should render 0', async () => {
          const reset = renderedComponent.getByTestId('reset');
          const increment = renderedComponent.getByTestId('increment');

          await fireEvent.click(increment);
          await tick();
          await fireEvent.click(reset);
          await tick();

          const count = renderedComponent.getByTestId('count');
          expect(count.innerHTML).toBe('0');
        });
      });
    });
  });
});
