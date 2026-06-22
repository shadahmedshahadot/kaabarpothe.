import { Header } from '@/components/layouts/site-header'
import { Hero } from '@/features/public/components/sections/hero-section'
import { TrustSection } from '@/features/public/components/sections/trust-section'
import { FeaturedPackages } from '@/features/public/components/sections/featured-packages'
import { FeaturedFlights } from '@/features/public/components/sections/featured-flights'
import { FeaturedHotels } from '@/features/public/components/sections/featured-hotels'
import { ProcessSection } from '@/features/public/components/sections/process-section'
import { DestinationsSection } from '@/features/public/components/sections/destinations-section'
import { Testimonials } from '@/features/public/components/sections/testimonials-section'
import { CTASection } from '@/features/public/components/sections/cta-section'
import { Footer } from '@/components/layouts/site-footer'
import { SITE } from '@/constants/site'

const travelAgencyLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  alternateName: SITE.nameEn,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: `${SITE.url}/logo.jpeg`,
  image: `${SITE.url}${SITE.ogImage}`,
  description: SITE.description,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.contact.address.street,
    addressLocality: SITE.contact.address.city,
    addressRegion: SITE.contact.address.region,
    postalCode: SITE.contact.address.postalCode,
    addressCountry: SITE.contact.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 23.7461,
    longitude: 90.3742,
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.9,
    reviewCount: 12420,
    bestRating: 5,
  },
  telephone: SITE.contact.phoneHref,
  email: SITE.contact.email,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '09:00',
      closes: '21:00',
    },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: SITE.contact.phoneHref,
      contactType: 'customer service',
      areaServed: 'BD',
      availableLanguage: ['Bengali', 'English'],
    },
    {
      '@type': 'ContactPoint',
      telephone: SITE.contact.whatsapp,
      contactType: 'customer support',
      areaServed: 'BD',
      availableLanguage: ['Bengali', 'English'],
    },
  ],
  sameAs: [SITE.contact.whatsappUrl],
  areaServed: [
    { '@type': 'Country', name: 'Bangladesh' },
    { '@type': 'Country', name: 'Saudi Arabia' },
  ],
}

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  description: SITE.description,
  publisher: { '@id': `${SITE.url}/#organization` },
  inLanguage: 'bn-BD',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE.url}/packages/hajj?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', '[data-speakable]'],
  },
}

const hajjServiceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE.url}/#hajj-service`,
  serviceType: 'Hajj Pilgrimage Package',
  name: 'হজ্জ প্যাকেজ ২০২৬',
  description:
    'সৌদি মন্ত্রণালয় অনুমোদিত হজ্জ প্যাকেজ — ইকোনমি, স্ট্যান্ডার্ড, প্রিমিয়াম, ভিআইপি স্তর। আলেম পরিচালিত গ্রুপ, ৩-৫ তারকা হোটেল, ফ্লাইট, ভিসা ও পরিবহন অন্তর্ভুক্ত।',
  provider: { '@id': `${SITE.url}/#organization` },
  areaServed: { '@type': 'Country', name: 'Bangladesh' },
  url: `${SITE.url}/packages/hajj`,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'হজ্জ প্যাকেজ স্তর',
    itemListElement: [
      { '@type': 'Offer', name: 'Economy Hajj Package', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Standard Hajj Package', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Premium Hajj Package', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'VIP Hajj Package', priceCurrency: 'USD' },
    ],
  },
}

const umrahServiceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE.url}/#umrah-service`,
  serviceType: 'Umrah Pilgrimage Package',
  name: 'উমরাহ প্যাকেজ ২০২৬',
  description:
    'সারা বছরব্যাপী উমরাহ প্যাকেজ — বাজেট থেকে লাক্সারি স্তর। হারামের কাছের হোটেল, সরাসরি ফ্লাইট, আলেম পরিচালিত গ্রুপ।',
  provider: { '@id': `${SITE.url}/#organization` },
  areaServed: { '@type': 'Country', name: 'Bangladesh' },
  url: `${SITE.url}/packages/umrah`,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'উমরাহ প্যাকেজ স্তর',
    itemListElement: [
      { '@type': 'Offer', name: 'Budget Umrah Package', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Economy Umrah Package', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Premium Umrah Package', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Luxury Umrah Package', priceCurrency: 'USD' },
    ],
  },
}

const homeFaqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'কাবার পথে কী?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'কাবার পথে হলো বাংলাদেশের একটি সৌদি মন্ত্রণালয় লাইসেন্সপ্রাপ্ত, আলেম পরিচালিত হজ্জ ও উমরাহ এজেন্সি। ২০১৫ সাল থেকে ৫০,০০০+ হাজীকে সেবা দিয়েছে।',
      },
    },
    {
      '@type': 'Question',
      name: 'হজ্জ ২০২৬ প্যাকেজের মূল্য কত?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'হজ্জ ২০২৬ প্যাকেজ চার স্তরে পাওয়া যায়: ইকোনমি, স্ট্যান্ডার্ড, প্রিমিয়াম এবং ভিআইপি। প্রতিটি প্যাকেজ ফ্লাইট, ৩-৫ তারকা হোটেল, ভিসা, খাবার এবং যিয়ারত ট্যুর অন্তর্ভুক্ত। বিস্তারিত মূল্য /packages/hajj পেজে দেখুন।',
      },
    },
    {
      '@type': 'Question',
      name: 'উমরাহ প্যাকেজে কী কী অন্তর্ভুক্ত?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'প্রতিটি উমরাহ প্যাকেজে রাউন্ড-ট্রিপ ফ্লাইট, উমরাহ ভিসা, মক্কা ও মদিনায় হোটেল, বিমানবন্দর ট্রান্সফার, যিয়ারত ট্যুর, খাবার এবং আলেম গাইডেন্স অন্তর্ভুক্ত।',
      },
    },
    {
      '@type': 'Question',
      name: 'বুকিং করতে কত ডিপোজিট লাগবে?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '২৫% ডিপোজিট দিয়ে বুকিং নিশ্চিত করা যায় (ভিআইপি প্যাকেজে ৩০%)। অবশিষ্ট ব্যালেন্স ২-৬ মাসিক কিস্তিতে পরিশোধ করা যায়। প্রস্থানের ৬০ দিন আগে পর্যন্ত ডিপোজিট সম্পূর্ণ ফেরতযোগ্য।',
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencyLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hajjServiceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(umrahServiceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqLd) }} />
      <div className="bg-home-canvas min-h-screen">
        <Header />
        <main id="main-content">
          <Hero />
          <TrustSection />
          <FeaturedPackages />
          <FeaturedHotels />
          <FeaturedFlights />
          <ProcessSection />
          <DestinationsSection />
          <Testimonials />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  )
}
