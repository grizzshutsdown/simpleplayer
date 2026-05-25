import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const installedSimplePlayer = fileURLToPath(
  new URL('./site/node_modules/@grizzshutsdown/simpleplayer/dist/simple-player.js', import.meta.url),
);

export default defineConfig({
  resolve: {
    alias: {
      '@grizzshutsdown/simpleplayer': installedSimplePlayer,
    },
  },
  build: {
    outDir: 'site-dist',
    emptyOutDir: true,
  },
});
