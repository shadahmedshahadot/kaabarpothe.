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
        <ArrowLeft className="w-4 h-4" /> Back to flights
      </Link>

      <PageTitle
        title={`Edit ${flight.flightNumber}`}
        description={`${flight.departureCity} → ${flight.arrivalCity} · ${flight.airlineName}`}
        action={
          <div className="flex gap-2">
            <Link
              href={ROUTES.flights.detail(flight.slug)}
              target="_blank"
              className="px-4 py-2 border border-border rounded-xl text-sm font-semibold hover:bg-muted inline-flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" /> View live
            </Link>
            <button className="px-4 py-2 border border-rose-200 text-rose-600 rounded-xl text-sm font-semibold hover:bg-rose-50 inline-flex items-center gap-2">
              <Trash2 className="w-4 h-4" /> Delete
            </button>
            <button className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary">
              <Save className="w-4 h-4" /> Save changes
            </button>
          </div>
        }
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Airline">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Airline name</Label>
                <Input defaultValue={flight.airlineName} />
              </div>
              <div>
                <Label>Flight number</Label>
                <Input defaultValue={flight.flightNumber} />
              </div>
            </div>
          </Card>

          <Card title="Route">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Departure airport</Label>
                <Input defaultValue={flight.departureAirport} />
              </div>
              <div>
                <Label>Arrival airport</Label>
                <Input defaultValue={flight.arrivalAirport} />
              </div>
              <div>
                <Label>Departure city</Label>
                <Input defaultValue={flight.departureCity} />
              </div>
              <div>
                <Label>Arrival city</Label>
                <Input defaultValue={flight.arrivalCity} />
              </div>
            </div>
          </Card>

          <Card title="Schedule">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Departure date</Label>
                <Input type="date" defaultValue={flight.departureDate} />
              </div>
              <div>
                <Label>Departure time</Label>
                <Input type="time" defaultValue={flight.departureTime} />
              </div>
              <div>
                <Label>Arrival date</Label>
                <Input type="date" defaultValue={flight.arrivalDate} />
              </div>
              <div>
                <Label>Arrival time</Label>
                <Input type="time" defaultValue={flight.arrivalTime} />
              </div>
              <div>
                <Label>Total duration</Label>
                <Input defaultValue={flight.totalDuration} />
              </div>
              <div>
                <Label>Transit duration</Label>
                <Input defaultValue={flight.transitDuration} />
              </div>
            </div>
          </Card>

          <Card title="Transits">
            {flight.transits.length === 0 ? (
              <p className="text-sm text-muted-foreground">Non-stop flight — no transits configured.</p>
            ) : (
              <div className="space-y-3">
                {flight.transits.map((t, i) => (
                  <div key={i} className="border border-border rounded-xl p-4 grid sm:grid-cols-3 gap-3">
                    <div>
                      <Label>Transit airport</Label>
                      <Input defaultValue={t.airport} />
                    </div>
                    <div>
                      <Label>Transit city</Label>
                      <Input defaultValue={t.city} />
                    </div>
                    <div>
                      <Label>Duration</Label>
                      <Input defaultValue={t.duration} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card title="Cabin & service">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Cabin class</Label>
                <Select defaultValue={flight.cabinClass}>
                  <option value="economy">Economy</option>
                  <option value="economy-plus">Economy Plus</option>
                  <option value="business">Business</option>
                  <option value="first">First</option>
                </Select>
              </div>
              <div>
                <Label>Baggage allowance</Label>
                <Input defaultValue={flight.baggageAllowance} />
              </div>
              <div className="sm:col-span-2">
                <Label>Meal information</Label>
                <Input defaultValue={flight.mealInfo} />
              </div>
            </div>
          </Card>

          <Card title="Seat inventory & pricing">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <Label>Total seats</Label>
                <Input type="number" defaultValue={flight.seatsTotal} />
              </div>
              <div>
                <Label>Available seats</Label>
                <Input type="number" defaultValue={flight.seatsAvailable} />
              </div>
              <div>
                <Label>Booking status</Label>
                <Select defaultValue={flight.bookingStatus}>
                  <option value="open">Open</option>
                  <option value="waitlist">Waitlist</option>
                  <option value="soldout">Sold out</option>
                  <option value="closed">Closed</option>
                </Select>
              </div>
              <div>
                <Label>Base fare (USD)</Label>
                <Input type="number" defaultValue={flight.price} />
              </div>
              <div>
                <Label>Taxes & fees (USD)</Label>
                <Input type="number" defaultValue={flight.taxes} />
              </div>
              <div>
                <Label>Discount (USD)</Label>
                <Input type="number" defaultValue={flight.discount} />
              </div>
            </div>
          </Card>

          <Card title="Notes">
            <Textarea rows={4} defaultValue={flight.notes} />
          </Card>
        </div>

        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Card title="Snapshot">
            <div className="space-y-3 text-sm">
              <Row label="Status" value={<Badge variant={flight.status === 'active' ? 'success' : 'warning'}>{flight.status === 'active' ? 'Published' : 'Draft'}</Badge>} />
              <Row label="Booking" value={<Badge variant={flight.bookingStatus === 'open' ? 'success' : flight.bookingStatus === 'soldout' ? 'danger' : 'warning'}>{flight.bookingStatus}</Badge>} />
              <Row label="Total price" value={<span className="font-bold">{formatCurrency(flightTotal(flight))}</span>} />
              <Row label="Bookings" value={flight.bookingsCount.toLocaleString()} />
              <Row label="Rating" value={`${flight.rating} (${flight.reviewsCount})`} />
              <Row label="Published" value={flight.publishedAt} />
            </div>
          </Card>

          <Card title="Status">
            <Select defaultValue={flight.status}>
              <option value="active">Active (published)</option>
              <option value="inactive">Inactive (draft)</option>
            </Select>
            <label className="flex items-center gap-2 mt-4 text-sm">
              <input type="checkbox" className="rounded border-border" defaultChecked={flight.featured} /> Mark as featured
            </label>
          </Card>

          <Card title="Seat management">
            <div className="rounded-xl bg-muted/40 p-4 text-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">Sold</span>
                <span className="font-semibold">{flight.seatsTotal - flight.seatsAvailable}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">Available</span>
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
              <button className="flex-1 py-2 border border-border rounded-lg text-xs font-semibold hover:bg-muted">+ Hold 5</button>
              <button className="flex-1 py-2 border border-border rounded-lg text-xs font-semibold hover:bg-muted">Release</button>
            </div>
          </Card>

          <Card title="Quick links">
            <Link href={ROUTES.flights.detail(flight.slug)} target="_blank" className="text-sm text-primary hover:underline inline-flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5" /> View on public site
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
