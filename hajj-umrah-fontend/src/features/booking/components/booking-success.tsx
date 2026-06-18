'use client'

import Link from 'next/link'
import { CheckCircle2, Mail, Phone, FileText, Clock, ArrowRight, LayoutDashboard } from 'lucide-react'
import { useGetBookingQuery, STATUS_LABEL, STATUS_TONE } from '@/redux/fetchres/booking/bookingApi'
import { ROUTES } from '@/constants'

export function BookingSuccess({ code }: { code: string }) {
  const { data, isLoading, isError } = useGetBookingQuery(code)
  const booking = data?.data

  if (isLoading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl mx-auto text-center text-muted-foreground">আপনার বুকিং লোড হচ্ছে…</div>
      </div>
    )
  }

  if (isError || !booking) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-rose-500 font-semibold">বুকিং পাওয়া যায়নি।</p>
          <Link href={ROUTES.home} className="text-primary hover:underline">হোমে ফিরে যান</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-card border border-border rounded-3xl p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">আপনার বুকিং অনুরোধ সফলভাবে জমা হয়েছে</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            আমাদের টিম আপনার অনুরোধ পর্যালোচনা করে শীঘ্রই যোগাযোগ করবে। আপনি ড্যাশবোর্ড থেকে বুকিং স্ট্যাটাস ট্র্যাক করতে পারবেন।
          </p>

          <div className="mt-6 inline-flex flex-col items-center gap-2 rounded-2xl border border-border bg-muted/40 px-6 py-4">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">বুকিং রেফারেন্স</span>
            <span className="text-xl font-bold text-foreground tracking-wide">{booking.bookingCode}</span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_TONE[booking.status]}`}>
              {STATUS_LABEL[booking.status]}
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <InfoTile icon={Clock} title="পরবর্তী ধাপ" body="আমাদের টিম আপনার ডকুমেন্ট ও তথ্য যাচাই করবে।" />
          <InfoTile icon={FileText} title="ডকুমেন্ট" body="প্রয়োজনে আমরা আপনাকে ড্যাশবোর্ডে ডকুমেন্ট আপলোড করতে বলব।" />
          <InfoTile icon={Mail} title="ইমেইল আপডেট" body={booking.pilgrimEmail} />
          <InfoTile icon={Phone} title="ফোন আপডেট" body={booking.pilgrimPhone} />
        </div>

        <div className="bg-card border border-border rounded-3xl p-6 mt-6">
          <h2 className="font-bold text-foreground mb-3">বুকিং সারাংশ</h2>
          <dl className="grid sm:grid-cols-2 gap-3 text-sm">
            <Row label="প্যাকেজ" value={booking.packageName} />
            <Row label="ধরন" value={booking.packageType} />
            <Row label="হাজী সংখ্যা" value={String(booking.pilgrimsCount)} />
            <Row label="প্রস্থান" value={new Date(booking.departureDate).toLocaleDateString()} />
            <Row label="ফেরত" value={new Date(booking.returnDate).toLocaleDateString()} />
            <Row label="মোট" value={`৳ ${booking.totalAmount.toLocaleString()}`} />
          </dl>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Link
            href={ROUTES.pilgrim.bookingDetail(booking.bookingCode)}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold hover:bg-primary/90"
          >
            <LayoutDashboard className="w-4 h-4" /> ড্যাশবোর্ডে দেখুন <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={ROUTES.home}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold hover:bg-muted"
          >
            হোমে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  )
}

function InfoTile({ icon: Icon, title, body }: { icon: React.ComponentType<{ className?: string }>; title: string; body: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{body}</p>
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
