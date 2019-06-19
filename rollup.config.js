import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';
import workbox from 'rollup-plugin-workbox';

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
        /** @type {Object} no default */
        workboxConfig: require('./workbox-config.js'),
      }),
    terser(),
  ],
};
