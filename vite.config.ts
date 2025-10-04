import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { qrcode } from "vite-plugin-qrcode";

export default defineConfig({
  // Plugins
  plugins: [react(), tailwindcss(), qrcode()],

  // Path aliases
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  // Dev server configuration
  server: {
    host: true,
    port: 8080,
  },
});
