'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, ShoppingCart, Plane, Hotel as HotelIcon, Bus, Package as PackageIcon, Plus, ShieldCheck, Trash2 } from 'lucide-react'
import { Input, Select, Label } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/utils/format'
import { useCartStore, cartTotals, blankTraveler, newBookingCode, type PaymentMethod, type PaymentPlan } from '@/store/cart'
import { BookingSummarySidebar } from './booking-summary-sidebar'
import { ROUTES } from '@/constants'

const STEPS = [
  { id: 1, label: 'Select services' },
  { id: 2, label: 'Travelers' },
  { id: 3, label: 'Review' },
  { id: 4, label: 'Payment' },
]

const PAYMENT_METHODS: { value: PaymentMethod; label: string; description: string }[] = [
  { value: 'bkash', label: 'bKash', description: 'Mobile wallet · instant confirmation' },
  { value: 'nagad', label: 'Nagad', description: 'Mobile wallet · instant confirmation' },
  { value: 'sslcommerz', label: 'SSLCommerz', description: 'Cards, internet banking' },
  { value: 'bank-transfer', label: 'Bank transfer', description: 'Manual verification · 24h' },
]

export function BookingWizard() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [hydrated, setHydrated] = useState(false)

  const items = useCartStore(s => s.items)
  const travelers = useCartStore(s => s.travelers)
  const contact = useCartStore(s => s.contact)
  const paymentMethod = useCartStore(s => s.paymentMethod)
  const paymentPlan = useCartStore(s => s.paymentPlan)
  const notes = useCartStore(s => s.notes)
  const setTravelers = useCartStore(s => s.setTravelers)
  const setContact = useCartStore(s => s.setContact)
  const setPaymentMethod = useCartStore(s => s.setPaymentMethod)
  const setPaymentPlan = useCartStore(s => s.setPaymentPlan)
  const setNotes = useCartStore(s => s.setNotes)
  const saveBooking = useCartStore(s => s.saveBooking)
  const clearCart = useCartStore(s => s.clearCart)

  useEffect(() => {
    setHydrated(true)
  }, [])

  const totals = cartTotals(items)
  const canNext = step === 1 ? items.length > 0 : step === 2 ? travelers.length > 0 && travelers.every(t => t.fullName && t.passportNumber) && contact.email && contact.phone : true

  if (!hydrated) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto py-24 text-center text-muted-foreground">Loading your booking…</div>
      </div>
    )
  }

  const goNext = () => setStep(s => Math.min(4, s + 1))
  const goPrev = () => setStep(s => Math.max(1, s - 1))

  const handleConfirm = () => {
    const code = newBookingCode()
    const paidAmount = paymentPlan === 'partial' ? Math.round(totals.total * 0.25) : paymentPlan === 'installment' ? Math.round(totals.total / 4) : totals.total

    saveBooking({
      code,
      items: [...items],
      travelers: [...travelers],
      contact: { ...contact },
      paymentMethod,
      paymentPlan,
      subtotal: totals.subtotal,
      taxes: totals.taxes,
      serviceFee: totals.serviceFee,
      discount: 0,
      total: totals.total,
      paidAmount,
      status: 'confirmed',
      notes,
    })

    clearCart()
    router.push(ROUTES.booking.confirmation(code))
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-24">
      <div className="max-w-7xl mx-auto">
        <Link href={ROUTES.home} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4" /> Continue browsing
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Complete your booking</h1>
          <p className="text-muted-foreground">One unified flow for packages, flights, hotels, and transport.</p>
        </div>

        <Stepper current={step} />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {step === 1 && <StepServices />}
            {step === 2 && (
              <StepTravelers
                travelers={travelers}
                contact={contact}
                onChangeTravelers={setTravelers}
                onChangeContact={setContact}
                notes={notes}
                onChangeNotes={setNotes}
              />
            )}
            {step === 3 && <StepReview travelers={travelers} contact={contact} notes={notes} />}
            {step === 4 && (
              <StepPayment
                paymentMethod={paymentMethod}
                paymentPlan={paymentPlan}
                onChangeMethod={setPaymentMethod}
                onChangePlan={setPaymentPlan}
                total={totals.total}
              />
            )}

            <div className="flex items-center justify-between gap-3 pt-2">
              {step > 1 ? (
                <button onClick={goPrev} className="px-5 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-muted inline-flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : <span />}

              {step < 4 ? (
                <button
                  onClick={goNext}
                  disabled={!canNext}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {step === 3 ? 'Proceed to payment' : 'Continue'} <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleConfirm}
                  disabled={items.length === 0}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary/90 disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4" /> Confirm booking · {formatCurrency(totals.total)}
                </button>
              )}
            </div>
          </div>

          <BookingSummarySidebar editable={step === 1} />
        </div>
      </div>
    </div>
  )
}

function Stepper({ current }: { current: number }) {
  return (
    <div className="mb-8 hidden sm:block">
      <ol className="flex items-center gap-2">
        {STEPS.map((s, idx) => {
          const done = current > s.id
          const active = current === s.id
          return (
            <li key={s.id} className="flex items-center gap-2 flex-1">
              <motion.div
                initial={false}
                animate={{ scale: active ? 1.05 : 1 }}
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors ${done ? 'bg-emerald-500 text-white' : active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
              >
                {done ? <Check className="w-4 h-4" /> : s.id}
              </motion.div>
              <span className={`text-sm truncate ${active ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>{s.label}</span>
              {idx < STEPS.length - 1 && <div className={`flex-1 h-px ${done ? 'bg-emerald-500' : 'bg-border'}`} />}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function StepServices() {
  const items = useCartStore(s => s.items)
  if (items.length === 0) {
    return (
      <Card title="Select services" subtitle="Add anything you want to book. Combine freely.">
        <div className="rounded-2xl border-2 border-dashed border-border p-10 text-center">
          <ShoppingCart className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground mb-4">Your booking is empty. Pick services to get started.</p>
          <div className="grid sm:grid-cols-2 gap-3 max-w-md mx-auto">
            <QuickLink href={ROUTES.packages.umrah} icon={PackageIcon} label="Browse packages" />
            <QuickLink href={ROUTES.flights.root} icon={Plane} label="Browse flights" />
            <QuickLink href={ROUTES.hotels.root} icon={HotelIcon} label="Browse hotels" />
            <QuickLink href={ROUTES.transportation.root} icon={Bus} label="Browse transport" />
          </div>
        </div>
      </Card>
    )
  }
  return (
    <Card title="Your selection" subtitle="Add more services or remove what you don't need.">
      <CartItems />
      <div className="grid sm:grid-cols-4 gap-2 pt-2">
        <QuickLink href={ROUTES.packages.umrah} icon={PackageIcon} label="Add package" compact />
        <QuickLink href={ROUTES.flights.root} icon={Plane} label="Add flight" compact />
        <QuickLink href={ROUTES.hotels.root} icon={HotelIcon} label="Add hotel" compact />
        <QuickLink href={ROUTES.transportation.root} icon={Bus} label="Add transport" compact />
      </div>
    </Card>
  )
}

function CartItems() {
  const items = useCartStore(s => s.items)
  const removeItem = useCartStore(s => s.removeItem)
  const updateItem = useCartStore(s => s.updateItem)
  return (
    <div className="space-y-3 mb-4">
      {items.map(it => (
        <div key={it.id} className="flex items-center gap-4 rounded-2xl border border-border p-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="capitalize">{it.kind}</Badge>
              <p className="text-sm font-semibold text-foreground truncate">{it.title}</p>
            </div>
            <p className="text-xs text-muted-foreground truncate">{it.subtitle}</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="text-right">
              {it.qty > 1 && <p className="text-xs text-muted-foreground">{it.qty} × {formatCurrency(it.unitPrice)}</p>}
              <p className="text-lg font-bold text-foreground">{formatCurrency(it.unitPrice * it.qty)}</p>
            </div>
            <input
              type="number"
              min={1}
              value={it.qty}
              onChange={e => updateItem(it.id, { qty: Math.max(1, Number(e.target.value || 1)) })}
              className="w-14 h-9 rounded-lg border border-border bg-background text-center text-sm"
            />
            <button onClick={() => removeItem(it.id)} className="p-2 text-muted-foreground hover:text-rose-500" title="Remove">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

function QuickLink({ href, icon: Icon, label, compact }: { href: string; icon: React.ComponentType<{ className?: string }>; label: string; compact?: boolean }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-border hover:border-primary hover:bg-primary/5 text-sm font-semibold transition-colors ${compact ? 'py-2.5 px-3 text-xs' : 'py-3 px-4'}`}
    >
      <Icon className="w-4 h-4 text-primary" /> {label}
    </Link>
  )
}

function StepTravelers({
  travelers,
  contact,
  onChangeTravelers,
  onChangeContact,
  notes,
  onChangeNotes,
}: {
  travelers: ReturnType<typeof useCartStore.getState>['travelers']
  contact: ReturnType<typeof useCartStore.getState>['contact']
  onChangeTravelers: (t: ReturnType<typeof useCartStore.getState>['travelers']) => void
  onChangeContact: (c: ReturnType<typeof useCartStore.getState>['contact']) => void
  notes: string
  onChangeNotes: (n: string) => void
}) {
  // Ensure at least one traveler exists on first render
  useEffect(() => {
    if (travelers.length === 0) onChangeTravelers([blankTraveler()])
  }, [travelers.length, onChangeTravelers])

  const setTraveler = (id: string, patch: Partial<typeof travelers[0]>) =>
    onChangeTravelers(travelers.map(t => (t.id === id ? { ...t, ...patch } : t)))

  const addTraveler = () => onChangeTravelers([...travelers, blankTraveler()])
  const removeTraveler = (id: string) =>
    onChangeTravelers(travelers.length > 1 ? travelers.filter(t => t.id !== id) : travelers)

  return (
    <>
      <Card title="Lead contact" subtitle="We'll send confirmation and updates here.">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label>Lead contact name</Label>
            <Input value={contact.name} onChange={e => onChangeContact({ ...contact, name: e.target.value })} placeholder="Mohammad Abdullah" />
          </div>
          <div>
            <Label>Phone number</Label>
            <Input value={contact.phone} onChange={e => onChangeContact({ ...contact, phone: e.target.value })} placeholder="+880 1XXX-XXXXXX" />
          </div>
          <div className="sm:col-span-2">
            <Label>Email address</Label>
            <Input type="email" value={contact.email} onChange={e => onChangeContact({ ...contact, email: e.target.value })} placeholder="you@example.com" />
          </div>
        </div>
      </Card>

      <Card title="Traveler information" subtitle="Add details for every pilgrim. Must match passports.">
        <div className="space-y-5">
          {travelers.map((t, i) => (
            <div key={t.id} className="border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Pilgrim {i + 1}</p>
                {travelers.length > 1 && (
                  <button onClick={() => removeTraveler(t.id)} className="text-xs text-rose-500 hover:underline">Remove</button>
                )}
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <Label>Full name (as on passport)</Label>
                  <Input value={t.fullName} onChange={e => setTraveler(t.id, { fullName: e.target.value })} placeholder="Mohammad Abdullah" />
                </div>
                <div>
                  <Label>Gender</Label>
                  <Select value={t.gender} onChange={e => setTraveler(t.id, { gender: e.target.value as 'male' | 'female' })}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Select>
                </div>
                <div>
                  <Label>Date of birth</Label>
                  <Input type="date" value={t.dateOfBirth} onChange={e => setTraveler(t.id, { dateOfBirth: e.target.value })} />
                </div>
                <div>
                  <Label>Passport number</Label>
                  <Input value={t.passportNumber} onChange={e => setTraveler(t.id, { passportNumber: e.target.value })} placeholder="A12345678" />
                </div>
                <div>
                  <Label>Passport expiry</Label>
                  <Input type="date" value={t.passportExpiry} onChange={e => setTraveler(t.id, { passportExpiry: e.target.value })} />
                </div>
                <div>
                  <Label>Nationality</Label>
                  <Input value={t.nationality} onChange={e => setTraveler(t.id, { nationality: e.target.value })} />
                </div>
                <div>
                  <Label>Mobile number</Label>
                  <Input value={t.mobile} onChange={e => setTraveler(t.id, { mobile: e.target.value })} placeholder="+880 1XXX-XXXXXX" />
                </div>
                <div className="sm:col-span-2">
                  <Label>Email address</Label>
                  <Input type="email" value={t.email} onChange={e => setTraveler(t.id, { email: e.target.value })} placeholder="pilgrim@example.com" />
                </div>
                <div className="sm:col-span-2">
                  <Label>Emergency contact</Label>
                  <Input value={t.emergencyContact} onChange={e => setTraveler(t.id, { emergencyContact: e.target.value })} placeholder="Name + phone number" />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addTraveler}
            className="w-full py-3 border-2 border-dashed border-border rounded-2xl text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors inline-flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add another traveler
          </button>
        </div>
      </Card>

      <Card title="Special requests (optional)">
        <Input value={notes} onChange={e => onChangeNotes(e.target.value)} placeholder="Wheelchair access, adjacent rooms, dietary needs…" />
      </Card>
    </>
  )
}

function StepReview({ travelers, contact, notes }: {
  travelers: ReturnType<typeof useCartStore.getState>['travelers']
  contact: ReturnType<typeof useCartStore.getState>['contact']
  notes: string
}) {
  return (
    <>
      <Card title="Selected services">
        <CartItems />
      </Card>
      <Card title="Travelers">
        <div className="space-y-3">
          {travelers.map((t, i) => (
            <div key={t.id} className="rounded-2xl border border-border p-4 text-sm">
              <p className="font-semibold text-foreground">{i + 1}. {t.fullName || <span className="text-rose-500">Name missing</span>}</p>
              <div className="grid sm:grid-cols-3 gap-1 mt-2 text-xs text-muted-foreground">
                <span>Passport: {t.passportNumber || '—'}</span>
                <span className="capitalize">Gender: {t.gender}</span>
                <span>DOB: {t.dateOfBirth || '—'}</span>
                <span>Nationality: {t.nationality || '—'}</span>
                <span>Mobile: {t.mobile || '—'}</span>
                <span>Email: {t.email || '—'}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Lead contact">
        <div className="grid sm:grid-cols-3 gap-2 text-sm text-foreground/80">
          <div><span className="text-muted-foreground text-xs uppercase tracking-wider block">Name</span>{contact.name || '—'}</div>
          <div><span className="text-muted-foreground text-xs uppercase tracking-wider block">Email</span>{contact.email || '—'}</div>
          <div><span className="text-muted-foreground text-xs uppercase tracking-wider block">Phone</span>{contact.phone || '—'}</div>
        </div>
      </Card>
      {notes && (
        <Card title="Special requests">
          <p className="text-sm text-foreground/80">{notes}</p>
        </Card>
      )}
    </>
  )
}

function StepPayment({
  paymentMethod,
  paymentPlan,
  onChangeMethod,
  onChangePlan,
  total,
}: {
  paymentMethod: PaymentMethod
  paymentPlan: PaymentPlan
  onChangeMethod: (m: PaymentMethod) => void
  onChangePlan: (p: PaymentPlan) => void
  total: number
}) {
  return (
    <>
      <Card title="Payment plan">
        <div className="grid sm:grid-cols-3 gap-3">
          <PlanOption value="full" current={paymentPlan} onChange={onChangePlan} title="Pay in full" subtitle={formatCurrency(total)} />
          <PlanOption value="partial" current={paymentPlan} onChange={onChangePlan} title="25% deposit" subtitle={`${formatCurrency(Math.round(total * 0.25))} now`} />
          <PlanOption value="installment" current={paymentPlan} onChange={onChangePlan} title="4 installments" subtitle={`${formatCurrency(Math.round(total / 4))}/month`} />
        </div>
      </Card>

      <Card title="Payment method">
        <div className="grid sm:grid-cols-2 gap-3">
          {PAYMENT_METHODS.map(m => (
            <label
              key={m.value}
              className={`flex items-start gap-3 border rounded-2xl p-4 cursor-pointer transition-colors ${paymentMethod === m.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'}`}
            >
              <input
                type="radio"
                checked={paymentMethod === m.value}
                onChange={() => onChangeMethod(m.value)}
                className="mt-1 accent-primary"
              />
              <div>
                <p className="font-semibold text-foreground">{m.label}</p>
                <p className="text-xs text-muted-foreground">{m.description}</p>
              </div>
            </label>
          ))}
        </div>
      </Card>

      <Card title="Confirm">
        <label className="flex items-start gap-3 text-sm text-foreground/80">
          <input type="checkbox" defaultChecked className="rounded border-border mt-0.5" />
          <span>
            I confirm all details are correct and accept the{' '}
            <Link href={ROUTES.terms} className="text-primary hover:underline">Terms</Link> and{' '}
            <Link href={ROUTES.refund} className="text-primary hover:underline">Refund Policy</Link>.
          </span>
        </label>
      </Card>
    </>
  )
}

function PlanOption({
  value, current, onChange, title, subtitle,
}: { value: PaymentPlan; current: PaymentPlan; onChange: (v: PaymentPlan) => void; title: string; subtitle: string }) {
  const active = current === value
  return (
    <label className={`block border rounded-2xl p-4 cursor-pointer transition-colors ${active ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'}`}>
      <input type="radio" checked={active} onChange={() => onChange(value)} className="sr-only" />
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{title}</p>
      <p className="text-lg font-bold text-foreground mt-1">{subtitle}</p>
    </label>
  )
}

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-3xl p-6">
      <div className="mb-4">
        <h2 className="font-bold text-foreground text-lg">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}
