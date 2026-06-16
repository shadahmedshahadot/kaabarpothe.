'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import {
  Calendar,
  CheckCircle2,
  Clock,
  MessageSquare,
  Package as PackageIcon,
  TrendingUp,
} from 'lucide-react'

import { PageTitle } from '@/components/layouts/dashboard-shell'
import { formatCurrency } from '@/utils/format'
import { ROUTES } from '@/constants'
import { AdminStatsGrid } from '@/features/admin/components/dashboard/stats-grid'
import { RevenueChart } from '@/features/admin/components/dashboard/revenue-chart'
import { TierDistribution } from '@/features/admin/components/dashboard/tier-distribution'
import { MonthlyBookingsChart } from '@/features/admin/components/dashboard/monthly-bookings'
import { QuickStats } from '@/features/admin/components/dashboard/quick-stats'
import { RecentBookings } from '@/features/admin/components/dashboard/recent-bookings'
import { RecentActivity, type ActivityItem } from '@/features/admin/components/dashboard/recent-activity'

import { useGetBookingsQuery } from '@/redux/fetchres/booking/bookingApi'
import { adaptBooking } from '@/redux/fetchres/booking/adapter'
import { useGetPackagesQuery } from '@/redux/fetchres/package/packageApi'
import { useGetUsersQuery } from '@/redux/fetchres/user/userApi'

export default function AdminDashboardPage() {
  const { data: bookingsRes } = useGetBookingsQuery({ limit: 100 })
  const { data: packagesRes } = useGetPackagesQuery({ limit: 200 })
  const { data: usersRes } = useGetUsersQuery({ limit: 200 })

  const bookingsDto = bookingsRes?.data ?? []
  const bookings = useMemo(() => bookingsDto.map(adaptBooking), [bookingsDto])
  const packages = packagesRes?.data ?? []
  const users = usersRes?.data ?? []

  const totalRevenue = bookings.reduce((s, b) => s + b.paidAmount, 0)
  const pendingRevenue = bookings.reduce((s, b) => s + (b.totalAmount - b.paidAmount), 0)
  const totalPilgrims = bookings.reduce((s, b) => s + b.pilgrimsCount, 0)
  const activePackages = packages.filter(p => p.status === 'PUBLISHED').length
  const pendingVisas = bookings.filter(
    b => b.visaStatus === 'pending' || b.visaStatus === 'submitted',
  ).length

  const quickStats = [
    { label: 'অপেক্ষমাণ রাজস্ব', value: formatCurrency(pendingRevenue), color: 'amber' },
    { label: 'সক্রিয় প্যাকেজ', value: activePackages.toString(), color: 'emerald' },
    { label: 'মোট ব্যবহারকারী', value: users.length.toString(), color: 'sky' },
    { label: 'অপেক্ষমাণ ভিসা', value: pendingVisas.toString(), color: 'rose' },
  ]

  const recentBooking = bookings[0]
  const pendingVisaBooking = bookings.find(b => b.visaStatus === 'pending')
  const latestUser = users[0]

  const activity: ActivityItem[] = []
  if (latestUser) {
    activity.push({
      Icon: CheckCircle2,
      color: 'emerald',
      text: `${latestUser.full_name} যোগদান করেছেন`,
      time: latestUser.joinedDate,
    })
  }
  activity.push({
    Icon: MessageSquare,
    color: 'sky',
    text: 'নতুন অনুসন্ধান চেক করুন',
    time: new Date().toISOString(),
  })
  if (recentBooking) {
    activity.push({
      Icon: Calendar,
      color: 'amber',
      text: `নতুন বুকিং ${recentBooking.bookingCode}`,
      time: recentBooking.bookedDate,
    })
  }
  if (packages[0]) {
    activity.push({
      Icon: TrendingUp,
      color: 'violet',
      text: `"${packages[0].name}" সক্রিয় রয়েছে`,
      time: packages[0].departureDate,
    })
  }
  if (pendingVisaBooking) {
    activity.push({
      Icon: Clock,
      color: 'rose',
      text: `${pendingVisaBooking.pilgrimName} এর জন্য ভিসা অপেক্ষমাণ`,
      time: pendingVisaBooking.bookedDate,
    })
  }

  return (
    <>
      <PageTitle
        title="স্বাগতম, অ্যাডমিন"
        description="আজ সাকিনাহ ট্রাভেলসে যা ঘটছে তা এখানে দেখুন।"
        action={
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">
              এক্সপোর্ট
            </button>
            <Link
              href={`${ROUTES.admin.packages}/new`}
              className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary transition-colors"
            >
              <PackageIcon className="w-4 h-4" /> নতুন প্যাকেজ
            </Link>
          </div>
        }
      />

      <AdminStatsGrid
        totalRevenue={totalRevenue}
        bookingsCount={bookings.length}
        totalPilgrims={totalPilgrims}
        activePackages={activePackages}
      />

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <RevenueChart />
        <TierDistribution />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <MonthlyBookingsChart />
        <QuickStats stats={quickStats} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <RecentBookings bookings={bookings.slice(0, 5)} />
        <RecentActivity items={activity} />
      </div>
    </>
  )
}
