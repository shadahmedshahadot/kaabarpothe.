import type { MetadataRoute } from 'next'
import { SITE } from '@/constants/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — ${SITE.tagline}`,
    short_name: SITE.name,
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#fef9f3',
    theme_color: '#fef9f3',
    lang: 'bn-BD',
    dir: 'ltr',
    orientation: 'portrait-primary',
    categories: ['travel', 'lifestyle', 'religion'],
    icons: [
      { src: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
