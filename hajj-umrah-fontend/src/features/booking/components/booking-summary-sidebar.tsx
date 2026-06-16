'use client'

import { Plane, Hotel, Bus, Package as PackageIcon, X, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/utils/format'
import { useCartStore, cartTotals } from '@/redux/cart'
import type { CartItem } from '@/redux/cart'

const kindIcon = {
  package: PackageIcon,
  flight: Plane,
  hotel: Hotel,
  transport: Bus,
} as const

export function BookingSummarySidebar({ editable = true, cta }: { editable?: boolean; cta?: React.ReactNode }) {
  const items = useCartStore(s => s.items)
  const removeItem = useCartStore(s => s.removeItem)
  const totals = cartTotals(items)

  return (
    <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
        <h3 className="font-bold text-foreground mb-4 text-base">বুকিং সারাংশ</h3>

        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">আপনার কার্ট খালি। শুরু করতে ফ্লাইট, হোটেল, পরিবহন বা একটি প্যাকেজ যুক্ত করুন।</p>
        ) : (
          <div className="space-y-3 mb-4">
            {items.map(item => <Line key={item.id} item={item} editable={editable} onRemove={removeItem} />)}
          </div>
        )}

        {items.length > 0 && (
          <>
            <div className="space-y-1.5 text-sm pt-4 border-t border-border">
              <Row label="উপ-মোট" value={formatCurrency(totals.subtotal)} />
              {totals.taxes > 0 && <Row label="কর" value={formatCurrency(totals.taxes)} />}
              <Row label="সার্ভিস ফি" value={formatCurrency(totals.serviceFee)} />
            </div>

            <div className="flex items-end justify-between pt-4 mt-4 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">সর্বমোট</p>
                <p className="text-3xl font-bold text-foreground leading-none mt-1">{formatCurrency(totals.total)}</p>
              </div>
              <Badge variant="success">{items.length}টি আইটেম</Badge>
            </div>
          </>
        )}

        {cta && <div className="mt-5">{cta}</div>}

        <p className="text-[11px] text-muted-foreground text-center mt-3 inline-flex items-center gap-1.5 justify-center w-full">
          <ShieldCheck className="w-3 h-3" /> নিরাপদ চেকআউট · এই ডেমোতে আপনার কাছ থেকে চার্জ নেওয়া হবে না
        </p>
      </div>
    </aside>
  )
}

function Line({ item, editable, onRemove }: { item: CartItem; editable: boolean; onRemove: (id: string) => void }) {
  const Icon = kindIcon[item.kind]
  const lineTotal = item.unitPrice * item.qty
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border p-3">
      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
        {item.image && item.image.startsWith('/') ? (
          <Image src={item.image} alt={item.title} fill sizes="48px" className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">
          <Icon className="w-3 h-3" /> {item.kind}
        </div>
        <p className="text-sm font-semibold text-foreground truncate">{item.title}</p>
        <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[11px] text-muted-foreground">{item.qty > 1 ? `${item.qty} × ${formatCurrency(item.unitPrice)}` : ''}</span>
          <span className="text-sm font-bold text-foreground">{formatCurrency(lineTotal)}</span>
        </div>
      </div>
      {editable && (
        <button onClick={() => onRemove(item.id)} className="p-1 text-muted-foreground hover:text-rose-500 -mr-1" title="সরান">
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <span>{label}</span>
      <span className="text-foreground font-medium">{value}</span>
    </div>
  )
}
