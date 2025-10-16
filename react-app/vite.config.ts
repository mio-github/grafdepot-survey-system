import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@mobile': path.resolve(__dirname, './src/mobile'),
      '@web': path.resolve(__dirname, './src/web'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
