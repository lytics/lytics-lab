import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    build: {
      lib: {
        fileName: "lytics-tracking",
        entry: "src/index.ts",
        name: "MyLib",
      },
      outDir: "dist",
      rollupOptions: {
        input: "index2.html",
      },
    },
    test: {
      globals: true,
      environment: "happy-dom",
    },
  };
});
