'use strict'

import pkg from './package.json' with { type: 'json' };
import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default defineConfig([
    {
        input: 'lib/index.ts',
        output: {
            name: 'editables',
            file: pkg.browser,
            format: 'umd',
            sourcemap: true,
        },
        plugins: [
            nodeResolve(),
            commonjs(),
            typescript(),
        ],
    },
]);
