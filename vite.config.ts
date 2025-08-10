import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: getHtmlEntries(),
    },
  },
});

function getHtmlEntries() {
  const pagesDir = path.resolve(__dirname, '');
  const entries: Record<string, string> = {};

  // Read all files in the directory
  const files = fs.readdirSync(pagesDir);

  // Filter out HTML files
  const htmlFiles = files.filter((file) => file.endsWith('.html'));

  // Create entries for each HTML file
  htmlFiles.forEach((file) => {
    const name = path.basename(file, '.html');
    entries[name] = path.resolve(pagesDir, file);
  });

  return entries;
}
