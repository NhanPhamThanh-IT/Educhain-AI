import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@routes': '/src/routes',
      '@pages': '/src/pages',
      '@assets': '/src/assets',
      '@utils': '/src/utils',
      '@hooks': '/src/hooks',
      '@context': '/src/context',
      '@styles': '/src/styles',
    },
  },
})
