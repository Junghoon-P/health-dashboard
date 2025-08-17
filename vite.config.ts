import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // /candiy로 시작하는 요청을 CANDiY API로 프록시
      "/candiy": {
        target: "https://api.candiy.io",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/candiy/, ""),
      },
    },
  },
});
