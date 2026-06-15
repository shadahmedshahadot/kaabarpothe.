import Link from 'next/link'
import { ArrowLeft, Save, Upload, Plus, X } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Input, Textarea, Select, Label } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default function NewPackagePage() {
  return (
    <>
      <Link href="/admin/packages" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> প্যাকেজে ফিরে যান
      </Link>

      <PageTitle
        title="নতুন প্যাকেজ তৈরি করুন"
        description="পূর্ণ বিবরণ, ভ্রমণসূচি এবং মূল্যসহ একটি হজ্জ বা উমরাহ প্যাকেজ তৈরি করুন।"
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
          {/* Basic info */}
          <Card title="মৌলিক তথ্য">
            <div>
              <Label>প্যাকেজের নাম</Label>
              <Input placeholder="প্রিমিয়াম হজ্জ ২০২৬" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>ধরন</Label>
                <Select defaultValue="umrah">
                  <option value="umrah">উমরাহ</option>
                  <option value="hajj">হজ্জ</option>
                </Select>
              </div>
              <div>
                <Label>স্তর</Label>
                <Select defaultValue="standard">
                  <option value="budget">বাজেট</option>
                  <option value="economy">ইকোনমি</option>
                  <option value="standard">স্ট্যান্ডার্ড</option>
                  <option value="premium">প্রিমিয়াম</option>
                  <option value="vip">ভিআইপি / লাক্সারি</option>
                </Select>
              </div>
            </div>
            <div>
              <Label>সংক্ষিপ্ত বিবরণ</Label>
              <Input placeholder="তালিকায় দেখানো এক-লাইনের বিবরণ…" />
            </div>
            <div>
              <Label>বিস্তারিত বিবরণ</Label>
              <Textarea rows={6} placeholder="সম্পূর্ণ প্যাকেজের বিবরণ…" />
            </div>
          </Card>

          {/* Dates and duration */}
          <Card title="তারিখ ও সময়কাল">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <Label>সময়কাল (দিন)</Label>
                <Input type="number" placeholder="14" />
              </div>
              <div>
                <Label>প্রস্থানের তারিখ</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>প্রত্যাবর্তনের তারিখ</Label>
                <Input type="date" />
              </div>
            </div>
          </Card>

          {/* Pricing */}
          <Card title="মূল্য নির্ধারণ">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <Label>মৌলিক মূল্য (USD)</Label>
                <Input type="number" placeholder="2999" />
              </div>
              <div>
                <Label>ছাড় (USD)</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div>
                <Label>মোট আসন</Label>
                <Input type="number" placeholder="30" />
              </div>
            </div>
          </Card>

          {/* Hotels */}
          <Card title="হোটেল">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">মক্কা হোটেল</p>
                <Input placeholder="হোটেলের নাম" />
                <Input placeholder="হারাম থেকে দূরত্ব" />
                <Select defaultValue="5"><option>3 তারকা</option><option>4 তারকা</option><option>5 তারকা</option></Select>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">মদিনা হোটেল</p>
                <Input placeholder="হোটেলের নাম" />
                <Input placeholder="মসজিদে নববী থেকে দূরত্ব" />
                <Select defaultValue="5"><option>3 তারকা</option><option>4 তারকা</option><option>5 তারকা</option></Select>
              </div>
            </div>
          </Card>

          {/* Itinerary */}
          <Card title="ভ্রমণসূচি">
            <p className="text-xs text-muted-foreground mb-4">দিন-অনুসারে বিভাজন যোগ করুন</p>
            <div className="space-y-3">
              {[1, 2, 3].map(d => (
                <div key={d} className="border border-border rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center">{d}</div>
                    <Input placeholder={`দিন ${d} এর শিরোনাম`} className="flex-1" />
                    <button className="p-2 text-muted-foreground hover:text-rose-500"><X className="w-4 h-4" /></button>
                  </div>
                  <Textarea rows={2} placeholder="দিনের বিবরণ…" />
                </div>
              ))}
              <button className="w-full py-3 border-2 border-dashed border-border rounded-xl text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors inline-flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> দিন যোগ করুন
              </button>
            </div>
          </Card>

          {/* Inclusions */}
          <Card title="অন্তর্ভুক্ত ও বাদ">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <Label>যা অন্তর্ভুক্ত</Label>
                <Textarea rows={6} placeholder="প্রতিটি লাইনে একটি…" />
              </div>
              <div>
                <Label>যা অন্তর্ভুক্ত নয়</Label>
                <Textarea rows={6} placeholder="প্রতিটি লাইনে একটি…" />
              </div>
            </div>
          </Card>

          {/* FAQs */}
          <Card title="প্যাকেজ প্রশ্নোত্তর">
            <div className="space-y-3">
              <div className="border border-border rounded-xl p-4">
                <Input placeholder="প্রশ্ন" className="mb-2" />
                <Textarea rows={2} placeholder="উত্তর" />
              </div>
              <button className="w-full py-3 border-2 border-dashed border-border rounded-xl text-sm text-muted-foreground hover:border-primary hover:text-primary inline-flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> প্রশ্নোত্তর যোগ করুন
              </button>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Card title="অবস্থা">
            <Select defaultValue="published">
              <option value="draft">খসড়া</option>
              <option value="published">প্রকাশিত</option>
            </Select>
            <Select defaultValue="available" className="mt-3">
              <option value="available">উপলব্ধ</option>
              <option value="limited">সীমিত আসন</option>
              <option value="soldout">বিক্রি হয়ে গেছে</option>
            </Select>
            <label className="flex items-center gap-2 mt-4 text-sm">
              <input type="checkbox" className="rounded border-border" /> ফিচার্ড হিসেবে চিহ্নিত করুন
            </label>
          </Card>

          <Card title="কভার ছবি">
            <div className="aspect-[4/3] rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary cursor-pointer transition-colors">
              <Upload className="w-8 h-8" />
              <p className="text-xs">কভার আপলোড করতে ক্লিক করুন</p>
            </div>
          </Card>

          <Card title="গ্যালারি">
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-lg border-2 border-dashed border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary cursor-pointer">
                  <Plus className="w-4 h-4" />
                </div>
              ))}
            </div>
          </Card>

          <Card title="হাইলাইট">
            <Input placeholder="হাইলাইট যোগ করুন…" className="mb-2" />
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">৫-তারকা হোটেল</Badge>
              <Badge variant="outline">আলেম গাইড</Badge>
            </div>
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
