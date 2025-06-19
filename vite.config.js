import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Configuración del servidor de desarrollo
  server: {
    port: 5173,
    host: true, // Permite acceso desde otros dispositivos en la red
    open: true, // Abre el navegador automáticamente
    cors: true,
    proxy: {
      // Proxy para las llamadas a la API durante desarrollo
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // Configuración de preview
  preview: {
    port: 4173,
    host: true,
  },

  // Resolución de rutas
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@features': resolve(__dirname, 'src/features'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@store': resolve(__dirname, 'src/store'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@layouts': resolve(__dirname, 'src/layouts'),
      '@lib': resolve(__dirname, 'src/lib'),
    },
  },

  // Configuración de build
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    sourcemap: false, // Cambiar a true para debugging en producción
    
    // Configuración de chunks para optimizar la carga
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
          'ui-vendor': ['@headlessui/react', '@heroicons/react'],
          'utils-vendor': ['axios', 'date-fns', 'lodash'],
          'chart-vendor': ['recharts'],
          
          // Feature chunks
          'auth-features': [
            './src/features/auth/pages/Login.jsx',
            './src/features/auth/pages/Register.jsx',
            './src/features/auth/components/LoginForm.jsx',
          ],
          'dashboard-features': [
            './src/features/dashboard/pages/Dashboard.jsx',
          ],
          'discoteca-features': [
            './src/features/mi-discoteca/pages/MiDiscoteca.jsx',
            './src/features/mi-discoteca/components/DiscotecaInfoForm.jsx',
          ],
        },
        
        // Configuración de nombres de archivos
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/.test(assetInfo.name)) {
            return `assets/media/[name]-[hash].${extType}`;
          }
          
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${extType}`;
          }
          
          if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash].${extType}`;
          }
          
          return `assets/[ext]/[name]-[hash].${extType}`;
        },
      },
    },
    
    // Configuración de terser para minificación
    terserOptions: {
      compress: {
        drop_console: true, // Eliminar console.log en producción
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
      format: {
        comments: false, // Eliminar comentarios
      },
    },
    
    // Límites de tamaño de chunks
    chunkSizeWarningLimit: 1000,
    
    // Assets inline threshold
    assetsInlineLimit: 4096,
  },

  // Configuración de CSS
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/variables.scss";`,
      },
    },
  },

  // Variables de entorno
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },

  // Configuración de optimización de dependencias
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@reduxjs/toolkit',
      'react-redux',
      'axios',
      'date-fns',
      'lodash',
      'clsx',
    ],
    exclude: [
      // Excluir dependencias que no deben ser pre-bundleadas
    ],
  },

  // Configuración para testing
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    css: true,
  },

  // Configuración de ESBuild
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    target: 'es2015',
  },

  // Configuración de experimentales
  experimental: {
    buildAdvancedBaseOptions: true,
  },
});