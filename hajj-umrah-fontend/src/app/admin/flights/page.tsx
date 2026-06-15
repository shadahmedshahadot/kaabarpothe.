'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Plus, Edit, Copy, Trash2, MoreVertical, Eye, Plane, ToggleLeft, ToggleRight } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { DataTable } from '@/features/admin/components/data-table'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/input'
import { formatCurrency } from '@/utils/format'
import { flights as seed, flightTotal, FLIGHT_AIRLINES, type Flight } from '@/data/flights'
import { ROUTES } from '@/constants'

export default function AdminFlightsPage() {
  const [data, setData] = useState<Flight[]>(seed)
  const [airline, setAirline] = useState<string>('all')
  const [route, setRoute] = useState<string>('all')
  const [status, setStatus] = useState<string>('all')

  const filtered = useMemo(() => {
    return data.filter(f => {
      if (airline !== 'all' && f.airlineName !== airline) return false
      if (route !== 'all') {
        const [from, to] = route.split('->')
        if (f.departureCity !== from || f.arrivalCity !== to) return false
      }
      if (status !== 'all' && f.status !== status) return false
      return true
    })
  }, [data, airline, route, status])

  const togglePublish = (id: string) =>
    setData(prev => prev.map(f => (f.id === id ? { ...f, status: f.status === 'active' ? 'inactive' : 'active' } : f)))

  const duplicate = (id: string) =>
    setData(prev => {
      const src = prev.find(f => f.id === id)
      if (!src) return prev
      const copy: Flight = {
        ...src,
        id: `${src.id}-copy-${Date.now()}`,
        slug: `${src.slug}-copy`,
        status: 'inactive',
        featured: false,
        seatsAvailable: src.seatsTotal,
        bookingsCount: 0,
      }
      return [copy, ...prev]
    })

  const remove = (id: string) => {
    if (!confirm('Delete this flight? This cannot be undone.')) return
    setData(prev => prev.filter(f => f.id !== id))
  }

  const routes = Array.from(new Set(seed.map(f => `${f.departureCity}->${f.arrivalCity}`)))

  return (
    <>
      <PageTitle
        title="Flights"
        description="Manage airline schedules, seat inventory, and pricing for independent flight bookings."
        action={
          <Link
            href={ROUTES.admin.flightNew}
            className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary transition-colors"
          >
            <Plus className="w-4 h-4" /> Create Flight
          </Link>
        }
      />

      <DataTable
        data={filtered}
        searchPlaceholder="Search by flight number, airline, city…"
        filters={
          <>
            <Select value={airline} onChange={e => setAirline(e.target.value)} className="w-auto min-w-[160px]">
              <option value="all">All airlines</option>
              {FLIGHT_AIRLINES.map(a => <option key={a} value={a}>{a}</option>)}
            </Select>
            <Select value={route} onChange={e => setRoute(e.target.value)} className="w-auto min-w-[170px]">
              <option value="all">All routes</option>
              {routes.map(r => <option key={r} value={r}>{r.replace('->', ' → ')}</option>)}
            </Select>
            <Select value={status} onChange={e => setStatus(e.target.value)} className="w-auto min-w-[130px]">
              <option value="all">Any status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>
          </>
        }
        columns={[
          {
            key: 'flight',
            label: 'Flight',
            render: f => (
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {f.airlineLogo}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground truncate">{f.flightNumber}</p>
                  <p className="text-xs text-muted-foreground truncate">{f.airlineName}</p>
                </div>
              </div>
            ),
          },
          {
            key: 'route',
            label: 'Route',
            render: f => (
              <div className="text-sm">
                <p className="font-medium text-foreground flex items-center gap-1.5">
                  {f.departureCity} <Plane className="w-3.5 h-3.5 text-muted-foreground" /> {f.arrivalCity}
                </p>
                <p className="text-xs text-muted-foreground">{f.departureDate} · {f.totalDuration}</p>
              </div>
            ),
          },
          {
            key: 'cabin',
            label: 'Cabin',
            render: f => <Badge variant="outline" className="capitalize">{f.cabinClass.replace('-', ' ')}</Badge>,
          },
          {
            key: 'seats',
            label: 'Seats',
            render: f => (
              <span className={f.seatsAvailable === 0 ? 'text-rose-600 font-semibold' : 'text-foreground font-medium'}>
                {f.seatsAvailable} / {f.seatsTotal}
              </span>
            ),
          },
          { key: 'price', label: 'Total', render: f => <span className="font-bold text-foreground">{formatCurrency(flightTotal(f))}</span> },
          {
            key: 'status',
            label: 'Status',
            render: f => <Badge variant={f.status === 'active' ? 'success' : 'warning'}>{f.status === 'active' ? 'Published' : 'Draft'}</Badge>,
          },
          {
            key: 'actions',
            label: 'Actions',
            render: f => (
              <div className="flex items-center gap-1 justify-end">
                <Link href={ROUTES.flights.detail(f.slug)} className="p-1.5 hover:bg-muted rounded" title="View on site"><Eye className="w-4 h-4 text-muted-foreground" /></Link>
                <Link href={ROUTES.admin.flightDetail(f.id)} className="p-1.5 hover:bg-muted rounded" title="Edit"><Edit className="w-4 h-4 text-muted-foreground" /></Link>
                <button onClick={() => duplicate(f.id)} className="p-1.5 hover:bg-muted rounded" title="Duplicate"><Copy className="w-4 h-4 text-muted-foreground" /></button>
                <button onClick={() => togglePublish(f.id)} className="p-1.5 hover:bg-muted rounded" title={f.status === 'active' ? 'Unpublish' : 'Publish'}>
                  {f.status === 'active'
                    ? <ToggleRight className="w-4 h-4 text-emerald-600" />
                    : <ToggleLeft className="w-4 h-4 text-muted-foreground" />}
                </button>
                <button onClick={() => remove(f.id)} className="p-1.5 hover:bg-muted rounded text-rose-500" title="Delete"><Trash2 className="w-4 h-4" /></button>
                <button className="p-1.5 hover:bg-muted rounded" title="More"><MoreVertical className="w-4 h-4 text-muted-foreground" /></button>
              </div>
            ),
            className: 'text-right',
          },
        ]}
      />
    </>
  )
}
