import { Hotel, MapPin, Star, Wifi, Utensils, Bath, Bed } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'

const hotels = [
  { city: 'মক্কা', name: 'কনরাড মক্কা', stars: 5, distance: 'হারাম থেকে ৫০ মিটার', nights: '৮ রাত · ১৯-২৭ মে', room: 'ডিলাক্স কিং · হারাম ভিউ', gradient: 'from-amber-400 to-orange-500' },
  { city: 'মদিনা', name: 'দ্য ওবেরয় মদিনা', stars: 5, distance: 'মসজিদে নববী থেকে ১২০ মিটার', nights: '৫ রাত · ৮-১৩ জুন', room: 'ডিলাক্স কিং · সিটি ভিউ', gradient: 'from-emerald-400 to-teal-500' },
]

export default function HotelDetailsPage() {
  return (
    <>
      <PageTitle title="হোটেল বিবরণ" description="আপনার পবিত্র যাত্রায় থাকার ব্যবস্থা।" />

      <div className="space-y-6">
        {hotels.map((h, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className={`relative h-56 md:h-auto bg-gradient-to-br ${h.gradient}`}>
                <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 200 200">
                  <pattern id={`h-${i}`} width="25" height="25" patternUnits="userSpaceOnUse">
                    <path d="M12 0 L25 12 L12 25 L0 12 Z" fill="none" stroke="white" strokeWidth="0.8" />
                  </pattern>
                  <rect width="100%" height="100%" fill={`url(#h-${i})`} />
                </svg>
                <div className="absolute top-5 left-5 bg-white/20 backdrop-blur text-white rounded-lg px-3 py-1.5 text-sm font-bold">{h.city}</div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: h.stars }).map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{h.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-4"><MapPin className="w-4 h-4" /> {h.distance}</p>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <Info Icon={Bed} label="রুম" value={h.room} />
                  <Info Icon={Hotel} label="অবস্থান" value={h.nights} />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Amenity Icon={Wifi} label="ফ্রি WiFi" />
                  <Amenity Icon={Utensils} label="বুফে খাবার" />
                  <Amenity Icon={Bath} label="প্রিমিয়াম বাথ" />
                  <Amenity Icon={Hotel} label="রুম সার্ভিস" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function Info({ Icon, label, value }: { Icon: any; label: string; value: string }) {
  return (
    <div className="bg-muted/40 rounded-xl p-3">
      <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground mb-1"><Icon className="w-3.5 h-3.5" /> {label}</div>
      <p className="font-semibold text-foreground text-sm">{value}</p>
    </div>
  )
}

function Amenity({ Icon, label }: { Icon: any; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted/60 text-foreground text-xs rounded-full font-medium">
      <Icon className="w-3.5 h-3.5 text-primary" /> {label}
    </span>
  )
}
