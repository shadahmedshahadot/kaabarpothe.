'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { MapPin, Clock, Users, Bus, Phone, ShieldCheck, ArrowRight, Minus, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/utils/format'
import { type Transport, TRANSPORT_TYPES } from '@/data/transports'
import { useCartStore } from '@/redux/cart'
import { ROUTES } from '@/constants'

export function TransportDetail({ transport }: { transport: Transport }) {
  const router = useRouter()
  const [qty, setQty] = useState(1)
  const addItem = useCartStore(s => s.addItem)
  const label = TRANSPORT_TYPES.find(x => x.value === transport.type)?.label ?? transport.type

  const unit = transport.price
  const total = transport.pricingUnit === 'per-vehicle' ? unit : unit * qty

  const handleAdd = () => {
    addItem({
      kind: 'transport',
      refId: transport.id,
      title: transport.name,
      subtitle: `${transport.pickupLocation} → ${transport.dropoffLocation}`,
      meta: {
        pricingUnit: transport.pricingUnit,
        vehicleType: transport.vehicleType,
        capacity: transport.capacity,
      },
      unitPrice: unit,
      qty: transport.pricingUnit === 'per-vehicle' ? 1 : qty,
      image: transport.cover,
    })
    router.push(ROUTES.booking.root)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-24">
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <Link href={ROUTES.home} className="hover:text-foreground">হোম</Link>
          <span>/</span>
          <Link href={ROUTES.transportation.root} className="hover:text-foreground">পরিবহন</Link>
          <span>/</span>
          <span className="text-foreground font-medium line-clamp-1">{transport.name}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-border"
            >
              <Image src={transport.cover} alt={transport.name} fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover" priority />
              <div className="absolute top-4 left-4 flex gap-2">
                {transport.featured && <Badge variant="default">ফিচার্ড</Badge>}
                <Badge variant="outline" className="bg-card/90">{label}</Badge>
              </div>
            </motion.div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 text-balance">{transport.name}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-foreground/70 mb-4">
                <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> {transport.travelDuration}</span>
                <span className="inline-flex items-center gap-1.5"><Users className="w-4 h-4 text-accent" /> {transport.capacity} জন যাত্রী পর্যন্ত</span>
                <span className="inline-flex items-center gap-1.5 capitalize"><Bus className="w-4 h-4 text-secondary" /> {transport.vehicleType.replace('-', ' ')}</span>
              </div>
              <p className="text-base text-foreground/80 leading-relaxed">{transport.routeDetails}</p>
            </div>

            <Section title="রুট" icon={MapPin}>
              <div className="space-y-3">
                <Row label="পিকআপ" value={transport.pickupLocation} />
                <Row label="নামানো" value={transport.dropoffLocation} />
                <Row label="সময়কাল" value={transport.travelDuration} />
              </div>
            </Section>

            <Section title="পরিষেবার আওতা" icon={MapPin}>
              <div className="flex flex-wrap gap-2">
                {transport.serviceCoverage.map(c => <Badge key={c} variant="outline">{c}</Badge>)}
              </div>
            </Section>

            <Section title="চালক ও যোগাযোগ" icon={Phone}>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <Row label="চালক" value={transport.driverName} />
                <Row label="যোগাযোগ" value={transport.driverContact} />
              </div>
            </Section>

            {transport.notes && (
              <Section title="নোট" icon={ShieldCheck}>
                <p className="text-sm text-foreground/80 leading-relaxed">{transport.notes}</p>
              </Section>
            )}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start space-y-4">
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">থেকে</p>
                <p className="text-4xl font-bold text-foreground leading-none mt-1">{formatCurrency(transport.price)}</p>
                <p className="text-xs text-muted-foreground mt-1 capitalize">{transport.pricingUnit.replace('-', ' ')}</p>
              </div>

              {transport.pricingUnit === 'per-person' && (
                <div className="flex items-center justify-between rounded-xl border border-border p-3 mb-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">যাত্রী</p>
                    <p className="text-xs text-muted-foreground">সর্বোচ্চ {transport.capacity}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQty(q => Math.max(1, q - 1))}
                      disabled={qty <= 1}
                      className="w-8 h-8 rounded-lg border border-border hover:bg-muted inline-flex items-center justify-center disabled:opacity-50"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold text-foreground w-5 text-center">{qty}</span>
                    <button
                      onClick={() => setQty(q => Math.min(transport.capacity, q + 1))}
                      disabled={qty >= transport.capacity}
                      className="w-8 h-8 rounded-lg border border-border hover:bg-muted inline-flex items-center justify-center disabled:opacity-50"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              <div className="text-xs text-muted-foreground space-y-1 mb-5 pt-4 border-t border-border">
                <div className="flex justify-between"><span>মোট</span><span className="font-bold text-foreground text-base">{formatCurrency(total)}</span></div>
              </div>

              {transport.availability === 'soldout' ? (
                <button disabled className="w-full bg-muted text-muted-foreground py-3 rounded-xl font-semibold text-sm cursor-not-allowed">
                  বর্তমানে অনুপলব্ধ
                </button>
              ) : (
                <button
                  onClick={handleAdd}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm inline-flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                >
                  বুকিং-এ যোগ করুন <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <p className="text-[11px] text-muted-foreground text-center mt-3 inline-flex items-center gap-1.5 justify-center w-full">
                <ShieldCheck className="w-3 h-3" /> এককভাবে অথবা ফ্লাইট / হোটেলের সাথে বুক করুন
              </p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-5">
              <h3 className="font-bold text-foreground mb-3 text-sm">হাজীদের বিশ্বস্ত</h3>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-2xl font-bold text-foreground">{transport.rating}</p>
                  <p className="text-xs text-muted-foreground">{transport.reviewsCount.toLocaleString()} রিভিউ</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">{transport.bookingsCount.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">পূর্ববর্তী ট্রিপ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ title, icon: Icon, children }: { title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-3xl p-6">
      <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <Icon className="w-5 h-5 text-primary" /> {title}
      </h2>
      {children}
    </div>
  )
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="text-foreground font-medium">{value}</span>
    </div>
  )
}
