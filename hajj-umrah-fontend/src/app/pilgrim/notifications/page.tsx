import { Bell, FileCheck, Plane, CreditCard, Calendar } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'

const items = [
  { Icon: FileCheck, color: 'emerald', title: 'আপনার ভিসা প্রস্তুত', desc: 'ডকুমেন্ট সেকশন থেকে আপনার হজ্জ ২০২৬ ভিসা ডাউনলোড করুন।', time: '২ ঘণ্টা আগে', unread: true },
  { Icon: Calendar, color: 'amber', title: 'যাত্রার পূর্ব ওরিয়েন্টেশন', desc: '১০ মে সন্ধ্যা ৭টায় (EST) জুম সেশন। ক্যালেন্ডার আমন্ত্রণ পাঠানো হয়েছে।', time: '১ দিন আগে', unread: true },
  { Icon: Plane, color: 'sky', title: 'ফ্লাইট চেক-ইন শীঘ্রই খুলবে', desc: 'এমিরেটসে আপনার ফ্লাইটের ৪৮ ঘণ্টা আগে অনলাইন চেক-ইন চালু হবে।', time: '৩ দিন আগে', unread: true },
  { Icon: CreditCard, color: 'violet', title: 'চূড়ান্ত পেমেন্ট গৃহীত', desc: 'আপনার $৬,৭৪৮ কিস্তি সফলভাবে প্রক্রিয়াকৃত হয়েছে।', time: '১ সপ্তাহ আগে', unread: false },
  { Icon: Bell, color: 'rose', title: 'গ্রুপ লিডার নির্ধারিত', desc: 'শায়খ আহমদ বিন খলিল আপনার গ্রুপ লিডার হবেন।', time: '২ সপ্তাহ আগে', unread: false },
]

export default function PilgrimNotificationsPage() {
  return (
    <>
      <PageTitle title="বিজ্ঞপ্তি" description="আপনার বুকিং, পেমেন্ট ও যাত্রা সংক্রান্ত আপডেট।" action={<button className="text-sm font-semibold text-primary hover:underline">সব পঠিত হিসেবে চিহ্নিত করুন</button>} />

      <div className="bg-card border border-border rounded-2xl divide-y divide-border">
        {items.map((n, i) => (
          <div key={i} className={`flex items-start gap-4 p-5 hover:bg-muted/30 transition-colors ${n.unread ? 'bg-primary/5' : ''}`}>
            <div className={`w-10 h-10 rounded-xl bg-${n.color}-500/15 text-${n.color}-600 flex items-center justify-center flex-shrink-0`}>
              <n.Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground">{n.title}</p>
              <p className="text-sm text-muted-foreground">{n.desc}</p>
              <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
            </div>
            {n.unread && <span className="w-2 h-2 rounded-full bg-primary mt-2" />}
          </div>
        ))}
      </div>
    </>
  )
}
