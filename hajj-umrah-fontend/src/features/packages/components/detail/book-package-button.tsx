'use client'

import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cart'
import { ROUTES } from '@/constants'
import type { Package } from '@/data/packages'

export function BookPackageButton({ pkg }: { pkg: Package }) {
  const router = useRouter()
  const addItem = useCartStore(s => s.addItem)
  const discounted = pkg.price - pkg.discount

  const handleClick = () => {
    addItem({
      kind: 'package',
      refId: pkg.id,
      title: pkg.name,
      subtitle: `${pkg.type === 'hajj' ? 'হজ্জ' : 'উমরাহ'} · ${pkg.tier} · ${pkg.duration} দিন`,
      meta: {
        type: pkg.type,
        tier: pkg.tier,
        slug: pkg.slug,
        departureDate: pkg.departureDate,
        returnDate: pkg.returnDate,
        hotelMakkah: pkg.hotelMakkah.name,
        hotelMadinah: pkg.hotelMadinah.name,
        flight: pkg.flight.airline,
      },
      unitPrice: discounted,
      qty: 1,
      image: pkg.cover,
    })
    router.push(ROUTES.booking.root)
  }

  return (
    <button
      onClick={handleClick}
      className="block w-full text-center bg-gradient-to-r from-primary to-amber-600 text-primary-foreground py-4 rounded-xl font-bold shadow-lg shadow-primary/25 hover:scale-[1.01] transition-transform"
    >
      এখনই বুক করুন — সিট সংরক্ষণ করুন
    </button>
  )
}
