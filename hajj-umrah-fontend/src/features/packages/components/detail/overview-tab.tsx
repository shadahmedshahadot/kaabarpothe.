import { Plane, Utensils, Bus, CheckCircle2, ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Package } from '@/data/packages'
import { InfoBox } from './info-box'

export function OverviewTab({ pkg }: { pkg: Package }) {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">এই প্যাকেজ সম্পর্কে</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">{pkg.description}</p>

        <h3 className="font-bold text-foreground mb-3">হাইলাইট</h3>
        <div className="grid grid-cols-2 gap-2">
          {pkg.highlights.map(h => (
            <div key={h} className="flex items-center gap-2 text-sm text-foreground/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> {h}
            </div>
          ))}
        </div>

        <h3 className="font-bold text-foreground mt-8 mb-3">অন্তর্ভুক্ত যিয়ারত</h3>
        <div className="flex flex-wrap gap-2">
          {pkg.ziyarah.map(z => (
            <Badge key={z} variant="outline">{z}</Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <InfoBox Icon={Plane} title="ফ্লাইট" lines={[pkg.flight.airline, pkg.flight.class, `${pkg.flight.departure} → ${pkg.flight.arrival}`]} />
        <InfoBox Icon={Utensils} title="খাবার" lines={[pkg.meals]} />
        <InfoBox Icon={Bus} title="পরিবহন" lines={[pkg.transport]} />
        <InfoBox Icon={ShieldCheck} title="ভিসা" lines={[pkg.visa]} />
      </div>
    </div>
  )
}
