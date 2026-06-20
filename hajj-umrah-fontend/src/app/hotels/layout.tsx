import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'মক্কা ও মদিনা হোটেল',
  description: 'মসজিদুল হারাম ও মসজিদে নববীর কাছের ৩ থেকে ৫-তারকা হোটেল। স্বাধীনভাবে বা প্যাকেজের সাথে বুক করুন।',
  keywords: ['মক্কা হোটেল', 'মদিনা হোটেল', 'হারাম হোটেল', 'মসজিদে নববী হোটেল', 'Hajj hotel booking'],
  alternates: { canonical: '/hotels' },
  openGraph: {
    title: 'মক্কা ও মদিনা হোটেল | কাবার পথে',
    description: 'হারাম ও মসজিদে নববীর কাছের ৩-৫ তারকা হোটেল।',
    url: '/hotels',
  },
}

export default function HotelsLayout({ children }: { children: React.ReactNode }) {
  return children
}
