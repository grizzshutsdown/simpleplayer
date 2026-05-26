import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    allowedHosts: ['.ngrok-free.app'],
  },
  publicDir: false,
  build: {
    lib: {
      entry: 'src/simple-player.ts',
      formats: ['es'],
      fileName: () => 'simple-player.js',
    },
    target: 'es2022',
    sourcemap: true,
    emptyOutDir: true,
  },
});
