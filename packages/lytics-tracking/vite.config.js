import { defineConfig } from "vite";
import { loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    build: {
      outDir: "dist",
      rollupOptions: {
        input: "main.tsx",
        output: {
          entryFileNames: "lytics-pathfora-editor.js",
          chunkFileNames: "lytics-pathfora-editor-[hash].js",
          assetFileNames: "lytics-pathfora-editor-[hash].[ext]",
        },
      },
    },
    server: {
      open: true,
      host: "local.getlytics.com",
    },
  };
});
