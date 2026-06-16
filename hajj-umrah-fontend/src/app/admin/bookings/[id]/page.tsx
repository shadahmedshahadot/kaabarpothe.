'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  DollarSign,
  Loader2,
  Mail,
  Phone,
  Plane,
  Users,
} from 'lucide-react'
import { toast } from 'sonner'

import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/utils/format'
import {
  useGetBookingQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
  type BookingDto,
} from '@/redux/fetchres/booking/bookingApi'

export default function AdminBookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const { data, isLoading, isError } = useGetBookingQuery(id)
  const [updateBooking, { isLoading: isUpdating }] = useUpdateBookingMutation()
  const [deleteBooking] = useDeleteBookingMutation()
  const [deleting, setDeleting] = useState(false)

  if (isLoading) {
    return (
      <div className="flex justify-center py-40">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    )
  }

  if (isError || !data?.data) {
    return (
      <div className="text-center py-40 text-rose-500">
        বুকিং পাওয়া যায়নি।{' '}
        <Link href="/admin/bookings" className="underline">
          ফিরে যান
        </Link>
      </div>
    )
  }

  const booking = data.data
  const bookingPayments = booking.payments ?? []

  const setStatus = async (status: BookingDto['status']) => {
    try {
      await updateBooking({ id: booking.id, body: { status } }).unwrap()
      toast.success(`অবস্থা আপডেট: ${status.toLowerCase()}`)
    } catch (err: any) {
      toast.error(err?.data?.message || 'আপডেট ব্যর্থ হয়েছে')
    }
  }

  const onDelete = async () => {
    if (!confirm(`"${booking.bookingCode}" মুছবেন?`)) return
    setDeleting(true)
    try {
      await deleteBooking(booking.id).unwrap()
      toast.success('বুকিং মুছে ফেলা হয়েছে')
      router.push('/admin/bookings')
    } catch (err: any) {
      toast.error(err?.data?.message || 'মুছতে ব্যর্থ হয়েছে')
      setDeleting(false)
    }
  }

  return (
    <>
      <Link
        href="/admin/bookings"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> বুকিং তালিকায় ফিরে যান
      </Link>

      <PageTitle
        title={booking.bookingCode}
        description={`${booking.packageName} · ${booking.pilgrimsCount} জন হাজী`}
        action={
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={onDelete}
              disabled={deleting}
              className="px-3 py-2 border border-rose-500/30 text-rose-600 rounded-xl text-sm font-semibold hover:bg-rose-500/10 disabled:opacity-60"
            >
              {deleting ? <Loader2 className="w-4 h-4 animate-spin inline" /> : 'মুছুন'}
            </button>
          </div>
        }
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-foreground">বুকিং সারসংক্ষেপ</h3>
              <div className="flex gap-1.5 flex-wrap">
                <Badge variant={booking.status === 'CONFIRMED' ? 'success' : 'warning'}>
                  {booking.status.toLowerCase()}
                </Badge>
                <Badge variant={booking.paymentStatus === 'PAID' ? 'success' : 'warning'}>
                  {booking.paymentStatus.toLowerCase()}
                </Badge>
                <Badge variant={booking.visaStatus === 'APPROVED' ? 'success' : 'warning'}>
                  ভিসা {booking.visaStatus.toLowerCase()}
                </Badge>
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

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-4">পেমেন্ট ইতিহাস</h3>
            {bookingPayments.length === 0 ? (
              <p className="text-sm text-muted-foreground">কোনো পেমেন্ট রেকর্ড নেই।</p>
            ) : (
              <div className="space-y-2">
                {bookingPayments.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                          p.status === 'COMPLETED'
                            ? 'bg-emerald-500/15 text-emerald-600'
                            : 'bg-amber-500/15 text-amber-600'
                        }`}
                      >
                        {p.status === 'COMPLETED' ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <DollarSign className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        {p.installmentNumber && (
                          <p className="text-sm font-semibold text-foreground">
                            কিস্তি {p.installmentNumber}/{p.installmentsTotal}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {formatDate(p.date)} · {p.method.toLowerCase()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">{formatCurrency(p.amount)}</p>
                      <Badge
                        variant={p.status === 'COMPLETED' ? 'success' : 'warning'}
                        className="text-[10px]"
                      >
                        {p.status.toLowerCase()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {booking.travelers && booking.travelers.length > 0 && (
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-bold text-foreground mb-4">ভ্রমণকারী</h3>
              <div className="space-y-2">
                {booking.travelers.map((t, i) => (
                  <div key={t.id ?? i} className="p-3 bg-muted/30 rounded-xl text-sm">
                    <p className="font-semibold">{t.fullName}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.nationality} · পাসপোর্ট {t.passportNumber} · {t.gender.toLowerCase()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-4">হাজী</h3>
            <div className="space-y-2">
              <p className="font-semibold text-foreground">{booking.pilgrimName}</p>
              <a
                href={`mailto:${booking.pilgrimEmail}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <Mail className="w-4 h-4" /> {booking.pilgrimEmail}
              </a>
              <a
                href={`tel:${booking.pilgrimPhone}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <Phone className="w-4 h-4" /> {booking.pilgrimPhone}
              </a>
            </div>
            {booking.userId && (
              <Link
                href={`/admin/pilgrims/${booking.userId}`}
                className="block mt-4 text-center bg-muted hover:bg-muted/70 py-2 rounded-xl text-sm font-semibold"
              >
                হাজীর প্রোফাইল দেখুন
              </Link>
            )}
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-4">অবস্থা আপডেট</h3>
            <div className="space-y-2 text-sm">
              <StatusButton
                onClick={() => setStatus('CONFIRMED')}
                disabled={isUpdating}
                className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/15"
                label="নিশ্চিত হিসেবে চিহ্নিত করুন"
              />
              <StatusButton
                onClick={() => setStatus('IN_PROGRESS')}
                disabled={isUpdating}
                className="bg-sky-500/10 text-sky-700 hover:bg-sky-500/15"
                label="চলমান হিসেবে সেট করুন"
              />
              <StatusButton
                onClick={() => setStatus('COMPLETED')}
                disabled={isUpdating}
                className="bg-violet-500/10 text-violet-700 hover:bg-violet-500/15"
                label="সম্পন্ন হিসেবে চিহ্নিত করুন"
              />
              <StatusButton
                onClick={() => setStatus('CANCELLED')}
                disabled={isUpdating}
                className="bg-rose-500/10 text-rose-700 hover:bg-rose-500/15"
                label="বুকিং বাতিল করুন"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function StatusButton({
  onClick,
  disabled,
  className,
  label,
}: {
  onClick: () => void
  disabled?: boolean
  className: string
  label: string
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left px-3 py-2 rounded-xl disabled:opacity-50 ${className}`}
    >
      {label}
    </button>
  )
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground mb-1">
        <Icon className="w-3.5 h-3.5" /> {label}
      </div>
      <p className="font-semibold text-foreground">{value}</p>
    </div>
  )
}
