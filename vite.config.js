import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// PUBLIC_INTERFACE
export default defineConfig({
  /** Vite config for the React Tic Tac Toe app. */
  plugins: [react()],
  server: {
    port: 5173
  },
  preview: {
    port: 4173
  },
  // Vitest config co-located with Vite config.
  // This enables `expect`, `test`, etc. globally and uses jsdom so React Testing Library works.
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js']
  }
});
