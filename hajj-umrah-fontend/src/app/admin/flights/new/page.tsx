import Link from 'next/link'
import { ArrowLeft, Save, Plus, X, Plane, Upload } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Input, Textarea, Select, Label } from '@/components/ui/input'
import { ROUTES } from '@/constants'

export default function NewFlightPage() {
  return (
    <>
      <Link href={ROUTES.admin.flights} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to flights
      </Link>

      <PageTitle
        title="Create new flight"
        description="Add an airline schedule with cabin, baggage, and seat inventory for independent flight bookings."
        action={
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-border rounded-xl text-sm font-semibold hover:bg-muted">Save draft</button>
            <button className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary">
              <Save className="w-4 h-4" /> Publish
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
                <Input placeholder="Biman Bangladesh Airlines" />
              </div>
              <div>
                <Label>Flight number</Label>
                <Input placeholder="BG 1041" />
              </div>
            </div>
            <div>
              <Label>Airline logo / IATA code</Label>
              <div className="flex items-center gap-3">
                <Input placeholder="BG" className="w-32" />
                <div className="aspect-square w-12 rounded-xl border-2 border-dashed border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary cursor-pointer">
                  <Upload className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Card>

          <Card title="Route">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Departure airport</Label>
                <Input placeholder="Hazrat Shahjalal International (DAC)" />
              </div>
              <div>
                <Label>Arrival airport</Label>
                <Input placeholder="King Abdulaziz International (JED)" />
              </div>
              <div>
                <Label>Departure city</Label>
                <Select defaultValue="Dhaka">
                  <option>Dhaka</option><option>Chattogram</option><option>Jeddah</option><option>Madinah</option>
                </Select>
              </div>
              <div>
                <Label>Arrival city</Label>
                <Select defaultValue="Jeddah">
                  <option>Jeddah</option><option>Madinah</option><option>Dhaka</option><option>Chattogram</option>
                </Select>
              </div>
            </div>
          </Card>

          <Card title="Schedule">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Departure date</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>Departure time</Label>
                <Input type="time" />
              </div>
              <div>
                <Label>Arrival date</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>Arrival time</Label>
                <Input type="time" />
              </div>
              <div>
                <Label>Total journey duration</Label>
                <Input placeholder="8h 15m" />
              </div>
              <div>
                <Label>Transit duration</Label>
                <Input placeholder="Non-stop or e.g. 2h 10m" />
              </div>
            </div>
          </Card>

          <Card title="Transits">
            <p className="text-xs text-muted-foreground mb-4">Add layover airports if not a non-stop flight.</p>
            <div className="space-y-3">
              {[1].map(i => (
                <div key={i} className="border border-border rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Plane className="w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Transit airport (e.g. Dubai International)" className="flex-1" />
                    <button className="p-2 text-muted-foreground hover:text-rose-500"><X className="w-4 h-4" /></button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Input placeholder="Transit city" />
                    <Input placeholder="Layover duration (e.g. 2h 10m)" />
                  </div>
                </div>
              ))}
              <button className="w-full py-3 border-2 border-dashed border-border rounded-xl text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors inline-flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Add transit
              </button>
            </div>
          </Card>

          <Card title="Cabin & service">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Cabin class</Label>
                <Select defaultValue="economy">
                  <option value="economy">Economy</option>
                  <option value="economy-plus">Economy Plus</option>
                  <option value="business">Business</option>
                  <option value="first">First</option>
                </Select>
              </div>
              <div>
                <Label>Baggage allowance</Label>
                <Input placeholder="30 kg checked + 7 kg cabin" />
              </div>
              <div className="sm:col-span-2">
                <Label>Meal information</Label>
                <Input placeholder="Halal hot meal + beverages" />
              </div>
            </div>
          </Card>

          <Card title="Seat inventory & pricing">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <Label>Total seats</Label>
                <Input type="number" placeholder="290" />
              </div>
              <div>
                <Label>Available seats</Label>
                <Input type="number" placeholder="290" />
              </div>
              <div>
                <Label>Booking status</Label>
                <Select defaultValue="open">
                  <option value="open">Open</option>
                  <option value="waitlist">Waitlist</option>
                  <option value="soldout">Sold out</option>
                  <option value="closed">Closed</option>
                </Select>
              </div>
              <div>
                <Label>Base fare (USD)</Label>
                <Input type="number" placeholder="745" />
              </div>
              <div>
                <Label>Taxes & fees (USD)</Label>
                <Input type="number" placeholder="95" />
              </div>
              <div>
                <Label>Discount (USD)</Label>
                <Input type="number" placeholder="0" />
              </div>
            </div>
          </Card>

          <Card title="Notes">
            <Textarea rows={4} placeholder="Operational notes, group discounts, special handling…" />
          </Card>
        </div>

        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Card title="Status">
            <Select defaultValue="active">
              <option value="active">Active (published)</option>
              <option value="inactive">Inactive (draft)</option>
            </Select>
            <label className="flex items-center gap-2 mt-4 text-sm">
              <input type="checkbox" className="rounded border-border" /> Mark as featured
            </label>
          </Card>

          <Card title="Independent booking">
            <p className="text-xs text-muted-foreground mb-3">Allow pilgrims to book this flight without purchasing a full package.</p>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded border-border" defaultChecked /> Allow flight-only booking
            </label>
          </Card>

          <Card title="Visibility">
            <Select defaultValue="public">
              <option value="public">Public listing</option>
              <option value="package-only">Bundled with packages only</option>
            </Select>
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
