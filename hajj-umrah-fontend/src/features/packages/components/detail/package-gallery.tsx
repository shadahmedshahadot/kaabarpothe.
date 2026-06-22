'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Share2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Package } from '@/data/packages'

export function PackageGallery({ pkg }: { pkg: Package }) {
  const [activeImg, setActiveImg] = useState(0)
  return (
    <div className="lg:col-span-7">
      <motion.div
        key={activeImg}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="aspect-[4/3] rounded-3xl relative overflow-hidden shadow-xl"
      >
        <Image
          src={pkg.gallery[activeImg]}
          alt={`${pkg.name} — image ${activeImg + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-5 left-5 flex gap-2 z-10">
          {pkg.featured && <Badge>বৈশিষ্ট্যযুক্ত</Badge>}
          <Badge variant={pkg.type === 'hajj' ? 'accent' : 'secondary'}>{pkg.type.toUpperCase()}</Badge>
        </div>
        <div className="absolute bottom-5 right-5 flex gap-2 z-10">
          <button className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur text-white hover:bg-white/30 transition-colors flex items-center justify-center">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-6 gap-2 mt-3">
        {pkg.gallery.map((g, i) => (
          <button
            key={i}
            onClick={() => setActiveImg(i)}
            className={`relative aspect-square rounded-xl overflow-hidden transition-all ${activeImg === i ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'opacity-70 hover:opacity-100'}`}
          >
            <Image src={g} alt={`thumb ${i + 1}`} fill sizes="100px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
