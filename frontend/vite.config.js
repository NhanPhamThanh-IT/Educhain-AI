import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@theme': path.resolve(__dirname, 'src/theme'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@locales': path.resolve(__dirname, 'src/locales'),
      '@sections': path.resolve(__dirname, 'src/sections'),
    },
  },
})
