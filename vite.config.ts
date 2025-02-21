
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { lovable } from "lovable-tagger";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 8080,
  },
  plugins: [react(), lovable()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
