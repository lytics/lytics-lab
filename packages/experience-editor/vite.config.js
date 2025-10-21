import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

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
            availableFlows: env.VITE_FLOWS,
            availablePersonalizationKeys: env.VITE_PERSONALIZATION_KEYS,
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
      host: "local.getlytics.com",
    },
  };
});
