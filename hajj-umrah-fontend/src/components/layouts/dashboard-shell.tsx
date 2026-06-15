'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentType } from 'react'
import { Menu, X, Bell, Search, ChevronDown, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { LOGO_ALT, LOGO_SRC } from '@/constants'

export interface NavGroup {
  label: string
  items: { label: string; href: string; Icon: ComponentType<{ className?: string }>; badge?: string | number }[]
}

interface Props {
  title: string
  subtitle: string
  accent: string
  navGroups: NavGroup[]
  userName: string
  userRole: string
  userAvatar: string
  children: React.ReactNode
}

export function DashboardShell({ title, subtitle, accent, navGroups, userName, userRole, userAvatar, children }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardSidebar
        title={title}
        subtitle={subtitle}
        accent={accent}
        navGroups={navGroups}
        userName={userName}
        userRole={userRole}
        userAvatar={userAvatar}
        open={open}
        onNavigate={() => setOpen(false)}
      />

      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/40 z-30 lg:hidden" />}

      <div className="lg:ml-72">
        <DashboardTopbar
          open={open}
          onToggleMenu={() => setOpen(o => !o)}
          userName={userName}
          userAvatar={userAvatar}
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="p-4 sm:p-6 lg:p-8"
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}

function DashboardSidebar({
  title,
  subtitle,
  accent,
  navGroups,
  userName,
  userRole,
  userAvatar,
  open,
  onNavigate,
}: {
  title: string
  subtitle: string
  accent: string
  navGroups: NavGroup[]
  userName: string
  userRole: string
  userAvatar: string
  open: boolean
  onNavigate: () => void
}) {
  return (
    <aside
      className={cn(
        'fixed top-0 left-0 bottom-0 w-72 bg-card border-r border-border z-40 transition-transform lg:translate-x-0 overflow-y-auto',
        open ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      <SidebarBrand title={title} subtitle={subtitle} accent={accent} />
      <SidebarNav navGroups={navGroups} onNavigate={onNavigate} />
      <SidebarUser userName={userName} userRole={userRole} userAvatar={userAvatar} />
    </aside>
  )
}

function SidebarBrand({ title, subtitle }: { title: string; subtitle: string; accent: string }) {
  return (
    <Link href="/" className="flex flex-col gap-1 px-6 py-3 h-auto min-h-16 border-b border-border">
      <div className="relative h-9 aspect-[1019/388] self-start">
        <Image src={LOGO_SRC} alt={LOGO_ALT} fill sizes="180px" className="object-contain object-left" priority />
      </div>
      <div className="leading-tight">
        <p className="font-bold text-foreground text-xs">{title}</p>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{subtitle}</p>
      </div>
    </Link>
  )
}

function SidebarNav({ navGroups, onNavigate }: { navGroups: NavGroup[]; onNavigate: () => void }) {
  const pathname = usePathname()
  const rootHref = navGroups[0]?.items[0]?.href
  return (
    <nav className="p-4 space-y-6">
      {navGroups.map(g => (
        <div key={g.label}>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground px-3 mb-2">{g.label}</p>
          <ul className="space-y-0.5">
            {g.items.map(({ label, href, Icon, badge }) => {
              const active = pathname === href || (href !== rootHref && pathname.startsWith(href))
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                      active ? 'bg-primary text-primary-foreground shadow' : 'text-foreground/70 hover:bg-muted hover:text-foreground',
                    )}
                  >
                    <Icon className="w-4 h-4" /> {label}
                    {badge && <span className={cn('ml-auto text-[10px] px-1.5 py-0.5 rounded-full font-bold', active ? 'bg-white/20' : 'bg-primary/15 text-primary')}>{badge}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

function SidebarUser({ userName, userRole, userAvatar }: { userName: string; userRole: string; userAvatar: string }) {
  const initials = userName.split(' ').map(n => n[0]).slice(0, 2).join('')
  return (
    <div className="p-4 mt-auto border-t border-border bg-muted/20">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${userAvatar} flex items-center justify-center text-white font-bold shadow`}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-foreground truncate">{userName}</p>
          <p className="text-xs text-muted-foreground truncate">{userRole}</p>
        </div>
      </div>
      <Link href="/" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
        <LogOut className="w-3.5 h-3.5" /> Sign out
      </Link>
    </div>
  )
}

function DashboardTopbar({
  open,
  onToggleMenu,
  userName,
  userAvatar,
}: {
  open: boolean
  onToggleMenu: () => void
  userName: string
  userAvatar: string
}) {
  const initials = userName.split(' ').map(n => n[0]).slice(0, 2).join('')
  return (
    <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border h-16 flex items-center gap-4 px-4 sm:px-6">
      <button className="lg:hidden p-2 hover:bg-muted rounded-lg" onClick={onToggleMenu}>
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search bookings, pilgrims, packages…"
          className="w-full h-9 pl-10 pr-3 rounded-lg bg-muted/60 border border-transparent focus:border-primary focus:bg-card focus:outline-none text-sm"
        />
      </div>

      <button className="relative p-2 hover:bg-muted rounded-lg">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
      </button>
      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 hover:bg-muted rounded-lg cursor-pointer">
        <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${userAvatar} text-white font-bold text-xs flex items-center justify-center`}>
          {initials}
        </div>
        <span className="text-sm font-medium hidden md:inline">{userName.split(' ')[0]}</span>
        <ChevronDown className="w-3 h-3 text-muted-foreground" />
      </div>
    </header>
  )
}

export function PageTitle({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
    >
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{title}</h1>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      {action}
    </motion.div>
  )
}
