import { Plus, Shield } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Badge } from '@/components/ui/badge'

const users = [
  { id: 'u1', name: 'ইমাম ইউসুফ খলিল', email: 'yusuf@sakinah.travel', role: 'সুপার অ্যাডমিন', avatar: 'from-amber-400 to-orange-500', lastActive: 'এখন' },
  { id: 'u2', name: 'সিস্টার আমিনা খলিল', email: 'amina@sakinah.travel', role: 'অ্যাডমিন', avatar: 'from-rose-400 to-pink-500', lastActive: '৫ মিনিট আগে' },
  { id: 'u3', name: 'ব্রাদার হামজা খলিল', email: 'hamza@sakinah.travel', role: 'অ্যাডমিন', avatar: 'from-emerald-400 to-teal-500', lastActive: '১ ঘণ্টা আগে' },
  { id: 'u4', name: 'আয়িশা বিনতে মনসুর', email: 'aisha@sakinah.travel', role: 'কনটেন্ট ম্যানেজার', avatar: 'from-violet-400 to-purple-500', lastActive: '২ ঘণ্টা আগে' },
  { id: 'u5', name: 'খালিদ আল-রাশিদ', email: 'khalid@sakinah.travel', role: 'ফিন্যান্স ম্যানেজার', avatar: 'from-blue-400 to-indigo-500', lastActive: 'গতকাল' },
  { id: 'u6', name: 'মরিয়ম তারিক', email: 'maryam@sakinah.travel', role: 'অপারেশনস ম্যানেজার', avatar: 'from-cyan-400 to-sky-500', lastActive: '৩ দিন আগে' },
]

const roles = [
  { name: 'সুপার অ্যাডমিন', count: 1, permissions: 'সম্পূর্ণ সিস্টেম অ্যাক্সেস · মুছে ফেলা যাবে না', color: 'rose' },
  { name: 'অ্যাডমিন', count: 2, permissions: 'বিলিং ও রোল ব্যবস্থাপনা ছাড়া সবকিছু', color: 'amber' },
  { name: 'কনটেন্ট ম্যানেজার', count: 1, permissions: 'প্যাকেজ, ব্লগ, প্রশ্নোত্তর, মিডিয়া লাইব্রেরি', color: 'violet' },
  { name: 'ফিন্যান্স ম্যানেজার', count: 1, permissions: 'পেমেন্ট, রিফান্ড, আর্থিক রিপোর্ট', color: 'blue' },
  { name: 'অপারেশনস ম্যানেজার', count: 1, permissions: 'বুকিং, হাজী, গ্রুপ লিডার, লজিস্টিকস', color: 'cyan' },
]

export default function AdminUsersPage() {
  return (
    <>
      <PageTitle
        title="ব্যবহারকারী ও ভূমিকা"
        description="অ্যাডমিন ব্যবহারকারী এবং তাদের অনুমতি স্তর পরিচালনা করুন।"
        action={
          <button className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary"><Plus className="w-4 h-4" /> ব্যবহারকারী আমন্ত্রণ</button>
        }
      />

      <h2 className="text-lg font-bold text-foreground mb-3">ভূমিকা</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {roles.map(r => (
          <div key={r.name} className="bg-card border border-border rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl bg-${r.color}-500/15 text-${r.color}-600 flex items-center justify-center mb-3`}>
              <Shield className="w-5 h-5" />
            </div>
            <p className="font-bold text-foreground">{r.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{r.count} জন ব্যবহারকারী</p>
            <p className="text-xs text-muted-foreground/80 mt-2 leading-relaxed">{r.permissions}</p>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-bold text-foreground mb-3">সক্রিয় ব্যবহারকারী</h2>
      <div className="bg-card border border-border rounded-2xl divide-y divide-border">
        {users.map(u => (
          <div key={u.id} className="flex items-center gap-4 p-5 hover:bg-muted/30 transition-colors">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${u.avatar} text-white font-bold flex items-center justify-center`}>
              {u.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground">{u.name}</p>
              <p className="text-xs text-muted-foreground">{u.email}</p>
            </div>
            <Badge variant="secondary">{u.role}</Badge>
            <span className="text-xs text-muted-foreground hidden sm:inline">{u.lastActive}</span>
            <button className="text-xs font-semibold text-muted-foreground hover:text-foreground">পরিচালনা</button>
          </div>
        ))}
      </div>
    </>
  )
}
