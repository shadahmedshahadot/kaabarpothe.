import Link from 'next/link'
import { ArrowLeft, Save, Plus, X, Plane, Upload } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Input, Textarea, Select, Label } from '@/components/ui/input'
import { ROUTES } from '@/constants'

export default function NewFlightPage() {
  return (
    <>
      <Link href={ROUTES.admin.flights} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> ফ্লাইটে ফিরে যান
      </Link>

      <PageTitle
        title="নতুন ফ্লাইট তৈরি করুন"
        description="স্বতন্ত্র ফ্লাইট বুকিংয়ের জন্য কেবিন, ব্যাগেজ এবং আসন ইনভেন্টরিসহ একটি এয়ারলাইন সময়সূচি যোগ করুন।"
        action={
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-border rounded-xl text-sm font-semibold hover:bg-muted">খসড়া সংরক্ষণ</button>
            <button className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary">
              <Save className="w-4 h-4" /> প্রকাশ করুন
            </button>
          </div>
        }
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="এয়ারলাইন">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>এয়ারলাইনের নাম</Label>
                <Input placeholder="বিমান বাংলাদেশ এয়ারলাইন্স" />
              </div>
              <div>
                <Label>ফ্লাইট নম্বর</Label>
                <Input placeholder="BG 1041" />
              </div>
            </div>
            <div>
              <Label>এয়ারলাইন লোগো / IATA কোড</Label>
              <div className="flex items-center gap-3">
                <Input placeholder="BG" className="w-32" />
                <div className="aspect-square w-12 rounded-xl border-2 border-dashed border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary cursor-pointer">
                  <Upload className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Card>

          <Card title="রুট">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>প্রস্থানের বিমানবন্দর</Label>
                <Input placeholder="হযরত শাহজালাল আন্তর্জাতিক (DAC)" />
              </div>
              <div>
                <Label>আগমনের বিমানবন্দর</Label>
                <Input placeholder="কিং আব্দুলআজিজ আন্তর্জাতিক (JED)" />
              </div>
              <div>
                <Label>প্রস্থানের শহর</Label>
                <Select defaultValue="Dhaka">
                  <option>Dhaka</option><option>Chattogram</option><option>Jeddah</option><option>Madinah</option>
                </Select>
              </div>
              <div>
                <Label>আগমনের শহর</Label>
                <Select defaultValue="Jeddah">
                  <option>Jeddah</option><option>Madinah</option><option>Dhaka</option><option>Chattogram</option>
                </Select>
              </div>
            </div>
          </Card>

          <Card title="সময়সূচি">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>প্রস্থানের তারিখ</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>প্রস্থানের সময়</Label>
                <Input type="time" />
              </div>
              <div>
                <Label>আগমনের তারিখ</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>আগমনের সময়</Label>
                <Input type="time" />
              </div>
              <div>
                <Label>মোট ভ্রমণ সময়কাল</Label>
                <Input placeholder="8h 15m" />
              </div>
              <div>
                <Label>ট্রানজিট সময়কাল</Label>
                <Input placeholder="নন-স্টপ বা যেমন 2h 10m" />
              </div>
            </div>
          </Card>

          <Card title="ট্রানজিট">
            <p className="text-xs text-muted-foreground mb-4">যদি নন-স্টপ ফ্লাইট না হয় তবে লেওভার বিমানবন্দর যোগ করুন।</p>
            <div className="space-y-3">
              {[1].map(i => (
                <div key={i} className="border border-border rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Plane className="w-4 h-4 text-muted-foreground" />
                    <Input placeholder="ট্রানজিট বিমানবন্দর (যেমন দুবাই আন্তর্জাতিক)" className="flex-1" />
                    <button className="p-2 text-muted-foreground hover:text-rose-500"><X className="w-4 h-4" /></button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Input placeholder="ট্রানজিট শহর" />
                    <Input placeholder="লেওভার সময়কাল (যেমন 2h 10m)" />
                  </div>
                </div>
              ))}
              <button className="w-full py-3 border-2 border-dashed border-border rounded-xl text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors inline-flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> ট্রানজিট যোগ করুন
              </button>
            </div>
          </Card>

          <Card title="কেবিন ও সেবা">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>কেবিন ক্লাস</Label>
                <Select defaultValue="economy">
                  <option value="economy">ইকোনমি</option>
                  <option value="economy-plus">ইকোনমি প্লাস</option>
                  <option value="business">বিজনেস</option>
                  <option value="first">ফার্স্ট</option>
                </Select>
              </div>
              <div>
                <Label>ব্যাগেজ ভাতা</Label>
                <Input placeholder="30 kg চেকড + 7 kg কেবিন" />
              </div>
              <div className="sm:col-span-2">
                <Label>খাবারের তথ্য</Label>
                <Input placeholder="হালাল গরম খাবার + পানীয়" />
              </div>
            </div>
          </Card>

          <Card title="আসন ইনভেন্টরি ও মূল্য">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <Label>মোট আসন</Label>
                <Input type="number" placeholder="290" />
              </div>
              <div>
                <Label>উপলব্ধ আসন</Label>
                <Input type="number" placeholder="290" />
              </div>
              <div>
                <Label>বুকিং অবস্থা</Label>
                <Select defaultValue="open">
                  <option value="open">খোলা</option>
                  <option value="waitlist">ওয়েটলিস্ট</option>
                  <option value="soldout">বিক্রি হয়ে গেছে</option>
                  <option value="closed">বন্ধ</option>
                </Select>
              </div>
              <div>
                <Label>মৌলিক ভাড়া (USD)</Label>
                <Input type="number" placeholder="745" />
              </div>
              <div>
                <Label>কর ও ফি (USD)</Label>
                <Input type="number" placeholder="95" />
              </div>
              <div>
                <Label>ছাড় (USD)</Label>
                <Input type="number" placeholder="0" />
              </div>
            </div>
          </Card>

          <Card title="নোট">
            <Textarea rows={4} placeholder="অপারেশনাল নোট, গ্রুপ ডিসকাউন্ট, বিশেষ পরিচালনা…" />
          </Card>
        </div>

        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Card title="অবস্থা">
            <Select defaultValue="active">
              <option value="active">সক্রিয় (প্রকাশিত)</option>
              <option value="inactive">নিষ্ক্রিয় (খসড়া)</option>
            </Select>
            <label className="flex items-center gap-2 mt-4 text-sm">
              <input type="checkbox" className="rounded border-border" /> ফিচার্ড হিসেবে চিহ্নিত করুন
            </label>
          </Card>

          <Card title="স্বতন্ত্র বুকিং">
            <p className="text-xs text-muted-foreground mb-3">হাজীদেরকে পূর্ণ প্যাকেজ ক্রয় ছাড়াই এই ফ্লাইট বুক করার অনুমতি দিন।</p>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded border-border" defaultChecked /> ফ্লাইট-শুধু বুকিং অনুমোদন করুন
            </label>
          </Card>

          <Card title="দৃশ্যমানতা">
            <Select defaultValue="public">
              <option value="public">সর্বজনীন তালিকা</option>
              <option value="package-only">শুধু প্যাকেজের সাথে বান্ডিল</option>
            </Select>
          </Card>
        </div>
      </div>
    </>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="font-bold text-foreground mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  )
}
