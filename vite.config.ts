import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/GulfSouth3D/",  // ← match your exact GitHub repo name
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      "/omeka-api": {
        target: "https://digitizedculturalheritageofusmarchive.usmcdh.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/omeka-api/, "/api"),
      },
      "/omeka-files": {
        target: "https://digitizedculturalheritageofusmarchive.usmcdh.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/omeka-files/, "/files"),
      }
    },
  },
});