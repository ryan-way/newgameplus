/**
 * @jest-environment jsdom
 */

import { render, RenderResult } from '@testing-library/svelte';
import Index from './index.svelte';

/**
 * An example test suite outlining the usage of
 * `describe()`, `beforeEach()`, `test()` and `expect()`
 *
 * @see https://jestjs.io/docs/getting-started
 * @see https://github.com/testing-library/jest-dom
 */

describe('Index', () => {
    describe('test test for testing', () => {
      test('test test should test', () => {
        expect(true).toBeTruthy();
      })
    })

});
