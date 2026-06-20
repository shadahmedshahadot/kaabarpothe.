'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

import { ROUTES } from '@/constants'
import { useAppSelector } from '@/redux/hooks'

type Role = 'ADMIN' | 'USER'

export function RouteGuard({
  role,
  children,
}: {
  role: Role
  children: React.ReactNode
}) {
  const router = useRouter()
  const user = useAppSelector(state => state.auth.user)
  const token = useAppSelector(state => state.auth.token)

  const authed = Boolean(token && user)
  const allowed = authed && user?.role === role

  useEffect(() => {
    if (!authed) {
      router.replace(ROUTES.login)
      return
    }
    if (user?.role !== role) {
      router.replace(user?.role === 'ADMIN' ? ROUTES.admin.root : ROUTES.pilgrim.root)
    }
  }, [authed, user?.role, role, router])

  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return <>{children}</>
}
