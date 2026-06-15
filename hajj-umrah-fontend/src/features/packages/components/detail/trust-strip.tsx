import Link from 'next/link'
import type { Package } from '@/data/packages'

export function PackageTrustStrip({ pkg }: { pkg: Package }) {
  return (
    <div className="bg-gradient-to-r from-foreground to-foreground/90 text-background rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <h3 className="text-2xl font-bold mb-2">{pkg.name} বুক করতে প্রস্তুত?</h3>
        <p className="opacity-70 text-sm">২৫% জামানত আপনার সিট নিশ্চিত করে। প্রস্থানের ৬০ দিন পূর্ব পর্যন্ত পূর্ণ বাতিল।</p>
      </div>
      <div className="flex gap-3">
        <Link href="/contact" className="px-5 py-3 border border-white/30 rounded-xl font-semibold hover:bg-white/10 transition-colors">প্রশ্ন করুন</Link>
        <Link href="#" className="px-5 py-3 bg-gradient-to-r from-primary to-amber-500 text-primary-foreground rounded-xl font-bold shadow-lg">এই প্যাকেজ বুক করুন</Link>
      </div>
    </div>
  )
}
