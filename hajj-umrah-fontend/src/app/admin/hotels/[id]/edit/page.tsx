'use client'

import { use } from 'react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

import { HotelForm } from '@/features/admin/components/hotel-form'
import { useGetHotelQuery } from '@/redux/fetchres/hotel/hotelApi'

export default function EditHotelPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { data, isLoading, isError } = useGetHotelQuery(id)

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
        হোটেল পাওয়া যায়নি।{' '}
        <Link href="/admin/hotels" className="underline">
          ফিরে যান
        </Link>
      </div>
    )
  }

  return <HotelForm existing={data.data} />
}
