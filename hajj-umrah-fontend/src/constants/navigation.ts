import { ROUTES } from './routes'

export interface NavChild {
  label: string
  href: string
  desc?: string
}
export interface NavItem {
  label: string
  href?: string
  children?: NavChild[]
}

export const PRIMARY_NAV: NavItem[] = [
  {
    label: 'Packages',
    children: [
      { label: 'Hajj Packages', href: ROUTES.packages.hajj, desc: 'Economy, Standard, Premium, VIP' },
      { label: 'Umrah Packages', href: ROUTES.packages.umrah, desc: 'Budget, Economy, Premium, Luxury' },
    ],
  },
  { label: 'Flights', href: ROUTES.flights.root },
  { label: 'Hotels', href: ROUTES.hotels.root },
  { label: 'Transport', href: ROUTES.transportation.root },
  { label: 'Reviews', href: ROUTES.reviews },
  {
    label: 'Learning',
    children: [
      { label: 'Blog', href: ROUTES.blog, desc: 'Articles, guides, tips' },
      { label: 'FAQ', href: ROUTES.faq, desc: 'Common questions answered' },
    ],
  },
  { label: 'About', href: ROUTES.about },
  { label: 'Contact', href: ROUTES.contact },
]

export const FOOTER_SECTIONS = [
  {
    title: 'Packages',
    links: [
      { label: 'Hajj Packages', href: ROUTES.packages.hajj },
      { label: 'Umrah Packages', href: ROUTES.packages.umrah },
      { label: 'VIP Hajj', href: '/packages/hajj/vip-hajj-2026' },
      { label: 'Luxury Umrah', href: '/packages/umrah/luxury-umrah-2026' },
      { label: 'Flights', href: ROUTES.flights.root },
      { label: 'Group Bookings', href: '/contact?type=group' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: ROUTES.about },
      { label: 'Reviews', href: ROUTES.reviews },
      { label: 'Blog', href: ROUTES.blog },
      { label: 'Learning Center', href: ROUTES.blog },
      { label: 'Careers', href: '/about#careers' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact Us', href: ROUTES.contact },
      { label: 'FAQ', href: ROUTES.faq },
      { label: 'Help Center', href: ROUTES.contact },
      { label: 'Pilgrim Portal', href: ROUTES.pilgrim.root },
      { label: 'Sign In', href: ROUTES.login },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: ROUTES.privacy },
      { label: 'Terms & Conditions', href: ROUTES.terms },
      { label: 'Refund Policy', href: ROUTES.refund },
      { label: 'Cookie Policy', href: '/privacy#cookies' },
    ],
  },
] as const
