import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Computer Class Dashboard',
    short_name: 'Computer Class',
    description: 'Your computer class apps and resources',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#141414',
    theme_color: '#6366f1',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
