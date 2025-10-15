import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  // Experience Editor package
  {
    extends: "./packages/experience-editor/vitest.config.ts",
    test: {
      name: "experience-editor",
      root: "./packages/experience-editor",
      include: ["src/**/*.{test,spec}.{ts,tsx}"],
    },
  },
  // Add more packages here as they add tests
  // {
  //   extends: "./packages/recommendation-block/vitest.config.ts",
  //   test: {
  //     name: "recommendation-block",
  //     root: "./packages/recommendation-block",
  //     include: ["src/**/*.{test,spec}.{ts,tsx}"],
  //   },
  // },
]);
