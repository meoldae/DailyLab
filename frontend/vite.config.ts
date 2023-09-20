import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions : {
        enabled: true,
      },
      manifest: {
        icons: [
          {
            "src": "icons/coco_icon.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any maskable"
          }
        ],
      },
  }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ]
  },
  define: {
    global: 'window',
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8180",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})