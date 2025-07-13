/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
const config = defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});

// @ts-expect-error process not defined
if (process?.env?.PUBLIC_URL) {
  // @ts-expect-error process not defined
  config.base = process.env.PUBLIC_URL;
}

export default config;
