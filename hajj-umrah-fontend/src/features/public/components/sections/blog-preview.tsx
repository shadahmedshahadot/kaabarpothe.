'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { formatDate } from '@/utils/format'
import { getFeaturedBlogs } from '@/data/blogs'
import { KAABA_IMAGES, MADINAH_IMAGES } from '@/data/images'

const blogImg = (i: number) => i % 2 === 0 ? KAABA_IMAGES[i % KAABA_IMAGES.length] : MADINAH_IMAGES[i % MADINAH_IMAGES.length]

export function BlogPreview() {
  const posts = getFeaturedBlogs().slice(0, 3)

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <SectionHeading
            eyebrow="শিক্ষা কেন্দ্র"
            title="হৃদয় ও সুটকেস দুটোই প্রস্তুত করুন।"
            description="আলেম পর্যালোচিত গাইড, ব্যবহারিক পরামর্শ ও হাজীদের গল্প।"
            align="left"
            className="!max-w-2xl !mx-0"
          />
          <Link href="/blog" className="inline-flex self-start items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group">
            সব আর্টিকেল
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="aspect-[16/10] rounded-2xl mb-5 overflow-hidden relative">
                  <Image
                    src={blogImg(i)}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-black/40 backdrop-blur text-white text-xs px-2.5 py-1 rounded-full">
                    <Clock className="w-3 h-3" /> {post.readTime} মিনিট পড়া
                  </div>
                </div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">{post.category}</p>
                <h3 className="text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${post.authorAvatar} flex items-center justify-center text-white text-xs font-bold`}>
                    {post.author.split(' ').slice(-2).map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground leading-tight">{post.author}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(post.publishedDate)}</p>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
