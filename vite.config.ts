import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: true,
    lib: {
      entry: './src/index.ts',
      formats: ['es', 'cjs', 'umd', 'iife'],
      //fileName: (format) => `editables.${format}.js`,
      name: 'editables',
    },
  },
});
