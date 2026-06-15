import type { Metadata } from 'next'
import { PageShell, PageHero } from '@/components/layouts/page-shell'
import { PackageListing } from '@/features/packages/components/package-listing'
import { getPackagesByType } from '@/data/packages'

export const metadata: Metadata = {
  title: 'উমরাহ প্যাকেজ | সাকিনাহ ট্রাভেলস',
  description: 'সারা বছরব্যাপী বাজেট, ইকোনমি, প্রিমিয়াম এবং লাক্সারি উমরাহ প্যাকেজ। আলেম পরিচালিত গ্রুপ, হারামের কাছের হোটেল, সৌদি মন্ত্রণালয় অনুমোদিত।',
}

export default function UmrahPackagesPage() {
  const packages = getPackagesByType('umrah')
  return (
    <PageShell>
      <PageHero
        eyebrow="সারা বছরের উমরাহ"
        title="প্রতিটি বাজেট ও মৌসুমের জন্য উমরাহ প্যাকেজ।"
        description="সাশ্রয়ী বাজেট উমরাহ থেকে শুরু করে অতি-লাক্সারি মার্সিডিজ ট্রান্সফারযুক্ত স্যুট পর্যন্ত। বছরের যেকোনো মাসে উমরাহ পালন করুন।"
      />
      <PackageListing packages={packages} type="umrah" />
    </PageShell>
  )
}
