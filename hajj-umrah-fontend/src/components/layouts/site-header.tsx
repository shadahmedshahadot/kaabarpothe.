'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Phone, Mail, MapPin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { PRIMARY_NAV, ROUTES, SITE } from '@/constants'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'bg-black text-white border-b border-white/10',
        scrolled ? 'shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]' : 'shadow-none',
      )}
    >
      <TopBar scrolled={scrolled} />

      <nav
        className={cn(
          'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300',
          scrolled ? 'h-[64px]' : 'h-20',
        )}
      >
        <HeaderLogo />
        <DesktopNav activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} />
        <HeaderActions open={open} onToggle={() => setOpen(o => !o)} />
      </nav>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </motion.header>
  )
}

function TopBar({ scrolled }: { scrolled: boolean }) {
  return (
    <div
      className={cn(
        'hidden md:block overflow-hidden transition-all duration-500 bg-black border-b border-white/5',
        scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100',
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-5">
          <a
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-amber-300 transition-colors"
            href={`tel:${SITE.contact.phoneHref}`}
          >
            <Phone className="w-3 h-3" /> {SITE.contact.phone}
          </a>
          <a
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-amber-300 transition-colors"
            href={`mailto:${SITE.contact.email}`}
          >
            <Mail className="w-3 h-3" /> {SITE.contact.email}
          </a>
          <span className="inline-flex items-center gap-1.5 text-white/60">
            <MapPin className="w-3 h-3" /> ২৪/৭ নিবেদিত হাজী সহায়তা
          </span>
        </div>
        <div className="flex items-center gap-4 text-white/80">
          <Link href={ROUTES.login} className="hover:text-amber-300 transition-colors">
            সাইন ইন
          </Link>
          <span className="text-white/25">|</span>
          <Link href={ROUTES.admin.root} className="hover:text-amber-300 transition-colors">
            অ্যাডমিন
          </Link>
          <Link href={ROUTES.pilgrim.root} className="hover:text-amber-300 transition-colors">
            হাজী পোর্টাল
          </Link>
        </div>
      </div>
    </div>
  )
}

function HeaderLogo() {
  return (
    <Link href={ROUTES.home} className="relative flex items-center group" aria-label={SITE.name}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 320, damping: 18 }}
        className="relative"
      >
        <span className="inline-flex flex-col leading-none">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300">
            কাবার পথে
          </span>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] mt-1 text-white/65">
            হজ্জ ও উমরাহ
          </span>
        </span>
        <span className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-tr from-amber-400/0 to-amber-300/0 group-hover:from-amber-400/15 group-hover:to-amber-300/20 blur-xl transition-opacity duration-500" />
      </motion.div>
    </Link>
  )
}

function DesktopNav({
  activeDropdown,
  setActiveDropdown,
}: {
  activeDropdown: string | null
  setActiveDropdown: (v: string | null) => void
}) {
  return (
    <div className="hidden lg:flex items-center gap-0.5">
      {PRIMARY_NAV.map(item => {
        const active = activeDropdown === item.label
        return (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => item.children && setActiveDropdown(item.label)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            {item.children ? (
              <button
                className="relative inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-all text-white/85 hover:text-white hover:bg-white/10"
              >
                {item.label}
                <ChevronDown
                  className={cn('w-3.5 h-3.5 transition-transform duration-200', active && 'rotate-180')}
                />
              </button>
            ) : (
              <Link
                href={item.href!}
                className="block px-4 py-2 text-sm font-medium rounded-full transition-all text-white/85 hover:text-white hover:bg-white/10"
              >
                {item.label}
              </Link>
            )}

            <AnimatePresence>
              {active && item.children && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-3 min-w-[300px]"
                >
                  <div className="bg-neutral-950/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl shadow-black/50 ring-1 ring-white/5">
                    {item.children.map(child => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block p-3 hover:bg-white/5 rounded-xl transition-colors group/c"
                      >
                        <p className="font-semibold text-sm text-white group-hover/c:text-amber-300 transition-colors">
                          {child.label}
                        </p>
                        <p className="text-xs text-white/55 mt-0.5">{child.desc}</p>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

function HeaderActions({
  open,
  onToggle,
}: {
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Link
        href={ROUTES.login}
        className="hidden sm:inline-flex px-4 py-2 text-sm font-medium rounded-full transition-colors text-white/85 hover:text-white hover:bg-white/10"
      >
        সাইন ইন
      </Link>
      <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
        <Link
          href={ROUTES.packages.hajj}
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-primary via-amber-500 to-orange-500 text-primary-foreground rounded-full text-sm font-semibold shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all"
        >
          এখনই বুক করুন
        </Link>
      </motion.div>
      <button
        aria-label="Toggle menu"
        className="lg:hidden p-2 rounded-xl transition-colors text-white hover:bg-white/10"
        onClick={onToggle}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
    </div>
  )
}

interface FlatNavItem {
  label: string
  href?: string
  parent?: string
  desc?: string
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const flat: FlatNavItem[] = PRIMARY_NAV.flatMap(item =>
    item.children
      ? item.children.map(c => ({ label: c.label, href: c.href, desc: c.desc, parent: item.label }))
      : [{ label: item.label, href: item.href }],
  )
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-black border-t border-white/10 overflow-hidden"
        >
          <div className="px-4 py-3 space-y-1">
            {flat.map(item => (
              <Link
                key={item.href}
                href={item.href!}
                onClick={onClose}
                className="block px-4 py-3 text-white hover:bg-white/5 rounded-xl transition-colors"
              >
                <p className="font-medium">{item.label}</p>
                {item.parent && (
                  <p className="text-[10px] uppercase tracking-wider text-white/50 mt-0.5">
                    {item.parent}
                  </p>
                )}
              </Link>
            ))}
            <div className="border-t border-white/10 my-2 pt-3 grid grid-cols-2 gap-2">
              <Link
                href={ROUTES.login}
                className="text-center text-sm px-3 py-2.5 rounded-xl border border-white/15 text-white hover:bg-white/5 font-medium"
              >
                সাইন ইন
              </Link>
              <Link
                href={ROUTES.register}
                className="text-center text-sm px-3 py-2.5 rounded-xl bg-gradient-to-br from-primary to-amber-600 text-primary-foreground font-semibold shadow-md shadow-amber-500/30"
              >
                নিবন্ধন
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const Header = SiteHeader
