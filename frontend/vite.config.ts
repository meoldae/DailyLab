import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // VitePWA({
    //   swSrc: 'public/service-worker.js', 
    //   srcDir: '/',
    //   filename: 'service-worker.js',
    //   registerType: "autoUpdate",
    //   injectRegister: null,
    //   workbox : {
    //     swDest: "service-worker.js"
    //   },
    //   devOptions: {
    //     enabled: true,
    //     type: "module",
    //   },
    //   injectManifest: {
    //     injectionPoint: undefined
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "icons/coco_icon.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //         purpose: "any maskable",
    //       },
    //     ],
    //   },
    // }),
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
   build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        sw: "public/service-worker.js",
      },
    },
  },
});
