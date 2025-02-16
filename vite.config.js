import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  // base: process.env.NODE_ENV === 'production' ? '/react-d3-sanghooli/' : '/',
  base: '/react-d3-sanghooli/',
  plugins: [react()],
});
