'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Bell, Check, Loader2, X } from 'lucide-react'
import { toast } from 'sonner'
import {
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
  useDeleteNotificationMutation,
  type NotificationDto,
} from '@/redux/fetchres/notification/notificationApi'
import { useAuthUser } from '@/redux/fetchres/auth/authSlice'

export function NotificationBell() {
  const user = useAuthUser()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { data: countResp } = useGetUnreadCountQuery(undefined, { pollingInterval: 20000, skip: !user })
  const { data, isFetching, refetch } = useGetNotificationsQuery({ limit: 20 }, { skip: !user || !open })
  const [markRead] = useMarkNotificationReadMutation()
  const [markAllRead] = useMarkAllNotificationsReadMutation()
  const [remove] = useDeleteNotificationMutation()
  const lastSeenRef = useRef<string | null>(null)

  useEffect(() => {
    if (!data?.data?.length) return
    const newest = data.data[0]
    if (lastSeenRef.current && newest.id !== lastSeenRef.current && !newest.read) {
      toast(newest.title, { description: newest.message })
    }
    lastSeenRef.current = newest.id
  }, [data])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  const unread = countResp?.data?.count ?? 0
  if (!user) return null

  const items = data?.data ?? []

  const onOpen = async () => {
    setOpen(o => !o)
    if (!open) await refetch()
  }

  const onMarkAll = async () => {
    try {
      await markAllRead().unwrap()
      toast.success('সব পড়া হিসেবে চিহ্নিত')
    } catch {
      toast.error('ব্যর্থ')
    }
  }

  return (
    <div ref={ref} className="relative">
      <button onClick={onOpen} className="relative p-2 hover:bg-muted rounded-lg" aria-label="Notifications">
        <Bell className="w-5 h-5" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unread > 99 ? '99+' : unread}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-96 max-w-[90vw] bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <p className="font-bold text-foreground">নোটিফিকেশন</p>
            <button onClick={onMarkAll} className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> সব পড়েছি
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {isFetching && <div className="p-6 text-center"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground inline" /></div>}
            {!isFetching && items.length === 0 && <p className="p-6 text-center text-sm text-muted-foreground">কোনো নোটিফিকেশন নেই।</p>}
            {items.map(n => (
              <NotificationItem
                key={n.id}
                n={n}
                onRead={async () => {
                  try { await markRead(n.id).unwrap() } catch {}
                }}
                onDelete={async () => {
                  try { await remove(n.id).unwrap() } catch {}
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function NotificationItem({ n, onRead, onDelete }: { n: NotificationDto; onRead: () => void; onDelete: () => void }) {
  const time = new Date(n.createdAt).toLocaleString()
  const body = (
    <div className={`p-3 border-b border-border last:border-b-0 hover:bg-muted/40 transition-colors ${n.read ? '' : 'bg-primary/[0.04]'}`}>
      <div className="flex items-start gap-2">
        <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${n.read ? 'bg-transparent' : 'bg-rose-500'}`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">{n.title}</p>
          <p className="text-xs text-muted-foreground line-clamp-2">{n.message}</p>
          <p className="text-[10px] text-muted-foreground mt-1">{time}</p>
        </div>
        <button onClick={e => { e.preventDefault(); e.stopPropagation(); onDelete() }} className="p-1 rounded hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500" aria-label="Delete">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
  if (n.link) {
    return (
      <Link href={n.link} onClick={() => !n.read && onRead()}>
        {body}
      </Link>
    )
  }
  return <button onClick={onRead} className="w-full text-left">{body}</button>
}
