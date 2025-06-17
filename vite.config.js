import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths for assets - important for static hosting
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate source maps for debugging
    sourcemap: false,
    // Use esbuild instead of terser (esbuild is included by default)
    minify: 'esbuild',
  },
  server: {
    port: 3000,
    strictPort: true, // This will force Vite to use port 3000
  },
  preview: {
    port: 3000,
  },
});