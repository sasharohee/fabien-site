import { defineConfig } from 'vite'

export default defineConfig({
  // Configuration pour un site statique
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html',
        services: './services.html',
        about: './about.html',
        contact: './contact.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
