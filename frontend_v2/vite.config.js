import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import envConfig from './vite.env.js'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isProd = mode === 'production'

  return {
    // Build optimization options
    // Resolve aliases for better imports
    resolve: {
      alias: {
        '@': '/src',
        '@assets': '/src/assets',
        '@components': '/src/components',
        '@constants': '/src/constants',
        '@context': '/src/context',
        '@hooks': '/src/hooks',
        '@routes': '/src/routes',
        '@styles': '/src/styles',
        '@pages': '/src/pages',
        '@utils': '/src/utils',
      },
    },

    // Optimization options
    optimizeDeps: {
      include: ['react', 'react-dom'],
      exclude: ['@swc/core'],
      esbuildOptions: {
        target: 'esnext',
      },
    },

    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      cssCodeSplit: true,
      sourcemap: !isProd,
      // Use chunk size optimization for better performance
      chunkSizeWarningLimit: 1000,
      // Better minification options for production
      minify: 'esbuild',
      terserOptions: isProd ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
        }
      } : undefined,
      rollupOptions: isProd ? {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            mui: ['@mui/material', '@mui/icons-material'],
            vendor: ['framer-motion', 'react-router-dom']
          }
        }
      } : undefined
    },

    // Server configuration with optimized settings
    server: {
      hmr: {
        overlay: true,
      },
      watch: {
        usePolling: false,
        ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
      }
    },

    // Plugins with optimized SWC settings
    plugins: [react({
      jsxImportSource: 'react',
      plugins: [],
      jsc: {
        target: "es2020",
        parser: {
          syntax: "ecmascript",
          jsx: true,
        },
        transform: {
          react: {
            runtime: 'automatic',
            refresh: !isProd,
            development: !isProd,
          }
        },
        minify: {
          compress: {
            unused: true,
            drop_console: isProd,
            drop_debugger: isProd,
          },
          mangle: true
        }
      },
    })],
  };
})
