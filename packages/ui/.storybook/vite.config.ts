import { defineConfig } from "vite";
import postcssLit from "rollup-plugin-postcss-lit";

export default defineConfig({
  assetsInclude: ["/sb-preview/runtime.js"],
  plugins: [postcssLit()],
});
