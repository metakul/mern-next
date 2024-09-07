import type { MetadataRoute } from 'next'
 
export default function manifest(): any {
  return {
    name: 'METAKUL',
    short_name: 'METAKUL',
    description: 'Unique NFTs built to unite the design multiverse. Designed and styled by Metakul.',
    start_url: '/',
    scope: ".",
    id: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    orientation: 'any',
    icons: [
      {
        src: '/pwa/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwa/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/pwa/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
         purpose: 'any'
      },
      {
        src: '/pwa/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
         purpose: 'maskable'
      },
    ],
    screenshots: [
      {
        src: '/pwa/Screenshot/ss1.svg',
        sizes: '1155x967',
        type: 'image/svg',
        form_factor:"wide"
      },
      {
        src: '/pwa/Screenshot/ss1.svg',
        sizes: '1155x967',
        type: 'image/svg',
      },
      {
        src: '/pwa/Screenshot/ss2.svg',
        sizes: '957x957',
        type: 'image/svg',
        form_factor:"wide"
      },
      {
        src: '/pwa/Screenshot/ss2.svg',
        sizes: '957x957',
        type: 'image/svg',
      },
      {
        src: '/pwa/Screenshot/ss3.svg',
        sizes: '1260x964',
        type: 'image/svg',
        form_factor:"wide"
      },
      {
        src: '/pwa/Screenshot/ss3.svg',
        sizes: '1260x964',
        type: 'image/svg',
      },
    ],
    shortcuts: [
      {
        name: "Search",
        short_name: "Search",
        url: "/",
        description:
          "Metakul Home",
        icons: [
          {
            src: '/pwa/android-chrome-192x192.png',
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: "Stake",
        short_name: "Stake",
        url: "/earn",
        description:
          "Earn crypto and use them in the metaverse",
        icons: [
          {
            src: '/pwa/android-chrome-192x192.png',
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: "Profile",
        short_name: "Profile",
        url: "/profile",
        description:
          "Metakul Holder Profile",
        icons: [
          {
            src: '/pwa/android-chrome-192x192.png',
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    ],
  }
}