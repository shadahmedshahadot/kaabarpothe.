'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2, Plus, Save, X } from 'lucide-react'
import { toast } from 'sonner'

import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Input, Textarea, Select, Label } from '@/components/ui/input'
import { CoverUpload, GalleryUpload } from '@/components/common'
import { HotelSelector } from '@/features/admin/components/hotel-selector'
import {
  useGetPackageQuery,
  useUpdatePackageMutation,
} from '@/redux/fetchres/package/packageApi'

type Tier = 'BUDGET' | 'ECONOMY' | 'STANDARD' | 'PREMIUM' | 'VIP' | 'LUXURY'
type Type = 'HAJJ' | 'UMRAH'

interface ItineraryDay {
  day: number
  title: string
  description: string
  activities: string
}

interface PackageFaq {
  question: string
  answer: string
}

const linesToArray = (s: string) =>
  s.split(/\r?\n/).map(l => l.trim()).filter(Boolean)

const arrayToLines = (a?: string[]) => (a ?? []).join('\n')

export default function EditPackagePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const { data, isLoading: isFetching, isError } = useGetPackageQuery(id)
  const [updatePackage, { isLoading: isSaving }] = useUpdatePackageMutation()

  // Basic
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [type, setType] = useState<Type>('UMRAH')
  const [tier, setTier] = useState<Tier>('STANDARD')
  const [shortDescription, setShortDescription] = useState('')
  const [description, setDescription] = useState('')

  // Dates + pricing
  const [duration, setDuration] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('0')
  const [seatsLeft, setSeatsLeft] = useState('30')

  // Status
  const [status, setStatus] = useState<'PUBLISHED' | 'DRAFT'>('DRAFT')
  const [availability, setAvailability] = useState<'AVAILABLE' | 'LIMITED' | 'SOLDOUT'>('AVAILABLE')
  const [featured, setFeatured] = useState(false)

  // Hotels
  const [hotelMakkahName, setHotelMakkahName] = useState('')
  const [hotelMakkahStars, setHotelMakkahStars] = useState('5')
  const [hotelMakkahDistance, setHotelMakkahDistance] = useState('')
  const [hotelMakkahImage, setHotelMakkahImage] = useState('')
  const [hotelMadinahName, setHotelMadinahName] = useState('')
  const [hotelMadinahStars, setHotelMadinahStars] = useState('5')
  const [hotelMadinahDistance, setHotelMadinahDistance] = useState('')
  const [hotelMadinahImage, setHotelMadinahImage] = useState('')

  // Flight
  const [flightAirline, setFlightAirline] = useState('')
  const [flightDeparture, setFlightDeparture] = useState('')
  const [flightArrival, setFlightArrival] = useState('')
  const [flightClass, setFlightClass] = useState('Economy')

  // Misc
  const [meals, setMeals] = useState('')
  const [transport, setTransport] = useState('')
  const [visa, setVisa] = useState('')
  const [groupSize, setGroupSize] = useState('')

  // Arrays
  const [ziyarah, setZiyarah] = useState('')
  const [included, setIncluded] = useState('')
  const [excluded, setExcluded] = useState('')
  const [highlights, setHighlights] = useState('')

  // Images
  const [cover, setCover] = useState('')
  const [gallery, setGallery] = useState<string[]>([])

  // Nested
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([])
  const [faqs, setFaqs] = useState<PackageFaq[]>([])

  // Hydrate from API
  useEffect(() => {
    const p = data?.data
    if (!p) return
    setName(p.name)
    setSlug(p.slug)
    setType(p.type)
    setTier(p.tier)
    setShortDescription(p.shortDescription)
    setDescription(p.description)
    setDuration(String(p.duration))
    setDepartureDate(p.departureDate?.slice(0, 10) ?? '')
    setReturnDate(p.returnDate?.slice(0, 10) ?? '')
    setPrice(String(p.price))
    setDiscount(String(p.discount))
    setSeatsLeft(String(p.seatsLeft))
    setStatus(p.status)
    setAvailability(p.availability)
    setFeatured(p.featured)
    setHotelMakkahName(p.hotelMakkahName)
    setHotelMakkahStars(String(p.hotelMakkahStars))
    setHotelMakkahDistance(p.hotelMakkahDistance)
    setHotelMakkahImage(p.hotelMakkahImage)
    setHotelMadinahName(p.hotelMadinahName)
    setHotelMadinahStars(String(p.hotelMadinahStars))
    setHotelMadinahDistance(p.hotelMadinahDistance)
    setHotelMadinahImage(p.hotelMadinahImage)
    setFlightAirline(p.flightAirline)
    setFlightDeparture(p.flightDeparture)
    setFlightArrival(p.flightArrival)
    setFlightClass(p.flightClass)
    setMeals(p.meals)
    setTransport(p.transport)
    setVisa(p.visa)
    setGroupSize(p.groupSize)
    setZiyarah(arrayToLines(p.ziyarah))
    setIncluded(arrayToLines(p.included))
    setExcluded(arrayToLines(p.excluded))
    setHighlights(arrayToLines(p.highlights))
    setCover(p.cover)
    setGallery(p.gallery ?? [])
    setItinerary(
      (p.itinerary ?? []).map(d => ({
        day: d.day,
        title: d.title,
        description: d.description,
        activities: arrayToLines(d.activities),
      })),
    )
    setFaqs((p.faqs ?? []).map(f => ({ question: f.question, answer: f.answer })))
  }, [data])

  const addItineraryDay = () =>
    setItinerary(prev => [...prev, { day: prev.length + 1, title: '', description: '', activities: '' }])
  const removeItineraryDay = (idx: number) =>
    setItinerary(prev => prev.filter((_, i) => i !== idx).map((d, i) => ({ ...d, day: i + 1 })))
  const updateItineraryDay = (idx: number, patch: Partial<ItineraryDay>) =>
    setItinerary(prev => prev.map((d, i) => (i === idx ? { ...d, ...patch } : d)))

  const addFaq = () => setFaqs(prev => [...prev, { question: '', answer: '' }])
  const removeFaq = (idx: number) => setFaqs(prev => prev.filter((_, i) => i !== idx))
  const updateFaq = (idx: number, patch: Partial<PackageFaq>) =>
    setFaqs(prev => prev.map((f, i) => (i === idx ? { ...f, ...patch } : f)))

  const submit = async (nextStatus: 'PUBLISHED' | 'DRAFT') => {
    const fd = new FormData()
    fd.append('slug', slug)
    fd.append('name', name)
    fd.append('type', type)
    fd.append('tier', tier)
    fd.append('shortDescription', shortDescription)
    fd.append('description', description)
    fd.append('duration', String(duration))
    fd.append('departureDate', departureDate)
    fd.append('returnDate', returnDate)
    fd.append('price', String(price))
    fd.append('discount', String(discount || 0))
    fd.append('status', nextStatus)
    fd.append('availability', availability)
    fd.append('seatsLeft', String(seatsLeft || 0))
    fd.append('featured', String(featured))
    fd.append('hotelMakkahName', hotelMakkahName)
    fd.append('hotelMakkahStars', String(hotelMakkahStars))
    fd.append('hotelMakkahDistance', hotelMakkahDistance)
    fd.append('hotelMakkahImage', hotelMakkahImage)
    fd.append('hotelMadinahName', hotelMadinahName)
    fd.append('hotelMadinahStars', String(hotelMadinahStars))
    fd.append('hotelMadinahDistance', hotelMadinahDistance)
    fd.append('hotelMadinahImage', hotelMadinahImage)
    fd.append('flightAirline', flightAirline)
    fd.append('flightDeparture', flightDeparture)
    fd.append('flightArrival', flightArrival)
    fd.append('flightClass', flightClass)
    fd.append('meals', meals)
    fd.append('transport', transport)
    fd.append('visa', visa)
    fd.append('groupSize', groupSize)
    fd.append('cover', cover)
    fd.append('ziyarah', JSON.stringify(linesToArray(ziyarah)))
    fd.append('included', JSON.stringify(linesToArray(included)))
    fd.append('excluded', JSON.stringify(linesToArray(excluded)))
    fd.append('highlights', JSON.stringify(linesToArray(highlights)))
    fd.append('gallery', JSON.stringify(gallery))

    const itineraryClean = itinerary
      .filter(d => d.title.trim())
      .map(d => ({
        day: d.day,
        title: d.title,
        description: d.description,
        activities: linesToArray(d.activities),
      }))
    fd.append('itinerary', JSON.stringify(itineraryClean))

    const faqsClean = faqs.filter(f => f.question.trim() && f.answer.trim())
    fd.append('faqs', JSON.stringify(faqsClean))

    try {
      const res = await updatePackage({ id, body: fd }).unwrap()
      toast.success(`আপডেট সফল: ${res.data.name}`)
      router.push('/admin/packages')
    } catch (err: any) {
      console.error('updatePackage error:', err)
      const zodErrors = err?.data?.error
      if (Array.isArray(zodErrors) && zodErrors.length) {
        toast.error(`${zodErrors[0].path}: ${zodErrors[0].message}`)
      } else {
        toast.error(err?.data?.message || 'আপডেট ব্যর্থ হয়েছে')
      }
    }
  }

  if (isFetching) {
    return (
      <div className="flex justify-center py-40">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    )
  }

  if (isError || !data?.data) {
    return (
      <div className="text-center py-40 text-rose-500">
        প্যাকেজ পাওয়া যায়নি।{' '}
        <Link href="/admin/packages" className="underline">
          ফিরে যান
        </Link>
      </div>
    )
  }

  return (
    <>
      <Link
        href="/admin/packages"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> প্যাকেজে ফিরে যান
      </Link>

      <PageTitle
        title="প্যাকেজ সম্পাদনা"
        description={`"${data.data.name}" এর তথ্য আপডেট করুন।`}
        action={
          <div className="flex gap-2">
            <button
              type="button"
              disabled={isSaving}
              onClick={() => submit('DRAFT')}
              className="px-4 py-2 border border-border rounded-xl text-sm font-semibold hover:bg-muted disabled:opacity-60"
            >
              খসড়া হিসেবে সংরক্ষণ
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={() => submit('PUBLISHED')}
              className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary disabled:opacity-60"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              সংরক্ষণ করুন
            </button>
          </div>
        }
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="মৌলিক তথ্য">
            <div>
              <Label>প্যাকেজের নাম</Label>
              <Input value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <Label>স্লাগ (URL)</Label>
              <Input value={slug} onChange={e => setSlug(e.target.value)} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>ধরন</Label>
                <Select value={type} onChange={e => setType(e.target.value as Type)}>
                  <option value="UMRAH">উমরাহ</option>
                  <option value="HAJJ">হজ্জ</option>
                </Select>
              </div>
              <div>
                <Label>স্তর</Label>
                <Select value={tier} onChange={e => setTier(e.target.value as Tier)}>
                  <option value="BUDGET">বাজেট</option>
                  <option value="ECONOMY">ইকোনমি</option>
                  <option value="STANDARD">স্ট্যান্ডার্ড</option>
                  <option value="PREMIUM">প্রিমিয়াম</option>
                  <option value="VIP">ভিআইপি</option>
                  <option value="LUXURY">লাক্সারি</option>
                </Select>
              </div>
            </div>
            <div>
              <Label>সংক্ষিপ্ত বিবরণ</Label>
              <Input value={shortDescription} onChange={e => setShortDescription(e.target.value)} />
            </div>
            <div>
              <Label>বিস্তারিত বিবরণ</Label>
              <Textarea rows={6} value={description} onChange={e => setDescription(e.target.value)} />
            </div>
          </Card>

          <Card title="তারিখ ও সময়কাল">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <Label>সময়কাল (দিন)</Label>
                <Input type="number" value={duration} onChange={e => setDuration(e.target.value)} />
              </div>
              <div>
                <Label>প্রস্থানের তারিখ</Label>
                <Input type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)} />
              </div>
              <div>
                <Label>প্রত্যাবর্তনের তারিখ</Label>
                <Input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} />
              </div>
            </div>
          </Card>

          <Card title="মূল্য নির্ধারণ">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <Label>মৌলিক মূল্য (USD)</Label>
                <Input type="number" value={price} onChange={e => setPrice(e.target.value)} />
              </div>
              <div>
                <Label>ছাড় (USD)</Label>
                <Input type="number" value={discount} onChange={e => setDiscount(e.target.value)} />
              </div>
              <div>
                <Label>মোট আসন</Label>
                <Input type="number" value={seatsLeft} onChange={e => setSeatsLeft(e.target.value)} />
              </div>
            </div>
          </Card>

          <Card title="হোটেল">
            <p className="text-xs text-muted-foreground mb-2">
              বিদ্যমান হোটেল থেকে নির্বাচন করুন।{' '}
              <a href="/admin/hotels/new" target="_blank" className="text-primary underline">
                নতুন হোটেল যোগ করুন
              </a>
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">মক্কা হোটেল</p>
                <HotelSelector
                  city="MAKKAH"
                  value={{
                    name: hotelMakkahName,
                    stars: hotelMakkahStars,
                    distance: hotelMakkahDistance,
                    image: hotelMakkahImage,
                  }}
                  onChange={v => {
                    setHotelMakkahName(v.name)
                    setHotelMakkahStars(v.stars)
                    setHotelMakkahDistance(v.distance)
                    setHotelMakkahImage(v.image)
                  }}
                />
              </div>
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">মদিনা হোটেল</p>
                <HotelSelector
                  city="MADINAH"
                  value={{
                    name: hotelMadinahName,
                    stars: hotelMadinahStars,
                    distance: hotelMadinahDistance,
                    image: hotelMadinahImage,
                  }}
                  onChange={v => {
                    setHotelMadinahName(v.name)
                    setHotelMadinahStars(v.stars)
                    setHotelMadinahDistance(v.distance)
                    setHotelMadinahImage(v.image)
                  }}
                />
              </div>
            </div>
          </Card>

          <Card title="ফ্লাইট তথ্য">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>এয়ারলাইন</Label>
                <Input value={flightAirline} onChange={e => setFlightAirline(e.target.value)} />
              </div>
              <div>
                <Label>ক্লাস</Label>
                <Input value={flightClass} onChange={e => setFlightClass(e.target.value)} />
              </div>
              <div>
                <Label>প্রস্থান</Label>
                <Input value={flightDeparture} onChange={e => setFlightDeparture(e.target.value)} />
              </div>
              <div>
                <Label>আগমন</Label>
                <Input value={flightArrival} onChange={e => setFlightArrival(e.target.value)} />
              </div>
            </div>
          </Card>

          <Card title="অতিরিক্ত তথ্য">
            <div>
              <Label>খাবার</Label>
              <Input value={meals} onChange={e => setMeals(e.target.value)} />
            </div>
            <div>
              <Label>পরিবহন</Label>
              <Input value={transport} onChange={e => setTransport(e.target.value)} />
            </div>
            <div>
              <Label>ভিসা</Label>
              <Input value={visa} onChange={e => setVisa(e.target.value)} />
            </div>
            <div>
              <Label>গ্রুপ সাইজ</Label>
              <Input value={groupSize} onChange={e => setGroupSize(e.target.value)} />
            </div>
          </Card>

          <Card title="ভ্রমণসূচি">
            <div className="space-y-3">
              {itinerary.map((d, idx) => (
                <div key={idx} className="border border-border rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center">
                      {d.day}
                    </div>
                    <Input
                      value={d.title}
                      onChange={e => updateItineraryDay(idx, { title: e.target.value })}
                      placeholder={`দিন ${d.day} এর শিরোনাম`}
                      className="flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => removeItineraryDay(idx)}
                      className="p-2 text-muted-foreground hover:text-rose-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <Textarea
                    rows={2}
                    value={d.description}
                    onChange={e => updateItineraryDay(idx, { description: e.target.value })}
                    placeholder="দিনের বিবরণ…"
                  />
                  <Textarea
                    rows={3}
                    className="mt-2"
                    value={d.activities}
                    onChange={e => updateItineraryDay(idx, { activities: e.target.value })}
                    placeholder="কার্যকলাপ — প্রতি লাইনে একটি"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addItineraryDay}
                className="w-full py-3 border-2 border-dashed border-border rounded-xl text-sm text-muted-foreground hover:border-primary hover:text-primary inline-flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> দিন যোগ করুন
              </button>
            </div>
          </Card>

          <Card title="যিয়ারত / অন্তর্ভুক্ত / বাদ / হাইলাইট">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>যিয়ারত (প্রতি লাইনে একটি)</Label>
                <Textarea rows={4} value={ziyarah} onChange={e => setZiyarah(e.target.value)} />
              </div>
              <div>
                <Label>হাইলাইট</Label>
                <Textarea rows={4} value={highlights} onChange={e => setHighlights(e.target.value)} />
              </div>
              <div>
                <Label>যা অন্তর্ভুক্ত</Label>
                <Textarea rows={5} value={included} onChange={e => setIncluded(e.target.value)} />
              </div>
              <div>
                <Label>যা অন্তর্ভুক্ত নয়</Label>
                <Textarea rows={5} value={excluded} onChange={e => setExcluded(e.target.value)} />
              </div>
            </div>
          </Card>

          <Card title="প্যাকেজ প্রশ্নোত্তর">
            <div className="space-y-3">
              {faqs.map((f, idx) => (
                <div key={idx} className="border border-border rounded-xl p-4 relative">
                  <button
                    type="button"
                    onClick={() => removeFaq(idx)}
                    className="absolute top-3 right-3 p-1 text-muted-foreground hover:text-rose-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <Input
                    value={f.question}
                    onChange={e => updateFaq(idx, { question: e.target.value })}
                    placeholder="প্রশ্ন"
                    className="mb-2"
                  />
                  <Textarea
                    rows={2}
                    value={f.answer}
                    onChange={e => updateFaq(idx, { answer: e.target.value })}
                    placeholder="উত্তর"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addFaq}
                className="w-full py-3 border-2 border-dashed border-border rounded-xl text-sm text-muted-foreground hover:border-primary hover:text-primary inline-flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> প্রশ্নোত্তর যোগ করুন
              </button>
            </div>
          </Card>
        </div>

        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Card title="অবস্থা">
            <Select value={status} onChange={e => setStatus(e.target.value as 'PUBLISHED' | 'DRAFT')}>
              <option value="DRAFT">খসড়া</option>
              <option value="PUBLISHED">প্রকাশিত</option>
            </Select>
            <Select
              className="mt-3"
              value={availability}
              onChange={e => setAvailability(e.target.value as 'AVAILABLE' | 'LIMITED' | 'SOLDOUT')}
            >
              <option value="AVAILABLE">উপলব্ধ</option>
              <option value="LIMITED">সীমিত আসন</option>
              <option value="SOLDOUT">বিক্রি হয়ে গেছে</option>
            </Select>
            <label className="flex items-center gap-2 mt-4 text-sm">
              <input
                type="checkbox"
                checked={featured}
                onChange={e => setFeatured(e.target.checked)}
                className="rounded border-border"
              />
              ফিচার্ড হিসেবে চিহ্নিত করুন
            </label>
          </Card>

          <Card title="কভার ছবি">
            <CoverUpload value={cover} onChange={setCover} folder="packages" label="" aspect="video" />
          </Card>

          <Card title="গ্যালারি">
            <GalleryUpload value={gallery} onChange={setGallery} folder="packages" label="" max={12} />
          </Card>
        </div>
      </div>
    </>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="font-bold text-foreground mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  )
}
