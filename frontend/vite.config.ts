import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        importScripts: ["service-worker.js"], // 이게 제일 중요
      },
      devOptions: {
        enabled: true,
      },
      injectManifest: {
        injectionPoint: undefined
      },
      manifest: {
        name: '하루연구소',
        short_name: '하루연구소',
        description: '당신의 하루를 연구합니다',
        start_url: '/',
        display: 'standalone',
        background_color: '#F5F5F5', // 스플래시 화면의 배경색
        theme_color: '#FA4949', // 애플리케이션의 주 테마 색상
        icons: [
          {
            src: "icons/pwa_icon.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "public", replacement: path.resolve(__dirname, "public") },
    ],
  },
  define: {
    global: "window",
  },
});
