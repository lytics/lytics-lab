import { mergeConfig } from "vite";

import { default as base } from "../config/entrypoint/vite.config";


export default mergeConfig(base, {
  test: {
    environment: "happy-dom",
  },
});
