import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
    }
  },
  build: {
    outDir: 'dist',
  },
  server: {
    proxy: {
      "/uploads": "http://localhost:4000",
      "/api": "http://localhost:4000"
    }
  }
})
