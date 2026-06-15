import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, Plane, Calendar, Users, DollarSign, FileText, MessageSquare, CheckCircle2 } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/utils/format'
import { bookings, getBooking } from '@/data/bookings'
import { payments } from '@/data/payments'

export function generateStaticParams() {
  return bookings.map(b => ({ id: b.id }))
}

export default async function AdminBookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const booking = getBooking(id)
  if (!booking) notFound()
  const bookingPayments = payments.filter(p => p.bookingId === booking.id)

  return (
    <>
      <Link href="/admin/bookings" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> বুকিং তালিকায় ফিরে যান
      </Link>

      <PageTitle
        title={booking.bookingCode}
        description={`${booking.packageName} · ${booking.pilgrimsCount} জন হাজী`}
        action={
          <div className="flex gap-2 flex-wrap">
            <button className="px-3 py-2 border border-border rounded-xl text-sm font-semibold hover:bg-muted">ইনভয়েস ডাউনলোড</button>
            <button className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary transition-colors">অবস্থা আপডেট</button>
          </div>
        }
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-foreground">বুকিং সারসংক্ষেপ</h3>
              <div className="flex gap-1.5">
                <Badge variant={booking.status === 'confirmed' ? 'success' : 'warning'}>{booking.status}</Badge>
                <Badge variant={booking.paymentStatus === 'paid' ? 'success' : 'warning'}>{booking.paymentStatus}</Badge>
                <Badge variant={booking.visaStatus === 'approved' ? 'success' : 'warning'}>ভিসা {booking.visaStatus}</Badge>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <InfoRow icon={Calendar} label="বুকিং হয়েছে" value={formatDate(booking.bookedDate)} />
              <InfoRow icon={Plane} label="প্রস্থান" value={formatDate(booking.departureDate)} />
              <InfoRow icon={Plane} label="প্রত্যাবর্তন" value={formatDate(booking.returnDate)} />
              <InfoRow icon={Users} label="হাজী" value={`${booking.pilgrimsCount} জন প্রাপ্তবয়স্ক`} />
              <InfoRow icon={DollarSign} label="মোট" value={formatCurrency(booking.totalAmount)} />
              <InfoRow icon={DollarSign} label="পরিশোধিত" value={formatCurrency(booking.paidAmount)} />
            </div>
            {booking.notes && (
              <div className="mt-5 p-4 bg-muted/40 rounded-xl">
                <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">নোট</p>
                <p className="text-sm text-foreground">{booking.notes}</p>
              </div>
            )}
          </div>

          {/* Installments */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-4">পেমেন্ট ইতিহাস</h3>
            <div className="space-y-2">
              {bookingPayments.map(p => (
                <div key={p.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${p.status === 'completed' ? 'bg-emerald-500/15 text-emerald-600' : 'bg-amber-500/15 text-amber-600'}`}>
                      {p.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : <DollarSign className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">কিস্তি {p.installmentNumber}/{p.installmentsTotal}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(p.date)} · {p.method}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{formatCurrency(p.amount)}</p>
                    <Badge variant={p.status === 'completed' ? 'success' : 'warning'} className="text-[10px]">{p.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-4">কার্যক্রম টাইমলাইন</h3>
            <div className="space-y-4">
              {[
                { Icon: CheckCircle2, title: 'পেমেন্ট গৃহীত', desc: `${formatCurrency(booking.paidAmount)} পরিশোধিত`, time: '২ দিন আগে', color: 'emerald' },
                { Icon: FileText, title: 'ডকুমেন্ট যাচাইকৃত', desc: 'সকল পাসপোর্ট স্ক্যান অনুমোদিত', time: '১ সপ্তাহ আগে', color: 'sky' },
                { Icon: MessageSquare, title: 'নোট যোগ করা হয়েছে', desc: booking.notes, time: '২ সপ্তাহ আগে', color: 'amber' },
                { Icon: Calendar, title: 'বুকিং নিশ্চিত', desc: `ডিপোজিট গৃহীত`, time: '৩ সপ্তাহ আগে', color: 'violet' },
              ].map((a, i) => (
                <div key={i} className="flex gap-3">
                  <div className={`w-9 h-9 rounded-lg bg-${a.color}-500/15 text-${a.color}-600 flex items-center justify-center flex-shrink-0`}>
                    <a.Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.desc}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-4">হাজী</h3>
            <div className="space-y-2">
              <p className="font-semibold text-foreground">{booking.pilgrimName}</p>
              <a href={`mailto:${booking.pilgrimEmail}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><Mail className="w-4 h-4" /> {booking.pilgrimEmail}</a>
              <a href={`tel:${booking.pilgrimPhone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><Phone className="w-4 h-4" /> {booking.pilgrimPhone}</a>
            </div>
            <Link href={`/admin/pilgrims/${booking.pilgrimId}`} className="block mt-4 text-center bg-muted hover:bg-muted/70 py-2 rounded-xl text-sm font-semibold">হাজীর প্রোফাইল দেখুন</Link>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-4">অবস্থা আপডেট</h3>
            <div className="space-y-2 text-sm">
              <button className="w-full text-left px-3 py-2 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/15 rounded-xl">নিশ্চিত হিসেবে চিহ্নিত করুন</button>
              <button className="w-full text-left px-3 py-2 bg-sky-500/10 text-sky-700 hover:bg-sky-500/15 rounded-xl">চলমান হিসেবে সেট করুন</button>
              <button className="w-full text-left px-3 py-2 bg-violet-500/10 text-violet-700 hover:bg-violet-500/15 rounded-xl">সম্পন্ন হিসেবে চিহ্নিত করুন</button>
              <button className="w-full text-left px-3 py-2 bg-rose-500/10 text-rose-700 hover:bg-rose-500/15 rounded-xl">বুকিং বাতিল করুন</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground mb-1">
        <Icon className="w-3.5 h-3.5" /> {label}
      </div>
      <p className="font-semibold text-foreground">{value}</p>
    </div>
  )
}
