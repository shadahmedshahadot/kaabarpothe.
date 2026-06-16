'use client'

import { use } from 'react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

import { FlightForm } from '@/features/admin/components/flight-form'
import { useGetFlightQuery } from '@/redux/fetchres/flight/flightApi'

export default function EditFlightPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { data, isLoading, isError } = useGetFlightQuery(id)

  if (isLoading) {
    return (
      <div className="flex justify-center py-40">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    )
  }

  if (isError || !data?.data) {
    return (
      <div className="text-center py-40 text-rose-500">
        ফ্লাইট পাওয়া যায়নি।{' '}
        <Link href="/admin/flights" className="underline">
          ফিরে যান
        </Link>
      </div>
    )
  }

  return <FlightForm existing={data.data} />
}
