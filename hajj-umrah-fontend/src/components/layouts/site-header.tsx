'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Phone, Mail, MapPin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/common/logo'
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
        scrolled
          ? 'bg-background/85 backdrop-blur-xl border-b border-border shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]'
          : 'bg-transparent',
      )}
    >
      <TopBar scrolled={scrolled} />

      <nav
        className={cn(
          'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300',
          scrolled ? 'h-[68px]' : 'h-20',
        )}
      >
        <HeaderLogo scrolled={scrolled} />
        <DesktopNav scrolled={scrolled} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} />
        <HeaderActions scrolled={scrolled} open={open} onToggle={() => setOpen(o => !o)} />
      </nav>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </motion.header>
  )
}

function TopBar({ scrolled }: { scrolled: boolean }) {
  return (
    <div
      className={cn(
        'hidden md:block overflow-hidden transition-all duration-500',
        scrolled
          ? 'max-h-0 opacity-0'
          : 'max-h-12 opacity-100 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white',
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-5">
          <a
            className="inline-flex items-center gap-1.5 text-white/85 hover:text-amber-300 transition-colors"
            href={`tel:${SITE.contact.phoneHref}`}
          >
            <Phone className="w-3 h-3" /> {SITE.contact.phone}
          </a>
          <a
            className="inline-flex items-center gap-1.5 text-white/85 hover:text-amber-300 transition-colors"
            href={`mailto:${SITE.contact.email}`}
          >
            <Mail className="w-3 h-3" /> {SITE.contact.email}
          </a>
          <span className="inline-flex items-center gap-1.5 text-white/65">
            <MapPin className="w-3 h-3" /> 24/7 dedicated pilgrim support
          </span>
        </div>
        <div className="flex items-center gap-4 text-white/85">
          <Link href={ROUTES.login} className="hover:text-amber-300 transition-colors">
            Sign In
          </Link>
          <span className="text-white/25">|</span>
          <Link href={ROUTES.admin.root} className="hover:text-amber-300 transition-colors">
            Admin
          </Link>
          <Link href={ROUTES.pilgrim.root} className="hover:text-amber-300 transition-colors">
            Pilgrim Portal
          </Link>
        </div>
      </div>
    </div>
  )
}

function HeaderLogo({ scrolled }: { scrolled: boolean }) {
  return (
    <Link href={ROUTES.home} className="relative flex items-center group" aria-label={SITE.name}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 320, damping: 18 }}
        className="relative"
      >
        {scrolled ? (
          <Logo href={null} showText={false} size="md" />
        ) : (
          <span className="inline-flex flex-col leading-none text-white drop-shadow-md">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-white to-amber-200 bg-clip-text text-transparent">
              Kaabar Pothe
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/75 mt-1">
              Hajj &amp; Umrah
            </span>
          </span>
        )}
        <span
          className={cn(
            'pointer-events-none absolute -inset-2 rounded-3xl blur-2xl -z-10 transition-opacity duration-500',
            scrolled ? 'opacity-0' : 'bg-white/25 opacity-100',
          )}
        />
        <span className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-tr from-primary/0 via-amber-400/0 to-primary/0 group-hover:from-primary/20 group-hover:to-amber-400/30 blur-xl transition-opacity duration-500" />
      </motion.div>
    </Link>
  )
}

function DesktopNav({
  scrolled,
  activeDropdown,
  setActiveDropdown,
}: {
  scrolled: boolean
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
                className={cn(
                  'relative inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-all',
                  scrolled
                    ? 'text-foreground/75 hover:text-foreground hover:bg-muted'
                    : 'text-white/90 hover:text-white hover:bg-white/10 drop-shadow',
                )}
              >
                {item.label}
                <ChevronDown
                  className={cn('w-3.5 h-3.5 transition-transform duration-200', active && 'rotate-180')}
                />
              </button>
            ) : (
              <Link
                href={item.href!}
                className={cn(
                  'block px-4 py-2 text-sm font-medium rounded-full transition-all',
                  scrolled
                    ? 'text-foreground/75 hover:text-foreground hover:bg-muted'
                    : 'text-white/90 hover:text-white hover:bg-white/10 drop-shadow',
                )}
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
                  <div className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl p-2 shadow-2xl shadow-black/10 ring-1 ring-black/5">
                    {item.children.map(child => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block p-3 hover:bg-muted rounded-xl transition-colors group/c"
                      >
                        <p className="font-semibold text-sm text-foreground group-hover/c:text-primary transition-colors">
                          {child.label}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{child.desc}</p>
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
  scrolled,
  open,
  onToggle,
}: {
  scrolled: boolean
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Link
        href={ROUTES.login}
        className={cn(
          'hidden sm:inline-flex px-4 py-2 text-sm font-medium rounded-full transition-colors',
          scrolled
            ? 'text-foreground/80 hover:text-foreground hover:bg-muted'
            : 'text-white/90 hover:text-white hover:bg-white/10',
        )}
      >
        Sign in
      </Link>
      <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
        <Link
          href={ROUTES.packages.hajj}
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-primary via-amber-500 to-orange-500 text-primary-foreground rounded-full text-sm font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
        >
          Book Now
        </Link>
      </motion.div>
      <button
        aria-label="Toggle menu"
        className={cn(
          'lg:hidden p-2 rounded-xl transition-colors',
          scrolled ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-white/10',
        )}
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
          className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border overflow-hidden"
        >
          <div className="px-4 py-3 space-y-1">
            {flat.map(item => (
              <Link
                key={item.href}
                href={item.href!}
                onClick={onClose}
                className="block px-4 py-3 text-foreground hover:bg-muted rounded-xl transition-colors"
              >
                <p className="font-medium">{item.label}</p>
                {item.parent && (
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
                    {item.parent}
                  </p>
                )}
              </Link>
            ))}
            <div className="border-t border-border my-2 pt-3 grid grid-cols-2 gap-2">
              <Link
                href={ROUTES.login}
                className="text-center text-sm px-3 py-2.5 rounded-xl border border-border hover:bg-muted font-medium"
              >
                Sign In
              </Link>
              <Link
                href={ROUTES.register}
                className="text-center text-sm px-3 py-2.5 rounded-xl bg-gradient-to-br from-primary to-amber-600 text-primary-foreground font-semibold shadow-md shadow-primary/20"
              >
                Register
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const Header = SiteHeader
