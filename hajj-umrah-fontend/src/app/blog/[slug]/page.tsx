import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, ArrowLeft, ArrowRight, Calendar, Eye } from 'lucide-react'
import { PageShell } from '@/components/layouts/page-shell'
import { Badge } from '@/components/ui/badge'
import { BreadcrumbJsonLd } from '@/components/common'
import { SITE } from '@/constants/site'
import { formatDate, formatNumber } from '@/utils/format'
import { blogs, getBlog } from '@/data/blogs'
import { IMG, KAABA_IMAGES, MADINAH_IMAGES } from '@/data/images'

function pickImage(slug: string) {
  const hash = slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const pool = hash % 2 === 0 ? KAABA_IMAGES : MADINAH_IMAGES
  return pool[hash % pool.length]
}

export const dynamicParams = false

export async function generateStaticParams() {
  return blogs.map(b => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getBlog(slug)
  if (!post) return { title: 'নিবন্ধ পাওয়া যায়নি' }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedDate,
      authors: [post.author],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt },
  }
}

function renderMarkdown(content: string) {
  return content.split('\n\n').map((para, i) => {
    if (para.startsWith('## ')) return <h2 key={i} className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-4">{para.slice(3)}</h2>
    return <p key={i} className="text-foreground/80 leading-relaxed text-base sm:text-lg mb-5">{para}</p>
  })
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlog(slug)
  if (!post) notFound()
  const related = blogs.filter(b => b.id !== post.id && b.category === post.category).slice(0, 3)

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    articleBody: post.content,
    image: [`${SITE.url}${pickImage(post.slug)}`],
    datePublished: post.publishedDate,
    dateModified: post.publishedDate,
    author: { '@type': 'Person', name: post.author, jobTitle: post.authorRole },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/logo.jpeg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}/blog/${post.slug}` },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    inLanguage: 'bn-BD',
    wordCount: post.content.split(/\s+/).length,
  }

  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { label: 'ব্লগ', href: '/blog' },
          { label: post.title },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <article className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> সব নিবন্ধে ফিরে যান
          </Link>

          <Badge variant="default" className="mb-4">{post.category}</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] mb-6 text-balance">{post.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">{post.excerpt}</p>

          <div className="flex items-center gap-4 flex-wrap text-sm border-y border-border py-5 mb-10">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${post.authorAvatar} flex items-center justify-center text-white text-sm font-bold`}>
                {post.author.split(' ').slice(-2).map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold text-foreground">{post.author}</p>
                <p className="text-xs text-muted-foreground">{post.authorRole}</p>
              </div>
            </div>
            <span className="text-muted-foreground hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-muted-foreground"><Calendar className="w-4 h-4" /> {formatDate(post.publishedDate)}</div>
            <div className="flex items-center gap-1.5 text-muted-foreground"><Clock className="w-4 h-4" /> {post.readTime} মিনিট পড়া</div>
            <div className="flex items-center gap-1.5 text-muted-foreground"><Eye className="w-4 h-4" /> {formatNumber(post.views)} ভিউ</div>
          </div>

          <div className="aspect-[16/9] rounded-3xl mb-12 relative overflow-hidden">
            <Image src={pickImage(post.slug)} alt={post.title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          <div className="prose max-w-none">{renderMarkdown(post.content)}</div>

          <div className="mt-12 pt-8 border-t border-border flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground mr-2">ট্যাগ:</span>
            {post.tags.map(t => <Badge key={t} variant="outline">{t}</Badge>)}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="max-w-7xl mx-auto mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-8">{post.category} থেকে আরও</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map(r => (
                <Link key={r.id} href={`/blog/${r.slug}`} className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <Image src={pickImage(r.slug)} alt={r.title} fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-foreground mb-2 leading-tight group-hover:text-primary transition-colors">{r.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{r.excerpt}</p>
                    <p className="text-xs font-semibold text-primary mt-3 inline-flex items-center gap-1">
                      আরও পড়ুন <ArrowRight className="w-3.5 h-3.5" />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </PageShell>
  )
}
