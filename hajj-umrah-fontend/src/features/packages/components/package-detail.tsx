'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import type { Package } from '@/data/packages'
import { PackageBreadcrumbs } from './detail/breadcrumbs'
import { PackageGallery } from './detail/package-gallery'
import { PackageSummary } from './detail/package-summary'
import { OverviewTab } from './detail/overview-tab'
import { ItineraryTab } from './detail/itinerary-tab'
import { InclusionsTab } from './detail/inclusions-tab'
import { HotelsTab } from './detail/hotels-tab'
import { FAQTab } from './detail/faq-tab'
import { PackageTrustStrip } from './detail/trust-strip'

export function PackageDetail({ pkg }: { pkg: Package }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-24">
      <div className="max-w-7xl mx-auto">
        <PackageBreadcrumbs pkg={pkg} />

        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          <PackageGallery pkg={pkg} />
          <PackageSummary pkg={pkg} />
        </div>

        <Tabs defaultValue="overview" className="mb-12">
          <TabsList className="!w-full !justify-start overflow-x-auto !rounded-2xl !p-1.5">
            <TabsTrigger value="overview">সংক্ষিপ্ত বিবরণ</TabsTrigger>
            <TabsTrigger value="itinerary">ভ্রমণসূচি</TabsTrigger>
            <TabsTrigger value="inclusions">অন্তর্ভুক্তি</TabsTrigger>
            <TabsTrigger value="hotels">হোটেল</TabsTrigger>
            <TabsTrigger value="faq">প্রশ্নোত্তর</TabsTrigger>
          </TabsList>

          <TabsContent value="overview"><OverviewTab pkg={pkg} /></TabsContent>
          <TabsContent value="itinerary"><ItineraryTab pkg={pkg} /></TabsContent>
          <TabsContent value="inclusions"><InclusionsTab pkg={pkg} /></TabsContent>
          <TabsContent value="hotels"><HotelsTab pkg={pkg} /></TabsContent>
          <TabsContent value="faq"><FAQTab pkg={pkg} /></TabsContent>
        </Tabs>

        <PackageTrustStrip pkg={pkg} />
      </div>
    </div>
  )
}
