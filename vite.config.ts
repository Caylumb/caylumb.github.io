import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-index-to-404',
      closeBundle() {
        // Copy index.html to 404.html to get client side routing working in GH pages
        const distDir = path.resolve(__dirname, 'dist');
        const indexPath = path.join(distDir, 'index.html');
        const notFoundPath = path.join(distDir, '404.html');

        fs.copyFileSync(indexPath, notFoundPath);
      },
    },
  ],
  assetsInclude: ['**/*.md'],
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          fiber: ['@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
});
