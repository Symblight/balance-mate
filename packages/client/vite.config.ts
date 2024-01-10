import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      onwarn: (warning, handler) => {
        if (warning.code.startsWith("a11y-")) return;
        handler(warning);
      },
    }),
  ],
  build: {
    outDir: "./build",
  },
  server: {
    origin: "http://localhost:5173",
    proxy: {
      "/api": {
        target: "http://localhost:3100",
        changeOrigin: true,
        secure: false,
        autoRewrite: true,
        protocolRewrite: "http",
        hostRewrite: "localhost:3100",
      },
    },
  },
});
