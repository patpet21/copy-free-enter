import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
    },
  },
  // Removed process.env define to prevent conflicts with Vite's env handling
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: true,
    assetsDir: 'assets',
  },
  base: '/',
  server: {
    port: 3000,
    open: true
  }
});