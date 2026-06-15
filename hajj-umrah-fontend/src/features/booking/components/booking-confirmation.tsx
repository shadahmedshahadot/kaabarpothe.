'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Download, Mail, Plane, Hotel as HotelIcon, Bus, Package as PackageIcon, ArrowRight, ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/utils/format'
import { useCartStore, type SavedBooking } from '@/store/cart'
import { ROUTES } from '@/constants'

const kindIcon = {
  package: PackageIcon,
  flight: Plane,
  hotel: HotelIcon,
  transport: Bus,
} as const

const methodLabel = {
  bkash: 'bKash',
  nagad: 'Nagad',
  sslcommerz: 'SSLCommerz',
  'bank-transfer': 'ব্যাংক ট্রান্সফার',
} as const

export function BookingConfirmation({ code }: { code: string }) {
  const [hydrated, setHydrated] = useState(false)
  const booking = useCartStore(s => s.savedBookings.find(b => b.code === code))

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) {
    return <div className="py-24 text-center text-muted-foreground">লোড হচ্ছে…</div>
  }

  if (!booking) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">বুকিং খুঁজে পাওয়া যায়নি</h1>
          <p className="text-muted-foreground mb-6">
            এই ব্রাউজারে <span className="font-mono font-bold">{code}</span> কোড দিয়ে কোনো বুকিং খুঁজে পাওয়া যায়নি।
          </p>
          <Link href={ROUTES.home} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90">
            হোমে ফিরে যান <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">বুকিং নিশ্চিত করা হয়েছে</h1>
          <p className="text-muted-foreground">
            রেফারেন্স <span className="font-mono font-bold text-foreground">{booking.code}</span> · করা হয়েছে {formatDate(booking.createdAt)}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <Card title="নির্বাচিত সেবাসমূহ">
              <div className="space-y-3">
                {booking.items.map(it => {
                  const Icon = kindIcon[it.kind]
                  return (
                    <div key={it.id} className="flex items-center gap-4 rounded-2xl border border-border p-4">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary inline-flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <Badge variant="outline" className="capitalize">{it.kind}</Badge>
                          <p className="text-sm font-semibold text-foreground truncate">{it.title}</p>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{it.subtitle}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        {it.qty > 1 && <p className="text-[10px] text-muted-foreground">{it.qty} × {formatCurrency(it.unitPrice)}</p>}
                        <p className="font-bold text-foreground">{formatCurrency(it.unitPrice * it.qty)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            <Card title="ভ্রমণকারী">
              <div className="space-y-2">
                {booking.travelers.map((t, i) => (
                  <div key={t.id} className="rounded-xl border border-border p-3 text-sm flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="font-semibold text-foreground">{i + 1}. {t.fullName}</span>
                    <span className="text-xs text-muted-foreground">পাসপোর্ট {t.passportNumber}</span>
                    <span className="text-xs text-muted-foreground capitalize">{t.gender}</span>
                    {t.dateOfBirth && <span className="text-xs text-muted-foreground">জন্ম তারিখ {t.dateOfBirth}</span>}
                  </div>
                ))}
              </div>
            </Card>

            <Card title="যোগাযোগ">
              <div className="grid sm:grid-cols-3 gap-2 text-sm text-foreground/80">
                <Field label="নাম" value={booking.contact.name} />
                <Field label="ইমেইল" value={booking.contact.email} />
                <Field label="ফোন" value={booking.contact.phone} />
              </div>
            </Card>
          </div>

          <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <Card title="পেমেন্ট">
              <div className="space-y-2 text-sm">
                <Line label="পদ্ধতি" value={methodLabel[booking.paymentMethod]} />
                <Line label="পরিকল্পনা" value={<span className="capitalize">{booking.paymentPlan.replace('-', ' ')}</span>} />
                <Line label="স্ট্যাটাস" value={<Badge variant="success">পরিশোধিত</Badge>} />
              </div>
              <div className="border-t border-border mt-4 pt-4 space-y-1.5 text-sm">
                <Line label="উপ-মোট" value={formatCurrency(booking.subtotal)} />
                {booking.taxes > 0 && <Line label="কর" value={formatCurrency(booking.taxes)} />}
                <Line label="সার্ভিস ফি" value={formatCurrency(booking.serviceFee)} />
              </div>
              <div className="flex items-end justify-between pt-4 mt-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">সর্বমোট</p>
                  <p className="text-3xl font-bold text-foreground leading-none mt-1">{formatCurrency(booking.total)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">পরিশোধিত</p>
                  <p className="text-lg font-bold text-emerald-600">{formatCurrency(booking.paidAmount)}</p>
                </div>
              </div>
            </Card>

            <div className="space-y-2">
              <button
                onClick={() => window.print()}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-foreground text-background rounded-xl text-sm font-semibold hover:bg-primary transition-colors"
              >
                <Download className="w-4 h-4" /> ইনভয়েস ডাউনলোড করুন (PDF)
              </button>
              <a
                href={`mailto:${booking.contact.email}?subject=Booking%20Confirmation%20${booking.code}`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors"
              >
                <Mail className="w-4 h-4" /> ইমেইল কনফার্মেশন
              </a>
              <Link href={ROUTES.pilgrim.bookings} className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">
                <ArrowRight className="w-4 h-4" /> আমার বুকিংয়ে যান
              </Link>
            </div>

            <p className="text-[11px] text-muted-foreground text-center inline-flex items-center gap-1.5 justify-center w-full">
              <ShieldCheck className="w-3 h-3" /> ডেমোর জন্য এই ব্রাউজারে লোকালি সংরক্ষিত
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-3xl p-6">
      <h2 className="font-bold text-foreground text-lg mb-4">{title}</h2>
      {children}
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-muted-foreground text-xs uppercase tracking-wider block">{label}</span>
      <span className="text-foreground font-medium">{value || '—'}</span>
    </div>
  )
}

function Line({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground font-medium">{value}</span>
    </div>
  )
}
