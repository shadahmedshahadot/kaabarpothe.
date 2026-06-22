import type { Metadata } from 'next'
import { PageShell, PageHero } from '@/components/layouts/page-shell'
import { PackageListing } from '@/features/packages/components/package-listing'
import { fetchPackagesByType } from '@/lib/seo-fetch'
import { adaptPackage } from '@/redux/fetchres/package/adapter'
import { BreadcrumbJsonLd } from '@/components/common'
import { SITE } from '@/constants/site'

export const metadata: Metadata = {
  title: 'উমরাহ প্যাকেজ ২০২৬',
  description: 'সারা বছরব্যাপী বাজেট, ইকোনমি, প্রিমিয়াম এবং লাক্সারি উমরাহ প্যাকেজ। আলেম পরিচালিত গ্রুপ, হারামের কাছের হোটেল, সৌদি মন্ত্রণালয় অনুমোদিত।',
  keywords: ['উমরাহ প্যাকেজ', 'উমরাহ ২০২৬', 'Umrah package Bangladesh', 'উমরাহ এজেন্সি ঢাকা', 'রমজান উমরাহ'],
  alternates: { canonical: '/packages/umrah' },
  openGraph: {
    title: 'উমরাহ প্যাকেজ ২০২৬ | কাবার পথে',
    description: 'বাজেট থেকে লাক্সারি — সারা বছরব্যাপী উমরাহ প্যাকেজ।',
    url: '/packages/umrah',
  },
}

const umrahFaqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'উমরাহ কী?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'উমরাহ হলো একটি ছোট পবিত্র যাত্রা যা বছরের যেকোনো সময় পালন করা যায়, হজ্জের বিপরীতে যা শুধুমাত্র যিলহজ্জ মাসে হয়। উমরাহ ইহরাম, তাওয়াফ, সাঈ এবং হলক/তাকসীর অন্তর্ভুক্ত।',
      },
    },
    {
      '@type': 'Question',
      name: 'রমজানে উমরাহ পালন করলে কত সওয়াব?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'রাসূলুল্লাহ ﷺ বলেছেন: "রমজানে উমরাহ একটি হজ্জের সমান।" (বুখারি ১৭৮২)। রমজান উমরাহ বুকিং দ্রুত পূর্ণ হয় — ৮-১২ মাস আগে বুক করার সুপারিশ।',
      },
    },
    {
      '@type': 'Question',
      name: 'উমরাহ প্যাকেজের সময়কাল কত?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'সাধারণত ৭-১৪ দিন। বাজেট প্যাকেজ ৭ দিন। স্ট্যান্ডার্ড ১০ দিন। প্রিমিয়াম ও লাক্সারি ১২-১৪ দিন, ইস্তাম্বুল বা কায়রো স্টপওভার সহ।',
      },
    },
    {
      '@type': 'Question',
      name: 'উমরাহর জন্য কী কী ডকুমেন্ট লাগে?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ফেরত তারিখ থেকে ৬+ মাস বৈধ পাসপোর্ট, ২ কপি পাসপোর্ট সাইজ ছবি (সাদা ব্যাকগ্রাউন্ড), মেনিনজাইটিস ACWY টিকা সার্টিফিকেট এবং সম্পূর্ণ আবেদনপত্র।',
      },
    },
  ],
}

const umrahServiceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Umrah Pilgrimage',
  name: 'উমরাহ প্যাকেজ ২০২৬',
  url: `${SITE.url}/packages/umrah`,
  provider: { '@type': 'TravelAgency', name: SITE.name, url: SITE.url },
  areaServed: [
    { '@type': 'Country', name: 'Bangladesh' },
    { '@type': 'Country', name: 'Saudi Arabia' },
  ],
  category: 'Religious Tourism',
  audience: { '@type': 'PeopleAudience', name: 'Muslim Pilgrims' },
}

export default async function UmrahPackagesPage() {
  const dtos = await fetchPackagesByType('UMRAH')
  const packages = dtos.map(adaptPackage)
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ label: 'উমরাহ প্যাকেজ' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(umrahServiceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(umrahFaqLd) }} />
      <PageHero
        eyebrow="সারা বছরের উমরাহ"
        title="প্রতিটি বাজেট ও মৌসুমের জন্য উমরাহ প্যাকেজ।"
        description="সাশ্রয়ী বাজেট উমরাহ থেকে শুরু করে অতি-লাক্সারি মার্সিডিজ ট্রান্সফারযুক্ত স্যুট পর্যন্ত। বছরের যেকোনো মাসে উমরাহ পালন করুন।"
      />
      <PackageListing packages={packages} type="umrah" />
    </PageShell>
  )
}
