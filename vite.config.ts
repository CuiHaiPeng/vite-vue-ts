import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const { resolve } = require("path");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  esbuild: {
    jsxFactory: "h",
    jsxInject: `import { h } from 'vue'`,
    jsxFragment: "Fragment",
  },
  resolve: {
    alias: {
      "/@": resolve(__dirname, "./src"),
      "/@views": resolve(__dirname, "./src/views"),
      "/@components": resolve(__dirname, "./src/components"),
    },
  },
});
