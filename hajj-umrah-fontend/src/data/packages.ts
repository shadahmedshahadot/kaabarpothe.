import { IMG } from './images'

export type PackageType = 'hajj' | 'umrah'
export type PackageTier = 'budget' | 'economy' | 'standard' | 'premium' | 'vip' | 'luxury'

export interface ItineraryDay {
  day: number
  title: string
  description: string
  activities: string[]
}

export interface PackageFAQ {
  q: string
  a: string
}

export interface Package {
  id: string
  slug: string
  name: string
  type: PackageType
  tier: PackageTier
  shortDescription: string
  description: string
  duration: number
  departureDate: string
  returnDate: string
  price: number
  discount: number
  status: 'published' | 'draft'
  availability: 'available' | 'limited' | 'soldout'
  seatsLeft: number
  rating: number
  reviewsCount: number
  bookingsCount: number
  featured: boolean
  hotelMakkah: { name: string; stars: number; distance: string; image: string }
  hotelMadinah: { name: string; stars: number; distance: string; image: string }
  flight: { airline: string; departure: string; arrival: string; class: string }
  meals: string
  transport: string
  ziyarah: string[]
  visa: string
  included: string[]
  excluded: string[]
  itinerary: ItineraryDay[]
  gallery: string[]
  cover: string
  faqs: PackageFAQ[]
  highlights: string[]
  groupSize: string
}

const baseItinerary = (type: PackageType, days: number): ItineraryDay[] => {
  const start: ItineraryDay[] = [
    { day: 1, title: 'প্রস্থান ও জেদ্দায় আগমন', description: 'নিজ শহর থেকে ফ্লাইট, কিং আব্দুল আজিজ আন্তর্জাতিক বিমানবন্দরে আগমন, মক্কা হোটেলে স্থানান্তর।', activities: ['বিমানবন্দরে অভ্যর্থনা', 'ভিসা প্রক্রিয়াকরণ সহায়তা', 'এসি কোচে স্থানান্তর', 'হোটেল চেক-ইন', 'স্বাগতম ব্রিফিং'] },
    { day: 2, title: 'প্রথম উমরাহ ও তাওয়াফ', description: 'অভিজ্ঞ আলেমের সাথে প্রথম উমরাহ সম্পাদন। ইহরাম প্রস্তুতি, তাওয়াফ, সাঈ ও হালক/তাকসির।', activities: ['মিকাত থেকে ইহরাম', 'তাওয়াফ আল-উমরাহ', 'সাফা ও মারওয়ার মাঝে সাঈ', 'চুল কাটা (হালক/তাকসির)', 'গ্রুপ আলোচনা'] },
    { day: 3, title: 'মসজিদ আল-হারামে ইবাদত', description: 'পূর্ণ দিন ইবাদত, অতিরিক্ত উমরাহ ও কুরআন অধ্যয়ন চক্র।', activities: ['হারামে ফজর', 'ঐচ্ছিক দ্বিতীয় উমরাহ', 'কুরআন তাফসির সেশন', 'মাগরিব ও ইশার নামাজ'] },
  ]
  if (type === 'hajj') {
    start.push(
      { day: 4, title: 'মিনায় প্রস্থান (৮ জিলহজ্জ)', description: 'ইয়াওম আত-তারওয়িয়াহর জন্য মিনায় ভ্রমণ, দিনটি ইবাদত ও নামাজে অতিবাহিত করুন।', activities: ['মিনার তাঁবুতে ভ্রমণ', 'মিনায় পাঁচ ওয়াক্ত নামাজ', 'গ্রুপ লেকচার', 'এসি তাঁবুতে বিশ্রাম'] },
      { day: 5, title: 'আরাফাতের দিন (৯ জিলহজ্জ)', description: 'হজ্জের সবচেয়ে পবিত্র দিন। আরাফাতে অবস্থান, এরপর সূর্যাস্তে মুজদালিফায় ভ্রমণ।', activities: ['ফজরের পর আরাফাতে ভ্রমণ', 'মসজিদ নামিরায় খুতবা', 'সূর্যাস্ত পর্যন্ত দোয়া', 'মুজদালিফায় ভ্রমণ', 'জামারাতের জন্য কঙ্কর সংগ্রহ'] },
      { day: 6, title: 'ঈদুল আজহা ও পাথর নিক্ষেপ (১০ তারিখ)', description: 'জামারাত আল-আকাবায় পাথর নিক্ষেপ, কুরবানি, হালক, তাওয়াফ আল-ইফাদাহ।', activities: ['জামারাত আল-আকাবায় পাথর নিক্ষেপ', 'কুরবানি', 'হালক / তাকসির', 'তাওয়াফ আল-ইফাদাহ ও সাঈ', 'মিনায় ফিরে আসা'] },
      { day: 7, title: 'তাশরিকের দিনসমূহ (১১-১৩)', description: 'প্রতিদিন তিনটি জামারাতে পাথর নিক্ষেপ চালিয়ে যান।', activities: ['তিনটি জামারাতে পাথর নিক্ষেপ', 'মিনায় ইবাদত', 'গ্রুপ আলোচনা'] },
    )
  }
  const middleStart = type === 'hajj' ? 8 : 4
  for (let i = middleStart; i <= days - 2; i++) {
    if (i === middleStart) {
      start.push({ day: i, title: 'মদিনায় প্রস্থান', description: 'এসি কোচে রাসূল ﷺ-এর শহরে ভ্রমণ। মসজিদে নববীর কাছে হোটেলে চেক-ইন।', activities: ['লাক্সারি কোচে ভ্রমণ (~৫ ঘণ্টা)', 'হোটেল চেক-ইন', 'মসজিদে নববী পরিদর্শন', 'রওজা শরিফে সালাম'] })
    } else if (i === middleStart + 1) {
      start.push({ day: i, title: 'মদিনার যিয়ারত', description: 'মদিনার পবিত্র স্থানসমূহের ঐতিহাসিক ও আধ্যাত্মিক ভ্রমণ।', activities: ['কুবা মসজিদ', 'মসজিদ আল-কিবলাতাইন', 'উহুদ পর্বত ও শহীদগণ', 'সাত মসজিদ', 'খেজুর বাগান'] })
    } else {
      start.push({ day: i, title: `মসজিদে নববীতে ইবাদত`, description: 'দ্বিতীয় পবিত্রতম মসজিদে নিরবচ্ছিন্ন নামাজ। প্রতিদিন রওজা শরিফ পরিদর্শন।', activities: ['৪০ ওয়াক্ত নামাজের ঐতিহ্য', 'রওজা পরিদর্শন', 'কুরআন চক্র', 'গ্রুপ সেশন'] })
    }
  }
  start.push(
    { day: days - 1, title: 'মদিনায় শেষ দিন', description: 'শেষ নামাজ, বিদায়ী তাওয়াফের প্রস্তুতি, গ্রুপ আলোচনা।', activities: ['শেষ রওজা পরিদর্শন', 'মদিনার বাজারে শপিং', 'প্যাক ও প্রস্তুতি', 'গ্রুপ ফটো'] },
    { day: days, title: 'বাড়ি ফেরা', description: 'বাড়ি ফেরার ফ্লাইটের জন্য মদিনা বিমানবন্দরে স্থানান্তর।', activities: ['হোটেল চেক-আউট', 'বিমানবন্দরে স্থানান্তর', 'বাড়ি ফেরার ফ্লাইট', 'হজ্জ/উমরাহ মুবারক'] },
  )
  return start
}

const commonFaqs: PackageFAQ[] = [
  { q: 'ভিসা ফি কি অন্তর্ভুক্ত?', a: 'হ্যাঁ, সকল প্যাকেজ মূল্যে উমরাহ/হজ্জ ভিসা প্রক্রিয়াকরণ ফি, বায়োমেট্রিক নিবন্ধন এবং মন্ত্রণালয়ের ই-তাসরিহ অন্তর্ভুক্ত রয়েছে।' },
  { q: 'আমার কোন কোন ডকুমেন্ট প্রয়োজন?', a: 'বৈধ পাসপোর্ট (৬+ মাস), পাসপোর্ট সাইজের ছবি, টিকার সনদ (মেনিনজাইটিস, প্রযোজ্য ক্ষেত্রে কোভিড) এবং পূর্ণাঙ্গ আবেদন ফর্ম।' },
  { q: 'আমি কি আমার অবস্থানের সময় বাড়াতে পারি?', a: 'সময় বাড়ানো ভিসার নিয়ম ও হোটেল প্রাপ্যতার সাপেক্ষে। ব্যবস্থার জন্য প্রস্থানের কমপক্ষে ৩০ দিন আগে আমাদের টিমের সাথে যোগাযোগ করুন।' },
  { q: 'ভ্রমণ বীমা কি অন্তর্ভুক্ত?', a: 'বাধ্যতামূলক মেডিকেল বীমা অন্তর্ভুক্ত রয়েছে। আমরা ব্যাপক কভারেজে আপগ্রেড করার সুপারিশ করি যা আমরা অতিরিক্ত ফিতে ব্যবস্থা করতে পারি।' },
  { q: 'বাতিলকরণ নীতি কী?', a: 'প্রস্থানের ৬০+ দিন আগে ফ্রি বাতিলকরণ। সম্পূর্ণ সময়সূচির জন্য আমাদের রিফান্ড পলিসি পৃষ্ঠা দেখুন।' },
]

const commonZiyarah = [
  'জাবাল আন-নূর (হেরা গুহা)', 'জাবাল সাওর', 'মসজিদ আল-জিন', 'মসজিদ আয়েশা (তানঈম)',
  'কুবা মসজিদ', 'মসজিদ আল-কিবলাতাইন', 'উহুদ পর্বত', 'সাত মসজিদ', 'মদিনার খেজুর বাগান',
]

export const packages: Package[] = [
  // ============ HAJJ ============
  {
    id: 'pkg-hajj-economy',
    slug: 'economy-hajj-2026',
    name: 'ইকোনমি হজ্জ ২০২৬',
    type: 'hajj', tier: 'economy',
    shortDescription: 'হারামের কাছে শেয়ার রুম ও ৩-তারকা হোটেলসহ সাশ্রয়ী সম্পূর্ণ হজ্জ।',
    description: 'আমাদের ইকোনমি হজ্জ প্যাকেজ বাজেট-সচেতন হাজীদের একটি সম্পূর্ণ ও আধ্যাত্মিকভাবে পরিপূর্ণ অভিজ্ঞতা প্রদান করে। হারামের পায়ে হাঁটার দূরত্বে পরিষ্কার, আরামদায়ক ৩-তারকা হোটেলে থাকুন। অভিজ্ঞ গ্রুপ লিডারদের সাথে ভ্রমণ করুন, পুষ্টিকর খাবার উপভোগ করুন এবং কোনো আর্থিক চাপ ছাড়াই সম্পূর্ণভাবে আপনার ইবাদতের উপর মনোনিবেশ করুন।',
    duration: 21,
    departureDate: '2026-05-22', returnDate: '2026-06-11',
    price: 6499, discount: 0,
    status: 'published', availability: 'available', seatsLeft: 18,
    rating: 4.6, reviewsCount: 234, bookingsCount: 612, featured: false,
    hotelMakkah: { name: 'দার আল ঈমান রয়্যাল', stars: 3, distance: 'হারাম থেকে ৮৫০ মিটার', image: IMG.haramAerial },
    hotelMadinah: { name: 'ওলায়ান আল মদিনা', stars: 3, distance: 'মসজিদে নববী থেকে ৪৫০ মিটার', image: IMG.nabawiDay },
    flight: { airline: 'সৌদি এয়ারলাইন্স', departure: 'ঢাকা থেকে সরাসরি', arrival: 'জেদ্দা (JED)', class: 'ইকোনমি' },
    meals: 'নাশতা ও রাতের খাবার — দক্ষিণ এশীয়, আরব এবং পশ্চিমা অপশনসহ বুফে স্টাইলে',
    transport: 'সকল স্থানান্তর ও যিয়ারত ট্যুরের জন্য এসি কোচ',
    ziyarah: commonZiyarah,
    visa: 'হজ্জ ভিসা, বায়োমেট্রিক নিবন্ধন এবং ই-তাসরিহ অন্তর্ভুক্ত',
    included: ['হজ্জ ভিসা ও পারমিট', 'রাউন্ড-ট্রিপ ফ্লাইট (ইকোনমি)', '৩-তারকা হোটেল (কোয়াড শেয়ার)', 'এসি কোচ পরিবহন', 'নাশতা ও রাতের খাবার', 'কুরবানি কুপন', 'পুরুষদের জন্য ইহরাম', 'অভিজ্ঞ গ্রুপ লিডার', 'যিয়ারত ট্যুর', 'মিনা তাঁবু (D-ক্যাটাগরি)', '২৪/৭ গ্রাউন্ড সাপোর্ট'],
    excluded: ['ব্যক্তিগত খরচ', 'দুপুরের খাবার', 'ভ্রমণ বীমা আপগ্রেড', 'ফোন ও ইন্টারনেট', 'লন্ড্রি', 'পোর্টারদের জন্য টিপস'],
    itinerary: baseItinerary('hajj', 21),
    gallery: [IMG.kaabaDayCrowd, IMG.haramAerial, IMG.nabawiDay, IMG.nabawiUmbrellas, IMG.pilgrimsWalking, IMG.greenDomeClose],
    cover: IMG.kaabaDayCrowd,
    faqs: commonFaqs,
    highlights: ['হারামের কাছে ৩-তারকা হোটেল', 'কোয়াড-শেয়ার রুম', 'সম্পূর্ণ হজ্জ আচার-অনুষ্ঠান কভারেজ', 'গ্রুপ লিডার ও আলেম'],
    groupSize: '৪০-৬০ জন হাজী',
  },
  {
    id: 'pkg-hajj-standard',
    slug: 'standard-hajj-2026',
    name: 'স্ট্যান্ডার্ড হজ্জ ২০২৬',
    type: 'hajj', tier: 'standard',
    shortDescription: 'ট্রিপল-শেয়ার রুম ও সম্পূর্ণ যিয়ারত ট্যুরসহ ভারসাম্যপূর্ণ ৪-তারকা আরাম।',
    description: 'স্ট্যান্ডার্ড হজ্জ প্যাকেজ প্রিমিয়াম লোকেশনে ৪-তারকা হোটেল, ট্রিপল-শেয়ার রুম এবং যোগ্য আলেমদের নেতৃত্বে একটি ব্যাপক ইবাদত ও যিয়ারত সময়সূচির সাথে চমৎকার মূল্য প্রদান করে। আরাম ও সাশ্রয়িতার ভারসাম্য খুঁজছেন এমন পরিবার ও ব্যক্তিগত হাজীদের জন্য সবচেয়ে জনপ্রিয় পছন্দ।',
    duration: 23,
    departureDate: '2026-05-20', returnDate: '2026-06-12',
    price: 8999, discount: 500,
    status: 'published', availability: 'limited', seatsLeft: 6,
    rating: 4.8, reviewsCount: 421, bookingsCount: 1340, featured: true,
    hotelMakkah: { name: 'হিলটন স্যুটস মক্কা', stars: 4, distance: 'হারাম থেকে ৪০০ মিটার', image: IMG.kaabaClockTower },
    hotelMadinah: { name: 'পুলম্যান জমজম মদিনা', stars: 4, distance: 'মসজিদে নববী থেকে ১৮০ মিটার', image: IMG.greenDomeMinarets },
    flight: { airline: 'এমিরেটস / কাতার এয়ারওয়েজ', departure: 'DXB/DOH হয়ে সংযোগ', arrival: 'জেদ্দা (JED)', class: 'ইকোনমি প্লাস' },
    meals: 'নাশতা, দুপুর ও রাতের খাবার — আন্তর্জাতিক বুফে',
    transport: 'প্রিমিয়াম এসি কোচ + বিমানবন্দর লাক্সারি স্থানান্তর',
    ziyarah: commonZiyarah,
    visa: 'হজ্জ ভিসা, বায়োমেট্রিক নিবন্ধন, ই-তাসরিহ, সকল পারমিট অন্তর্ভুক্ত',
    included: ['হজ্জ ভিসা ও পারমিট', 'রাউন্ড-ট্রিপ ফ্লাইট', '৪-তারকা হোটেল (ট্রিপল শেয়ার)', 'সকল খাবার', 'লাক্সারি পরিবহন', 'কুরবানি কুপন', 'ইহরাম ও বেল্ট', 'আলেম গাইড', 'সম্পূর্ণ যিয়ারত ট্যুর', 'মিনা তাঁবু (C-ক্যাটাগরি)', 'জমজম পানি (১০ লিটার)', '২৪/৭ বহুভাষিক সাপোর্ট'],
    excluded: ['ব্যক্তিগত শপিং', 'লন্ড্রি', 'ফোন কল', 'পোর্টারদের জন্য টিপস', 'ঐচ্ছিক স্পা পরিষেবা'],
    itinerary: baseItinerary('hajj', 23),
    gallery: [IMG.kaabaClockTower, IMG.kaabaDayMinarets, IMG.greenDomeMinarets, IMG.nabawiUmbrellaGolden, IMG.nabawiInterior, IMG.kaabaIhramDay],
    cover: IMG.kaabaClockTower,
    faqs: commonFaqs,
    highlights: ['৪-তারকা প্রাইম লোকেশন হোটেল', 'আলেম-পরিচালিত ইবাদত', 'ট্রিপল-শেয়ার রুম', 'প্রিমিয়াম মিনা তাঁবু'],
    groupSize: '৩০-৪৫ জন হাজী',
  },
  {
    id: 'pkg-hajj-premium',
    slug: 'premium-hajj-2026',
    name: 'প্রিমিয়াম হজ্জ ২০২৬',
    type: 'hajj', tier: 'premium',
    shortDescription: 'হারাম ভিউ ও ডাবল-শেয়ার রুমসহ ৫-তারকা হোটেল। প্রিমিয়াম ইবাদত অভিজ্ঞতা।',
    description: 'সরাসরি হারাম ভিউ সমৃদ্ধ ৫-তারকা আবাসন, লাক্সারি সুবিধাসহ ডাবল-শেয়ার রুম এবং একজন নিবেদিত আলেম গ্রুপ লিডার নিয়ে প্রিমিয়াম হজ্জ অভিজ্ঞতায় পা রাখুন। মিনা তাঁবু ব্যক্তিগত বাথরুমসহ B-ক্যাটাগরিতে আপগ্রেড করা হয়েছে। যারা তাদের পবিত্র যাত্রায় আরামকে মূল্য দেন তাদের জন্য আদর্শ।',
    duration: 24,
    departureDate: '2026-05-19', returnDate: '2026-06-13',
    price: 13499, discount: 800,
    status: 'published', availability: 'available', seatsLeft: 12,
    rating: 4.9, reviewsCount: 187, bookingsCount: 542, featured: true,
    hotelMakkah: { name: 'কনরাড মক্কা / ফেয়ারমন্ট ক্লক টাওয়ার', stars: 5, distance: '৫০ মিটার / হারাম ভিউ', image: IMG.kaabaDayMinarets },
    hotelMadinah: { name: 'দ্য ওবেরয় মদিনা', stars: 5, distance: 'মসজিদে নববী থেকে ১২০ মিটার', image: IMG.greenDomeClose },
    flight: { airline: 'এমিরেটস / কাতার এয়ারওয়েজ', departure: 'সরাসরি (যেখানে উপলব্ধ)', arrival: 'জেদ্দা (JED)', class: 'প্রিমিয়াম ইকোনমি' },
    meals: 'সকল খাবার — প্রিমিয়াম আন্তর্জাতিক বুফে, ইফতার প্যাকেজ',
    transport: 'লাক্সারি এসি কোচ + ভিআইপি স্থানান্তরের জন্য প্রাইভেট SUV',
    ziyarah: commonZiyarah,
    visa: 'হজ্জ ভিসা, ই-তাসরিহ, সকল পারমিট, বায়োমেট্রিক অন্তর্ভুক্ত',
    included: ['হজ্জ ভিসা ও পারমিট', 'প্রিমিয়াম ইকোনমি ফ্লাইট', '৫-তারকা হারাম-ভিউ হোটেল (ডাবল শেয়ার)', 'সকল প্রিমিয়াম খাবার', 'লাক্সারি পরিবহন', 'প্রিমিয়াম কুরবানি', 'প্রিমিয়াম ইহরাম কিট', 'নিবেদিত আলেম', 'ঐতিহাসিকসহ সম্পূর্ণ যিয়ারত', 'মিনা তাঁবু (B-ক্যাটাগরি)', 'জমজম (১০ লিটার)', 'স্বাগতম উপহার হ্যাম্পার', '২৪/৭ কনসিয়ার্জ'],
    excluded: ['ব্যক্তিগত শপিং', 'স্পা', 'আন্তর্জাতিক কল', 'ঐচ্ছিক ভ্রমণ'],
    itinerary: baseItinerary('hajj', 24),
    gallery: [IMG.kaabaDayMinarets, IMG.kaabaNightKiswa, IMG.greenDomeClose, IMG.greenDomeStarFrame, IMG.nabawiUmbrellaSky, IMG.kaabaCloseDoor],
    cover: IMG.kaabaDayMinarets,
    faqs: commonFaqs,
    highlights: ['৫-তারকা হারাম-ভিউ হোটেল', 'ডাবল-শেয়ার রুম', 'নিবেদিত আলেম', 'প্রিমিয়াম মিনা তাঁবু'],
    groupSize: '২০-৩০ জন হাজী',
  },
  {
    id: 'pkg-hajj-vip',
    slug: 'vip-hajj-2026',
    name: 'ভিআইপি হজ্জ ২০২৬',
    type: 'hajj', tier: 'vip',
    shortDescription: 'অতুলনীয় ৫-তারকা লাক্সারি, একক রুম, ব্যক্তিগত আলেম, মিনা ভিআইপি তাঁবু।',
    description: 'হজ্জ ভ্রমণের শীর্ষবিন্দু। সরাসরি হারাম ভিউসহ একক-অধিবাসী ৫-তারকা স্যুট, নিবেদিত ব্যক্তিগত আলেম, প্রাইভেট স্থানান্তর, হোটেল-স্টাইলের সুবিধাসহ ভিআইপি মিনা তাঁবু (A-ক্যাটাগরি), এবং ২৪/৭ কনসিয়ার্জ। যে বিজ্ঞ হাজী কোনো বিঘ্ন ছাড়াই প্রতিটি মুহূর্ত ইবাদতে নিবেদিত করতে চান তার জন্য ডিজাইন করা।',
    duration: 25,
    departureDate: '2026-05-18', returnDate: '2026-06-14',
    price: 24999, discount: 1500,
    status: 'published', availability: 'limited', seatsLeft: 4,
    rating: 5.0, reviewsCount: 78, bookingsCount: 156, featured: true,
    hotelMakkah: { name: 'রাফেলস মক্কা প্যালেস', stars: 5, distance: 'হারামের সংলগ্ন', image: IMG.kaabaNightKiswa },
    hotelMadinah: { name: 'মদিনা ম্যারিয়ট', stars: 5, distance: 'মসজিদে নববী থেকে ৯০ মিটার', image: IMG.nabawiNight },
    flight: { airline: 'এমিরেটস / কাতার', departure: 'সরাসরি', arrival: 'জেদ্দা (JED)', class: 'বিজনেস ক্লাস' },
    meals: 'সকল খাবার আ লা কার্টে, প্রিমিয়াম ইফতার, ইন-রুম ডাইনিং',
    transport: 'সর্বত্র প্রাইভেট মার্সিডিজ ভি-ক্লাস স্থানান্তর',
    ziyarah: commonZiyarah,
    visa: 'ভিআইপি হজ্জ ভিসা ফাস্ট-ট্র্যাক, সকল পারমিট, বায়োমেট্রিক অন্তর্ভুক্ত',
    included: ['হজ্জ ভিসা ফাস্ট-ট্র্যাক', 'বিজনেস ক্লাস ফ্লাইট', '৫-তারকা স্যুট একক অধিবাসন', 'সকল প্রিমিয়াম খাবার', 'প্রাইভেট মার্সিডিজ স্থানান্তর', 'প্রিমিয়াম কুরবানি × ২', 'লাক্সারি ইহরাম কিট', 'ব্যক্তিগত আলেম (১:৫ অনুপাত)', 'প্রাইভেট যিয়ারত ট্যুর', 'মিনা তাঁবু (A-ক্যাটাগরি ভিআইপি)', 'জমজম (২০ লিটার)', 'স্বাগতম হ্যাম্পার', 'ব্যক্তিগত বাটলার', '২৪/৭ কনসিয়ার্জ'],
    excluded: ['সীমার উপরে ব্যক্তিগত শপিং', 'স্পা আপগ্রেড'],
    itinerary: baseItinerary('hajj', 25),
    gallery: [IMG.kaabaNightKiswa, IMG.kaabaNightHaram, IMG.kaabaNightFamily, IMG.nabawiNight, IMG.greenDomeStarFrame, IMG.kaabaCloseDoor],
    cover: IMG.kaabaNightKiswa,
    faqs: commonFaqs,
    highlights: ['একক ৫-তারকা স্যুট', 'ব্যক্তিগত আলেম', 'ভিআইপি মিনা তাঁবু', 'বিজনেস ক্লাস ফ্লাইট'],
    groupSize: '১০-১৫ জন হাজী',
  },

  // ============ UMRAH ============
  {
    id: 'pkg-umrah-budget',
    slug: 'budget-umrah-2026',
    name: 'বাজেট উমরাহ',
    type: 'umrah', tier: 'budget',
    shortDescription: '৩-তারকা হোটেল ও কোয়াড রুমসহ সবচেয়ে সাশ্রয়ী উমরাহ। একক ভ্রমণকারীদের জন্য নিখুঁত।',
    description: 'আমাদের বাজেট উমরাহ আপনাকে অতিরিক্ত খরচ ছাড়াই আপনার উমরাহ সম্পাদন করতে দেয়। হারামের ১৫-মিনিট হাঁটার দূরত্বে পরিষ্কার, ভালো লোকেশনে ৩-তারকা হোটেলে থাকুন, সহকর্মী হাজীদের সাথে রুম শেয়ার করুন এবং প্রতিদিনের নাশতা উপভোগ করুন। সকল ভিসা ও গ্রাউন্ড পরিষেবা অন্তর্ভুক্ত।',
    duration: 7,
    departureDate: '2026-02-15', returnDate: '2026-02-21',
    price: 1199, discount: 100,
    status: 'published', availability: 'available', seatsLeft: 42,
    rating: 4.5, reviewsCount: 312, bookingsCount: 1820, featured: false,
    hotelMakkah: { name: 'আল মাসসা হোটেল', stars: 3, distance: 'হারাম থেকে ৯০০ মিটার', image: IMG.haramAerial },
    hotelMadinah: { name: 'দাল্লাহ তায়বাহ', stars: 3, distance: 'মসজিদে নববী থেকে ৩৫০ মিটার', image: IMG.nabawiUmbrellas },
    flight: { airline: 'টার্কিশ এয়ারলাইন্স', departure: 'IST হয়ে সংযোগ', arrival: 'জেদ্দা (JED)', class: 'ইকোনমি' },
    meals: 'শুধুমাত্র নাশতা',
    transport: 'স্থানান্তর ও যিয়ারতের জন্য শেয়ার্ড এসি কোচ',
    ziyarah: ['জাবাল আন-নূর', 'জাবাল সাওর', 'মসজিদ আয়েশা', 'কুবা মসজিদ', 'মসজিদ আল-কিবলাতাইন', 'উহুদ পর্বত'],
    visa: 'উমরাহ ভিসা ও প্রক্রিয়াকরণ অন্তর্ভুক্ত',
    included: ['উমরাহ ভিসা', 'রাউন্ড-ট্রিপ ফ্লাইট', '৩-তারকা হোটেল (কোয়াড)', 'নাশতা', 'শেয়ার্ড পরিবহন', 'যিয়ারত ট্যুর', 'গ্রুপ লিডার', 'জমজম ৫ লিটার'],
    excluded: ['দুপুর ও রাতের খাবার', 'ব্যক্তিগত খরচ', 'ভ্রমণ বীমা', 'ফোন ও ইন্টারনেট', 'টিপস'],
    itinerary: baseItinerary('umrah', 7),
    gallery: [IMG.kaabaIhramDay, IMG.haramAerial, IMG.nabawiUmbrellas, IMG.greenDomeClose],
    cover: IMG.kaabaIhramDay,
    faqs: commonFaqs,
    highlights: ['৩-তারকা হোটেল', 'কোয়াড-শেয়ার রুম', 'সবচেয়ে সাশ্রয়ী', 'গ্রুপ লিডার'],
    groupSize: '২৫-৪০ জন হাজী',
  },
  {
    id: 'pkg-umrah-economy',
    slug: 'economy-umrah-2026',
    name: 'ইকোনমি উমরাহ',
    type: 'umrah', tier: 'economy',
    shortDescription: 'ট্রিপল রুম ও হাফ-বোর্ড খাবারসহ মজবুত ৩-তারকা প্লাস অবস্থান। সবচেয়ে জনপ্রিয় উমরাহ।',
    description: 'আমাদের সর্বাধিক বুক করা উমরাহ প্যাকেজ মান ও সাশ্রয়িতার ভারসাম্য রাখে। ৩-তারকা প্লাস হোটেলে হারামের কাছে থাকুন, আরামদায়ক বিছানাসহ ট্রিপল রুম শেয়ার করুন এবং নাশতা ও রাতের খাবার উপভোগ করুন। হাজার হাজার হাজীকে সেবা প্রদানকারী একটি নির্ভরযোগ্য পছন্দ।',
    duration: 10,
    departureDate: '2026-03-01', returnDate: '2026-03-10',
    price: 1899, discount: 150,
    status: 'published', availability: 'available', seatsLeft: 27,
    rating: 4.7, reviewsCount: 489, bookingsCount: 2410, featured: true,
    hotelMakkah: { name: 'রোতানা কর্তৃক আল মারওয়া রায়হান', stars: 4, distance: 'হারাম থেকে ৫০০ মিটার', image: IMG.kaabaDayCrowd },
    hotelMadinah: { name: 'রয়্যাল ইন মদিনা', stars: 4, distance: 'মসজিদে নববী থেকে ২৫০ মিটার', image: IMG.nabawiUmbrellaGolden },
    flight: { airline: 'কাতার এয়ারওয়েজ', departure: 'DOH হয়ে সংযোগ', arrival: 'জেদ্দা (JED)', class: 'ইকোনমি' },
    meals: 'নাশতা ও রাতের খাবার — বুফে',
    transport: 'সকল স্থানান্তর ও যিয়ারতের জন্য এসি কোচ',
    ziyarah: commonZiyarah,
    visa: 'উমরাহ ভিসা, বায়োমেট্রিক ও প্রক্রিয়াকরণ অন্তর্ভুক্ত',
    included: ['উমরাহ ভিসা', 'রাউন্ড-ট্রিপ ফ্লাইট', '৪-তারকা হোটেল (ট্রিপল)', 'নাশতা ও রাতের খাবার', 'এসি পরিবহন', 'যিয়ারত ট্যুর', 'আলেম গ্রুপ লিডার', 'পুরুষদের জন্য ইহরাম', 'জমজম ৫ লিটার', '২৪/৭ সাপোর্ট'],
    excluded: ['দুপুরের খাবার', 'ব্যক্তিগত খরচ', 'ঐচ্ছিক ভ্রমণ', 'টিপস'],
    itinerary: baseItinerary('umrah', 10),
    gallery: [IMG.kaabaDayCrowd, IMG.kaabaIhramDay, IMG.nabawiUmbrellaGolden, IMG.greenDomeMinarets, IMG.nabawiCoupleArches],
    cover: IMG.kaabaDayCrowd,
    faqs: commonFaqs,
    highlights: ['৪-তারকা হোটেল', 'ট্রিপল-শেয়ার রুম', 'আলেম লিডার', 'হাফ-বোর্ড খাবার'],
    groupSize: '২০-৩০ জন হাজী',
  },
  {
    id: 'pkg-umrah-premium',
    slug: 'premium-umrah-2026',
    name: 'প্রিমিয়াম উমরাহ',
    type: 'umrah', tier: 'premium',
    shortDescription: 'ডাবল রুম ও ফুল-বোর্ড খাবারসহ ৫-তারকা হারাম-এলাকার হোটেল।',
    description: 'আমাদের প্রিমিয়াম প্যাকেজের সাথে আপনার উমরাহকে উন্নত করুন। হারাম থেকে কয়েক মিনিটের মধ্যে ৫-তারকা হোটেল, লাক্সারি সুবিধাসহ ডাবল-অধিবাসী রুম, দিনে তিন বেলা খাবার এবং নিবেদিত আলেম গাইড। একজন ঐতিহাসিকসহ প্রিমিয়াম যিয়ারত ট্যুর অন্তর্ভুক্ত।',
    duration: 12,
    departureDate: '2026-03-15', returnDate: '2026-03-26',
    price: 3299, discount: 200,
    status: 'published', availability: 'available', seatsLeft: 18,
    rating: 4.9, reviewsCount: 234, bookingsCount: 980, featured: true,
    hotelMakkah: { name: 'সুইসোটেল মক্কা / পুলম্যান জমজম', stars: 5, distance: 'হারাম থেকে ১৮০ মিটার', image: IMG.kaabaDayMinarets },
    hotelMadinah: { name: 'লি মেরিডিয়েন মদিনা', stars: 5, distance: 'মসজিদে নববী থেকে ১২০ মিটার', image: IMG.greenDomeStarFrame },
    flight: { airline: 'এমিরেটস / কাতার', departure: 'সংযোগ বা সরাসরি', arrival: 'জেদ্দা (JED)', class: 'ইকোনমি প্লাস' },
    meals: 'সকল খাবার — প্রিমিয়াম আন্তর্জাতিক বুফে',
    transport: 'লাক্সারি এসি কোচ + প্রাইভেট বিমানবন্দর স্থানান্তর',
    ziyarah: commonZiyarah,
    visa: 'উমরাহ ভিসা ফাস্ট-ট্র্যাক অন্তর্ভুক্ত',
    included: ['উমরাহ ভিসা ফাস্ট-ট্র্যাক', 'প্রিমিয়াম ইকোনমি ফ্লাইট', '৫-তারকা হোটেল (ডাবল শেয়ার)', 'সকল প্রিমিয়াম খাবার', 'লাক্সারি পরিবহন', 'নিবেদিত আলেম', 'ঐতিহাসিকসহ সম্পূর্ণ যিয়ারত', 'প্রিমিয়াম ইহরাম কিট', 'জমজম ১০ লিটার', 'স্বাগতম উপহার', '২৪/৭ কনসিয়ার্জ'],
    excluded: ['ব্যক্তিগত শপিং', 'স্পা', 'ঐচ্ছিক ভ্রমণ'],
    itinerary: baseItinerary('umrah', 12),
    gallery: [IMG.kaabaDayMinarets, IMG.kaabaNightFamily, IMG.greenDomeStarFrame, IMG.nabawiUmbrellaSky, IMG.kaabaCloseDoor, IMG.greenDomeClose],
    cover: IMG.kaabaDayMinarets,
    faqs: commonFaqs,
    highlights: ['৫-তারকা হারাম-এলাকার হোটেল', 'ডাবল রুম', 'ফুল বোর্ড', 'প্রিমিয়াম যিয়ারত'],
    groupSize: '১৫-২৫ জন হাজী',
  },
  {
    id: 'pkg-umrah-luxury',
    slug: 'luxury-umrah-2026',
    name: 'লাক্সারি উমরাহ',
    type: 'umrah', tier: 'luxury',
    shortDescription: 'ব্যক্তিগত আলেম ও মার্সিডিজ স্থানান্তরসহ চূড়ান্ত একক-স্যুট ৫-তারকা অভিজ্ঞতা।',
    description: 'সবচেয়ে এক্সক্লুসিভ উমরাহ যাত্রা। সরাসরি হারাম ভিউসহ প্রাইভেট ৫-তারকা স্যুট, একজন ব্যক্তিগত আলেম গাইড, মার্সিডিজ ভি-ক্লাস প্রাইভেট স্থানান্তর, আ লা কার্টে প্রিমিয়াম খাবার এবং ২৪/৭ বাটলার সেবা। ভিআইপি হাজীদের জন্য সত্যিই অবিস্মরণীয় আধ্যাত্মিক অভিজ্ঞতা।',
    duration: 14,
    departureDate: '2026-04-01', returnDate: '2026-04-14',
    price: 6499, discount: 400,
    status: 'published', availability: 'limited', seatsLeft: 6,
    rating: 5.0, reviewsCount: 89, bookingsCount: 215, featured: true,
    hotelMakkah: { name: 'রাফেলস মক্কা প্যালেস (স্যুট)', stars: 5, distance: 'হারামের সংলগ্ন', image: IMG.kaabaNightHaram },
    hotelMadinah: { name: 'দ্য ওবেরয় মদিনা (স্যুট)', stars: 5, distance: 'মসজিদে নববী থেকে ৯০ মিটার', image: IMG.nabawiNight },
    flight: { airline: 'এমিরেটস / কাতার', departure: 'সরাসরি', arrival: 'জেদ্দা (JED)', class: 'বিজনেস ক্লাস' },
    meals: 'আ লা কার্টে প্রিমিয়াম, ২৪/৭ ইন-রুম ডাইনিং',
    transport: 'সর্বত্র প্রাইভেট মার্সিডিজ ভি-ক্লাস',
    ziyarah: commonZiyarah,
    visa: 'উমরাহ ভিসা ভিআইপি ফাস্ট-ট্র্যাক অন্তর্ভুক্ত',
    included: ['ভিআইপি ভিসা ফাস্ট-ট্র্যাক', 'বিজনেস ক্লাস ফ্লাইট', '৫-তারকা স্যুট একক অধিবাসন', 'আ লা কার্টে খাবার', 'প্রাইভেট মার্সিডিজ', 'ব্যক্তিগত আলেম (১:৩)', 'প্রাইভেট যিয়ারত', 'লাক্সারি ইহরাম কিট', 'জমজম ২০ লিটার', 'স্বাগতম হ্যাম্পার', 'ব্যক্তিগত বাটলার', '২৪/৭ কনসিয়ার্জ'],
    excluded: ['সীমার উপরে ব্যক্তিগত শপিং'],
    itinerary: baseItinerary('umrah', 14),
    gallery: [IMG.kaabaNightHaram, IMG.kaabaNightKiswa, IMG.kaabaNightFamily, IMG.nabawiNight, IMG.greenDomeStarFrame],
    cover: IMG.kaabaNightHaram,
    faqs: commonFaqs,
    highlights: ['একক ৫-তারকা স্যুট', 'ব্যক্তিগত আলেম', 'মার্সিডিজ স্থানান্তর', 'বিজনেস ক্লাস'],
    groupSize: '৮-১২ জন হাজী',
  },
]

export const getPackage = (slug: string) => packages.find(p => p.slug === slug)
export const getPackagesByType = (type: PackageType) => packages.filter(p => p.type === type)
export const getFeaturedPackages = () => packages.filter(p => p.featured)
