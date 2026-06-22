import Link from 'next/link'
import { FileText, Image as ImageIcon, Layout, Globe, Mail, Bell } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'

const sections = [
  { Icon: Layout, title: 'হোমপেজ সেকশন', desc: 'হিরো, বৈশিষ্ট্য, সিটিএ, প্রশংসাপত্র টগল', href: '/admin/content/hero', color: 'amber' },
  { Icon: ImageIcon, title: 'হিরো ও ব্যানার', desc: 'ব্যাকগ্রাউন্ড ভিডিও, শিরোনাম, সিটিএ কপি, পরিসংখ্যান', href: '/admin/content/hero', color: 'rose' },
  { Icon: FileText, title: 'সম্পর্কে পেজ', desc: 'লক্ষ্য, মূল্যবোধ, টিম সদস্য, টাইমলাইন', href: '/admin/content?section=about', color: 'emerald' },
  { Icon: Globe, title: 'ফুটার কনটেন্ট', desc: 'লিঙ্ক, যোগাযোগের তথ্য, সোশ্যাল হ্যান্ডেল, ঠিকানা', href: '/admin/content?section=footer', color: 'sky' },
  { Icon: Mail, title: 'ইমেইল টেমপ্লেট', desc: 'বুকিং নিশ্চিতকরণ, স্বাগতম, রিমাইন্ডার', href: '/admin/content?section=emails', color: 'violet' },
  { Icon: Bell, title: 'নোটিফিকেশন', desc: 'ইন-অ্যাপ ও ইমেইল নোটিফিকেশন ট্রিগার', href: '/admin/content?section=notifications', color: 'orange' },
]

export default function AdminContentPage() {
  return (
    <>
      <PageTitle title="কনটেন্ট ব্যবস্থাপনা" description="এখান থেকে সমস্ত পাবলিক-ফেসিং কপি এবং মিডিয়া সম্পাদনা করুন।" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map(s => (
          <Link key={s.title} href={s.href} className="bg-card border border-border rounded-2xl p-6 hover:shadow-md hover:border-primary/40 transition-all group">
            <div className={`w-11 h-11 rounded-xl bg-${s.color}-500/10 text-${s.color}-600 flex items-center justify-center mb-4`}>
              <s.Icon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-card border border-border rounded-2xl p-8 text-center">
        <h3 className="font-bold text-foreground mb-2">প্রশ্নোত্তর খুঁজছেন?</h3>
        <p className="text-muted-foreground mb-5">প্রশ্নোত্তর এন্ট্রির জন্য আলাদা সিএমএস সেকশন রয়েছে।</p>
        <div className="flex gap-3 justify-center">
          <Link href="/admin/content/faqs" className="border border-border text-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:bg-muted">প্রশ্নোত্তর ব্যবস্থাপনা</Link>
        </div>
      </div>
    </>
  )
}
