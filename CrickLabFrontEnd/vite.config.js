// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
export default defineConfig({
  plugins: [react()],
  define: {
    // env variables
    "process.env.VITE_REACT_APP_BASE_URL": JSON.stringify(
      process.env.VITE_REACT_APP_BASE_URL
    ),
  },
});
