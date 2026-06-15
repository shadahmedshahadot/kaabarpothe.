import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, MapPin, Calendar, FileCheck, Upload } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/utils/format'
import { pilgrims, getPilgrim } from '@/data/pilgrims'
import { bookings } from '@/data/bookings'

export function generateStaticParams() { return pilgrims.map(p => ({ id: p.id })) }

export default async function PilgrimDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const p = getPilgrim(id)
  if (!p) notFound()
  const pBookings = bookings.filter(b => b.pilgrimId === p.id)

  return (
    <>
      <Link href="/admin/pilgrims" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> হাজীদের তালিকায় ফিরে যান
      </Link>
      <PageTitle title={p.fullName} description={`${p.bookingsCount} বুকিং · মোট ${formatCurrency(p.totalSpent)}`} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${p.avatar} text-white text-3xl font-bold mx-auto mb-4 flex items-center justify-center`}>
              {p.fullName.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <h2 className="font-bold text-foreground">{p.fullName}</h2>
            <p className="text-xs text-muted-foreground capitalize">{p.gender} · {new Date().getFullYear() - new Date(p.dateOfBirth).getFullYear()} বছর বয়স</p>
            <div className="mt-5 space-y-2 text-sm text-left">
              <p className="flex items-center gap-2 text-foreground/80"><Mail className="w-4 h-4" /> {p.email}</p>
              <p className="flex items-center gap-2 text-foreground/80"><Phone className="w-4 h-4" /> {p.phone}</p>
              <p className="flex items-start gap-2 text-foreground/80"><MapPin className="w-4 h-4 mt-0.5" /> {p.address}, {p.city}, {p.country}</p>
              <p className="flex items-center gap-2 text-foreground/80"><Calendar className="w-4 h-4" /> যোগদান {formatDate(p.joinedDate)}</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-3">জরুরি যোগাযোগ</h3>
            <p className="text-sm font-semibold text-foreground">{p.emergencyContact.name}</p>
            <p className="text-xs text-muted-foreground">{p.emergencyContact.relationship}</p>
            <p className="text-sm text-foreground/80 mt-2">{p.emergencyContact.phone}</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-3">পাসপোর্ট</h3>
            <p className="font-mono font-semibold text-foreground">{p.passport.number}</p>
            <p className="text-xs text-muted-foreground">{p.passport.country}</p>
            <p className="text-xs text-muted-foreground mt-1">ইস্যু {formatDate(p.passport.issueDate)} · মেয়াদ {formatDate(p.passport.expiryDate)}</p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {/* Documents */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground">ডকুমেন্ট</h3>
              <button className="inline-flex items-center gap-2 text-sm bg-foreground text-background px-3 py-1.5 rounded-lg font-semibold hover:bg-primary"><Upload className="w-4 h-4" /> আপলোড</button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {p.documents.map(d => (
                <div key={d.type} className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${d.status === 'verified' ? 'bg-emerald-500/15 text-emerald-600' : 'bg-amber-500/15 text-amber-600'}`}>
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground">{d.type}</p>
                    <p className="text-xs text-muted-foreground">{d.uploadedDate ? `আপলোড ${formatDate(d.uploadedDate)}` : 'আপলোড অপেক্ষমাণ'}</p>
                  </div>
                  <Badge variant={d.status === 'verified' ? 'success' : 'warning'} className="text-[10px]">{d.status}</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Bookings */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-4">বুকিং ইতিহাস</h3>
            <div className="space-y-3">
              {pBookings.map(b => (
                <Link key={b.id} href={`/admin/bookings/${b.id}`} className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${b.packageType === 'hajj' ? 'from-amber-400 to-orange-500' : 'from-emerald-400 to-teal-500'} text-white font-bold flex items-center justify-center`}>
                    {b.packageType === 'hajj' ? 'HJ' : 'UM'}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{b.packageName}</p>
                    <p className="text-xs text-muted-foreground">{b.bookingCode} · {formatDate(b.departureDate)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{formatCurrency(b.totalAmount)}</p>
                    <Badge variant={b.status === 'confirmed' ? 'success' : 'warning'} className="text-[10px]">{b.status}</Badge>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
