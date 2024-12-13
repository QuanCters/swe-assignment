import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ }) => {
  // Define the default configuration object
  const config = {
    plugins: [react(), TanStackRouterVite()],
    server: {
      host: "0.0.0.0",
      port: 3000,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    publicDir: "public",
    build: {
      outDir: "build",
      assetsDir: "images",
      rollupOptions: {
        input: path.resolve(__dirname, "index.html"),
      },
    },
  };

  return config;
});
