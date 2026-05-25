import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: false,
  build: {
    lib: {
      entry: 'src/simple-player.ts',
      formats: ['es'],
      fileName: () => 'simple-player.js',
    },
    target: 'es2020',
    sourcemap: true,
    emptyOutDir: true,
  },
});
