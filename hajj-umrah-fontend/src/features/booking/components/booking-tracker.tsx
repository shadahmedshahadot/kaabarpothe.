'use client'

import { useState } from 'react'
import {
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  Loader2,
  MessageCircle,
  Plane,
  Send,
  Upload,
  UserCheck,
  Hotel as HotelIcon,
  Bus,
  AlertCircle,
} from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import {
  useGetBookingQuery,
  useGetBookingTimelineQuery,
  useGetBookingMessagesQuery,
  useGetBookingDocumentsQuery,
  useSendBookingMessageMutation,
  useUploadBookingDocumentMutation,
  STATUS_LABEL,
  STATUS_TONE,
  type BookingDto,
  type BookingDocumentDto,
  type BookingTimelineEventDto,
  type BookingMessageDto,
} from '@/redux/fetchres/booking/bookingApi'
import { toast } from 'sonner'

export function BookingTracker({ code }: { code: string }) {
  const { data, isLoading, isError } = useGetBookingQuery(code, { pollingInterval: 30000 })
  const booking = data?.data

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }
  if (isError || !booking) {
    return <div className="text-center py-20 text-rose-500">বুকিং পাওয়া যায়নি।</div>
  }

  return (
    <>
      <PageTitle title={`বুকিং ${booking.bookingCode}`} description={booking.packageName} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <StatusCard booking={booking} />
          <TimelineCard bookingId={booking.id} />
          <DocumentsCard bookingId={booking.id} />
          <MessagesCard bookingId={booking.id} />
        </div>
        <div className="space-y-6">
          <SummaryCard booking={booking} />
          <TravelersCard booking={booking} />
        </div>
      </div>
    </>
  )
}

function StatusCard({ booking }: { booking: BookingDto }) {
  return (
    <div className="bg-card border border-border rounded-3xl p-6">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">বর্তমান অবস্থা</p>
          <h2 className="text-xl font-bold text-foreground">{STATUS_LABEL[booking.status]}</h2>
        </div>
        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${STATUS_TONE[booking.status]}`}>
          {STATUS_LABEL[booking.status]}
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Tile icon={Calendar} label="প্রস্থান" value={new Date(booking.departureDate).toLocaleDateString()} />
        <Tile icon={Calendar} label="ফেরত" value={new Date(booking.returnDate).toLocaleDateString()} />
        <Tile icon={CreditCard} label="পেমেন্ট" value={booking.paymentStatus} />
        <Tile icon={UserCheck} label="ভিসা" value={booking.visaStatus} />
      </div>

      {booking.assignedConsultant && (
        <div className="mt-4 rounded-2xl border border-border bg-muted/30 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
            {booking.assignedConsultant.full_name.slice(0, 1)}
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">আপনার কনসালট্যান্ট</p>
            <p className="text-sm font-semibold text-foreground">{booking.assignedConsultant.full_name}</p>
            <p className="text-xs text-muted-foreground">{booking.assignedConsultant.email}</p>
          </div>
        </div>
      )}

      {booking.adminNotes && (
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 text-amber-900 p-4">
          <p className="text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5" /> অ্যাডমিন বার্তা</p>
          <p className="text-sm">{booking.adminNotes}</p>
        </div>
      )}
    </div>
  )
}

function TimelineCard({ bookingId }: { bookingId: string }) {
  const { data, isLoading } = useGetBookingTimelineQuery(bookingId, { pollingInterval: 30000 })
  const events = data?.data ?? []
  return (
    <div className="bg-card border border-border rounded-3xl p-6">
      <h2 className="font-bold text-foreground mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /> টাইমলাইন</h2>
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
      ) : events.length === 0 ? (
        <p className="text-sm text-muted-foreground">এখনো কোনো ইভেন্ট নেই।</p>
      ) : (
        <ol className="relative border-l border-border ml-3 space-y-5">
          {events.map(ev => (
            <TimelineItem key={ev.id} ev={ev} />
          ))}
        </ol>
      )}
    </div>
  )
}

function TimelineItem({ ev }: { ev: BookingTimelineEventDto }) {
  return (
    <li className="ml-6">
      <span className="absolute -left-[7px] flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-card" />
      <div className="flex flex-wrap items-baseline gap-2">
        <p className="text-sm font-semibold text-foreground">{ev.title}</p>
        <span className="text-xs text-muted-foreground">{new Date(ev.createdAt).toLocaleString()}</span>
      </div>
      {ev.description && <p className="text-sm text-muted-foreground mt-0.5">{ev.description}</p>}
      {ev.performedByName && (
        <p className="text-xs text-muted-foreground mt-1">— {ev.performedByName}</p>
      )}
    </li>
  )
}

function DocumentsCard({ bookingId }: { bookingId: string }) {
  const { data, isLoading } = useGetBookingDocumentsQuery(bookingId, { pollingInterval: 30000 })
  const docs = data?.data ?? []
  const [upload, { isLoading: isUploading }] = useUploadBookingDocumentMutation()
  const [busyDocId, setBusyDocId] = useState<string | null>(null)

  const handleUpload = async (file: File, doc?: BookingDocumentDto) => {
    setBusyDocId(doc?.id ?? 'NEW')
    try {
      const fileUrl = await uploadToBackend(file)
      await upload({
        id: bookingId,
        documentId: doc?.id,
        type: doc?.type ?? 'OTHER',
        name: doc?.name ?? file.name,
        fileUrl,
        fileName: file.name,
      }).unwrap()
      toast.success('ডকুমেন্ট আপলোড সম্পন্ন')
    } catch (e) {
      const message = (e as { data?: { message?: string } })?.data?.message ?? 'আপলোড ব্যর্থ'
      toast.error(message)
    } finally {
      setBusyDocId(null)
    }
  }

  return (
    <div className="bg-card border border-border rounded-3xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-foreground flex items-center gap-2"><FileText className="w-5 h-5 text-primary" /> ডকুমেন্ট</h2>
        <label className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline cursor-pointer">
          <Upload className="w-4 h-4" /> নতুন আপলোড
          <input
            type="file"
            className="hidden"
            onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0])}
            disabled={isUploading}
          />
        </label>
      </div>
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
      ) : docs.length === 0 ? (
        <p className="text-sm text-muted-foreground">এখনো ডকুমেন্ট নেই।</p>
      ) : (
        <div className="space-y-2">
          {docs.map(d => (
            <div key={d.id} className="flex items-center gap-3 rounded-2xl border border-border p-3">
              <FileText className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{d.name}</p>
                <p className="text-xs text-muted-foreground">{d.description ?? d.type}</p>
              </div>
              <DocStatusBadge status={d.status} />
              {d.fileUrl ? (
                <a href={d.fileUrl} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">দেখুন</a>
              ) : (
                <label className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline cursor-pointer">
                  {busyDocId === d.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />} আপলোড
                  <input
                    type="file"
                    className="hidden"
                    onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0], d)}
                    disabled={isUploading}
                  />
                </label>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function DocStatusBadge({ status }: { status: BookingDocumentDto['status'] }) {
  const tone: Record<BookingDocumentDto['status'], string> = {
    REQUESTED: 'bg-amber-100 text-amber-700',
    UPLOADED: 'bg-sky-100 text-sky-700',
    VERIFIED: 'bg-emerald-100 text-emerald-700',
    REJECTED: 'bg-rose-100 text-rose-700',
  }
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tone[status]}`}>{status}</span>
}

function MessagesCard({ bookingId }: { bookingId: string }) {
  const { data, isLoading } = useGetBookingMessagesQuery(bookingId, { pollingInterval: 15000 })
  const messages = data?.data ?? []
  const [send, { isLoading: isSending }] = useSendBookingMessageMutation()
  const [text, setText] = useState('')

  const onSend = async () => {
    if (!text.trim()) return
    try {
      await send({ id: bookingId, content: text }).unwrap()
      setText('')
    } catch (e) {
      const message = (e as { data?: { message?: string } })?.data?.message ?? 'মেসেজ পাঠানো ব্যর্থ'
      toast.error(message)
    }
  }

  return (
    <div className="bg-card border border-border rounded-3xl p-6">
      <h2 className="font-bold text-foreground mb-4 flex items-center gap-2"><MessageCircle className="w-5 h-5 text-primary" /> বার্তা</h2>
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {messages.length === 0 && <p className="text-sm text-muted-foreground">এখনো কোনো বার্তা নেই।</p>}
          {messages.map(m => (
            <MessageBubble key={m.id} m={m} />
          ))}
        </div>
      )}
      <div className="mt-4 flex items-end gap-2">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={2}
          placeholder="আপনার বার্তা লিখুন…"
          className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button
          onClick={onSend}
          disabled={isSending || !text.trim()}
          className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground inline-flex items-center gap-1.5 text-sm font-semibold hover:bg-primary/90 disabled:opacity-50"
        >
          {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} পাঠান
        </button>
      </div>
    </div>
  )
}

function MessageBubble({ m }: { m: BookingMessageDto }) {
  const mine = m.senderRole === 'USER'
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm ${mine ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
        <p className={`text-xs font-semibold mb-0.5 ${mine ? 'opacity-90' : 'text-muted-foreground'}`}>
          {m.senderName} <span className="opacity-70">· {new Date(m.createdAt).toLocaleString()}</span>
        </p>
        <p className="whitespace-pre-wrap">{m.content}</p>
      </div>
    </div>
  )
}

function SummaryCard({ booking }: { booking: BookingDto }) {
  return (
    <div className="bg-card border border-border rounded-3xl p-6">
      <h2 className="font-bold text-foreground mb-3">সারাংশ</h2>
      <dl className="space-y-2 text-sm">
        <Row label="প্যাকেজ" value={booking.packageName} icon={CheckCircle2} />
        {booking.flightId && <Row label="ফ্লাইট" value="বরাদ্দ হয়েছে" icon={Plane} />}
        {booking.hotelId && <Row label="হোটেল" value="বরাদ্দ হয়েছে" icon={HotelIcon} />}
        {booking.transportId && <Row label="পরিবহন" value="বরাদ্দ হয়েছে" icon={Bus} />}
        <Row label="পরিমাণ" value={`৳ ${booking.totalAmount.toLocaleString()}`} />
        <Row label="পরিশোধিত" value={`৳ ${booking.paidAmount.toLocaleString()}`} />
        <Row label="হাজী" value={String(booking.pilgrimsCount)} />
        <Row label="জমা" value={new Date(booking.bookedDate).toLocaleDateString()} />
      </dl>
    </div>
  )
}

function TravelersCard({ booking }: { booking: BookingDto }) {
  const travelers = booking.travelers ?? []
  return (
    <div className="bg-card border border-border rounded-3xl p-6">
      <h2 className="font-bold text-foreground mb-3">ভ্রমণকারী</h2>
      <div className="space-y-2">
        {travelers.length === 0 && <p className="text-sm text-muted-foreground">তথ্য নেই।</p>}
        {travelers.map((t, i) => (
          <div key={t.id ?? i} className="rounded-2xl border border-border p-3 text-sm">
            <p className="font-semibold text-foreground">{i + 1}. {t.fullName}</p>
            <p className="text-xs text-muted-foreground">পাসপোর্ট: {t.passportNumber} · {t.nationality}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Tile({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border p-3">
      <p className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"><Icon className="w-3.5 h-3.5" /> {label}</p>
      <p className="font-semibold text-foreground mt-1">{value}</p>
    </div>
  )
}

function Row({ label, value, icon: Icon }: { label: string; value: string; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <dt className="text-muted-foreground inline-flex items-center gap-1.5">{Icon && <Icon className="w-3.5 h-3.5" />} {label}</dt>
      <dd className="font-semibold text-foreground text-right truncate max-w-[60%]">{value}</dd>
    </div>
  )
}

async function uploadToBackend(file: File): Promise<string> {
  const fd = new FormData()
  fd.append('file', file)
  const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:9000/api'
  const token = (typeof window !== 'undefined' && (window as unknown as { __token?: string }).__token) || null
  let bearer = token
  if (!bearer && typeof window !== 'undefined') {
    try {
      const raw = window.localStorage.getItem('persist:root')
      if (raw) {
        const obj = JSON.parse(raw)
        const auth = obj.auth ? JSON.parse(obj.auth) : null
        bearer = auth?.token ?? null
      }
    } catch {}
  }
  fd.append('folder', 'documents')
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
