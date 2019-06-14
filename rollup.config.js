import { terser } from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";
import cjs from "rollup-plugin-commonjs";

export default {
  input: "src/main.js",
  output: {
    format: "iife",
    file: "public/bundle.js"
  },
  plugins: [resolve(), cjs(), terser()]
};
