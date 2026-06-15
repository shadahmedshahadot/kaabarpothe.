import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Save, Plane, ExternalLink, Trash2 } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Input, Textarea, Select, Label } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/utils/format'
import { getFlightById, flightTotal, flights } from '@/data/flights'
import { ROUTES } from '@/constants'

export const dynamicParams = false

export async function generateStaticParams() {
  return flights.map(f => ({ id: f.id }))
}

export default async function AdminFlightDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const flight = getFlightById(id)
  if (!flight) notFound()

  return (
    <>
      <Link href={ROUTES.admin.flights} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> ফ্লাইটে ফিরে যান
      </Link>

      <PageTitle
        title={`${flight.flightNumber} সম্পাদনা`}
        description={`${flight.departureCity} → ${flight.arrivalCity} · ${flight.airlineName}`}
        action={
          <div className="flex gap-2">
            <Link
              href={ROUTES.flights.detail(flight.slug)}
              target="_blank"
              className="px-4 py-2 border border-border rounded-xl text-sm font-semibold hover:bg-muted inline-flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" /> লাইভ দেখুন
            </Link>
            <button className="px-4 py-2 border border-rose-200 text-rose-600 rounded-xl text-sm font-semibold hover:bg-rose-50 inline-flex items-center gap-2">
              <Trash2 className="w-4 h-4" /> মুছুন
            </button>
            <button className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary">
              <Save className="w-4 h-4" /> পরিবর্তন সংরক্ষণ করুন
            </button>
          </div>
        }
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="এয়ারলাইন">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>এয়ারলাইনের নাম</Label>
                <Input defaultValue={flight.airlineName} />
              </div>
              <div>
                <Label>ফ্লাইট নম্বর</Label>
                <Input defaultValue={flight.flightNumber} />
              </div>
            </div>
          </Card>

          <Card title="রুট">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>প্রস্থানের বিমানবন্দর</Label>
                <Input defaultValue={flight.departureAirport} />
              </div>
              <div>
                <Label>আগমনের বিমানবন্দর</Label>
                <Input defaultValue={flight.arrivalAirport} />
              </div>
              <div>
                <Label>প্রস্থানের শহর</Label>
                <Input defaultValue={flight.departureCity} />
              </div>
              <div>
                <Label>আগমনের শহর</Label>
                <Input defaultValue={flight.arrivalCity} />
              </div>
            </div>
          </Card>

          <Card title="সময়সূচি">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>প্রস্থানের তারিখ</Label>
                <Input type="date" defaultValue={flight.departureDate} />
              </div>
              <div>
                <Label>প্রস্থানের সময়</Label>
                <Input type="time" defaultValue={flight.departureTime} />
              </div>
              <div>
                <Label>আগমনের তারিখ</Label>
                <Input type="date" defaultValue={flight.arrivalDate} />
              </div>
              <div>
                <Label>আগমনের সময়</Label>
                <Input type="time" defaultValue={flight.arrivalTime} />
              </div>
              <div>
                <Label>মোট সময়কাল</Label>
                <Input defaultValue={flight.totalDuration} />
              </div>
              <div>
                <Label>ট্রানজিট সময়কাল</Label>
                <Input defaultValue={flight.transitDuration} />
              </div>
            </div>
          </Card>

          <Card title="ট্রানজিট">
            {flight.transits.length === 0 ? (
              <p className="text-sm text-muted-foreground">নন-স্টপ ফ্লাইট — কোনো ট্রানজিট কনফিগার করা নেই।</p>
            ) : (
              <div className="space-y-3">
                {flight.transits.map((t, i) => (
                  <div key={i} className="border border-border rounded-xl p-4 grid sm:grid-cols-3 gap-3">
                    <div>
                      <Label>ট্রানজিট বিমানবন্দর</Label>
                      <Input defaultValue={t.airport} />
                    </div>
                    <div>
                      <Label>ট্রানজিট শহর</Label>
                      <Input defaultValue={t.city} />
                    </div>
                    <div>
                      <Label>সময়কাল</Label>
                      <Input defaultValue={t.duration} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card title="কেবিন ও সেবা">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>কেবিন ক্লাস</Label>
                <Select defaultValue={flight.cabinClass}>
                  <option value="economy">ইকোনমি</option>
                  <option value="economy-plus">ইকোনমি প্লাস</option>
                  <option value="business">বিজনেস</option>
                  <option value="first">ফার্স্ট</option>
                </Select>
              </div>
              <div>
                <Label>ব্যাগেজ ভাতা</Label>
                <Input defaultValue={flight.baggageAllowance} />
              </div>
              <div className="sm:col-span-2">
                <Label>খাবারের তথ্য</Label>
                <Input defaultValue={flight.mealInfo} />
              </div>
            </div>
          </Card>

          <Card title="আসন ইনভেন্টরি ও মূল্য">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <Label>মোট আসন</Label>
                <Input type="number" defaultValue={flight.seatsTotal} />
              </div>
              <div>
                <Label>উপলব্ধ আসন</Label>
                <Input type="number" defaultValue={flight.seatsAvailable} />
              </div>
              <div>
                <Label>বুকিং অবস্থা</Label>
                <Select defaultValue={flight.bookingStatus}>
                  <option value="open">খোলা</option>
                  <option value="waitlist">ওয়েটলিস্ট</option>
                  <option value="soldout">বিক্রি হয়ে গেছে</option>
                  <option value="closed">বন্ধ</option>
                </Select>
              </div>
              <div>
                <Label>মৌলিক ভাড়া (USD)</Label>
                <Input type="number" defaultValue={flight.price} />
              </div>
              <div>
                <Label>কর ও ফি (USD)</Label>
                <Input type="number" defaultValue={flight.taxes} />
              </div>
              <div>
                <Label>ছাড় (USD)</Label>
                <Input type="number" defaultValue={flight.discount} />
              </div>
            </div>
          </Card>

          <Card title="নোট">
            <Textarea rows={4} defaultValue={flight.notes} />
          </Card>
        </div>

        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Card title="স্ন্যাপশট">
            <div className="space-y-3 text-sm">
              <Row label="অবস্থা" value={<Badge variant={flight.status === 'active' ? 'success' : 'warning'}>{flight.status === 'active' ? 'প্রকাশিত' : 'খসড়া'}</Badge>} />
              <Row label="বুকিং" value={<Badge variant={flight.bookingStatus === 'open' ? 'success' : flight.bookingStatus === 'soldout' ? 'danger' : 'warning'}>{flight.bookingStatus}</Badge>} />
              <Row label="মোট মূল্য" value={<span className="font-bold">{formatCurrency(flightTotal(flight))}</span>} />
              <Row label="বুকিং" value={flight.bookingsCount.toLocaleString()} />
              <Row label="রেটিং" value={`${flight.rating} (${flight.reviewsCount})`} />
              <Row label="প্রকাশিত" value={flight.publishedAt} />
            </div>
          </Card>

          <Card title="অবস্থা">
            <Select defaultValue={flight.status}>
              <option value="active">সক্রিয় (প্রকাশিত)</option>
              <option value="inactive">নিষ্ক্রিয় (খসড়া)</option>
            </Select>
            <label className="flex items-center gap-2 mt-4 text-sm">
              <input type="checkbox" className="rounded border-border" defaultChecked={flight.featured} /> ফিচার্ড হিসেবে চিহ্নিত করুন
            </label>
          </Card>

          <Card title="আসন ব্যবস্থাপনা">
            <div className="rounded-xl bg-muted/40 p-4 text-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">বিক্রিত</span>
                <span className="font-semibold">{flight.seatsTotal - flight.seatsAvailable}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">উপলব্ধ</span>
                <span className="font-semibold">{flight.seatsAvailable}</span>
              </div>
              <div className="h-2 rounded-full bg-border overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${((flight.seatsTotal - flight.seatsAvailable) / flight.seatsTotal) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 py-2 border border-border rounded-lg text-xs font-semibold hover:bg-muted">+ ৫ হোল্ড</button>
              <button className="flex-1 py-2 border border-border rounded-lg text-xs font-semibold hover:bg-muted">রিলিজ</button>
            </div>
          </Card>

          <Card title="দ্রুত লিঙ্ক">
            <Link href={ROUTES.flights.detail(flight.slug)} target="_blank" className="text-sm text-primary hover:underline inline-flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5" /> পাবলিক সাইটে দেখুন
            </Link>
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

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  )
}
