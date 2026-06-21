'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, MessagesSquare, Building, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { PageShell, PageHero } from '@/components/layouts/page-shell'
import { Input, Textarea, Select, Label } from '@/components/ui/input'
import { SITE } from '@/constants/site'
import {
  useCreateInquiryMutation,
  type InquiryType,
  type CreateInquiryBody,
} from '@/redux/fetchres/inquiry/inquiryApi'

const SUBJECT_MAP: Record<string, InquiryType> = {
  package: 'PACKAGE',
  consultation: 'CONSULTATION',
  booking: 'GENERAL',
  group: 'GENERAL',
  other: 'GENERAL',
}

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [createInquiry, { isLoading }] = useCreateInquiryMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formEl = e.currentTarget
    const fd = new FormData(formEl)

    const first = String(fd.get('firstName') || '').trim()
    const last = String(fd.get('lastName') || '').trim()
    const email = String(fd.get('email') || '').trim()
    const phone = String(fd.get('phone') || '').trim()
    const subjectType = String(fd.get('subjectType') || '')
    const subject = String(fd.get('subject') || '').trim()
    const message = String(fd.get('message') || '').trim()

    if (!first || !last || !email || !subjectType || !subject || !message) {
      toast.error('সমস্ত বাধ্যতামূলক ফিল্ড পূরণ করুন')
      return
    }

    const body: CreateInquiryBody = {
      name: `${first} ${last}`,
      email,
      phone: phone || SITE.contact.phoneHref,
      type: SUBJECT_MAP[subjectType] ?? 'GENERAL',
      subject,
      message,
      priority: 'MEDIUM',
    }

    try {
      await createInquiry(body).unwrap()
      setSent(true)
      formEl.reset()
      toast.success('বার্তা পাঠানো হয়েছে')
    } catch (err: unknown) {
      const msg =
        (err as { data?: { message?: string } })?.data?.message ||
        (err as { message?: string })?.message ||
        'বার্তা পাঠাতে ব্যর্থ হয়েছে'
      toast.error(msg)
    }
  }

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
            <ContactCard Icon={Phone} title="কল করুন" lines={[SITE.contact.phone, '২৪/৭ হাজী সহায়তা লাইন']} />
            <ContactCard Icon={Mail} title="ইমেইল" lines={[SITE.contact.email, 'admin@kaabarpothe.com']} />
            <ContactCard Icon={MessagesSquare} title="লাইভ চ্যাট" lines={['সকাল ৭টা - রাত ১১টা পর্যন্ত উপলব্ধ', 'গড় উত্তর < ৫ মিনিট']} />
            <ContactCard Icon={Building} title="অফিস" lines={[SITE.contact.address.line1, SITE.contact.address.line2]} />
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
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-2xl font-bold text-foreground mb-1">আমাদের একটি বার্তা পাঠান</h2>
                  <p className="text-sm text-muted-foreground mb-6">ফর্মটি পূরণ করুন এবং আমাদের টিম আপনার সাথে যোগাযোগ করবে।</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label>প্রথম নাম</Label>
                      <Input name="firstName" required placeholder="আহমাদ" />
                    </div>
                    <div>
                      <Label>শেষ নাম</Label>
                      <Input name="lastName" required placeholder="হাসান" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label>ইমেইল</Label>
                      <Input name="email" type="email" required placeholder="you@email.com" />
                    </div>
                    <div>
                      <Label>ফোন</Label>
                      <Input name="phone" type="tel" placeholder={SITE.contact.phone} />
                    </div>
                  </div>

                  <div>
                    <Label>কী বিষয়ে জানতে চান?</Label>
                    <Select name="subjectType" required defaultValue="">
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
                    <Input name="subject" required placeholder="প্রিমিয়াম হজ্জ ২০২৬ — ৫ জনের গ্রুপ" />
                  </div>

                  <div>
                    <Label>আপনার বার্তা</Label>
                    <Textarea name="message" rows={5} required placeholder="আপনার যাত্রা সম্পর্কে আমাদের জানান..." />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-amber-600 text-primary-foreground px-6 py-3.5 rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> পাঠানো হচ্ছে…
                      </>
                    ) : (
                      <>
                        বার্তা পাঠান <Send className="w-4 h-4" />
                      </>
                    )}
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
