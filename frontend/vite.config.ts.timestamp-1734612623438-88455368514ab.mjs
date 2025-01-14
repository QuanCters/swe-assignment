// vite.config.ts
import { defineConfig } from "file:///D:/study/c%C3%B4ng%20ngh%E1%BB%87%20ph%E1%BA%A7n%20m%E1%BB%81m/Code/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///D:/study/c%C3%B4ng%20ngh%E1%BB%87%20ph%E1%BA%A7n%20m%E1%BB%81m/Code/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { TanStackRouterVite } from "file:///D:/study/c%C3%B4ng%20ngh%E1%BB%87%20ph%E1%BA%A7n%20m%E1%BB%81m/Code/frontend/node_modules/@tanstack/router-plugin/dist/esm/vite.js";
import path from "path";
var __vite_injected_original_dirname = "D:\\study\\c\xF4ng ngh\u1EC7 ph\u1EA7n m\u1EC1m\\Code\\frontend";
var vite_config_default = defineConfig(({}) => {
  const config = {
    plugins: [react(), TanStackRouterVite()],
    server: {
      watch: {
        usePolling: true
        // Đảm bảo hot reload hoạt động trong Docker
      },
      host: "0.0.0.0",
      port: 3e3
    },
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    },
    publicDir: "public",
    build: {
      outDir: "build",
      assetsDir: "images",
      rollupOptions: {
        input: path.resolve(__vite_injected_original_dirname, "index.html")
      }
    }
  };
  return config;
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxzdHVkeVxcXFxjXHUwMEY0bmcgbmdoXHUxRUM3IHBoXHUxRUE3biBtXHUxRUMxbVxcXFxDb2RlXFxcXGZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxzdHVkeVxcXFxjXHUwMEY0bmcgbmdoXHUxRUM3IHBoXHUxRUE3biBtXHUxRUMxbVxcXFxDb2RlXFxcXGZyb250ZW5kXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9zdHVkeS9jJUMzJUI0bmclMjBuZ2glRTElQkIlODclMjBwaCVFMSVCQSVBN24lMjBtJUUxJUJCJTgxbS9Db2RlL2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgeyBUYW5TdGFja1JvdXRlclZpdGUgfSBmcm9tIFwiQHRhbnN0YWNrL3JvdXRlci1wbHVnaW4vdml0ZVwiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IH0pID0+IHtcclxuICAvLyBEZWZpbmUgdGhlIGRlZmF1bHQgY29uZmlndXJhdGlvbiBvYmplY3RcclxuICBjb25zdCBjb25maWcgPSB7XHJcbiAgICBwbHVnaW5zOiBbcmVhY3QoKSwgVGFuU3RhY2tSb3V0ZXJWaXRlKCldLFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIHdhdGNoOiB7XHJcbiAgICAgICAgdXNlUG9sbGluZzogdHJ1ZSwgLy8gXHUwMTEwXHUxRUEzbSBiXHUxRUEzbyBob3QgcmVsb2FkIGhvXHUxRUExdCBcdTAxMTFcdTFFRDluZyB0cm9uZyBEb2NrZXJcclxuICAgICAgfSxcclxuICAgICAgaG9zdDogXCIwLjAuMC4wXCIsXHJcbiAgICAgIHBvcnQ6IDMwMDAsXHJcbiAgICB9LFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHB1YmxpY0RpcjogXCJwdWJsaWNcIixcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIG91dERpcjogXCJidWlsZFwiLFxyXG4gICAgICBhc3NldHNEaXI6IFwiaW1hZ2VzXCIsXHJcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICBpbnB1dDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJpbmRleC5odG1sXCIpLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9O1xyXG5cclxuICByZXR1cm4gY29uZmlnO1xyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwVixTQUFTLG9CQUFvQjtBQUN2WCxPQUFPLFdBQVc7QUFDbEIsU0FBUywwQkFBMEI7QUFDbkMsT0FBTyxVQUFVO0FBSGpCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLENBQUUsTUFBTTtBQUVuQyxRQUFNLFNBQVM7QUFBQSxJQUNiLFNBQVMsQ0FBQyxNQUFNLEdBQUcsbUJBQW1CLENBQUM7QUFBQSxJQUN2QyxRQUFRO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxZQUFZO0FBQUE7QUFBQSxNQUNkO0FBQUEsTUFDQSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3RDO0FBQUEsSUFDRjtBQUFBLElBQ0EsV0FBVztBQUFBLElBQ1gsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLFFBQ2IsT0FBTyxLQUFLLFFBQVEsa0NBQVcsWUFBWTtBQUFBLE1BQzdDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQ1QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
