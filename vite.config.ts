import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl';
import legacy from '@vitejs/plugin-legacy';
import * as path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      fastRefresh: true,
      // include: '**/*.tsx',
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    basicSsl(),
  ],

  json: {
    stringify: true,
  },
  
  build: {
    outDir: './dist',
    sourcemap: true,
  },
  
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      css: {
        additionalData: `@import "./node_modules/@vkontakte/vkui-tokens";`,
      },
    },
  },
  
  server: {
    https: true,
    host: true,
    open: './index.html',
    cors: true,
    // hmr: { clientPort: 443, port: 5173 },
  },
  
  clearScreen: true,
})
