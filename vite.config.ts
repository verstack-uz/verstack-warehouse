import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { qrcode } from "vite-plugin-qrcode";

export default defineConfig({
  plugins: [react(), tailwindcss(), qrcode()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: true,
    port: 8080,
  },
});
