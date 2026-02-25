import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
  // 關鍵：這裡必須填入您的 GitHub 儲存庫名稱（前後都要有斜線）
  base: '/gsat-hlhs-115/', 
  
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
