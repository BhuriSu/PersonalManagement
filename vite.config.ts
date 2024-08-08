import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: '**/*.svg',
  optimizeDeps: {
    include: ['@emotion/styled', '@mui/material/Unstable_Grid2'],
  },
  build: {
    assetsInlineLimit: 0,
  },
});
