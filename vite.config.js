import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      lines: 80,
      functions: 80,
      statements: 80,
    },
  },
});
