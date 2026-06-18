'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  ArrowLeft,
  ClipboardList,
  FileText,
  History,
  Loader2,
  MessageCircle,
  Send,
  Trash2,
  Upload,
  UserCheck,
} from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import {
  useGetBookingQuery,
  useUpdateBookingStatusMutation,
  useDeleteBookingMutation,
  useAssignConsultantMutation,
  useRequestBookingDocumentsMutation,
  useVerifyBookingDocumentMutation,
  useUploadBookingDocumentMutation,
  useUpdateBookingNotesMutation,
  useUpdateBookingPaymentMutation,
  useUpdateBookingVisaMutation,
  useAssignFlightMutation,
  useAssignHotelMutation,
  useAssignTransportMutation,
  useGetBookingTimelineQuery,
  useGetBookingMessagesQuery,
  useGetBookingDocumentsQuery,
  useGetBookingActivityLogQuery,
  useGetBookingStatusHistoryQuery,
  useSendBookingMessageMutation,
  STATUS_LABEL,
  STATUS_TONE,
  ALL_STATUSES,
  type BookingStatus,
  type BookingDocumentDto,
  type BookingDto,
} from '@/redux/fetchres/booking/bookingApi'
import { formatCurrency, formatDate } from '@/utils/format'

export function AdminBookingManager({ id }: { id: string }) {
  const router = useRouter()
  const { data, isLoading, isError } = useGetBookingQuery(id, { pollingInterval: 30000 })
  const booking = data?.data
  const [deleteBooking] = useDeleteBookingMutation()
  const [deleting, setDeleting] = useState(false)

  if (isLoading) return <div className="flex justify-center py-40"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
  if (isError || !booking) return <div className="text-center py-40 text-rose-500">বুকিং পাওয়া যায়নি।</div>

  const onDelete = async () => {
    if (!confirm(`"${booking.bookingCode}" মুছবেন?`)) return
    setDeleting(true)
    try {
      await deleteBooking(booking.id).unwrap()
      toast.success('বুকিং মুছে ফেলা হয়েছে')
      router.push('/admin/bookings')
    } catch {
      toast.error('মুছতে ব্যর্থ হয়েছে')
      setDeleting(false)
    }
  }

  return (
    <>
      <Link href="/admin/bookings" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> বুকিং তালিকায় ফিরে যান
      </Link>

      <PageTitle
        title={booking.bookingCode}
        description={`${booking.packageName} · ${booking.pilgrimsCount} জন হাজী · ${booking.pilgrimName}`}
        action={
          <div className="flex gap-2 flex-wrap items-center">
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${STATUS_TONE[booking.status]}`}>
              {STATUS_LABEL[booking.status]}
            </span>
            <button onClick={onDelete} disabled={deleting} className="px-3 py-2 border border-rose-500/30 text-rose-600 rounded-xl text-sm font-semibold hover:bg-rose-500/10 disabled:opacity-60 inline-flex items-center gap-1.5">
              {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />} মুছুন
            </button>
          </div>
        }
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <BookingOverview booking={booking} />
          <StatusUpdater id={booking.id} current={booking.status} />
          <NotesEditor id={booking.id} adminNotes={booking.adminNotes ?? ''} notes={booking.notes ?? ''} />
          <PaymentBlock id={booking.id} totalAmount={booking.totalAmount} paidAmount={booking.paidAmount} paymentStatus={booking.paymentStatus} />
          <VisaBlock id={booking.id} visaStatus={booking.visaStatus} />
          <DocumentsBlock id={booking.id} />
          <MessagesBlock id={booking.id} />
        </div>
        <div className="space-y-6">
          <AssignConsultantBlock id={booking.id} current={booking.assignedConsultant} />
          <AssignEntitiesBlock id={booking.id} flightId={booking.flightId ?? null} hotelId={booking.hotelId ?? null} transportId={booking.transportId ?? null} />
          <TimelineBlock id={booking.id} />
          <StatusHistoryBlock id={booking.id} />
          <ActivityLogBlock id={booking.id} />
        </div>
      </div>
    </>
  )
}

function BookingOverview({ booking }: { booking: BookingDto }) {
  return (
    <div className="bg-card border border-border rounded-3xl p-6">
      <h3 className="font-bold text-foreground mb-4">বুকিং তথ্য</h3>
      <dl className="grid sm:grid-cols-2 gap-3 text-sm">
        <Row label="প্যাকেজ" value={booking.packageName} />
        <Row label="ধরন" value={booking.packageType} />
        <Row label="বুকিং তারিখ" value={formatDate(booking.bookedDate)} />
        <Row label="প্রস্থান" value={formatDate(booking.departureDate)} />
        <Row label="ফেরত" value={formatDate(booking.returnDate)} />
        <Row label="হাজী" value={`${booking.pilgrimsCount} জন`} />
        <Row label="ইমেইল" value={booking.pilgrimEmail} />
        <Row label="ফোন" value={booking.pilgrimPhone} />
        {booking.pilgrimNationality && <Row label="জাতীয়তা" value={booking.pilgrimNationality} />}
        {booking.pilgrimPassportNo && <Row label="পাসপোর্ট" value={booking.pilgrimPassportNo} />}
        <Row label="মোট" value={formatCurrency(booking.totalAmount)} />
        <Row label="পরিশোধিত" value={formatCurrency(booking.paidAmount)} />
      </dl>
      {booking.specialRequests && (
        <div className="mt-4 rounded-xl bg-muted/40 p-3">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">বিশেষ অনুরোধ</p>
          <p className="text-sm">{booking.specialRequests}</p>
        </div>
      )}
    </div>
  )
}

function StatusUpdater({ id, current }: { id: string; current: BookingStatus }) {
  const [update, { isLoading }] = useUpdateBookingStatusMutation()
  const [status, setStatus] = useState<BookingStatus>(current)
  const [note, setNote] = useState('')

  const submit = async () => {
    try {
      await update({ id, status, note: note || undefined }).unwrap()
      toast.success(`অবস্থা: ${STATUS_LABEL[status]}`)
      setNote('')
    } catch (e) {
      toast.error((e as { data?: { message?: string } })?.data?.message ?? 'আপডেট ব্যর্থ')
    }
  }

  return (
    <div className="bg-card border border-border rounded-3xl p-6">
      <h3 className="font-bold text-foreground mb-4">অবস্থা আপডেট করুন</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        <select value={status} onChange={e => setStatus(e.target.value as BookingStatus)} className="rounded-xl border border-border bg-background px-3 py-2 text-sm">
          {ALL_STATUSES.map(s => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
        </select>
        <input value={note} onChange={e => setNote(e.target.value)} placeholder="অভ্যন্তরীণ নোট (ঐচ্ছিক)" className="rounded-xl border border-border bg-background px-3 py-2 text-sm" />
      </div>
      <button onClick={submit} disabled={isLoading} className="mt-3 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 inline-flex items-center gap-1.5">
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />} আপডেট করুন
      </button>
    </div>
  )
}

function NotesEditor({ id, adminNotes, notes }: { id: string; adminNotes: string; notes: string }) {
  const [update, { isLoading }] = useUpdateBookingNotesMutation()
  const [a, setA] = useState(adminNotes)
  const [n, setN] = useState(notes)
  const save = async () => {
    try {
      await update({ id, adminNotes: a, notes: n }).unwrap()
      toast.success('নোট সংরক্ষিত')
    } catch {
      toast.error('সংরক্ষণ ব্যর্থ')
    }
  }
  return (
    <div className="bg-card border border-border rounded-3xl p-6">
      <h3 className="font-bold text-foreground mb-4">নোট</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground">কাস্টমার নোট (দৃশ্যমান)</label>
          <textarea value={a} onChange={e => setA(e.target.value)} rows={3} className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground">অভ্যন্তরীণ নোট</label>
          <textarea value={n} onChange={e => setN(e.target.value)} rows={3} className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
        </div>
      </div>
      <button onClick={save} disabled={isLoading} className="mt-3 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 disabled:opacity-50">সংরক্ষণ</button>
    </div>
  )
}

function PaymentBlock({ id, totalAmount, paidAmount, paymentStatus }: { id: string; totalAmount: number; paidAmount: number; paymentStatus: 'UNPAID' | 'PARTIAL' | 'PAID' | 'REFUNDED' }) {
  const [update, { isLoading }] = useUpdateBookingPaymentMutation()
  const [paid, setPaid] = useState(paidAmount)
  const [status, setStatus] = useState(paymentStatus)
  const [note, setNote] = useState('')
  const save = async () => {
    try {
      await update({ id, paidAmount: paid, paymentStatus: status, note: note || undefined }).unwrap()
      toast.success('পেমেন্ট আপডেট হয়েছে')
      setNote('')
    } catch {
      toast.error('আপডেট ব্যর্থ')
    }
  }
  return (
    <div className="bg-card border border-border rounded-3xl p-6">
      <h3 className="font-bold text-foreground mb-4">পেমেন্ট</h3>
      <div className="grid sm:grid-cols-3 gap-3">
        <div>
          <label className="text-xs text-muted-foreground">মোট</label>
          <p className="font-bold text-foreground">{formatCurrency(totalAmount)}</p>
        </div>
        <div>
          <label className="text-xs text-muted-foreground">পরিশোধিত</label>
          <input type="number" value={paid} onChange={e => setPaid(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">অবস্থা</label>
          <select value={status} onChange={e => setStatus(e.target.value as typeof status)} className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm">
            <option value="UNPAID">UNPAID</option>
            <option value="PARTIAL">PARTIAL</option>
            <option value="PAID">PAID</option>
            <option value="REFUNDED">REFUNDED</option>
          </select>
        </div>
      </div>
      <input value={note} onChange={e => setNote(e.target.value)} placeholder="টাইমলাইন নোট" className="mt-3 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
      <button onClick={save} disabled={isLoading} className="mt-3 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 disabled:opacity-50">সংরক্ষণ</button>
    </div>
  )
}

function VisaBlock({ id, visaStatus }: { id: string; visaStatus: 'PENDING' | 'SUBMITTED' | 'APPROVED' | 'REJECTED' }) {
  const [update, { isLoading }] = useUpdateBookingVisaMutation()
  const [status, setStatus] = useState(visaStatus)
  const [note, setNote] = useState('')
  const save = async () => {
    try {
      await update({ id, visaStatus: status, note: note || undefined }).unwrap()
      toast.success('ভিসা স্ট্যাটাস আপডেট')
      setNote('')
    } catch {
      toast.error('আপডেট ব্যর্থ')
    }
  }
  return (
    <div className="bg-card border border-border rounded-3xl p-6">
      <h3 className="font-bold text-foreground mb-4">ভিসা</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        <select value={status} onChange={e => setStatus(e.target.value as typeof status)} className="rounded-xl border border-border bg-background px-3 py-2 text-sm">
          <option value="PENDING">PENDING</option>
          <option value="SUBMITTED">SUBMITTED</option>
          <option value="APPROVED">APPROVED</option>
          <option value="REJECTED">REJECTED</option>
        </select>
        <input value={note} onChange={e => setNote(e.target.value)} placeholder="নোট (ঐচ্ছিক)" className="rounded-xl border border-border bg-background px-3 py-2 text-sm" />
      </div>
      <button onClick={save} disabled={isLoading} className="mt-3 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 disabled:opacity-50">সংরক্ষণ</button>
    </div>
  )
}

function DocumentsBlock({ id }: { id: string }) {
  const { data } = useGetBookingDocumentsQuery(id, { pollingInterval: 30000 })
  const docs = data?.data ?? []
  const [request, { isLoading: requesting }] = useRequestBookingDocumentsMutation()
  const [verify] = useVerifyBookingDocumentMutation()
  const [upload, { isLoading: uploading }] = useUploadBookingDocumentMutation()
  const [draftType, setDraftType] = useState('')
  const [draftName, setDraftName] = useState('')

  const ask = async () => {
    if (!draftType.trim()) return toast.error('ডকুমেন্টের ধরন লিখুন')
    try {
      await request({ id, documents: [{ type: draftType, name: draftName || draftType }] }).unwrap()
      setDraftType('')
      setDraftName('')
      toast.success('ডকুমেন্ট অনুরোধ জানানো হয়েছে')
    } catch {
      toast.error('ব্যর্থ')
    }
  }

  const onVerify = async (d: BookingDocumentDto, status: 'VERIFIED' | 'REJECTED') => {
    const reason = status === 'REJECTED' ? prompt('প্রত্যাখ্যানের কারণ?') || undefined : undefined
    try {
      await verify({ id, documentId: d.id, status, reason }).unwrap()
      toast.success(`ডকুমেন্ট ${status}`)
    } catch {
      toast.error('ব্যর্থ')
    }
  }

  const onAdminUpload = async (file: File) => {
    try {
      const fileUrl = await uploadToBackend(file)
      await upload({ id, fileUrl, fileName: file.name, name: file.name, type: 'ADMIN_DOC' }).unwrap()
      toast.success('আপলোড সম্পন্ন')
    } catch {
      toast.error('আপলোড ব্যর্থ')
    }
  }

  return (
    <div className="bg-card border border-border rounded-3xl p-6">
      <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-primary" /> ডকুমেন্ট</h3>
      <div className="grid sm:grid-cols-3 gap-2 mb-3">
        <input value={draftType} onChange={e => setDraftType(e.target.value)} placeholder="ধরন (PASSPORT, NID...)" className="rounded-xl border border-border bg-background px-3 py-2 text-sm" />
        <input value={draftName} onChange={e => setDraftName(e.target.value)} placeholder="নাম (ঐচ্ছিক)" className="rounded-xl border border-border bg-background px-3 py-2 text-sm" />
        <button onClick={ask} disabled={requesting} className="rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 disabled:opacity-50">অনুরোধ</button>
      </div>
      <label className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline cursor-pointer mb-3">
        <Upload className="w-4 h-4" /> অ্যাডমিন ডকুমেন্ট আপলোড
        <input type="file" className="hidden" onChange={e => e.target.files?.[0] && onAdminUpload(e.target.files[0])} disabled={uploading} />
      </label>
      <div className="space-y-2">
        {docs.length === 0 && <p className="text-sm text-muted-foreground">কোনো ডকুমেন্ট নেই।</p>}
        {docs.map(d => (
          <div key={d.id} className="flex items-center gap-3 rounded-2xl border border-border p-3">
            <FileText className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{d.name}</p>
              <p className="text-xs text-muted-foreground">{d.type} · {d.status}</p>
              {d.rejectionReason && <p className="text-xs text-rose-600">কারণ: {d.rejectionReason}</p>}
            </div>
            {d.fileUrl && <a href={d.fileUrl} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">দেখুন</a>}
            {d.status === 'UPLOADED' && (
              <>
                <button onClick={() => onVerify(d, 'VERIFIED')} className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20">যাচাই</button>
                <button onClick={() => onVerify(d, 'REJECTED')} className="text-xs px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-700 hover:bg-rose-500/20">প্রত্যাখ্যান</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function MessagesBlock({ id }: { id: string }) {
  const { data } = useGetBookingMessagesQuery(id, { pollingInterval: 15000 })
  const messages = data?.data ?? []
  const [send, { isLoading }] = useSendBookingMessageMutation()
  const [text, setText] = useState('')

  const onSend = async () => {
    if (!text.trim()) return
    try {
      await send({ id, content: text }).unwrap()
      setText('')
    } catch {
      toast.error('মেসেজ পাঠানো ব্যর্থ')
    }
  }

  return (
    <div className="bg-card border border-border rounded-3xl p-6">
      <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><MessageCircle className="w-5 h-5 text-primary" /> বার্তা</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
        {messages.length === 0 && <p className="text-sm text-muted-foreground">কোনো বার্তা নেই।</p>}
        {messages.map(m => {
          const mine = m.senderRole === 'ADMIN'
          return (
            <div key={m.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm ${mine ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                <p className={`text-xs font-semibold mb-0.5 ${mine ? 'opacity-90' : 'text-muted-foreground'}`}>
                  {m.senderName} · {new Date(m.createdAt).toLocaleString()}
                </p>
                <p className="whitespace-pre-wrap">{m.content}</p>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-4 flex items-end gap-2">
        <textarea value={text} onChange={e => setText(e.target.value)} rows={2} placeholder="কাস্টমারকে বার্তা পাঠান…" className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm resize-none" />
        <button onClick={onSend} disabled={isLoading || !text.trim()} className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground inline-flex items-center gap-1.5 text-sm font-semibold hover:bg-primary/90 disabled:opacity-50">
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} পাঠান
        </button>
      </div>
    </div>
  )
}

function AssignConsultantBlock({ id, current }: { id: string; current?: { id: string; full_name: string; email: string } | null }) {
  const [assign, { isLoading }] = useAssignConsultantMutation()
  const [staffId, setStaffId] = useState(current?.id ?? '')
  const submit = async () => {
    if (!staffId.trim()) return toast.error('স্টাফ ID দরকার')
    try {
      await assign({ id, staffId }).unwrap()
      toast.success('কনসালট্যান্ট অ্যাসাইন করা হয়েছে')
    } catch (e) {
      toast.error((e as { data?: { message?: string } })?.data?.message ?? 'ব্যর্থ')
    }
  }
  return (
    <div className="bg-card border border-border rounded-3xl p-6">
      <h3 className="font-bold text-foreground mb-3 flex items-center gap-2"><UserCheck className="w-5 h-5 text-primary" /> কনসালট্যান্ট</h3>
      {current && <p className="text-sm text-foreground mb-2">বর্তমান: <span className="font-semibold">{current.full_name}</span> · {current.email}</p>}
      <input value={staffId} onChange={e => setStaffId(e.target.value)} placeholder="স্টাফ User ID" className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
      <button onClick={submit} disabled={isLoading} className="mt-2 w-full rounded-xl bg-primary text-primary-foreground py-2 text-sm font-semibold hover:bg-primary/90 disabled:opacity-50">অ্যাসাইন করুন</button>
    </div>
  )
}

function AssignEntitiesBlock({ id, flightId, hotelId, transportId }: { id: string; flightId: string | null; hotelId: string | null; transportId: string | null }) {
  const [assignFlight] = useAssignFlightMutation()
  const [assignHotel] = useAssignHotelMutation()
  const [assignTransport] = useAssignTransportMutation()
  const [f, setF] = useState(flightId ?? '')
  const [h, setH] = useState(hotelId ?? '')
  const [t, setT] = useState(transportId ?? '')

  const wrap = async (fn: () => Promise<unknown>, name: string) => {
    try {
      await fn()
      toast.success(`${name} অ্যাসাইন হয়েছে`)
    } catch (e) {
      toast.error((e as { data?: { message?: string } })?.data?.message ?? 'ব্যর্থ')
    }
  }

  return (
    <div className="bg-card border border-border rounded-3xl p-6">
      <h3 className="font-bold text-foreground mb-3">বরাদ্দ</h3>
      <div className="space-y-2">
        <Field label="ফ্লাইট ID" value={f} onChange={setF} onSubmit={() => wrap(() => assignFlight({ id, flightId: f }).unwrap(), 'ফ্লাইট')} />
        <Field label="হোটেল ID" value={h} onChange={setH} onSubmit={() => wrap(() => assignHotel({ id, hotelId: h }).unwrap(), 'হোটেল')} />
        <Field label="পরিবহন ID" value={t} onChange={setT} onSubmit={() => wrap(() => assignTransport({ id, transportId: t }).unwrap(), 'পরিবহন')} />
      </div>
    </div>
  )
}

function Field({ label, value, onChange, onSubmit }: { label: string; value: string; onChange: (v: string) => void; onSubmit: () => void }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      <div className="flex gap-2 mt-1">
        <input value={value} onChange={e => onChange(e.target.value)} className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm" />
        <button onClick={onSubmit} disabled={!value.trim()} className="px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 disabled:opacity-50">অ্যাসাইন</button>
      </div>
    </div>
  )
}

function TimelineBlock({ id }: { id: string }) {
  const { data } = useGetBookingTimelineQuery(id, { pollingInterval: 30000 })
  const events = data?.data ?? []
  return (
    <div className="bg-card border border-border rounded-3xl p-6">
      <h3 className="font-bold text-foreground mb-3 flex items-center gap-2"><ClipboardList className="w-5 h-5 text-primary" /> টাইমলাইন</h3>
      <ol className="relative border-l border-border ml-2 space-y-3 max-h-80 overflow-y-auto pr-1">
        {events.length === 0 && <p className="text-sm text-muted-foreground">কোনো ইভেন্ট নেই।</p>}
        {events.map(ev => (
          <li key={ev.id} className="ml-4">
            <span className="absolute -left-[5px] w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-card" />
            <p className="text-sm font-semibold text-foreground">{ev.title}</p>
            <p className="text-xs text-muted-foreground">{new Date(ev.createdAt).toLocaleString()} · {ev.performedByName ?? 'System'}</p>
            {ev.description && <p className="text-xs text-foreground/80 mt-0.5">{ev.description}</p>}
          </li>
        ))}
      </ol>
    </div>
  )
}

function StatusHistoryBlock({ id }: { id: string }) {
  const { data } = useGetBookingStatusHistoryQuery(id, { pollingInterval: 30000 })
  const items = data?.data ?? []
  return (
    <div className="bg-card border border-border rounded-3xl p-6">
      <h3 className="font-bold text-foreground mb-3 flex items-center gap-2"><History className="w-5 h-5 text-primary" /> স্ট্যাটাস ইতিহাস</h3>
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {items.length === 0 && <p className="text-sm text-muted-foreground">নেই।</p>}
        {items.map(s => (
          <div key={s.id} className="text-sm">
            <p className="font-semibold text-foreground">{s.fromStatus ? `${STATUS_LABEL[s.fromStatus]} → ` : ''}{STATUS_LABEL[s.toStatus]}</p>
            <p className="text-xs text-muted-foreground">{new Date(s.createdAt).toLocaleString()} · {s.changedByName ?? 'System'}</p>
            {s.note && <p className="text-xs text-foreground/80">{s.note}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

function ActivityLogBlock({ id }: { id: string }) {
  const { data } = useGetBookingActivityLogQuery(id, { pollingInterval: 60000 })
  const items = data?.data ?? []
  return (
    <div className="bg-card border border-border rounded-3xl p-6">
      <h3 className="font-bold text-foreground mb-3 flex items-center gap-2"><History className="w-5 h-5 text-primary" /> অ্যাডমিন অ্যাক্টিভিটি</h3>
      <div className="space-y-2 max-h-72 overflow-y-auto">
        {items.length === 0 && <p className="text-sm text-muted-foreground">কোনো লগ নেই।</p>}
        {items.map(a => (
          <div key={a.id} className="text-xs border-b border-border pb-1.5">
            <p className="font-semibold text-foreground">{a.action}</p>
            <p className="text-muted-foreground">{new Date(a.createdAt).toLocaleString()} · {a.adminName ?? 'System'}</p>
            {a.note && <p className="text-foreground/80">{a.note}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="font-semibold text-foreground">{value}</dd>
    </div>
  )
}

async function uploadToBackend(file: File): Promise<string> {
  const fd = new FormData()
  fd.append('file', file)
  fd.append('folder', 'documents')
  const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:9000/api'
  let bearer: string | null = null
  if (typeof window !== 'undefined') {
    try {
      const raw = window.localStorage.getItem('persist:root')
      if (raw) {
        const obj = JSON.parse(raw)
        const auth = obj.auth ? JSON.parse(obj.auth) : null
        bearer = auth?.token ?? null
      }
    } catch {}
  }
  const res = await fetch(`${base}/uploads/single`, {
    method: 'POST',
    body: fd,
    headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
  })
  if (!res.ok) throw new Error('upload failed')
  const json = (await res.json()) as { data?: { url?: string } }
  const url = json?.data?.url
  if (!url) throw new Error('no url returned')
  return url
}
