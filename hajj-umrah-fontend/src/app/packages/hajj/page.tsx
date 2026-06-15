import type { Metadata } from 'next'
import { PageShell, PageHero } from '@/components/layouts/page-shell'
import { PackageListing } from '@/features/packages/components/package-listing'
import { getPackagesByType } from '@/data/packages'

export const metadata: Metadata = {
  title: 'হজ্জ প্যাকেজ ২০২৬ | সাকিনাহ ট্রাভেলস',
  description: '২০২৬ সালের জন্য ইকোনমি, স্ট্যান্ডার্ড, প্রিমিয়াম এবং ভিআইপি হজ্জ প্যাকেজ ব্রাউজ করুন। আলেম পরিচালিত গ্রুপ, ৫-তারকা হোটেল, সৌদি মন্ত্রণালয় অনুমোদিত।',
}

export default function HajjPackagesPage() {
  const packages = getPackagesByType('hajj')
  return (
    <PageShell>
      <PageHero
        eyebrow="হজ্জ ২০২৬"
        title="সম্পূর্ণ হজ্জ প্যাকেজ, চারটি স্তর, একটি পবিত্র লক্ষ্য।"
        description="ইকোনমি কোয়াড রুম থেকে শুরু করে ব্যক্তিগত আলেমসহ ভিআইপি ৫-তারকা স্যুট পর্যন্ত। প্রতিটি প্যাকেজ সৌদি মন্ত্রণালয় অনুমোদিত এবং সম্পূর্ণ অন্তর্ভুক্ত।"
      />
      <PackageListing packages={packages} type="hajj" />
    </PageShell>
  )
}
