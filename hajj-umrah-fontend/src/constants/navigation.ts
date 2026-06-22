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
    label: 'প্যাকেজ',
    children: [
      { label: 'হজ্জ প্যাকেজ', href: ROUTES.packages.hajj, desc: 'ইকোনমি, স্ট্যান্ডার্ড, প্রিমিয়াম, ভিআইপি' },
      { label: 'উমরাহ প্যাকেজ', href: ROUTES.packages.umrah, desc: 'বাজেট, ইকোনমি, প্রিমিয়াম, লাক্সারি' },
    ],
  },
  { label: 'ফ্লাইট', href: ROUTES.flights.root },
  { label: 'হোটেল', href: ROUTES.hotels.root },
  { label: 'পরিবহন', href: ROUTES.transportation.root },
  { label: 'রিভিউ', href: ROUTES.reviews },
  { label: 'প্রশ্নোত্তর', href: ROUTES.faq },
  { label: 'আমাদের সম্পর্কে', href: ROUTES.about },
  { label: 'যোগাযোগ', href: ROUTES.contact },
]

export const FOOTER_SECTIONS = [
  {
    title: 'প্যাকেজ',
    links: [
      { label: 'হজ্জ প্যাকেজ', href: ROUTES.packages.hajj },
      { label: 'উমরাহ প্যাকেজ', href: ROUTES.packages.umrah },
      { label: 'ভিআইপি হজ্জ', href: '/packages/hajj/vip-hajj-2026' },
      { label: 'লাক্সারি উমরাহ', href: '/packages/umrah/luxury-umrah-2026' },
      { label: 'ফ্লাইট', href: ROUTES.flights.root },
      { label: 'গ্রুপ বুকিং', href: '/contact?type=group' },
    ],
  },
  {
    title: 'কোম্পানি',
    links: [
      { label: 'আমাদের সম্পর্কে', href: ROUTES.about },
      { label: 'রিভিউ', href: ROUTES.reviews },
      { label: 'ক্যারিয়ার', href: '/about#careers' },
    ],
  },
  {
    title: 'সহায়তা',
    links: [
      { label: 'যোগাযোগ করুন', href: ROUTES.contact },
      { label: 'প্রশ্নোত্তর', href: ROUTES.faq },
      { label: 'হেল্প সেন্টার', href: ROUTES.contact },
      { label: 'হাজী পোর্টাল', href: ROUTES.pilgrim.root },
      { label: 'সাইন ইন', href: ROUTES.login },
    ],
  },
  {
    title: 'আইনগত',
    links: [
      { label: 'গোপনীয়তা নীতি', href: ROUTES.privacy },
      { label: 'শর্তাবলী', href: ROUTES.terms },
    ],
  },
] as const
