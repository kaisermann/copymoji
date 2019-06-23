import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';
import workbox from 'rollup-plugin-workbox-build';

export default {
  input: 'src/main.js',
  output: {
    format: 'iife',
    file: 'public/bundle.js',
  },
  plugins: [
    resolve(),
    cjs(),
    process.env.NODE_ENV === 'production' &&
      workbox({
        mode: 'generateSW',
        options: {
          swDest: 'public/sw.js',
          globDirectory: 'public',
          globPatterns: ['*.{js,ico,gif,html,json,css}'],
        },
      }),
    terser(),
  ],
};
