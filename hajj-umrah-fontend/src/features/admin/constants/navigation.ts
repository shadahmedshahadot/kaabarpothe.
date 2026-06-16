import {
  LayoutDashboard, Package, Calendar, Users, FileText, Star, ImageIcon, MessageSquare,
  CreditCard, BarChart3, Shield, Settings, Plane, Hotel as HotelIcon,
} from 'lucide-react'
import type { NavGroup } from '@/components/layouts/dashboard-shell'
import { ROUTES } from '@/constants'

export const ADMIN_NAV_GROUPS: NavGroup[] = [
  {
    label: 'Overview',
    items: [{ label: 'Dashboard', href: ROUTES.admin.root, Icon: LayoutDashboard }],
  },
  {
    label: 'Manage',
    items: [
      { label: 'Packages', href: ROUTES.admin.packages, Icon: Package },
      { label: 'Hotels', href: ROUTES.admin.hotels, Icon: HotelIcon },
      { label: 'Flights', href: ROUTES.admin.flights, Icon: Plane },
      { label: 'Bookings', href: ROUTES.admin.bookings, Icon: Calendar, badge: 12 },
      { label: 'Pilgrims', href: ROUTES.admin.pilgrims, Icon: Users },
    ],
  },
  {
    label: 'Content',
    items: [
      { label: 'Content', href: ROUTES.admin.content.root, Icon: FileText },
      { label: 'Reviews', href: ROUTES.admin.reviews, Icon: Star, badge: 4 },
      { label: 'Media', href: ROUTES.admin.media, Icon: ImageIcon },
      { label: 'Inquiries', href: ROUTES.admin.inquiries, Icon: MessageSquare, badge: 7 },
    ],
  },
  {
    label: 'Finance',
    items: [
      { label: 'Payments', href: ROUTES.admin.payments, Icon: CreditCard },
      { label: 'Reports', href: ROUTES.admin.reports, Icon: BarChart3 },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Users & Roles', href: ROUTES.admin.users, Icon: Shield },
      { label: 'Settings', href: ROUTES.admin.settings, Icon: Settings },
    ],
  },
]

export const ADMIN_USER = {
  name: 'Imam Yusuf Khalil',
  role: 'Super Admin',
  avatar: 'from-amber-400 to-orange-500',
} as const
