import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { ManifestOptions, VitePWA, VitePWAOptions } from "vite-plugin-pwa";

import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables (.env file) based on the current environment
import { loadEnv } from "vite"; // Import loadEnv from Vite

const pwaOptions: Partial<VitePWAOptions> ={
  registerType: "autoUpdate",
  workbox: {
    maximumFileSizeToCacheInBytes: 6000000,
    clientsClaim: true,
    skipWaiting: true,
    globPatterns: ["**/*.{js,ts,tsx,css,html,ico,png,svg}"],
  },
  injectRegister: "auto",
  devOptions: {
    enabled: true,
  },
  includeAssets: [
    "pwa-192x192.png",
    "pwa-512x512.png",
    "robots.txt",
    "logo.svg",
  ],
  manifest: {
    name: "METAKUL",
    short_name: "M-kul",
    description: "Professional platform for web3 builders",
    icons: [
      {
        src: "pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: 'any'
      },
      {
        src: "offline.png",
        sizes: "100x100",
        type: "image/png",
        purpose: 'any'
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: 'maskable'
      },
      
    ],
    screenshots : [
      {
        src: "screenshot1.png",
        sizes: "1920x1080",
        type: "image/png",
        form_factor: "wide"
      },
      {
        src: "screenshot1.png",
        sizes: "1920x1080",
        type: "image/png",
        form_factor: "wide"
      },
      {
        src: "screenshot2.png",
        sizes: "1080x1920",
        type: "image/png",
        form_factor: "narrow",
      },
      {
        src: "screenshot2.png",
        sizes: "1080x1920",
        type: "image/png",
        form_factor: "narrow",
      },
    ],
    shortcuts: [
      {
        name: "Home",
        short_name: "Home",
        url: "/",
        description: "Professional platform for web3 builders",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: "Bot feed",
        short_name: "instabot",
        url: "/instabot",
        description: "Professional platform for web3 builders",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: "Profile / Scan",
        short_name: "Profile",
        url: "/profile",
        description: "Professional platform for web3 builders",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
    start_url: "/",
    scope: ".",
  },
}
const replaceOptions = { __DATE__: new Date().toISOString() }
const claims = process.env.CLAIMS === 'true'
const reload = process.env.RELOAD_SW === 'true'
const selfDestroying = process.env.SW_DESTROY === 'true'

if (process.env.SW === 'true') {
  pwaOptions.srcDir = 'src'
  pwaOptions.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts'
  pwaOptions.strategies = 'injectManifest'
  ;(pwaOptions.manifest as Partial<ManifestOptions>).name = 'PWA Inject Manifest'
  ;(pwaOptions.manifest as Partial<ManifestOptions>).short_name = 'PWA Inject'
  pwaOptions.injectManifest = {
    minify: false,
    maximumFileSizeToCacheInBytes: 6000000,
    enableWorkboxModulesLogs: true,
  }
}

if (claims)
  pwaOptions.registerType = 'autoUpdate'

if (reload) {
  // @ts-expect-error just ignore
  replaceOptions.__RELOAD_SW__ = 'true'
}

if (selfDestroying)
  pwaOptions.selfDestroying = selfDestroying

export default defineConfig(({ mode }) => {
  // Load environment variables for the current build mode
  const env = loadEnv(mode, __dirname);

  return {
    plugins: [
      react(),
      VitePWA(pwaOptions),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      proxy: {
        "/credapi": {
          target: `${env.backend_url}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/credapi/, ""),
        },
        "/verifierApi": {
          target: "https://backend-everything-37ada44e5086.herokuapp.com/v1",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/verifierApi/, ""),
        },
      },
    },
  };
});