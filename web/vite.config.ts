import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  // The 3D hero scene is a separate chunk that loads after the page is visible
  build: { chunkSizeWarningLimit: 700 },
})
