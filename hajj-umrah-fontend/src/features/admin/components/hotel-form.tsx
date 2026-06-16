'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2, Plus, Save, X } from 'lucide-react'
import { toast } from 'sonner'

import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Input, Textarea, Select, Label } from '@/components/ui/input'
import { CoverUpload, GalleryUpload } from '@/components/common'
import {
  useCreateHotelMutation,
  useUpdateHotelMutation,
  type HotelDto,
} from '@/redux/fetchres/hotel/hotelApi'

type City = 'MAKKAH' | 'MADINAH'
type EntityStatus = 'ACTIVE' | 'INACTIVE'
type Board = 'ROOM_ONLY' | 'BREAKFAST' | 'HALF_BOARD' | 'FULL_BOARD'

interface RoomType {
  name: string
  capacity: string
  pricePerNight: string
  available: string
  board: Board
}

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')

const linesToArray = (s: string) =>
  s.split(/\r?\n/).map(l => l.trim()).filter(Boolean)

const arrayToLines = (a?: string[]) => (a ?? []).join('\n')

export function HotelForm({ existing }: { existing?: HotelDto }) {
  const router = useRouter()
  const [createHotel, { isLoading: isCreating }] = useCreateHotelMutation()
  const [updateHotel, { isLoading: isUpdating }] = useUpdateHotelMutation()
  const isSaving = isCreating || isUpdating
  const isEdit = !!existing

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState('4')
  const [city, setCity] = useState<City>('MAKKAH')
  const [country, setCountry] = useState('Saudi Arabia')
  const [address, setAddress] = useState('')
  const [distanceFromHaram, setDistanceFromHaram] = useState('')
  const [description, setDescription] = useState('')
  const [facilities, setFacilities] = useState('')
  const [meals, setMeals] = useState('')
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [totalRooms, setTotalRooms] = useState('')
  const [pricePerNight, setPricePerNight] = useState('')
  const [status, setStatus] = useState<EntityStatus>('ACTIVE')
  const [featured, setFeatured] = useState(false)
  const [notes, setNotes] = useState('')

  const [cover, setCover] = useState('')
  const [images, setImages] = useState<string[]>([])

  const [roomTypes, setRoomTypes] = useState<RoomType[]>([
    { name: '', capacity: '2', pricePerNight: '', available: '0', board: 'BREAKFAST' },
  ])

  useEffect(() => {
    if (!existing) return
    setName(existing.name)
    setSlug(existing.slug)
    setCategory(String(existing.category))
    setCity(existing.city)
    setCountry(existing.country)
    setAddress(existing.address)
    setDistanceFromHaram(existing.distanceFromHaram)
    setDescription(existing.description)
    setFacilities(arrayToLines(existing.facilities))
    setMeals(existing.meals)
    setCheckInDate(existing.checkInDate?.slice(0, 10) ?? '')
    setCheckOutDate(existing.checkOutDate?.slice(0, 10) ?? '')
    setTotalRooms(String(existing.totalRooms))
    setPricePerNight(String(existing.pricePerNight))
    setStatus(existing.status)
    setFeatured(existing.featured)
    setNotes(existing.notes ?? '')
    setCover(existing.cover)
    setImages(existing.images ?? [])
    setRoomTypes(
      (existing.roomTypes ?? []).map(r => ({
        name: r.name,
        capacity: String(r.capacity),
        pricePerNight: String(r.pricePerNight),
        available: String(r.available),
        board: r.board,
      })),
    )
  }, [existing])

  const handleNameChange = (v: string) => {
    setName(v)
    if (!slug || slug === slugify(name)) setSlug(slugify(v))
  }

  const addRoomType = () =>
    setRoomTypes(prev => [
      ...prev,
      { name: '', capacity: '2', pricePerNight: '', available: '0', board: 'BREAKFAST' },
    ])
  const removeRoomType = (idx: number) =>
    setRoomTypes(prev => prev.filter((_, i) => i !== idx))
  const updateRoomType = (idx: number, patch: Partial<RoomType>) =>
    setRoomTypes(prev => prev.map((r, i) => (i === idx ? { ...r, ...patch } : r)))

  const validate = () => {
    const required: [string, string][] = [
      ['নাম', name], ['স্লাগ', slug], ['ঠিকানা', address], ['হারাম থেকে দূরত্ব', distanceFromHaram],
      ['বিবরণ', description], ['খাবার', meals],
      ['মোট রুম', totalRooms], ['প্রতি রাত মূল্য', pricePerNight],
      ['কভার ছবি', cover],
    ]
    const missing = required.find(([, v]) => !v)
    if (missing) {
      toast.error(`"${missing[0]}" প্রয়োজন`)
      return false
    }
    return true
  }

  const submit = async (nextStatus: EntityStatus) => {
    if (!validate()) return

    const fd = new FormData()
    fd.append('slug', slug)
    fd.append('name', name)
    fd.append('category', String(category))
    fd.append('city', city)
    fd.append('country', country)
    fd.append('address', address)
    fd.append('distanceFromHaram', distanceFromHaram)
    fd.append('description', description)
    fd.append('meals', meals)
    if (checkInDate) fd.append('checkInDate', checkInDate)
    if (checkOutDate) fd.append('checkOutDate', checkOutDate)
    fd.append('totalRooms', String(totalRooms))
    fd.append('pricePerNight', String(pricePerNight))
    fd.append('status', nextStatus)
    fd.append('featured', String(featured))
    if (notes) fd.append('notes', notes)
    fd.append('cover', cover)
    fd.append('images', JSON.stringify(images))
    fd.append('facilities', JSON.stringify(linesToArray(facilities)))

    const roomTypesClean = roomTypes
      .filter(r => r.name.trim())
      .map(r => ({
        name: r.name,
        capacity: Number(r.capacity) || 1,
        pricePerNight: Number(r.pricePerNight) || 0,
        available: Number(r.available) || 0,
        board: r.board,
      }))
    fd.append('roomTypes', JSON.stringify(roomTypesClean))

    try {
      if (isEdit && existing) {
        const res = await updateHotel({ id: existing.id, body: fd }).unwrap()
        toast.success(`আপডেট সফল: ${res.data.name}`)
      } else {
        const res = await createHotel(fd).unwrap()
        toast.success(`হোটেল তৈরি হয়েছে: ${res.data.name}`)
      }
      router.push('/admin/hotels')
    } catch (err: any) {
      console.error('hotel save error:', err)
      const zodErrors = err?.data?.error
      if (Array.isArray(zodErrors) && zodErrors.length) {
        toast.error(`${zodErrors[0].path}: ${zodErrors[0].message}`)
      } else {
        toast.error(err?.data?.message || 'সংরক্ষণ ব্যর্থ হয়েছে')
      }
    }
  }

  return (
    <>
      <Link
        href="/admin/hotels"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> হোটেলে ফিরে যান
      </Link>

      <PageTitle
        title={isEdit ? 'হোটেল সম্পাদনা' : 'নতুন হোটেল তৈরি করুন'}
        description="হোটেল বিবরণ, রুম টাইপ, ছবি ও সুবিধা সেট করুন।"
        action={
          <div className="flex gap-2">
            <button
              type="button"
              disabled={isSaving}
              onClick={() => submit('INACTIVE')}
              className="px-4 py-2 border border-border rounded-xl text-sm font-semibold hover:bg-muted disabled:opacity-60"
            >
              নিষ্ক্রিয় হিসেবে সংরক্ষণ
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={() => submit('ACTIVE')}
              className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary disabled:opacity-60"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              সক্রিয় হিসেবে সংরক্ষণ
            </button>
          </div>
        }
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="মৌলিক তথ্য">
            <div>
              <Label>হোটেলের নাম</Label>
              <Input value={name} onChange={e => handleNameChange(e.target.value)} placeholder="হিলটন স্যুটস মক্কা" />
            </div>
            <div>
              <Label>স্লাগ (URL)</Label>
              <Input value={slug} onChange={e => setSlug(e.target.value)} placeholder="hilton-suites-makkah" />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <Label>শ্রেণী (তারকা)</Label>
                <Select value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="3">3 তারকা</option>
                  <option value="4">4 তারকা</option>
                  <option value="5">5 তারকা</option>
                </Select>
              </div>
              <div>
                <Label>শহর</Label>
                <Select value={city} onChange={e => setCity(e.target.value as City)}>
                  <option value="MAKKAH">মক্কা</option>
                  <option value="MADINAH">মদিনা</option>
                </Select>
              </div>
              <div>
                <Label>দেশ</Label>
                <Input value={country} onChange={e => setCountry(e.target.value)} />
              </div>
            </div>
            <div>
              <Label>ঠিকানা</Label>
              <Input value={address} onChange={e => setAddress(e.target.value)} placeholder="জাবাল ওমর, ইব্রাহিম আল খলিল রোড" />
            </div>
            <div>
              <Label>হারাম থেকে দূরত্ব</Label>
              <Input value={distanceFromHaram} onChange={e => setDistanceFromHaram(e.target.value)} placeholder="হারাম থেকে ৪০০ মিটার হাঁটা" />
            </div>
            <div>
              <Label>বিবরণ</Label>
              <Textarea rows={5} value={description} onChange={e => setDescription(e.target.value)} />
            </div>
          </Card>

          <Card title="ইনভেন্টরি ও মূল্য">
            <p className="text-xs text-muted-foreground mb-2">
              চেক-ইন/আউট তারিখ ঐচ্ছিক — বুকিং তৈরির সময় নির্ধারিত হয়। হোটেলের ডিফল্ট পলিসি থাকলে দিন।
            </p>
            <div className="grid sm:grid-cols-4 gap-4">
              <div>
                <Label>চেক-ইন (ঐচ্ছিক)</Label>
                <Input type="date" value={checkInDate} onChange={e => setCheckInDate(e.target.value)} />
              </div>
              <div>
                <Label>চেক-আউট (ঐচ্ছিক)</Label>
                <Input type="date" value={checkOutDate} onChange={e => setCheckOutDate(e.target.value)} />
              </div>
              <div>
                <Label>মোট রুম</Label>
                <Input type="number" value={totalRooms} onChange={e => setTotalRooms(e.target.value)} placeholder="220" />
              </div>
              <div>
                <Label>প্রতি রাত (USD)</Label>
                <Input type="number" value={pricePerNight} onChange={e => setPricePerNight(e.target.value)} placeholder="165" />
              </div>
            </div>
            <div>
              <Label>খাবার</Label>
              <Input value={meals} onChange={e => setMeals(e.target.value)} placeholder="নাশতা বুফে অন্তর্ভুক্ত" />
            </div>
            <div>
              <Label>সুবিধা (প্রতি লাইনে একটি)</Label>
              <Textarea rows={5} value={facilities} onChange={e => setFacilities(e.target.value)} placeholder="ফ্রি ওয়াই-ফাই&#10;২৪/৭ রিসেপশন&#10;হালাল রেস্তোরাঁ" />
            </div>
          </Card>

          <Card title="রুম টাইপ">
            <div className="space-y-3">
              {roomTypes.map((r, idx) => (
                <div key={idx} className="border border-border rounded-xl p-4 grid sm:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-2 items-end">
                  <div>
                    <Label>নাম</Label>
                    <Input
                      value={r.name}
                      onChange={e => updateRoomType(idx, { name: e.target.value })}
                      placeholder="স্ট্যান্ডার্ড টুইন"
                    />
                  </div>
                  <div>
                    <Label>ক্ষমতা</Label>
                    <Input
                      type="number"
                      value={r.capacity}
                      onChange={e => updateRoomType(idx, { capacity: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>মূল্য/রাত</Label>
                    <Input
                      type="number"
                      value={r.pricePerNight}
                      onChange={e => updateRoomType(idx, { pricePerNight: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>উপলব্ধ</Label>
                    <Input
                      type="number"
                      value={r.available}
                      onChange={e => updateRoomType(idx, { available: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>খাবার</Label>
                    <Select
                      value={r.board}
                      onChange={e => updateRoomType(idx, { board: e.target.value as Board })}
                    >
                      <option value="ROOM_ONLY">শুধু রুম</option>
                      <option value="BREAKFAST">নাশতা</option>
                      <option value="HALF_BOARD">হাফ-বোর্ড</option>
                      <option value="FULL_BOARD">ফুল-বোর্ড</option>
                    </Select>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeRoomType(idx)}
                    className="p-2 text-muted-foreground hover:text-rose-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addRoomType}
                className="w-full py-3 border-2 border-dashed border-border rounded-xl text-sm text-muted-foreground hover:border-primary hover:text-primary inline-flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> রুম টাইপ যোগ করুন
              </button>
            </div>
          </Card>

          <Card title="অতিরিক্ত নোট">
            <Textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)} />
          </Card>
        </div>

        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Card title="অবস্থা">
            <Select value={status} onChange={e => setStatus(e.target.value as EntityStatus)}>
              <option value="ACTIVE">সক্রিয়</option>
              <option value="INACTIVE">নিষ্ক্রিয়</option>
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
            <CoverUpload value={cover} onChange={setCover} folder="hotels" label="" aspect="video" />
          </Card>

          <Card title="গ্যালারি">
            <GalleryUpload value={images} onChange={setImages} folder="hotels" label="" max={12} />
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
