'use client'

import { motion } from 'framer-motion'
import { Header } from './site-header'
import { Footer } from './site-footer'

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-page-canvas min-h-screen">
      <Header />
      <motion.main
        id="main-content"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="pt-24"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  )
}

export function PageHero({ eyebrow, title, description, children }: { eyebrow?: string; title: string; description?: string; children?: React.ReactNode }) {
  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.95_0.05_70_/_0.5),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,oklch(0.92_0.06_150_/_0.3),transparent_50%)]" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute top-10 right-10 w-72 h-72 opacity-10"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <g fill="none" stroke="oklch(0.62 0.16 70)" strokeWidth="0.3">
              {Array.from({ length: 6 }).map((_, i) => (
                <polygon key={i} points="100,20 180,100 100,180 20,100" transform={`rotate(${i * 15} 100 100)`} />
              ))}
            </g>
          </svg>
        </motion.div>
      </div>
      <div className="max-w-7xl mx-auto text-center">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-5 text-balance leading-[1.05]"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6"
          >
            {description}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
