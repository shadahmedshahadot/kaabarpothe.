'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2, Plus, Save, X } from 'lucide-react'
import { toast } from 'sonner'

import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Input, Textarea, Select, Label } from '@/components/ui/input'
import {
  useCreateFlightMutation,
  useUpdateFlightMutation,
  type FlightDto,
} from '@/redux/fetchres/flight/flightApi'

type CabinClass = 'ECONOMY' | 'ECONOMY_PLUS' | 'BUSINESS' | 'FIRST'
type BookingStatus = 'OPEN' | 'CLOSED' | 'WAITLIST' | 'SOLDOUT'
type EntityStatus = 'ACTIVE' | 'INACTIVE'

interface Transit {
  airport: string
  city: string
  duration: string
}

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')

export function FlightForm({ existing }: { existing?: FlightDto }) {
  const router = useRouter()
  const [createFlight, { isLoading: isCreating }] = useCreateFlightMutation()
  const [updateFlight, { isLoading: isUpdating }] = useUpdateFlightMutation()
  const isSaving = isCreating || isUpdating
  const isEdit = !!existing

  const [airlineName, setAirlineName] = useState('')
  const [airlineLogo, setAirlineLogo] = useState('')
  const [flightNumber, setFlightNumber] = useState('')
  const [slug, setSlug] = useState('')

  const [departureAirport, setDepartureAirport] = useState('')
  const [arrivalAirport, setArrivalAirport] = useState('')
  const [departureCity, setDepartureCity] = useState('')
  const [arrivalCity, setArrivalCity] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [departureTime, setDepartureTime] = useState('')
  const [arrivalDate, setArrivalDate] = useState('')
  const [arrivalTime, setArrivalTime] = useState('')

  const [transitDuration, setTransitDuration] = useState('নন-স্টপ')
  const [totalDuration, setTotalDuration] = useState('')
  const [transits, setTransits] = useState<Transit[]>([])

  const [cabinClass, setCabinClass] = useState<CabinClass>('ECONOMY')
  const [baggageAllowance, setBaggageAllowance] = useState('')
  const [mealInfo, setMealInfo] = useState('')

  const [seatsTotal, setSeatsTotal] = useState('')
  const [seatsAvailable, setSeatsAvailable] = useState('')
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>('OPEN')

  const [price, setPrice] = useState('')
  const [taxes, setTaxes] = useState('0')
  const [discount, setDiscount] = useState('0')

  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState<EntityStatus>('ACTIVE')
  const [featured, setFeatured] = useState(false)

  useEffect(() => {
    if (!existing) return
    setAirlineName(existing.airlineName)
    setAirlineLogo(existing.airlineLogo)
    setFlightNumber(existing.flightNumber)
    setSlug(existing.slug)
    setDepartureAirport(existing.departureAirport)
    setArrivalAirport(existing.arrivalAirport)
    setDepartureCity(existing.departureCity)
    setArrivalCity(existing.arrivalCity)
    setDepartureDate(existing.departureDate?.slice(0, 10) ?? '')
    setDepartureTime(existing.departureTime)
    setArrivalDate(existing.arrivalDate?.slice(0, 10) ?? '')
    setArrivalTime(existing.arrivalTime)
    setTransitDuration(existing.transitDuration)
    setTotalDuration(existing.totalDuration)
    setTransits((existing.transits ?? []).map(t => ({ airport: t.airport, city: t.city, duration: t.duration })))
    setCabinClass(existing.cabinClass)
    setBaggageAllowance(existing.baggageAllowance)
    setMealInfo(existing.mealInfo)
    setSeatsTotal(String(existing.seatsTotal))
    setSeatsAvailable(String(existing.seatsAvailable))
    setBookingStatus(existing.bookingStatus)
    setPrice(String(existing.price))
    setTaxes(String(existing.taxes))
    setDiscount(String(existing.discount))
    setNotes(existing.notes ?? '')
    setStatus(existing.status)
    setFeatured(existing.featured)
  }, [existing])

  const handleFlightNumberChange = (v: string) => {
    setFlightNumber(v)
    if (!slug || slug === slugify(flightNumber)) setSlug(slugify(v))
  }

  const addTransit = () => setTransits(prev => [...prev, { airport: '', city: '', duration: '' }])
  const removeTransit = (idx: number) => setTransits(prev => prev.filter((_, i) => i !== idx))
  const updateTransit = (idx: number, patch: Partial<Transit>) =>
    setTransits(prev => prev.map((t, i) => (i === idx ? { ...t, ...patch } : t)))

  const validate = () => {
    const required: [string, string][] = [
      ['স্লাগ', slug], ['এয়ারলাইন', airlineName], ['লোগো', airlineLogo], ['ফ্লাইট নম্বর', flightNumber],
      ['প্রস্থান বিমানবন্দর', departureAirport], ['আগমন বিমানবন্দর', arrivalAirport],
      ['প্রস্থান শহর', departureCity], ['আগমন শহর', arrivalCity],
      ['প্রস্থান তারিখ', departureDate], ['প্রস্থান সময়', departureTime],
      ['আগমন তারিখ', arrivalDate], ['আগমন সময়', arrivalTime],
      ['ট্রানজিট সময়কাল', transitDuration], ['মোট সময়কাল', totalDuration],
      ['ব্যাগেজ', baggageAllowance], ['খাবার', mealInfo],
      ['মোট আসন', seatsTotal], ['উপলব্ধ আসন', seatsAvailable],
      ['মূল্য', price],
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
    fd.append('airlineName', airlineName)
    fd.append('airlineLogo', airlineLogo)
    fd.append('flightNumber', flightNumber)
    fd.append('departureAirport', departureAirport)
    fd.append('arrivalAirport', arrivalAirport)
    fd.append('departureCity', departureCity)
    fd.append('arrivalCity', arrivalCity)
    fd.append('departureDate', departureDate)
    fd.append('departureTime', departureTime)
    fd.append('arrivalDate', arrivalDate)
    fd.append('arrivalTime', arrivalTime)
    fd.append('transitDuration', transitDuration)
    fd.append('totalDuration', totalDuration)
    fd.append('cabinClass', cabinClass)
    fd.append('baggageAllowance', baggageAllowance)
    fd.append('mealInfo', mealInfo)
    fd.append('seatsTotal', String(seatsTotal))
    fd.append('seatsAvailable', String(seatsAvailable))
    fd.append('bookingStatus', bookingStatus)
    fd.append('price', String(price))
    fd.append('taxes', String(taxes || 0))
    fd.append('discount', String(discount || 0))
    if (notes) fd.append('notes', notes)
    fd.append('status', nextStatus)
    fd.append('featured', String(featured))
    fd.append(
      'transits',
      JSON.stringify(
        transits.filter(t => t.airport.trim()).map(t => ({
          airport: t.airport,
          city: t.city,
          duration: t.duration,
        })),
      ),
    )

    try {
      if (isEdit && existing) {
        const res = await updateFlight({ id: existing.id, body: fd }).unwrap()
        toast.success(`আপডেট সফল: ${res.data.flightNumber}`)
      } else {
        const res = await createFlight(fd).unwrap()
        toast.success(`ফ্লাইট তৈরি হয়েছে: ${res.data.flightNumber}`)
      }
      router.push('/admin/flights')
    } catch (err: any) {
      console.error('flight save error:', err)
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
        href="/admin/flights"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> ফ্লাইটে ফিরে যান
      </Link>

      <PageTitle
        title={isEdit ? 'ফ্লাইট সম্পাদনা' : 'নতুন ফ্লাইট তৈরি করুন'}
        description="এয়ারলাইন সময়সূচি, কেবিন, ব্যাগেজ এবং আসন ইনভেন্টরি সেট করুন।"
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
          <Card title="এয়ারলাইন">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <Label>এয়ারলাইনের নাম</Label>
                <Input value={airlineName} onChange={e => setAirlineName(e.target.value)} placeholder="বিমান বাংলাদেশ এয়ারলাইন্স" />
              </div>
              <div>
                <Label>লোগো কোড (2-3 অক্ষর)</Label>
                <Input value={airlineLogo} onChange={e => setAirlineLogo(e.target.value)} placeholder="BG" />
              </div>
              <div>
                <Label>ফ্লাইট নম্বর</Label>
                <Input value={flightNumber} onChange={e => handleFlightNumberChange(e.target.value)} placeholder="BG 1041" />
              </div>
              <div className="sm:col-span-2">
                <Label>স্লাগ (URL)</Label>
                <Input value={slug} onChange={e => setSlug(e.target.value)} placeholder="biman-dac-jed-bg-1041" />
              </div>
            </div>
          </Card>

          <Card title="রুট ও সময়">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>প্রস্থান বিমানবন্দর</Label>
                <Input value={departureAirport} onChange={e => setDepartureAirport(e.target.value)} placeholder="হযরত শাহজালাল (DAC)" />
              </div>
              <div>
                <Label>আগমন বিমানবন্দর</Label>
                <Input value={arrivalAirport} onChange={e => setArrivalAirport(e.target.value)} placeholder="কিং আব্দুল আজিজ (JED)" />
              </div>
              <div>
                <Label>প্রস্থান শহর</Label>
                <Input value={departureCity} onChange={e => setDepartureCity(e.target.value)} placeholder="ঢাকা" />
              </div>
              <div>
                <Label>আগমন শহর</Label>
                <Input value={arrivalCity} onChange={e => setArrivalCity(e.target.value)} placeholder="জেদ্দা" />
              </div>
              <div>
                <Label>প্রস্থানের তারিখ</Label>
                <Input type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)} />
              </div>
              <div>
                <Label>প্রস্থানের সময়</Label>
                <Input type="time" value={departureTime} onChange={e => setDepartureTime(e.target.value)} />
              </div>
              <div>
                <Label>আগমনের তারিখ</Label>
                <Input type="date" value={arrivalDate} onChange={e => setArrivalDate(e.target.value)} />
              </div>
              <div>
                <Label>আগমনের সময়</Label>
                <Input type="time" value={arrivalTime} onChange={e => setArrivalTime(e.target.value)} />
              </div>
              <div>
                <Label>ট্রানজিট সময়কাল</Label>
                <Input value={transitDuration} onChange={e => setTransitDuration(e.target.value)} placeholder="নন-স্টপ" />
              </div>
              <div>
                <Label>মোট সময়কাল</Label>
                <Input value={totalDuration} onChange={e => setTotalDuration(e.target.value)} placeholder="৮ ঘণ্টা ১৫ মিনিট" />
              </div>
            </div>
          </Card>

          <Card title="ট্রানজিট স্টপ">
            <div className="space-y-3">
              {transits.length === 0 && (
                <p className="text-xs text-muted-foreground">কোনো ট্রানজিট নেই — সরাসরি ফ্লাইট।</p>
              )}
              {transits.map((t, idx) => (
                <div key={idx} className="grid sm:grid-cols-[1fr_1fr_1fr_auto] gap-2 items-start border border-border rounded-xl p-3">
                  <Input
                    value={t.airport}
                    onChange={e => updateTransit(idx, { airport: e.target.value })}
                    placeholder="বিমানবন্দর (DXB)"
                  />
                  <Input
                    value={t.city}
                    onChange={e => updateTransit(idx, { city: e.target.value })}
                    placeholder="শহর (দুবাই)"
                  />
                  <Input
                    value={t.duration}
                    onChange={e => updateTransit(idx, { duration: e.target.value })}
                    placeholder="২ ঘণ্টা ১০ মিনিট"
                  />
                  <button
                    type="button"
                    onClick={() => removeTransit(idx)}
                    className="p-2 text-muted-foreground hover:text-rose-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addTransit}
                className="w-full py-3 border-2 border-dashed border-border rounded-xl text-sm text-muted-foreground hover:border-primary hover:text-primary inline-flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> ট্রানজিট যোগ করুন
              </button>
            </div>
          </Card>

          <Card title="কেবিন ও আসন">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>কেবিন ক্লাস</Label>
                <Select value={cabinClass} onChange={e => setCabinClass(e.target.value as CabinClass)}>
                  <option value="ECONOMY">Economy</option>
                  <option value="ECONOMY_PLUS">Economy Plus</option>
                  <option value="BUSINESS">Business</option>
                  <option value="FIRST">First</option>
                </Select>
              </div>
              <div>
                <Label>বুকিং অবস্থা</Label>
                <Select value={bookingStatus} onChange={e => setBookingStatus(e.target.value as BookingStatus)}>
                  <option value="OPEN">খোলা</option>
                  <option value="CLOSED">বন্ধ</option>
                  <option value="WAITLIST">ওয়েটলিস্ট</option>
                  <option value="SOLDOUT">বিক্রি হয়ে গেছে</option>
                </Select>
              </div>
              <div>
                <Label>মোট আসন</Label>
                <Input type="number" value={seatsTotal} onChange={e => setSeatsTotal(e.target.value)} placeholder="290" />
              </div>
              <div>
                <Label>উপলব্ধ আসন</Label>
                <Input type="number" value={seatsAvailable} onChange={e => setSeatsAvailable(e.target.value)} placeholder="84" />
              </div>
              <div className="sm:col-span-2">
                <Label>ব্যাগেজ</Label>
                <Input value={baggageAllowance} onChange={e => setBaggageAllowance(e.target.value)} placeholder="৩০ কেজি চেকড + ৭ কেজি কেবিন" />
              </div>
              <div className="sm:col-span-2">
                <Label>খাবার</Label>
                <Input value={mealInfo} onChange={e => setMealInfo(e.target.value)} placeholder="গরম হালাল খাবার" />
              </div>
            </div>
          </Card>

          <Card title="মূল্য">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <Label>মূল্য (USD)</Label>
                <Input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="745" />
              </div>
              <div>
                <Label>কর</Label>
                <Input type="number" value={taxes} onChange={e => setTaxes(e.target.value)} placeholder="95" />
              </div>
              <div>
                <Label>ছাড়</Label>
                <Input type="number" value={discount} onChange={e => setDiscount(e.target.value)} placeholder="0" />
              </div>
            </div>
          </Card>

          <Card title="অতিরিক্ত নোট">
            <Textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)} placeholder="বিশেষ মন্তব্য…" />
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
