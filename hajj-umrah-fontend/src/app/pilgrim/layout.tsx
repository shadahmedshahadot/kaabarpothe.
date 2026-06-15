'use client'

import { DashboardShell } from '@/components/layouts/dashboard-shell'
import { PILGRIM_NAV_GROUPS, PILGRIM_USER } from '@/features/pilgrim/constants/navigation'

export default function PilgrimLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell
      title="আমার যাত্রা"
      subtitle="হাজী পোর্টাল"
      accent="from-amber-400 to-orange-500"
      navGroups={PILGRIM_NAV_GROUPS}
      userName={PILGRIM_USER.name}
      userRole={PILGRIM_USER.role}
      userAvatar={PILGRIM_USER.avatar}
    >
      {children}
    </DashboardShell>
  )
}
