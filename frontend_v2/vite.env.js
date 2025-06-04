/**
 * This file contains environment-specific optimizations for Vite
 */
export default {
  // Development optimizations
  development: {
    esbuild: {
      // Skip certain optimizations in development for faster rebuilds
      legalComments: 'none',
      treeShaking: false, // Disable in dev for faster builds
      target: ['es2020'],
    },
    // Reduce unnecessary work in dev mode
    optimizeDeps: {
      force: false, // Only force optimization when needed
      entries: ['src/main.jsx'], // Focus on main entry point
      exclude: ['@swc/core'], // Exclude certain packages from optimization
    },
    // Enhanced dev server performance
    server: {
      hmr: {
        overlay: true, // Show errors in browser overlay
      },
      watch: {
        usePolling: false, // Don't use polling (better performance)
        // Ignore watching certain patterns
        ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
      },
    },
  },
  // Production optimizations
  production: {
    // Better production minification
    build: {
      target: 'es2020',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        output: {
          comments: false,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            // Break vendor code into separate chunks for better caching
            react: ['react', 'react-dom'],
            material: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
            router: ['react-router-dom'],
            animation: ['framer-motion'],
          },
        },
      },
    },
  },
}
