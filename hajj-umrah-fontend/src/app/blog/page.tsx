import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, ArrowRight } from 'lucide-react'
import { PageShell, PageHero } from '@/components/layouts/page-shell'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/utils/format'
import { blogs } from '@/data/blogs'
import { IMG, KAABA_IMAGES, MADINAH_IMAGES } from '@/data/images'

const blogImage = (idx: number) =>
  idx % 2 === 0 ? KAABA_IMAGES[idx % KAABA_IMAGES.length] : MADINAH_IMAGES[idx % MADINAH_IMAGES.length]

export const metadata: Metadata = {
  title: 'শিক্ষা কেন্দ্র ও ব্লগ | সাকিনাহ ট্রাভেলস',
  description: 'আলেম-পর্যালোচিত গাইড, প্যাকিং চেকলিস্ট, এবং হাজীদের গল্প। হজ্জ বা উমরাহর জন্য আপনার অন্তর ও স্যুটকেস প্রস্তুত করুন।',
}

export default function BlogPage() {
  const featured = blogs.find(b => b.featured)!
  const rest = blogs.filter(b => b.id !== featured.id)
  const categories = Array.from(new Set(blogs.map(b => b.category)))

  return (
    <PageShell>
      <PageHero
        eyebrow="শিক্ষা কেন্দ্র"
        title="হজ্জ-উমরাহ জ্ঞান, আলেম-পর্যালোচিত।"
        description="আপনার পবিত্র যাত্রার জন্য শারীরিক, আর্থিক এবং আধ্যাত্মিকভাবে প্রস্তুত হতে সাহায্য করার জন্য নিবন্ধ, গাইড এবং গল্প।"
      />

      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-10">
            <Badge variant="default">সব</Badge>
            {categories.map(c => <Badge key={c} variant="outline">{c}</Badge>)}
          </div>

          {/* Featured */}
          <Link href={`/blog/${featured.slug}`} className="group block mb-16">
            <div className="grid lg:grid-cols-2 gap-8 items-center bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-[4/3] lg:aspect-square relative overflow-hidden">
                <Image src={IMG.kaabaDayMinarets} alt={featured.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-8 lg:p-12">
                <Badge variant="default" className="mb-4">ফিচার্ড · {featured.category}</Badge>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${featured.authorAvatar} flex items-center justify-center text-white text-xs font-bold`}>
                      {featured.author.split(' ').slice(-2).map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{featured.author}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(featured.publishedDate)} · {featured.readTime} মিনিট</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    নিবন্ধ পড়ুন <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[16/10] relative overflow-hidden">
                  <Image src={blogImage(i + 1)} alt={post.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-black/40 backdrop-blur text-white text-xs px-2.5 py-1 rounded-full">
                    <Clock className="w-3 h-3" /> {post.readTime} মিনিট
                  </div>
                </div>
                <div className="p-6">
                  <Badge variant="outline" className="mb-3 text-[10px]">{post.category}</Badge>
                  <h3 className="text-lg font-bold text-foreground mb-2 leading-tight group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.author}</span>
                    <span>{formatDate(post.publishedDate)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
