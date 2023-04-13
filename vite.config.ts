import basicSsl from '@vitejs/plugin-basic-ssl';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import * as path from 'node:path';
import { defineConfig } from 'vite';
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

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@config': path.resolve(__dirname, './src/config'),
      '@store': path.resolve(__dirname, './src/store'),
      '@models': path.resolve(__dirname, './src/models'),
      '@api': path.resolve(__dirname, './src/api'),
    },
  },

  server: {
    https: true,
    host: true,
    cors: true,
    // hmr: { clientPort: 443, port: 5173 },
  },

  clearScreen: true,
});
