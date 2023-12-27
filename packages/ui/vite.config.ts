import { defineConfig } from "vite";
import postcssLit from "rollup-plugin-postcss-lit";
import dts from "vite-plugin-dts";

export default defineConfig({
  esbuild: {
    target: "esnext",
    minifyIdentifiers: false,
  },
  build: {
    target: "esnext",
    rollupOptions: {
      preserveEntrySignatures: "strict",
      input: ["lib/components/index.ts"],
      output: [
        {
          dir: "dist",
          format: "esm",
          entryFileNames: ({ name: fileName }) => `${fileName}.js`,
        },
      ],
    },
  },
  plugins: [dts(), postcssLit()],
});
