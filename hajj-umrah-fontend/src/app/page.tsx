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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'সাকিনাহ ট্রাভেলস',
  url: 'https://sakinah.travel',
  description: 'প্রিমিয়াম হজ্জ ও উমরাহ প্যাকেজ।',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'বাড়ি ৫০০, রোড ৪২',
    addressLocality: 'ঢাকা',
    addressRegion: 'ঢাকা',
    postalCode: '1212',
    addressCountry: 'BD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.9,
    reviewCount: 12420,
    bestRating: 5,
  },
  telephone: '+880-1700-000000',
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
    </>
  )
}
