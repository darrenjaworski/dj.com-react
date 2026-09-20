import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
const config = defineConfig({
  plugins: [react()],
});

if (process?.env?.PUBLIC_URL) {
  config.base = process.env.PUBLIC_URL;
}

export default config;
