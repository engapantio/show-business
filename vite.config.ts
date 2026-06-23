import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
    }),
    react(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('@mui/icons-material')) {
            return 'mui-icons';
          }
          if (id.includes('@mui/material') || id.includes('@emotion')) {
            return 'mui-core';
          }
          if (id.includes('@tanstack')) {
            return 'tanstack';
          }
        },
      },
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});
