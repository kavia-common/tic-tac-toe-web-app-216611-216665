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
  }
});
