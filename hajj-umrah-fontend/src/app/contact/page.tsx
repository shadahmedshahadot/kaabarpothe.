'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, MessagesSquare, Building } from 'lucide-react'
import { PageShell, PageHero } from '@/components/layouts/page-shell'
import { Input, Textarea, Select, Label } from '@/components/ui/input'

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  return (
    <PageShell>
      <PageHero
        eyebrow="যোগাযোগ করুন"
        title="আমরা ২৪/৭ আপনার পাশে আছি।"
        description="আপনি প্রথম জিজ্ঞাসা শুরু করুন, বুকিং চূড়ান্ত করুন, অথবা আপনার যাত্রার সময় সাহায্য প্রয়োজন হোক — আমাদের টিম ২ ঘণ্টার মধ্যে উত্তর দেয়।"
      />

      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            <ContactCard Icon={Phone} title="কল করুন" lines={['+৮৮০ ১৭০০-০০০০০০', '২৪/৭ হাজী সহায়তা লাইন']} />
            <ContactCard Icon={Mail} title="ইমেইল" lines={['hello@sakinah.travel', 'support@sakinah.travel']} />
            <ContactCard Icon={MessagesSquare} title="লাইভ চ্যাট" lines={['সকাল ৭টা - রাত ১১টা পর্যন্ত উপলব্ধ', 'গড় উত্তর < ৫ মিনিট']} />
            <ContactCard Icon={Building} title="অফিস" lines={['বাড়ি ৫০০, রোড ৪২', 'গুলশান, ঢাকা ১২১২, বাংলাদেশ']} />
            <ContactCard Icon={Clock} title="সময়সূচি" lines={['সোম-শুক্র: সকাল ৭টা - রাত ১১টা', 'শনি-রবি: সকাল ৯টা - রাত ৮টা']} />
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-3xl p-8 sm:p-10">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-600 mx-auto mb-4 flex items-center justify-center">
                    <Send className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">বার্তা পাঠানো হয়েছে!</h3>
                  <p className="text-muted-foreground">আমরা ২ ঘণ্টার মধ্যে উত্তর দেব।</p>
                  <button onClick={() => setSent(false)} className="mt-6 inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 rounded-xl font-semibold">আরেকটি পাঠান</button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-5">
                  <h2 className="text-2xl font-bold text-foreground mb-1">আমাদের একটি বার্তা পাঠান</h2>
                  <p className="text-sm text-muted-foreground mb-6">ফর্মটি পূরণ করুন এবং আমাদের টিম আপনার সাথে যোগাযোগ করবে।</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label>প্রথম নাম</Label>
                      <Input required placeholder="আহমাদ" />
                    </div>
                    <div>
                      <Label>শেষ নাম</Label>
                      <Input required placeholder="হাসান" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label>ইমেইল</Label>
                      <Input type="email" required placeholder="you@email.com" />
                    </div>
                    <div>
                      <Label>ফোন</Label>
                      <Input type="tel" placeholder="+৮৮০ ১৭০০-০০০০০০" />
                    </div>
                  </div>

                  <div>
                    <Label>কী বিষয়ে জানতে চান?</Label>
                    <Select required defaultValue="">
                      <option value="" disabled>জিজ্ঞাসার ধরন নির্বাচন করুন</option>
                      <option value="package">প্যাকেজ সংক্রান্ত প্রশ্ন</option>
                      <option value="consultation">বিনামূল্যে ১৫ মিনিটের পরামর্শ</option>
                      <option value="booking">বিদ্যমান বুকিং</option>
                      <option value="group">গ্রুপ বুকিং (১০+)</option>
                      <option value="other">অন্য কিছু</option>
                    </Select>
                  </div>

                  <div>
                    <Label>বিষয়</Label>
                    <Input required placeholder="প্রিমিয়াম হজ্জ ২০২৬ — ৫ জনের গ্রুপ" />
                  </div>

                  <div>
                    <Label>আপনার বার্তা</Label>
                    <Textarea rows={5} required placeholder="আপনার যাত্রা সম্পর্কে আমাদের জানান..." />
                  </div>

                  <button type="submit" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-amber-600 text-primary-foreground px-6 py-3.5 rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                    বার্তা পাঠান <Send className="w-4 h-4" />
                  </button>
                  <p className="text-xs text-muted-foreground">জমা দেওয়ার মাধ্যমে আপনি আমাদের গোপনীয়তা নীতি ও শর্তাবলী মেনে নিচ্ছেন।</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}

function ContactCard({ Icon, title, lines }: { Icon: any; title: string; lines: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ x: 4 }}
      className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-md transition-colors"
    >
      <div className="flex items-center gap-3 mb-2">
        <motion.div
          whileHover={{ rotate: 12, scale: 1.1 }}
          className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center"
        >
          <Icon className="w-5 h-5" />
        </motion.div>
        <h3 className="font-bold text-foreground">{title}</h3>
      </div>
      {lines.map((l, i) => (
        <p key={i} className={`text-sm ${i === 0 ? 'text-foreground' : 'text-muted-foreground'} leading-relaxed`}>{l}</p>
      ))}
    </motion.div>
  )
}
