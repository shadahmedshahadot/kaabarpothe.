import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Target, Users, Sparkles, Globe, Shield, ArrowRight, BadgeCheck } from 'lucide-react'
import { PageShell, PageHero } from '@/components/layouts/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'
import { IMG } from '@/data/images'

export const metadata: Metadata = {
  title: 'আমাদের সম্পর্কে',
  description: 'কাবার পথে — আলেম পরিচালিত হজ্জ ও উমরাহ এজেন্সি। আমাদের লক্ষ্য প্রতিটি মুসলিমের জন্য হজ্জ ও উমরাহকে সুলভ, স্বচ্ছ ও আধ্যাত্মিকভাবে অর্থপূর্ণ করা।',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'আমাদের সম্পর্কে | কাবার পথে',
    description: 'আলেম পরিচালিত, সৌদি মন্ত্রণালয় লাইসেন্সপ্রাপ্ত হজ্জ ও উমরাহ এজেন্সি।',
    url: '/about',
  },
}

const milestones = [
  { year: '২০১৫', title: 'ঢাকায় প্রতিষ্ঠা', desc: 'তিন ভাই, সবাই প্রাক্তন হাজী, একটি ভাঙা শিল্প ঠিক করার সিদ্ধান্ত নেন।' },
  { year: '২০১৭', title: 'সৌদি মন্ত্রণালয় লাইসেন্স', desc: 'বাংলাদেশের ৩০টি সম্পূর্ণ লাইসেন্সপ্রাপ্ত অপারেটরের অন্যতম হই।' },
  { year: '২০১৯', title: '১০,০০০ হাজী সেবা', desc: '১০,০০০ সফল হজ্জের মাইলফলক অর্জন।' },
  { year: '২০২১', title: 'আলেম নেটওয়ার্ক চালু', desc: 'গ্রুপ লিডার হিসেবে ৩০+ আল-আজহার ও মদিনা বিশ্ববিদ্যালয়ের আলেম যুক্ত।' },
  { year: '২০২৩', title: '৫-তারকা হোটেল অংশীদারিত্ব', desc: 'Raffles, Conrad, Fairmont ও Hilton-এর সাথে সরাসরি চুক্তি।' },
  { year: '২০২৬', title: '৫০,০০০+ হাজী', desc: '৩০+ দেশের মুসলিম কমিউনিটিকে সেবা।' },
]

const values = [
  { Icon: Heart, title: 'আধ্যাত্মিক মনোনিবেশ', desc: 'প্রতিটি সিদ্ধান্ত একটি প্রশ্নের মাধ্যমে ফিল্টার করা হয়: এটি কি হাজীদের ভালভাবে ইবাদত করতে সাহায্য করবে?' },
  { Icon: Shield, title: 'মৌলিক স্বচ্ছতা', desc: 'সম্পূর্ণ মূল্য বিভাজন, শূন্য গোপন ফি এবং প্রকাশ্যে প্রকাশিত সম্পূর্ণ ফেরত নীতি।' },
  { Icon: Users, title: 'আলেম তদারকি', desc: 'আমাদের আলেম পর্যালোচনা বোর্ড প্রতিটি ভ্রমণসূচি অনুমোদন করে, ফিকহ-শুদ্ধতা নিশ্চিত করে।' },
  { Icon: Globe, title: 'বিশ্ব যত্ন, স্থানীয় স্পর্শ', desc: 'আপনার পটভূমি, রীতি ও ইবাদত শৈলীর সাথে মিলিয়ে বহুভাষিক আলেম দল।' },
]

const team = [
  { name: 'ইমাম ইউসুফ খলিল', role: 'প্রতিষ্ঠাতা ও আলেম', bio: 'আল-আজহার স্নাতক। ২৫ বছর হজ্জ গ্রুপ পরিচালনা।', avatar: 'from-amber-400 to-orange-500' },
  { name: 'বোন আমিনা খলিল', role: 'সহ-প্রতিষ্ঠাতা ও অপারেশন', bio: 'প্রাক্তন NYU MBA। তিন সন্তানের মা।', avatar: 'from-rose-400 to-pink-500' },
  { name: 'ভাই হামজা খলিল', role: 'সহ-প্রতিষ্ঠাতা ও প্রযুক্তি', bio: 'স্ট্যানফোর্ড CS। আমাদের হাজী অ্যাপ তৈরি করেছেন।', avatar: 'from-emerald-400 to-teal-500' },
  { name: 'শায়খ তারিক মাহমুদ', role: 'আলেম বোর্ড প্রধান', bio: 'মদিনা বিশ্ববিদ্যালয়। ১৮ বছরের হজ্জ আলেম।', avatar: 'from-blue-400 to-indigo-500' },
]

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="আমাদের গল্প"
        title="হাজীদের দ্বারা, হাজীদের জন্য নির্মিত প্ল্যাটফর্ম।"
        description="আমরা সাকিনাহ শুরু করেছিলাম কারণ নিজেদের হজ্জ যাত্রায় অতিরিক্ত মূল্যের প্যাকেজ, গোপন ফি ও নৈর্ব্যক্তিক সেবায় ক্লান্ত ছিলাম। এগারো বছর পরে, আমরা বিশ্বব্যাপী ৫০,০০০+ হাজীকে সেবা দিচ্ছি।"
      />

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative h-72 sm:h-96 rounded-3xl overflow-hidden shadow-2xl">
          <Image src={IMG.kaabaDayCrowd} alt="মসজিদুল হারাম" fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: 50000, suffix: '+', label: 'হাজী সেবা' },
            { value: 1000, suffix: '+', label: 'বছরে প্রস্থান' },
            { value: 30, suffix: '', label: 'দেশ' },
            { value: 4.9, suffix: '/5', decimals: 1, label: 'গড় রেটিং' },
          ].map((s, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-foreground mb-1">
                <AnimatedCounter to={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} />
              </p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-foreground to-foreground/90 text-background rounded-[2rem] p-10 sm:p-16 text-center relative overflow-hidden">
          <Target className="w-12 h-12 text-primary mx-auto mb-6" />
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">আমাদের লক্ষ্য</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance leading-tight">
            প্রতিটি মুসলিমের জন্য পবিত্র যাত্রাকে সুলভ, স্বচ্ছ ও আধ্যাত্মিকভাবে অর্থপূর্ণ করা।
          </h2>
          <p className="text-lg opacity-80 max-w-3xl mx-auto leading-relaxed">
            আমরা সাফল্য পরিমাপ করি বুকিং দিয়ে নয়, বরং সেই হাজীদের সংখ্যা দিয়ে যাদের যাত্রা আল্লাহর সাথে তাদের সম্পর্ক রূপান্তরিত করেছে।
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3 text-center">আমরা যা ধারণ করি</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">চার মূল্যবোধ, এক আবেগ।</h2>

          <StaggerContainer className="grid sm:grid-cols-2 gap-6">
            {values.map(v => (
              <StaggerItem key={v.title}>
                <Card className="!rounded-3xl p-8 h-full hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-amber-600 text-white flex items-center justify-center mb-5 shadow-lg">
                    <v.Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{v.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3 text-center">আমাদের যাত্রা</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">এগারো বছরের পবিত্র সেবা।</h2>

          <div className="relative pl-8 sm:pl-12">
            <div className="absolute left-2 sm:left-4 top-2 bottom-2 w-px bg-border" />
            {milestones.map((m, i) => (
              <div key={i} className="relative mb-10 last:mb-0">
                <div className="absolute -left-7 sm:-left-9 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-amber-500 shadow-lg shadow-primary/30 ring-4 ring-background" />
                <div className="bg-card border border-border rounded-2xl p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">{m.year}</p>
                  <h3 className="text-lg font-bold text-foreground mb-1.5">{m.title}</h3>
                  <p className="text-sm text-muted-foreground">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" id="careers">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3 text-center">নেতৃত্ব</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">প্ল্যাটফর্মের পেছনের মানুষ।</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((p, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${p.avatar} mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                  {p.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <h3 className="font-bold text-foreground">{p.name}</h3>
                <p className="text-xs uppercase tracking-wider text-primary mt-0.5 mb-3">{p.role}</p>
                <p className="text-sm text-muted-foreground">{p.bio}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-card border border-border rounded-3xl p-8 sm:p-12 text-center">
            <BadgeCheck className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">আমাদের দলে যোগ দিন</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">আমরা আলেম, সাপোর্ট স্টাফ, ইঞ্জিনিয়ার ও ডিজাইনার নিয়োগ দিচ্ছি। যদি আপনি আমাদের লক্ষ্যে বিশ্বাস করেন, আমরা আপনার কথা শুনতে চাই।</p>
            <Link href="/contact?type=careers" className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-xl font-semibold hover:bg-primary transition-colors">
              খোলা পদ দেখুন <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
