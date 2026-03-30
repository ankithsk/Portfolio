import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split heavy 3D libs into their own chunk so main bundle loads faster
        manualChunks: {
          three: ["three", "three-stdlib"],
          gsap: ["gsap", "@gsap/react"],
          react: ["react", "react-dom"],
        },
      },
    },
    // Increase chunk warning threshold (three.js is legitimately large)
    chunkSizeWarningLimit: 1000,
  },
  server: {
    headers: {
      // Allow SharedArrayBuffer for DRACO WASM threading
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
});
