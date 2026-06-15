import { Clock, Plane, Calendar, Star, Phone, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/utils/format'
import { SITE } from '@/constants'
import type { Package } from '@/data/packages'
import { PackageStatCard } from './stat-card'
import { BookPackageButton } from './book-package-button'

export function PackageSummary({ pkg }: { pkg: Package }) {
  const discounted = pkg.price - pkg.discount
  return (
    <div className="lg:col-span-5">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <Badge variant="outline" className="capitalize">{pkg.tier}</Badge>
        <Badge variant={pkg.availability === 'limited' ? 'warning' : pkg.availability === 'soldout' ? 'danger' : 'success'}>
          {pkg.availability === 'available' && '✓ উপলব্ধ'}
          {pkg.availability === 'limited' && `মাত্র ${pkg.seatsLeft}টি সিট বাকি`}
          {pkg.availability === 'soldout' && 'বিক্রি শেষ'}
        </Badge>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 text-balance">{pkg.name}</h1>
      <p className="text-base text-muted-foreground mb-5 leading-relaxed">{pkg.shortDescription}</p>

      <div className="flex items-center gap-4 mb-6 text-sm">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="font-bold text-foreground">{pkg.rating}</span>
          <span className="text-muted-foreground">({pkg.reviewsCount}টি রিভিউ)</span>
        </div>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground">{pkg.bookingsCount}টি বুক হয়েছে</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <PackageStatCard icon={Clock} label="সময়কাল" value={`${pkg.duration} দিন`} />
        <PackageStatCard icon={Calendar} label="প্রস্থান" value={formatDate(pkg.departureDate, { month: 'short', day: 'numeric' })} />
        <PackageStatCard icon={Plane} label="ফ্লাইট" value={pkg.flight.class} />
        <PackageStatCard icon={Users} label="গ্রুপের আকার" value={pkg.groupSize} />
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 mb-4">
        <div className="flex items-end justify-between mb-4">
          <div>
            {pkg.discount > 0 && (
              <p className="text-sm text-muted-foreground line-through">{formatCurrency(pkg.price)}</p>
            )}
            <p className="text-4xl font-bold text-foreground leading-none">{formatCurrency(discounted)}</p>
            <p className="text-xs text-muted-foreground mt-1">হাজী প্রতি · সব অন্তর্ভুক্ত</p>
          </div>
          {pkg.discount > 0 && <Badge variant="danger">সাশ্রয় {formatCurrency(pkg.discount)}</Badge>}
        </div>
        <BookPackageButton pkg={pkg} />
        <p className="text-center text-xs text-muted-foreground mt-3">২৫% জামানত প্রয়োজন · ৬০+ দিনে ফ্রি বাতিল</p>
      </div>

      <a href={`tel:${SITE.contact.phoneHref}`} className="flex items-center justify-center gap-2 py-3 border border-border rounded-xl text-sm text-foreground/70 hover:text-foreground hover:border-primary transition-all">
        <Phone className="w-4 h-4" /> আমাদের টিমের সাথে কথা বলুন
      </a>
    </div>
  )
}
