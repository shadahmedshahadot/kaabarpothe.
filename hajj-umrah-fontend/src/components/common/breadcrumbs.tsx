import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { SITE } from '@/constants/site'

export interface Crumb {
  label: string
  href?: string
}

const buildJsonLd = (items: Crumb[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.label,
    ...(c.href ? { item: `${SITE.url}${c.href}` } : {}),
  })),
})

interface BreadcrumbsProps {
  items: Crumb[]
  className?: string
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const trail: Crumb[] = [{ label: 'হোম', href: '/' }, ...items]
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(trail)) }} />
      <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
        <ol className="flex flex-wrap items-center gap-1 text-muted-foreground">
          {trail.map((c, i) => {
            const isLast = i === trail.length - 1
            return (
              <li key={`${c.label}-${i}`} className="inline-flex items-center gap-1">
                {i > 0 && <ChevronRight className="w-3.5 h-3.5 mx-1 opacity-60" aria-hidden="true" />}
                {i === 0 && <Home className="w-3.5 h-3.5 mr-1" aria-hidden="true" />}
                {isLast || !c.href ? (
                  <span className="font-medium text-foreground" aria-current={isLast ? 'page' : undefined}>
                    {c.label}
                  </span>
                ) : (
                  <Link href={c.href} className="hover:text-foreground transition-colors">
                    {c.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

interface BreadcrumbJsonLdProps {
  items: Crumb[]
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const trail: Crumb[] = [{ label: 'হোম', href: '/' }, ...items]
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(trail)) }} />
}
