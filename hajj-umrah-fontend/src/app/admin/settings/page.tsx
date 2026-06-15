import { Building, Globe, Bell, Mail, CreditCard, Code, Shield } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Input, Label, Textarea, Select } from '@/components/ui/input'

const tabs = [
  { Icon: Building, label: 'কোম্পানি' },
  { Icon: Globe, label: 'এসইও' },
  { Icon: Mail, label: 'ইমেইল' },
  { Icon: Bell, label: 'নোটিফিকেশন' },
  { Icon: CreditCard, label: 'পেমেন্ট' },
  { Icon: Code, label: 'ইন্টিগ্রেশন' },
  { Icon: Shield, label: 'নিরাপত্তা' },
]

export default function AdminSettingsPage() {
  return (
    <>
      <PageTitle title="সেটিংস" description="আপনার প্ল্যাটফর্মের মূল আচরণ, ব্র্যান্ডিং এবং ইন্টিগ্রেশন কনফিগার করুন।" />

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-2xl p-2 sticky top-24">
            {tabs.map((t, i) => (
              <button key={t.label} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${i === 0 ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:bg-muted hover:text-foreground'}`}>
                <t.Icon className="w-4 h-4" /> {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="font-bold text-foreground mb-1">কোম্পানির তথ্য</h3>
            <p className="text-sm text-muted-foreground mb-6">ইনভয়েস, ফুটার এবং আইনি পেজে প্রদর্শিত।</p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>কোম্পানির নাম</Label>
                <Input defaultValue="সাকিনাহ ট্রাভেলস" />
              </div>
              <div>
                <Label>ট্যাগলাইন</Label>
                <Input defaultValue="হজ্জ ও উমরাহ প্ল্যাটফর্ম" />
              </div>
              <div>
                <Label>ইমেইল</Label>
                <Input defaultValue="hello@sakinah.travel" />
              </div>
              <div>
                <Label>ফোন</Label>
                <Input defaultValue="+1 (800) 555-1234" />
              </div>
              <div className="sm:col-span-2">
                <Label>ঠিকানা</Label>
                <Textarea rows={2} defaultValue="500 Madison Ave, Floor 42, New York, NY 10022, USA" />
              </div>
              <div>
                <Label>মুদ্রা</Label>
                <Select defaultValue="USD">
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="EUR">EUR (€)</option>
                </Select>
              </div>
              <div>
                <Label>সময় অঞ্চল</Label>
                <Select defaultValue="America/New_York">
                  <option>America/New_York</option>
                  <option>Europe/London</option>
                  <option>Asia/Riyadh</option>
                </Select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button className="px-4 py-2 border border-border rounded-xl text-sm font-semibold hover:bg-muted">বাতিল</button>
              <button className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary">পরিবর্তন সংরক্ষণ করুন</button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="font-bold text-foreground mb-1">এসইও ডিফল্ট</h3>
            <p className="text-sm text-muted-foreground mb-6">নির্দিষ্ট মেটাডেটা ছাড়া পেজগুলিতে ব্যবহৃত।</p>
            <div className="space-y-4">
              <div>
                <Label>ডিফল্ট পেজ শিরোনাম</Label>
                <Input defaultValue="সাকিনাহ ট্রাভেলস — হজ্জ ও উমরাহ প্ল্যাটফর্ম" />
              </div>
              <div>
                <Label>ডিফল্ট মেটা বিবরণ</Label>
                <Textarea rows={2} defaultValue="প্রিমিয়াম হজ্জ ও উমরাহ প্যাকেজ। বিশ্বব্যাপী ৫০,০০০+ হাজী দ্বারা বিশ্বস্ত।" />
              </div>
              <div>
                <Label>ওপেন গ্রাফ ছবির URL</Label>
                <Input defaultValue="/og-default.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
