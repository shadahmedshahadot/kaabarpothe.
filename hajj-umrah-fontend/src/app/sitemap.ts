import type { MetadataRoute } from 'next'
import { SITE } from '@/constants/site'
import { packages } from '@/data/packages'
import { hotels } from '@/data/hotels'
import { transports } from '@/data/transports'

const BASE = SITE.url.replace(/\/$/, '')

type Entry = MetadataRoute.Sitemap[number]
type Freq = Entry['changeFrequency']

const entry = (path: string, priority: number, changeFrequency: Freq, lastModified: Date = new Date()): Entry => ({
  url: `${BASE}${path}`,
  lastModified,
  priority,
  changeFrequency,
})

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: Entry[] = [
    entry('/', 1, 'daily'),
    entry('/about', 0.8, 'monthly'),
    entry('/contact', 0.7, 'yearly'),
    entry('/faq', 0.8, 'monthly'),
    entry('/reviews', 0.7, 'weekly'),
    entry('/packages/hajj', 0.95, 'weekly'),
    entry('/packages/umrah', 0.95, 'weekly'),
    entry('/hotels', 0.8, 'weekly'),
    entry('/flights', 0.8, 'weekly'),
    entry('/transportation', 0.7, 'weekly'),
    entry('/privacy', 0.3, 'yearly'),
    entry('/terms', 0.3, 'yearly'),
  ]

  const packageRoutes: Entry[] = packages
    .filter(p => p.status === 'published')
    .map(p => entry(`/packages/${p.type}/${p.slug}`, 0.9, 'weekly'))

  const hotelRoutes: Entry[] = hotels
    .filter(h => h.status === 'active')
    .map(h => entry(`/hotels/${h.slug}`, 0.7, 'monthly'))

  const transportRoutes: Entry[] = transports
    .filter(t => t.status === 'active')
    .map(t => entry(`/transportation/${t.slug}`, 0.6, 'monthly'))

  return [...staticRoutes, ...packageRoutes, ...hotelRoutes, ...transportRoutes]
}
