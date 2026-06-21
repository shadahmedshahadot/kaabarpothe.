import type { Metadata } from 'next'
import { SITE } from '@/constants/site'
import { BreadcrumbJsonLd } from '@/components/common'

export const metadata: Metadata = {
  title: 'যোগাযোগ করুন',
  description: '২৪/৭ হাজী সহায়তা। হজ্জ বা উমরাহ প্যাকেজ, গ্রুপ বুকিং, বা ভিসা সংক্রান্ত প্রশ্নের জন্য আমাদের আলেম টিমের সাথে কথা বলুন। ফোন: +৮৮০ ১৪০১-৬৯৬৫২৫।',
  keywords: ['কাবার পথে যোগাযোগ', 'হজ্জ এজেন্সি ঢাকা', 'উমরাহ এজেন্সি যোগাযোগ', 'Hajj agency contact'],
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'যোগাযোগ করুন | কাবার পথে',
    description: 'ঢাকা, ধানমন্ডি ২৭, লেভেল ৭, শপ্তক স্কয়ার। ফোন: +৮৮০ ১৪০১-৬৯৬৫২৫।',
    url: '/contact',
  },
}

const contactLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: `${SITE.url}/contact`,
  name: 'যোগাযোগ — কাবার পথে',
  mainEntity: {
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    email: SITE.contact.email,
    telephone: SITE.contact.phoneHref,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.contact.address.street,
      addressLocality: SITE.contact.address.city,
      addressRegion: SITE.contact.address.region,
      postalCode: SITE.contact.address.postalCode,
      addressCountry: SITE.contact.address.country,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: SITE.contact.phoneHref,
        email: SITE.contact.email,
        availableLanguage: ['Bengali', 'English'],
        areaServed: 'BD',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: SITE.contact.whatsapp,
        availableLanguage: ['Bengali', 'English'],
      },
    ],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: 'যোগাযোগ' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactLd) }} />
      {children}
    </>
  )
}
