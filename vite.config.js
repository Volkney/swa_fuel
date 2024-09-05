import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: 'index.html',
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: '[name].[ext]',
        format: 'iife',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
  },
  publicDir: 'public',
})