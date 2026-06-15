import { Camera, Save } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Input, Label, Select } from '@/components/ui/input'
import { getPilgrim } from '@/data/pilgrims'

export default function PilgrimProfilePage() {
  const p = getPilgrim('p-001')!
  return (
    <>
      <PageTitle title="প্রোফাইল" description="আপনার ব্যক্তিগত তথ্য হালনাগাদ রাখুন।" action={<button className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary"><Save className="w-4 h-4" /> সংরক্ষণ</button>} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-4">ব্যক্তিগত তথ্য</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>পূর্ণ নাম</Label><Input defaultValue={p.fullName} /></div>
              <div><Label>ইমেইল</Label><Input type="email" defaultValue={p.email} /></div>
              <div><Label>ফোন</Label><Input defaultValue={p.phone} /></div>
              <div><Label>জন্ম তারিখ</Label><Input type="date" defaultValue={p.dateOfBirth} /></div>
              <div><Label>লিঙ্গ</Label><Select defaultValue={p.gender}><option value="male">পুরুষ</option><option value="female">নারী</option></Select></div>
              <div><Label>জাতীয়তা</Label><Input defaultValue={p.nationality} /></div>
              <div className="sm:col-span-2"><Label>ঠিকানা</Label><Input defaultValue={p.address} /></div>
              <div><Label>শহর</Label><Input defaultValue={p.city} /></div>
              <div><Label>দেশ</Label><Input defaultValue={p.country} /></div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-4">পাসপোর্ট</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>পাসপোর্ট নম্বর</Label><Input defaultValue={p.passport.number} /></div>
              <div><Label>ইস্যুকারী দেশ</Label><Input defaultValue={p.passport.country} /></div>
              <div><Label>ইস্যু তারিখ</Label><Input type="date" defaultValue={p.passport.issueDate} /></div>
              <div><Label>মেয়াদ শেষ তারিখ</Label><Input type="date" defaultValue={p.passport.expiryDate} /></div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-4">জরুরি যোগাযোগ</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div><Label>নাম</Label><Input defaultValue={p.emergencyContact.name} /></div>
              <div><Label>সম্পর্ক</Label><Input defaultValue={p.emergencyContact.relationship} /></div>
              <div><Label>ফোন</Label><Input defaultValue={p.emergencyContact.phone} /></div>
            </div>
          </div>
        </div>

        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <div className="relative w-32 h-32 mx-auto mb-3">
              <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${p.avatar} text-white text-4xl font-bold flex items-center justify-center`}>
                {p.fullName.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <button className="absolute bottom-1 right-1 w-9 h-9 bg-foreground text-background rounded-xl flex items-center justify-center shadow-lg hover:bg-primary"><Camera className="w-4 h-4" /></button>
            </div>
            <p className="font-bold text-foreground">{p.fullName}</p>
            <p className="text-xs text-muted-foreground">সদস্য {new Date(p.joinedDate).getFullYear()} থেকে</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-3">অ্যাকাউন্ট</h3>
            <button className="w-full text-left px-3 py-2 bg-muted/30 rounded-xl text-sm font-medium hover:bg-muted">পাসওয়ার্ড পরিবর্তন</button>
            <button className="w-full text-left px-3 py-2 mt-2 bg-muted/30 rounded-xl text-sm font-medium hover:bg-muted">দ্বি-স্তরীয় প্রমাণীকরণ</button>
            <button className="w-full text-left px-3 py-2 mt-2 text-sm font-medium text-rose-600 hover:bg-rose-500/10 rounded-xl">অ্যাকাউন্ট মুছে ফেলুন</button>
          </div>
        </div>
      </div>
    </>
  )
}
