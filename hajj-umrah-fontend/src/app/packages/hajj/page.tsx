import type { Metadata } from 'next'
import { PageShell, PageHero } from '@/components/layouts/page-shell'
import { PackageListing } from '@/features/packages/components/package-listing'
import { getPackagesByType } from '@/data/packages'
import { BreadcrumbJsonLd } from '@/components/common'
import { SITE } from '@/constants/site'

export const metadata: Metadata = {
  title: 'হজ্জ প্যাকেজ ২০২৬',
  description: '২০২৬ সালের জন্য ইকোনমি, স্ট্যান্ডার্ড, প্রিমিয়াম এবং ভিআইপি হজ্জ প্যাকেজ ব্রাউজ করুন। আলেম পরিচালিত গ্রুপ, ৫-তারকা হোটেল, সৌদি মন্ত্রণালয় অনুমোদিত।',
  keywords: ['হজ্জ প্যাকেজ ২০২৬', 'হজ্জ এজেন্সি বাংলাদেশ', 'Hajj package Bangladesh', 'হজ্জ মূল্য', 'হজ্জ ভিআইপি প্যাকেজ'],
  alternates: { canonical: '/packages/hajj' },
  openGraph: {
    title: 'হজ্জ প্যাকেজ ২০২৬ | কাবার পথে',
    description: 'ইকোনমি থেকে ভিআইপি — সৌদি মন্ত্রণালয় অনুমোদিত হজ্জ প্যাকেজ।',
    url: '/packages/hajj',
  },
}

const hajjFaqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'হজ্জ প্যাকেজে কী কী অন্তর্ভুক্ত?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'প্রতিটি হজ্জ প্যাকেজে রাউন্ড-ট্রিপ ফ্লাইট, হজ্জ ভিসা ও ই-তাসরীহ, মক্কা ও মদিনায় হোটেল, মিনা-আরাফাহ-মুজদালিফায় তাঁবু, খাবার, যিয়ারত ট্যুর, বিমানবন্দর ট্রান্সফার এবং আলেম গাইডেন্স অন্তর্ভুক্ত।',
      },
    },
    {
      '@type': 'Question',
      name: 'হজ্জ ২০২৬ কখন?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'হজ্জ ১৪৪৭ হিজরি প্রায় জুন ২০২৬ সালে অনুষ্ঠিত হবে। ৮ থেকে ১৩ যিলহজ্জ। চাঁদ দেখার ভিত্তিতে সৌদি কর্তৃপক্ষ চূড়ান্ত তারিখ ঘোষণা করবে।',
      },
    },
    {
      '@type': 'Question',
      name: 'হজ্জ প্যাকেজের স্তরগুলোর পার্থক্য কী?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ইকোনমি: ৪-জন রুম, হারাম থেকে ৭০০-৯০০ মিটার। স্ট্যান্ডার্ড: ৩-জন রুম, ৪০০-৫০০ মিটার। প্রিমিয়াম: ২-জন রুম, ১০০-২০০ মিটার। ভিআইপি: একক/ডবল রুম, হারাম-সংলগ্ন, ব্যক্তিগত আলেম।',
      },
    },
  ],
}

const hajjServiceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Hajj Pilgrimage',
  name: 'হজ্জ প্যাকেজ ২০২৬',
  url: `${SITE.url}/packages/hajj`,
  provider: { '@type': 'TravelAgency', name: SITE.name, url: SITE.url },
  areaServed: [
    { '@type': 'Country', name: 'Bangladesh' },
    { '@type': 'Country', name: 'Saudi Arabia' },
  ],
  category: 'Religious Tourism',
  audience: { '@type': 'PeopleAudience', name: 'Muslim Pilgrims' },
}

export default function HajjPackagesPage() {
  const packages = getPackagesByType('hajj')
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ label: 'হজ্জ প্যাকেজ' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hajjServiceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hajjFaqLd) }} />
      <PageHero
        eyebrow="হজ্জ ২০২৬"
        title="সম্পূর্ণ হজ্জ প্যাকেজ, চারটি স্তর, একটি পবিত্র লক্ষ্য।"
        description="ইকোনমি কোয়াড রুম থেকে শুরু করে ব্যক্তিগত আলেমসহ ভিআইপি ৫-তারকা স্যুট পর্যন্ত। প্রতিটি প্যাকেজ সৌদি মন্ত্রণালয় অনুমোদিত এবং সম্পূর্ণ অন্তর্ভুক্ত।"
      />
      <PackageListing packages={packages} type="hajj" />
    </PageShell>
  )
}
