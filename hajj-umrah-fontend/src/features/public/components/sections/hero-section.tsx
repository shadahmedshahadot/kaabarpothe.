'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Search, Calendar, Users2, MapPin, Sparkles, ShieldCheck } from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { YouTubeVideoBackground } from '@/components/common/video-bg'
import { IMG } from '@/data/images'
import { useHeroContent } from '@/hooks/use-hero-content'

export function Hero() {
  const [type, setType] = useState<'umrah' | 'hajj'>('umrah')
  const [h] = useHeroContent()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20">
      {/* Continuous video background */}
      <YouTubeVideoBackground videoId={h.videoId} fallbackImage={IMG.kaabaNightHaram} />

      {/* Dark overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />

      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/15 backdrop-blur-md border border-amber-300/30 text-amber-200 text-xs font-semibold mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                {h.badge}
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 text-balance drop-shadow-2xl"
            >
              {h.titleStart}{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-rose-300 bg-clip-text text-transparent">{h.titleHighlight}</span>
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2,8 Q50,2 100,6 T198,8" stroke="rgb(252 211 77)" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-white/85 mb-8 max-w-xl leading-relaxed drop-shadow"
            >
              {h.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl mb-8 max-w-xl"
            >
              <div className="flex gap-1 mb-2">
                {(['umrah', 'hajj'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      type === t ? 'bg-white text-foreground shadow' : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {t === 'umrah' ? h.ctaUmrah : h.ctaHajj}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-1 p-1">
                <div className="px-4 py-2.5 rounded-xl bg-white/10">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/70 mb-1"><Calendar className="w-3 h-3" /> প্রস্থান</div>
                  <p className="text-sm font-semibold text-white truncate">যেকোনো মাস</p>
                </div>
                <div className="px-4 py-2.5 rounded-xl bg-white/10">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/70 mb-1"><Users2 className="w-3 h-3" /> হাজী</div>
                  <p className="text-sm font-semibold text-white truncate">১-৪ জন</p>
                </div>
                <div className="px-4 py-2.5 rounded-xl bg-white/10">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/70 mb-1"><MapPin className="w-3 h-3" /> ক্যাটাগরি</div>
                  <p className="text-sm font-semibold text-white truncate">সব</p>
                </div>
              </div>
              <Link
                href={`/packages/${type}`}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 text-foreground py-3.5 rounded-xl font-bold shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.01] transition-all group"
              >
                <Search className="w-4 h-4" />
                {type === 'umrah' ? 'উমরাহ' : 'হজ্জ'} প্যাকেজ দেখুন
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
            >
              {h.trustBadges.map((b, i) => (
                <div key={b} className="flex items-center gap-2 text-white/85">
                  {i === 0 && <ShieldCheck className="w-4 h-4 text-emerald-300" />}
                  {i === 1 && <Star className="w-4 h-4 text-amber-300 fill-amber-300" />}
                  {b}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column — Quran verse / reflection card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 relative hidden lg:block"
          >
            <div className="bg-white/8 border border-white/15 rounded-3xl p-10 shadow-2xl">
              <p className="text-amber-200 text-xs uppercase tracking-[0.3em] mb-4 font-semibold">{h.reflectionEyebrow}</p>
              <p className="text-white text-2xl leading-relaxed font-light italic mb-6 text-balance">
                {h.reflectionQuote}
              </p>
              <p className="text-white/70 text-sm">{h.reflectionRef}</p>

              <div className="mt-8 pt-8 border-t border-white/15 grid grid-cols-3 gap-4">
                {h.reflectionItems.map(item => <Floating key={item.label} label={item.label} value={item.value} />)}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-20"
        >
          {h.stats.map((s, i) => (
            <div key={i} className="relative bg-white/8 backdrop-blur-xl border border-white/15 rounded-2xl p-5 overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-amber-400 opacity-10 blur-xl group-hover:opacity-25 transition-opacity" />
              <p className="text-3xl sm:text-4xl font-bold text-white mb-1">
                <AnimatedCounter to={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} duration={2} />
              </p>
              <p className="text-xs uppercase tracking-wider text-white/70">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Floating({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-white/60 mb-1">{label}</p>
      <p className="text-sm font-bold text-white">{value}</p>
    </div>
  )
}
