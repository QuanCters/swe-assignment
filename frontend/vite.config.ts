import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  // Define the default configuration object
  const config = {
    plugins: [react(), TanStackRouterVite()],
    server: {
      host: "0.0.0.0",
      port: 3000,
    },
    resolve: {
      alias: [{ find: "@", replacement: path.resolve(__dirname, "") }],
    },
    build: {
      outDir: "build",
    },
    base: "/", // Default base path
  };

  if (command !== "serve") {
    config.base = "/swe-assignment/";
  }

  return config;
});
