// Editable hero content. Admin dashboard reads + writes this shape.
// Default values shipped with the build; runtime edits persist via localStorage.

export interface HeroStat {
  value: number
  suffix?: string
  decimals?: number
  label: string
}

export interface HeroContent {
  videoId: string
  badge: string
  titleStart: string
  titleHighlight: string
  description: string
  ctaUmrah: string
  ctaHajj: string
  trustBadges: string[]
  reflectionEyebrow: string
  reflectionQuote: string
  reflectionRef: string
  reflectionItems: { label: string; value: string }[]
  stats: HeroStat[]
}

export const DEFAULT_HERO_CONTENT: HeroContent = {
  videoId: 'weCvgHcbdP4',
  badge: '২০১৫ সাল থেকে পবিত্র যাত্রায় পরিপূর্ণতা',
  titleStart: 'আপনার পবিত্র যাত্রা,',
  titleHighlight: 'মর্যাদার সাথে সাজানো।',
  description:
    'যোগ্য আলেমদের পরিচালনায় বাছাইকৃত হজ্জ ও উমরাহ প্যাকেজ। স্বচ্ছ মূল্য, ৫-তারকা অংশীদার এবং ২৪/৭ সরাসরি সহায়তা। বিশ্বব্যাপী ৫০,০০০+ হাজী দ্বারা বিশ্বস্ত।',
  ctaUmrah: 'উমরাহ খুঁজুন',
  ctaHajj: 'হজ্জ খুঁজুন',
  trustBadges: [
    'সৌদি মন্ত্রণালয় লাইসেন্সপ্রাপ্ত',
    '৪.৯/৫ (১২ হাজার+ রিভিউ)',
    '৬০+ দিন আগে বাতিল বিনামূল্যে',
  ],
  reflectionEyebrow: 'আজকের প্রতিফলন',
  reflectionQuote:
    '"আর তুমি মানুষের প্রতি হজ্জের ঘোষণা দাও, তারা তোমার কাছে আসবে পায়ে হেঁটে এবং প্রতিটি ক্ষীণকায় উটের পিঠে চড়ে, দূর-দূরান্তের পথ পেরিয়ে।"',
  reflectionRef: '— আল-কুরআন ২২:২৭',
  reflectionItems: [
    { label: 'হজ্জ ২০২৬', value: '১৯ মে' },
    { label: 'উমরাহ', value: 'সারা বছর' },
    { label: 'ভিসা সময়', value: '৭-১৪ দিন' },
  ],
  stats: [
    { value: 50000, suffix: '+', label: 'হাজী সেবা প্রদান' },
    { value: 1000, suffix: '+', label: 'প্রতি বছর প্রস্থান' },
    { value: 4.9, decimals: 1, suffix: '/5', label: 'গড় রেটিং' },
    { value: 100, suffix: '%', label: 'সৌদি লাইসেন্সপ্রাপ্ত' },
  ],
}

export const HERO_STORAGE_KEY = 'sakinah:hero-content:v2-bn'
