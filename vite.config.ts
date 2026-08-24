import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ReactFlexLayout",
      // The ESM output must not use `.js`: the package is type "commonjs", so
      // Node would parse a `.js` file as CommonJS and choke on the ESM syntax.
      fileName: (format) => (format === "es" ? "index.mjs" : "index.umd.js"),
      formats: ["es", "umd"],
    },
    minify: true,
    sourcemap: true,
    rollupOptions: {
      external: (id) => {
        return (
          id === "react" ||
          id === "react-dom" ||
          id === "react/jsx-runtime" ||
          id === "react/jsx-dev-runtime" ||
          id.startsWith("react/") ||
          id.startsWith("react-dom/")
        );
      },
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "React",
          "react/jsx-dev-runtime": "React",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "style.css";
          }
          return assetInfo.name || "asset";
        },
      },
    },
    cssCodeSplit: false,
    cssMinify: true,
  },
});
