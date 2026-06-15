'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { IMG } from '@/data/images'

const destinations = [
  {
    city: 'মক্কা',
    arabic: 'مكة',
    desc: 'কাবা ও মসজিদুল হারামের শহর। ইসলামের সবচেয়ে পবিত্র শহর, যেখানে প্রতিটি হজ্জ শুরু হয়।',
    landmarks: ['মসজিদুল হারাম', 'কাবা', 'মাকামে ইব্রাহিম', 'সাফা ও মারওয়া', 'জাবালে নূর', 'হেরা গুহা'],
    image: IMG.kaabaDayMinarets,
    stat: { val: '৪০ নামাজ', sub: 'সুন্নাহ ঐতিহ্য' },
    href: '/packages/hajj',
  },
  {
    city: 'মদিনা',
    arabic: 'المدينة',
    desc: 'নবী ﷺ এর শহর। দ্বিতীয় পবিত্রতম মসজিদ মসজিদে নববী ও রাওজা শরীফ দর্শন করুন।',
    landmarks: ['মসজিদে নববী', 'রাওজা শরীফ', 'কুবা মসজিদ', 'উহুদ পর্বত', 'মসজিদুল কিবলাতাইন', 'খেজুর বাগান'],
    image: IMG.greenDomeMinarets,
    stat: { val: '১,০০০×', sub: 'প্রতিদানের গুণক' },
    href: '/packages/umrah',
  },
]

export function DestinationsSection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="দুই পবিত্র শহর"
          title="যেখানে প্রতিটি প্যাকেজ আপনাকে নিয়ে যাবে।"
          description="মক্কা ও মদিনা — প্রতিটি হাজী যে দুই শহর দর্শনের স্বপ্ন দেখেন — সেখানে অর্থপূর্ণ সময় কাটান।"
          className="mb-16"
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {destinations.map((d, i) => (
            <motion.div
              key={d.city}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group relative rounded-[2rem] overflow-hidden bg-card border border-border shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-shadow"
            >
              <div className="relative h-80 overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={d.image} alt={d.city} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute top-5 left-5 right-5 flex items-start justify-between text-white z-10">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] opacity-80 mb-1">গন্তব্য ০{i + 1}</p>
                    <h3 className="text-4xl font-bold leading-none drop-shadow">{d.city}</h3>
                    <p className="text-lg opacity-90 mt-1">{d.arabic}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{d.stat.val}</p>
                    <p className="text-[10px] uppercase tracking-wider opacity-80">{d.stat.sub}</p>
                  </div>
                </div>
              </div>

              <div className="p-7">
                <p className="text-foreground/80 leading-relaxed mb-5">{d.desc}</p>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">প্রধান স্থানসমূহ</p>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {d.landmarks.map((l, j) => (
                    <motion.div
                      key={l}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + j * 0.04 + 0.4 }}
                      className="flex items-center gap-2 text-sm text-foreground/80"
                    >
                      <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span>{l}</span>
                    </motion.div>
                  ))}
                </div>

                <Link
                  href={d.href}
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
                >
                  প্যাকেজ দেখুন
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
