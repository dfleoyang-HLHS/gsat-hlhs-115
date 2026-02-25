import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/gsat-hlhs-115/', 
  plugins: [react(), tailwindcss()],
})
