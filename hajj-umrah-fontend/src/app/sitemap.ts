import type { MetadataRoute } from 'next'
import { packages } from '@/data/packages'
import { blogs } from '@/data/blogs'
import { SITE } from '@/constants/site'

const BASE = SITE.url

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const staticRoutes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    { path: '', priority: 1, changeFrequency: 'daily' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/packages/hajj', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/packages/umrah', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/flights', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/hotels', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/transportation', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/reviews', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/refund', priority: 0.3, changeFrequency: 'yearly' },
  ]
  return [
    ...staticRoutes.map(r => ({ url: `${BASE}${r.path}`, lastModified: now, priority: r.priority, changeFrequency: r.changeFrequency })),
    ...packages.map(p => ({ url: `${BASE}/packages/${p.type}/${p.slug}`, lastModified: now, priority: 0.9, changeFrequency: 'weekly' as const })),
    ...blogs.map(b => ({ url: `${BASE}/blog/${b.slug}`, lastModified: new Date(b.publishedDate), priority: 0.6, changeFrequency: 'monthly' as const })),
  ]
}
