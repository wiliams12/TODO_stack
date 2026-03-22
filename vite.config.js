import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', 
      includeAssets: ['favicon.ico', 'to-do-list.png'], 
      manifest: {
        short_name: "TODO",
        name: "TODO stack",
        description: "A high-performance, offline-first task management application.",
        icons: [
          {
            src: "favicon.ico",
            type: "image/x-icon",
            sizes: "32x32"
          },
          {
            src: "to-do-list.png",
            type: "image/png",
            sizes: "192x192"
          },
          {
            src: "to-do-list.png",
            type: "image/png",
            sizes: "512x512"
          }
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#ffffff"
      }
    })
  ]
});