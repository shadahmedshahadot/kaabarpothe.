'use client'

import { DashboardShell } from '@/components/layouts/dashboard-shell'
import { ADMIN_NAV_GROUPS, ADMIN_USER } from '@/features/admin/constants/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell
      title="সাকিনাহ অ্যাডমিন"
      subtitle="নিয়ন্ত্রণ কেন্দ্র"
      accent="from-rose-500 to-orange-500"
      navGroups={ADMIN_NAV_GROUPS}
      userName={ADMIN_USER.name}
      userRole={ADMIN_USER.role}
      userAvatar={ADMIN_USER.avatar}
    >
      {children}
    </DashboardShell>
  )
}
