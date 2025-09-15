import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: { 
    port: 5174 
  },
  build: { 
    target: 'esnext', 
    modulePreload: false, 
    cssCodeSplit: true 
  },
  define: {
    'process.env': process.env
  }
});