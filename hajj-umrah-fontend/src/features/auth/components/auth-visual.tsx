'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShieldCheck, Sparkles, Star } from 'lucide-react'
import { Logo } from '@/components/common/logo'

type Pattern = 'diamond' | 'dots'

interface Props {
  title: string
  description: string
  gradient: string
  pattern?: Pattern
  stats?: { value: string; label: string }[]
  bullets?: string[]
}

export function AuthVisual({ title, description, gradient, pattern = 'diamond', stats, bullets }: Props) {
  return (
    <div
      className={`hidden lg:flex relative bg-gradient-to-br ${gradient} p-12 items-center justify-center overflow-hidden`}
    >
      <AuthBackgroundPattern pattern={pattern} />
      <FloatingOrbs />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 text-white max-w-md w-full">
        <Link href="/" className="inline-block mb-12">
          <Logo href={null} variant="dark" showText size="lg" />
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 rounded-full bg-white/15 backdrop-blur-md text-[11px] uppercase tracking-[0.18em] ring-1 ring-white/20">
            <Sparkles className="w-3 h-3" /> ৫০,০০০+ হাজীর বিশ্বস্ত
          </span>
          <h1 className="text-4xl xl:text-5xl font-bold leading-[1.1] mb-4">{title}</h1>
          <p className="opacity-85 mb-8 leading-relaxed text-base">{description}</p>
        </motion.div>

        {bullets && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-2.5"
          >
            {bullets.map((l, i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.07 }}
                className="flex items-center gap-3 text-sm bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 ring-1 ring-white/15"
              >
                <span className="grid place-items-center w-8 h-8 shrink-0 rounded-lg bg-amber-300/20 ring-1 ring-amber-300/30">
                  <ShieldCheck className="w-4 h-4 text-amber-200" />
                </span>
                <span className="font-medium">{l}</span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-12 grid grid-cols-3 gap-3"
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center ring-1 ring-white/15 hover:bg-white/15 transition-colors"
              >
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-[10px] uppercase tracking-wider opacity-70 mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 pt-6 border-t border-white/15 flex items-center gap-3 text-xs text-white/80"
        >
          <div className="flex -space-x-1.5">
            {[0, 1, 2, 3].map(i => (
              <span
                key={i}
                className="w-7 h-7 rounded-full ring-2 ring-white/20 bg-gradient-to-br from-amber-200 to-orange-400"
              />
            ))}
          </div>
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3, 4].map(i => (
              <Star key={i} className="w-3 h-3 fill-amber-300 text-amber-300" />
            ))}
          </div>
          <span>১২,৫০০+ রিভিউ থেকে ৪.৯ রেটিং</span>
        </motion.div>
      </div>
    </div>
  )
}

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-[8%] right-[12%] w-72 h-72 rounded-full bg-white/15 blur-3xl"
        animate={{ y: [0, -22, 0], x: [0, 12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[8%] w-80 h-80 rounded-full bg-amber-300/15 blur-3xl"
        animate={{ y: [0, 28, 0], x: [0, -18, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[45%] left-[35%] w-56 h-56 rounded-full bg-white/10 blur-3xl"
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

function AuthBackgroundPattern({ pattern }: { pattern: Pattern }) {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
      {pattern === 'diamond' ? (
        <>
          <pattern id="auth-diamond" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="white" strokeWidth="0.8" />
          </pattern>
          <rect width="400" height="600" fill="url(#auth-diamond)" />
        </>
      ) : (
        <>
          <pattern id="auth-dots" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="2" fill="white" />
          </pattern>
          <rect width="400" height="600" fill="url(#auth-dots)" />
        </>
      )}
    </svg>
  )
}
