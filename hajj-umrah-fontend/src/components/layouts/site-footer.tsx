'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone, MapPin, Share2, Camera, Send, Play, Users, Shield, Award, Clock } from 'lucide-react'
import { FOOTER_SECTIONS, LOGO_ALT, LOGO_SRC, SITE } from '@/constants'

const socials = [
  { Icon: Share2, href: '#', label: 'Facebook' },
  { Icon: Camera, href: '#', label: 'Camera' },
  { Icon: Send, href: '#', label: 'Twitter / X' },
  { Icon: Play, href: '#', label: 'YouTube' },
  { Icon: Users, href: '#', label: 'LinkedIn' },
] as const

const trust = [
  { Icon: Shield, label: 'সৌদি মন্ত্রণালয় লাইসেন্সপ্রাপ্ত' },
  { Icon: Award, label: 'আলেম পরিচালিত গ্রুপ' },
  { Icon: Clock, label: '২৪/৭ হাজী সহায়তা' },
] as const

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative bg-foreground text-background overflow-hidden mt-24">
      <FooterPattern />
      <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <TrustBadges />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          <FooterBrand />
          {FOOTER_SECTIONS.map(s => (
            <FooterSection key={s.title} title={s.title} links={s.links} />
          ))}
        </div>

        <Newsletter />
        <FooterBottom year={year} />
      </div>
    </footer>
  )
}

function FooterPattern() {
  return (
    <div className="absolute inset-0 opacity-[0.04]">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <pattern id="ftr-p" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="white" strokeWidth="0.5" />
        </pattern>
        <rect width="100" height="100" fill="url(#ftr-p)" />
      </svg>
    </div>
  )
}

function TrustBadges() {
  return (
    <div className="relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {trust.map(({ Icon, label }) => (
          <div key={label} className="flex items-center gap-3 text-sm">
            <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <span className="font-medium opacity-90">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function FooterBrand() {
  return (
    <div className="lg:col-span-2">
      <Link href="/" className="inline-flex items-center mb-5">
        <div className="relative h-12 aspect-[1019/388] rounded-lg bg-white p-1.5 ring-1 ring-white/20">
          <Image src={LOGO_SRC} alt={LOGO_ALT} fill sizes="220px" className="object-contain" />
        </div>
      </Link>
      <p className="text-[10px] uppercase tracking-[0.2em] opacity-70 mb-4">{SITE.tagline}</p>
      <p className="text-sm opacity-70 mb-6 leading-relaxed">
        বিশ্বব্যাপী মুসলিমদের আস্থা, স্বচ্ছতা ও আধ্যাত্মিক মনোনিবেশসহ হজ্জ ও উমরাহ পালনে ক্ষমতায়ন।
        সৌদি হজ্জ ও উমরাহ মন্ত্রণালয় কর্তৃক লাইসেন্সপ্রাপ্ত।
      </p>

      <div className="space-y-3 text-sm">
        <a href={`mailto:${SITE.contact.email}`} className="flex items-center gap-3 opacity-70 hover:opacity-100 hover:text-primary transition-all">
          <Mail className="w-4 h-4" /> {SITE.contact.email}
        </a>
        <a href={`tel:${SITE.contact.phoneHref}`} className="flex items-center gap-3 opacity-70 hover:opacity-100 hover:text-primary transition-all">
          <Phone className="w-4 h-4" /> {SITE.contact.phone}
        </a>
        <div className="flex items-start gap-3 opacity-70">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{SITE.contact.address.line1}<br />{SITE.contact.address.line2}</span>
        </div>
      </div>
    </div>
  )
}

function FooterSection({ title, links }: { title: string; links: ReadonlyArray<{ label: string; href: string }> }) {
  return (
    <div>
      <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">{title}</h4>
      <ul className="space-y-2.5">
        {links.map(l => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Newsletter() {
  return (
    <div className="mt-14 pt-10 border-t border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div>
        <h3 className="text-xl font-bold mb-2">আপনার পবিত্র যাত্রার জন্য মাসিক পরামর্শ পান</h3>
        <p className="text-sm opacity-70">হজ্জ গাইড, মৌসুমি প্যাকেজ অ্যালার্ট ও শিক্ষামূলক কনটেন্ট।</p>
      </div>
      <form className="flex gap-2">
        <input type="email" placeholder="আপনার.ইমেইল@example.com" className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
        <button type="submit" className="px-5 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
          সাবস্ক্রাইব <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}

function FooterBottom({ year }: { year: number }) {
  return (
    <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
      <p className="text-xs opacity-60">© {year} {SITE.name} — {SITE.tagline}। সর্বস্বত্ব সংরক্ষিত।</p>
      <div className="flex items-center gap-2">
        {socials.map(({ Icon, href, label }) => (
          <a key={label} href={href} aria-label={label} className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary text-white/70 hover:text-white flex items-center justify-center transition-all">
            <Icon className="w-4 h-4" />
          </a>
        ))}
      </div>
    </div>
  )
}

export const Footer = SiteFooter
