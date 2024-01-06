import { defineConfig } from 'rollup';
import pkg from './package.json' assert { type: 'json' };
import alias from '@rollup/plugin-alias';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import path from 'path';

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      name: 'editables',
      format: 'iife',
      sourcemap: 'inline',
    },
    {
      file: pkg.module,
      name: 'editables',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: pkg.common,
      name: 'editables',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript(),
    nodeResolve({
      extensions: ['.ts', '.js'],
    }),
    alias({
      entries: [{ find: '@', replacement: path.resolve('src') }],
    }),
  ],
});
