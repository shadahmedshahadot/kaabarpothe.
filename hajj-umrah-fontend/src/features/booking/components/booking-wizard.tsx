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
  { id: 1, label: 'সেবা নির্বাচন করুন' },
  { id: 2, label: 'ভ্রমণকারী' },
  { id: 3, label: 'রিভিউ' },
  { id: 4, label: 'পেমেন্ট' },
]

const PAYMENT_METHODS: { value: PaymentMethod; label: string; description: string }[] = [
  { value: 'bkash', label: 'বিকাশ', description: 'মোবাইল ওয়ালেট · তাৎক্ষণিক কনফার্মেশন' },
  { value: 'nagad', label: 'নগদ', description: 'মোবাইল ওয়ালেট · তাৎক্ষণিক কনফার্মেশন' },
  { value: 'sslcommerz', label: 'SSLCommerz', description: 'কার্ড, ইন্টারনেট ব্যাংকিং' },
  { value: 'bank-transfer', label: 'ব্যাংক ট্রান্সফার', description: 'ম্যানুয়াল যাচাই · ২৪ ঘণ্টা' },
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
        <div className="max-w-7xl mx-auto py-24 text-center text-muted-foreground">আপনার বুকিং লোড হচ্ছে…</div>
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
          <ArrowLeft className="w-4 h-4" /> ব্রাউজিং চালিয়ে যান
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">আপনার বুকিং সম্পন্ন করুন</h1>
          <p className="text-muted-foreground">প্যাকেজ, ফ্লাইট, হোটেল ও পরিবহনের জন্য একটি ইউনিফাইড প্রবাহ।</p>
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
                  <ArrowLeft className="w-4 h-4" /> ফিরে যান
                </button>
              ) : <span />}

              {step < 4 ? (
                <button
                  onClick={goNext}
                  disabled={!canNext}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {step === 3 ? 'পেমেন্টে এগিয়ে যান' : 'চালিয়ে যান'} <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleConfirm}
                  disabled={items.length === 0}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary/90 disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4" /> বুকিং নিশ্চিত করুন · {formatCurrency(totals.total)}
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
      <Card title="সেবা নির্বাচন করুন" subtitle="আপনি যা বুক করতে চান যোগ করুন। মুক্তভাবে একত্রিত করুন।">
        <div className="rounded-2xl border-2 border-dashed border-border p-10 text-center">
          <ShoppingCart className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground mb-4">আপনার বুকিং খালি। শুরু করতে সেবা বেছে নিন।</p>
          <div className="grid sm:grid-cols-2 gap-3 max-w-md mx-auto">
            <QuickLink href={ROUTES.packages.umrah} icon={PackageIcon} label="প্যাকেজ ব্রাউজ করুন" />
            <QuickLink href={ROUTES.flights.root} icon={Plane} label="ফ্লাইট ব্রাউজ করুন" />
            <QuickLink href={ROUTES.hotels.root} icon={HotelIcon} label="হোটেল ব্রাউজ করুন" />
            <QuickLink href={ROUTES.transportation.root} icon={Bus} label="পরিবহন ব্রাউজ করুন" />
          </div>
        </div>
      </Card>
    )
  }
  return (
    <Card title="আপনার নির্বাচন" subtitle="আরও সেবা যোগ করুন বা প্রয়োজন নেই যা সরিয়ে ফেলুন।">
      <CartItems />
      <div className="grid sm:grid-cols-4 gap-2 pt-2">
        <QuickLink href={ROUTES.packages.umrah} icon={PackageIcon} label="প্যাকেজ যোগ করুন" compact />
        <QuickLink href={ROUTES.flights.root} icon={Plane} label="ফ্লাইট যোগ করুন" compact />
        <QuickLink href={ROUTES.hotels.root} icon={HotelIcon} label="হোটেল যোগ করুন" compact />
        <QuickLink href={ROUTES.transportation.root} icon={Bus} label="পরিবহন যোগ করুন" compact />
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
            <button onClick={() => removeItem(it.id)} className="p-2 text-muted-foreground hover:text-rose-500" title="সরান">
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
      <Card title="প্রধান যোগাযোগ" subtitle="আমরা এখানে কনফার্মেশন ও আপডেট পাঠাব।">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label>প্রধান যোগাযোগের নাম</Label>
            <Input value={contact.name} onChange={e => onChangeContact({ ...contact, name: e.target.value })} placeholder="মোহাম্মদ আবদুল্লাহ" />
          </div>
          <div>
            <Label>ফোন নম্বর</Label>
            <Input value={contact.phone} onChange={e => onChangeContact({ ...contact, phone: e.target.value })} placeholder="+880 1XXX-XXXXXX" />
          </div>
          <div className="sm:col-span-2">
            <Label>ইমেইল ঠিকানা</Label>
            <Input type="email" value={contact.email} onChange={e => onChangeContact({ ...contact, email: e.target.value })} placeholder="you@example.com" />
          </div>
        </div>
      </Card>

      <Card title="ভ্রমণকারীর তথ্য" subtitle="প্রতিটি হাজীর জন্য বিস্তারিত যোগ করুন। পাসপোর্টের সাথে মিলতে হবে।">
        <div className="space-y-5">
          {travelers.map((t, i) => (
            <div key={t.id} className="border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">হাজী {i + 1}</p>
                {travelers.length > 1 && (
                  <button onClick={() => removeTraveler(t.id)} className="text-xs text-rose-500 hover:underline">সরান</button>
                )}
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <Label>পুরো নাম (পাসপোর্ট অনুযায়ী)</Label>
                  <Input value={t.fullName} onChange={e => setTraveler(t.id, { fullName: e.target.value })} placeholder="মোহাম্মদ আবদুল্লাহ" />
                </div>
                <div>
                  <Label>লিঙ্গ</Label>
                  <Select value={t.gender} onChange={e => setTraveler(t.id, { gender: e.target.value as 'male' | 'female' })}>
                    <option value="male">পুরুষ</option>
                    <option value="female">মহিলা</option>
                  </Select>
                </div>
                <div>
                  <Label>জন্ম তারিখ</Label>
                  <Input type="date" value={t.dateOfBirth} onChange={e => setTraveler(t.id, { dateOfBirth: e.target.value })} />
                </div>
                <div>
                  <Label>পাসপোর্ট নম্বর</Label>
                  <Input value={t.passportNumber} onChange={e => setTraveler(t.id, { passportNumber: e.target.value })} placeholder="A12345678" />
                </div>
                <div>
                  <Label>পাসপোর্টের মেয়াদ</Label>
                  <Input type="date" value={t.passportExpiry} onChange={e => setTraveler(t.id, { passportExpiry: e.target.value })} />
                </div>
                <div>
                  <Label>জাতীয়তা</Label>
                  <Input value={t.nationality} onChange={e => setTraveler(t.id, { nationality: e.target.value })} />
                </div>
                <div>
                  <Label>মোবাইল নম্বর</Label>
                  <Input value={t.mobile} onChange={e => setTraveler(t.id, { mobile: e.target.value })} placeholder="+880 1XXX-XXXXXX" />
                </div>
                <div className="sm:col-span-2">
                  <Label>ইমেইল ঠিকানা</Label>
                  <Input type="email" value={t.email} onChange={e => setTraveler(t.id, { email: e.target.value })} placeholder="pilgrim@example.com" />
                </div>
                <div className="sm:col-span-2">
                  <Label>জরুরি যোগাযোগ</Label>
                  <Input value={t.emergencyContact} onChange={e => setTraveler(t.id, { emergencyContact: e.target.value })} placeholder="নাম + ফোন নম্বর" />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addTraveler}
            className="w-full py-3 border-2 border-dashed border-border rounded-2xl text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors inline-flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> আরেকজন ভ্রমণকারী যোগ করুন
          </button>
        </div>
      </Card>

      <Card title="বিশেষ অনুরোধ (ঐচ্ছিক)">
        <Input value={notes} onChange={e => onChangeNotes(e.target.value)} placeholder="হুইলচেয়ার সুবিধা, পাশাপাশি রুম, খাদ্যাভ্যাস…" />
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
      <Card title="নির্বাচিত সেবাসমূহ">
        <CartItems />
      </Card>
      <Card title="ভ্রমণকারী">
        <div className="space-y-3">
          {travelers.map((t, i) => (
            <div key={t.id} className="rounded-2xl border border-border p-4 text-sm">
              <p className="font-semibold text-foreground">{i + 1}. {t.fullName || <span className="text-rose-500">নাম নেই</span>}</p>
              <div className="grid sm:grid-cols-3 gap-1 mt-2 text-xs text-muted-foreground">
                <span>পাসপোর্ট: {t.passportNumber || '—'}</span>
                <span className="capitalize">লিঙ্গ: {t.gender}</span>
                <span>জন্ম তারিখ: {t.dateOfBirth || '—'}</span>
                <span>জাতীয়তা: {t.nationality || '—'}</span>
                <span>মোবাইল: {t.mobile || '—'}</span>
                <span>ইমেইল: {t.email || '—'}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="প্রধান যোগাযোগ">
        <div className="grid sm:grid-cols-3 gap-2 text-sm text-foreground/80">
          <div><span className="text-muted-foreground text-xs uppercase tracking-wider block">নাম</span>{contact.name || '—'}</div>
          <div><span className="text-muted-foreground text-xs uppercase tracking-wider block">ইমেইল</span>{contact.email || '—'}</div>
          <div><span className="text-muted-foreground text-xs uppercase tracking-wider block">ফোন</span>{contact.phone || '—'}</div>
        </div>
      </Card>
      {notes && (
        <Card title="বিশেষ অনুরোধ">
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
      <Card title="পেমেন্ট পরিকল্পনা">
        <div className="grid sm:grid-cols-3 gap-3">
          <PlanOption value="full" current={paymentPlan} onChange={onChangePlan} title="পুরো পরিশোধ" subtitle={formatCurrency(total)} />
          <PlanOption value="partial" current={paymentPlan} onChange={onChangePlan} title="২৫% জামানত" subtitle={`${formatCurrency(Math.round(total * 0.25))} এখন`} />
          <PlanOption value="installment" current={paymentPlan} onChange={onChangePlan} title="৪টি কিস্তি" subtitle={`${formatCurrency(Math.round(total / 4))}/মাস`} />
        </div>
      </Card>

      <Card title="পেমেন্ট পদ্ধতি">
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

      <Card title="নিশ্চিত করুন">
        <label className="flex items-start gap-3 text-sm text-foreground/80">
          <input type="checkbox" defaultChecked className="rounded border-border mt-0.5" />
          <span>
            আমি নিশ্চিত করছি সব তথ্য সঠিক এবং আমি{' '}
            <Link href={ROUTES.terms} className="text-primary hover:underline">শর্তাবলি</Link> ও{' '}
            <Link href={ROUTES.refund} className="text-primary hover:underline">রিফান্ড নীতি</Link> মেনে নিচ্ছি।
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
