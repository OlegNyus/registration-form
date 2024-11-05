import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true, // This will force Vite to use port 3000
  },
  preview: {
    port: 3000,
  },
});