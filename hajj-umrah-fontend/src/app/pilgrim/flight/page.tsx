import { Plane, MapPin, Clock, Briefcase, Utensils, Download } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'

export default function FlightDetailsPage() {
  return (
    <>
      <PageTitle title="ফ্লাইট বিবরণ" description="প্রিমিয়াম হজ্জ ২০২৬ প্যাকেজের সম্পূর্ণ ফ্লাইট ভ্রমণসূচি।" action={<button className="border border-border px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-muted"><Download className="w-4 h-4" /> ই-টিকেট ডাউনলোড</button>} />

      <div className="space-y-4">
        {[
          { from: 'নিউ ইয়র্ক (JFK)', to: 'জেদ্দা (JED)', date: '2026-05-19', dep: '21:30', arr: '17:00 +1', flight: 'EK 204 → EK 825', airline: 'এমিরেটস', class: 'প্রিমিয়াম ইকোনমি', duration: '15h 30m' },
          { from: 'মদিনা (MED)', to: 'নিউ ইয়র্ক (JFK)', date: '2026-06-13', dep: '14:50', arr: '21:20', flight: 'EK 832 → EK 203', airline: 'এমিরেটস', class: 'প্রিমিয়াম ইকোনমি', duration: '17h 30m' },
        ].map((f, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs uppercase tracking-wider text-primary font-semibold">{i === 0 ? 'যাত্রা' : 'প্রত্যাবর্তন'}</span>
              <span className="text-sm text-muted-foreground">{f.date}</span>
            </div>

            <div className="grid md:grid-cols-7 gap-4 items-center">
              <div className="md:col-span-2">
                <p className="text-3xl font-bold text-foreground">{f.dep}</p>
                <p className="text-sm font-semibold text-foreground">{f.from}</p>
              </div>
              <div className="md:col-span-3 relative">
                <div className="h-px bg-border" />
                <div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-card px-3 text-primary">
                  <Plane className="w-6 h-6 rotate-90 md:rotate-0" />
                </div>
                <p className="text-xs text-center mt-3 text-muted-foreground">{f.duration} · {f.flight}</p>
              </div>
              <div className="md:col-span-2 md:text-right">
                <p className="text-3xl font-bold text-foreground">{f.arr}</p>
                <p className="text-sm font-semibold text-foreground">{f.to}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-border">
              <Spec Icon={Plane} label="এয়ারলাইন" value={f.airline} />
              <Spec Icon={MapPin} label="ক্লাস" value={f.class} />
              <Spec Icon={Briefcase} label="ব্যাগেজ" value="30kg + 7kg" />
              <Spec Icon={Utensils} label="খাবার" value="হালাল" />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function Spec({ Icon, label, value }: { Icon: any; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground mb-1"><Icon className="w-3.5 h-3.5" /> {label}</div>
      <p className="font-semibold text-foreground">{value}</p>
    </div>
  )
}
