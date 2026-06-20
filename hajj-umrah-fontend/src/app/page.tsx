import { Header } from '@/components/layouts/site-header'
import { Hero } from '@/features/public/components/sections/hero-section'
import { TrustSection } from '@/features/public/components/sections/trust-section'
import { FeaturedPackages } from '@/features/public/components/sections/featured-packages'
import { FeaturedFlights } from '@/features/public/components/sections/featured-flights'
import { ProcessSection } from '@/features/public/components/sections/process-section'
import { DestinationsSection } from '@/features/public/components/sections/destinations-section'
import { Testimonials } from '@/features/public/components/sections/testimonials-section'
import { BlogPreview } from '@/features/public/components/sections/blog-preview'
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
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencyLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
      <div className="bg-home-canvas min-h-screen">
        <Header />
        <main>
          <Hero />
          <TrustSection />
          <FeaturedPackages />
          <FeaturedFlights />
          <ProcessSection />
          <DestinationsSection />
          <Testimonials />
          <BlogPreview />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  )
}
