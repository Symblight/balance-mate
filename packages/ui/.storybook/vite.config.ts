import { defineConfig } from "vite";
import path from 'node:path'
import litcss from "rollup-plugin-postcss-lit";

export default defineConfig({
  assetsInclude: ["/sb-preview/runtime.js"],
  plugins: [
    litcss({
      include: [path.join(__dirname, "../lib/components/**/*.css?*")],
    }),
  ],
});
