import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import { loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react(),
      createHtmlPlugin({
        inject: {
          data: {
            title: "Lytics Pathfora Editor Preview",
            accountID: env.VITE_ACCOUNT_ID,
            accessToken: env.VITE_ACCESS_TOKEN,
            pathforaConfig: env.VITE_PATHFORA_CFG,
            availableAudiences: env.VITE_AUDIENCES,
            availableCollections: env.VITE_COLLECTIONS,
          },
        },
      }),
    ],
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
    },
  };
});
