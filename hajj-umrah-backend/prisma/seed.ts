/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const DEFAULT_PASSWORD = 'Pilgrim@2026'

const userSeeds = [
  {
    id: 'p-001', full_name: 'মোহাম্মদ আনোয়ার', email: 'm.anwar@email.com', phone: '+880 1711-552341',
    dateOfBirth: new Date('1978-05-12'), gender: 'MALE' as const, nationality: 'বাংলাদেশী',
    address: '২৪৫ ধানমন্ডি, সড়ক ৫', city: 'ঢাকা', country: 'বাংলাদেশ', avatar: 'from-blue-400 to-indigo-500',
    passportNumber: 'A12345678', passportIssueDate: new Date('2021-08-15'),
    passportExpiryDate: new Date('2031-08-14'), passportCountry: 'বাংলাদেশ',
    emergencyContactName: 'খাদিজা আনোয়ার', emergencyContactRelationship: 'স্ত্রী',
    emergencyContactPhone: '+880 1711-552342',
    bookingsCount: 3, totalSpent: 38497, joinedDate: new Date('2022-04-10'),
    documents: [
      { type: 'পাসপোর্ট', status: 'VERIFIED' as const, uploadedDate: new Date('2025-11-20') },
      { type: 'ছবি', status: 'VERIFIED' as const, uploadedDate: new Date('2025-11-20') },
      { type: 'টিকার সনদ', status: 'VERIFIED' as const, uploadedDate: new Date('2025-11-25') },
    ],
  },
  {
    id: 'p-002', full_name: 'আয়েশা খান', email: 'aisha.khan@email.com', phone: '+880 1712-900123',
    dateOfBirth: new Date('1992-09-22'), gender: 'FEMALE' as const, nationality: 'বাংলাদেশী',
    address: '১২ গুলশান এভিনিউ', city: 'ঢাকা', country: 'বাংলাদেশ', avatar: 'from-rose-400 to-pink-500',
    passportNumber: 'BD987654321', passportIssueDate: new Date('2020-03-10'),
    passportExpiryDate: new Date('2030-03-09'), passportCountry: 'বাংলাদেশ',
    emergencyContactName: 'ইমরান খান', emergencyContactRelationship: 'ভাই',
    emergencyContactPhone: '+880 1712-900124',
    bookingsCount: 1, totalSpent: 1749, joinedDate: new Date('2025-11-15'),
    documents: [
      { type: 'পাসপোর্ট', status: 'VERIFIED' as const, uploadedDate: new Date('2025-12-08') },
      { type: 'ছবি', status: 'VERIFIED' as const, uploadedDate: new Date('2025-12-08') },
      { type: 'টিকার সনদ', status: 'VERIFIED' as const, uploadedDate: new Date('2025-12-10') },
    ],
  },
  {
    id: 'p-003', full_name: 'ইউসুফ গার্সিয়া', email: 'y.garcia@email.com', phone: '+880 1832-559912',
    dateOfBirth: new Date('1965-02-08'), gender: 'MALE' as const, nationality: 'বাংলাদেশী',
    address: '৮৯১০ আগ্রাবাদ বাণিজ্যিক এলাকা', city: 'চট্টগ্রাম', country: 'বাংলাদেশ', avatar: 'from-emerald-400 to-teal-500',
    passportNumber: 'BD87654321', passportIssueDate: new Date('2022-11-20'),
    passportExpiryDate: new Date('2032-11-19'), passportCountry: 'বাংলাদেশ',
    emergencyContactName: 'লায়লা গার্সিয়া', emergencyContactRelationship: 'স্ত্রী',
    emergencyContactPhone: '+880 1832-559913',
    bookingsCount: 4, totalSpent: 78498, joinedDate: new Date('2019-07-22'),
    documents: [
      { type: 'পাসপোর্ট', status: 'VERIFIED' as const, uploadedDate: new Date('2025-10-12') },
      { type: 'ছবি', status: 'VERIFIED' as const, uploadedDate: new Date('2025-10-12') },
      { type: 'টিকার সনদ', status: 'VERIFIED' as const, uploadedDate: new Date('2025-10-15') },
      { type: 'মেডিকেল চিঠি', status: 'VERIFIED' as const, uploadedDate: new Date('2025-10-15') },
    ],
  },
  {
    id: 'p-004', full_name: 'হাফসা বিলাল', email: 'h.bilal@email.com', phone: '+880 1416-553344',
    dateOfBirth: new Date('1985-11-30'), gender: 'FEMALE' as const, nationality: 'বাংলাদেশী',
    address: '৪৫০ উত্তরা সেক্টর ৭', city: 'ঢাকা', country: 'বাংলাদেশ', avatar: 'from-violet-400 to-purple-500',
    passportNumber: 'BD1234567', passportIssueDate: new Date('2023-05-15'),
    passportExpiryDate: new Date('2033-05-14'), passportCountry: 'বাংলাদেশ',
    emergencyContactName: 'বিলাল হাফসা', emergencyContactRelationship: 'স্বামী',
    emergencyContactPhone: '+880 1416-553345',
    bookingsCount: 2, totalSpent: 20198, joinedDate: new Date('2023-12-05'),
    documents: [
      { type: 'পাসপোর্ট', status: 'VERIFIED' as const, uploadedDate: new Date('2025-09-30') },
      { type: 'ছবি', status: 'VERIFIED' as const, uploadedDate: new Date('2025-09-30') },
      { type: 'টিকার সনদ', status: 'VERIFIED' as const, uploadedDate: new Date('2025-10-02') },
    ],
  },
  {
    id: 'p-005', full_name: 'ইব্রাহিম দিওপ', email: 'i.diop@email.com', phone: '+880 1612-345678',
    dateOfBirth: new Date('1972-04-18'), gender: 'MALE' as const, nationality: 'বাংলাদেশী',
    address: '৩৪ পান্থপথ রোড', city: 'ঢাকা', country: 'বাংলাদেশ', avatar: 'from-amber-400 to-orange-500',
    passportNumber: 'BD12345678', passportIssueDate: new Date('2020-07-10'),
    passportExpiryDate: new Date('2030-07-09'), passportCountry: 'বাংলাদেশ',
    emergencyContactName: 'ফাতু দিওপ', emergencyContactRelationship: 'স্ত্রী',
    emergencyContactPhone: '+880 1612-345679',
    bookingsCount: 2, totalSpent: 27246, joinedDate: new Date('2020-11-12'),
    documents: [
      { type: 'পাসপোর্ট', status: 'VERIFIED' as const, uploadedDate: new Date('2025-09-15') },
      { type: 'ছবি', status: 'VERIFIED' as const, uploadedDate: new Date('2025-09-15') },
      { type: 'টিকার সনদ', status: 'VERIFIED' as const, uploadedDate: new Date('2025-09-20') },
    ],
  },
]

const commonZiyarah = [
  'জাবাল আন-নূর (হেরা গুহা)', 'জাবাল সাওর', 'মসজিদ আল-জিন', 'মসজিদ আয়েশা (তানঈম)',
  'কুবা মসজিদ', 'মসজিদ আল-কিবলাতাইন', 'উহুদ পর্বত', 'সাত মসজিদ', 'মদিনার খেজুর বাগান',
]

const commonFaqs = [
  { question: 'ভিসা ফি কি অন্তর্ভুক্ত?', answer: 'হ্যাঁ, সকল প্যাকেজ মূল্যে উমরাহ/হজ্জ ভিসা প্রক্রিয়াকরণ ফি, বায়োমেট্রিক নিবন্ধন এবং মন্ত্রণালয়ের ই-তাসরিহ অন্তর্ভুক্ত রয়েছে।' },
  { question: 'আমার কোন কোন ডকুমেন্ট প্রয়োজন?', answer: 'বৈধ পাসপোর্ট (৬+ মাস), পাসপোর্ট সাইজের ছবি, টিকার সনদ (মেনিনজাইটিস, প্রযোজ্য ক্ষেত্রে কোভিড) এবং পূর্ণাঙ্গ আবেদন ফর্ম।' },
  { question: 'আমি কি আমার অবস্থানের সময় বাড়াতে পারি?', answer: 'সময় বাড়ানো ভিসার নিয়ম ও হোটেল প্রাপ্যতার সাপেক্ষে। ব্যবস্থার জন্য প্রস্থানের কমপক্ষে ৩০ দিন আগে আমাদের টিমের সাথে যোগাযোগ করুন।' },
  { question: 'ভ্রমণ বীমা কি অন্তর্ভুক্ত?', answer: 'বাধ্যতামূলক মেডিকেল বীমা অন্তর্ভুক্ত রয়েছে। আমরা ব্যাপক কভারেজে আপগ্রেড করার সুপারিশ করি যা আমরা অতিরিক্ত ফিতে ব্যবস্থা করতে পারি।' },
  { question: 'বাতিলকরণ নীতি কী?', answer: 'প্রস্থানের ৬০+ দিন আগে ফ্রি বাতিলকরণ। সম্পূর্ণ সময়সূচির জন্য আমাদের রিফান্ড পলিসি পৃষ্ঠা দেখুন।' },
]

const buildItinerary = (type: 'HAJJ' | 'UMRAH', days: number) => {
  const rows: any[] = [
    { day: 1, title: 'প্রস্থান ও জেদ্দায় আগমন', description: 'নিজ শহর থেকে ফ্লাইট, কিং আব্দুল আজিজ আন্তর্জাতিক বিমানবন্দরে আগমন, মক্কা হোটেলে স্থানান্তর।', activities: ['বিমানবন্দরে অভ্যর্থনা', 'ভিসা প্রক্রিয়াকরণ সহায়তা', 'এসি কোচে স্থানান্তর', 'হোটেল চেক-ইন', 'স্বাগতম ব্রিফিং'] },
    { day: 2, title: 'প্রথম উমরাহ ও তাওয়াফ', description: 'অভিজ্ঞ আলেমের সাথে প্রথম উমরাহ সম্পাদন।', activities: ['মিকাত থেকে ইহরাম', 'তাওয়াফ আল-উমরাহ', 'সাফা ও মারওয়ার মাঝে সাঈ', 'চুল কাটা (হালক/তাকসির)', 'গ্রুপ আলোচনা'] },
    { day: 3, title: 'মসজিদ আল-হারামে ইবাদত', description: 'পূর্ণ দিন ইবাদত, অতিরিক্ত উমরাহ ও কুরআন অধ্যয়ন চক্র।', activities: ['হারামে ফজর', 'ঐচ্ছিক দ্বিতীয় উমরাহ', 'কুরআন তাফসির সেশন', 'মাগরিব ও ইশার নামাজ'] },
  ]
  if (type === 'HAJJ') {
    rows.push(
      { day: 4, title: 'মিনায় প্রস্থান (৮ জিলহজ্জ)', description: 'ইয়াওম আত-তারওয়িয়াহর জন্য মিনায় ভ্রমণ।', activities: ['মিনার তাঁবুতে ভ্রমণ', 'মিনায় পাঁচ ওয়াক্ত নামাজ', 'গ্রুপ লেকচার', 'এসি তাঁবুতে বিশ্রাম'] },
      { day: 5, title: 'আরাফাতের দিন (৯ জিলহজ্জ)', description: 'হজ্জের সবচেয়ে পবিত্র দিন।', activities: ['ফজরের পর আরাফাতে ভ্রমণ', 'মসজিদ নামিরায় খুতবা', 'সূর্যাস্ত পর্যন্ত দোয়া', 'মুজদালিফায় ভ্রমণ', 'জামারাতের জন্য কঙ্কর সংগ্রহ'] },
      { day: 6, title: 'ঈদুল আজহা ও পাথর নিক্ষেপ (১০ তারিখ)', description: 'জামারাত আল-আকাবায় পাথর নিক্ষেপ, কুরবানি, হালক, তাওয়াফ আল-ইফাদাহ।', activities: ['জামারাত আল-আকাবায় পাথর নিক্ষেপ', 'কুরবানি', 'হালক / তাকসির', 'তাওয়াফ আল-ইফাদাহ ও সাঈ', 'মিনায় ফিরে আসা'] },
      { day: 7, title: 'তাশরিকের দিনসমূহ (১১-১৩)', description: 'প্রতিদিন তিনটি জামারাতে পাথর নিক্ষেপ চালিয়ে যান।', activities: ['তিনটি জামারাতে পাথর নিক্ষেপ', 'মিনায় ইবাদত', 'গ্রুপ আলোচনা'] },
    )
  }
  const middleStart = type === 'HAJJ' ? 8 : 4
  for (let i = middleStart; i <= days - 2; i++) {
    if (i === middleStart) {
      rows.push({ day: i, title: 'মদিনায় প্রস্থান', description: 'এসি কোচে রাসূল ﷺ-এর শহরে ভ্রমণ।', activities: ['লাক্সারি কোচে ভ্রমণ (~৫ ঘণ্টা)', 'হোটেল চেক-ইন', 'মসজিদে নববী পরিদর্শন', 'রওজা শরিফে সালাম'] })
    } else if (i === middleStart + 1) {
      rows.push({ day: i, title: 'মদিনার যিয়ারত', description: 'মদিনার পবিত্র স্থানসমূহের ঐতিহাসিক ও আধ্যাত্মিক ভ্রমণ।', activities: ['কুবা মসজিদ', 'মসজিদ আল-কিবলাতাইন', 'উহুদ পর্বত ও শহীদগণ', 'সাত মসজিদ', 'খেজুর বাগান'] })
    } else {
      rows.push({ day: i, title: `মসজিদে নববীতে ইবাদত`, description: 'দ্বিতীয় পবিত্রতম মসজিদে নিরবচ্ছিন্ন নামাজ।', activities: ['৪০ ওয়াক্ত নামাজের ঐতিহ্য', 'রওজা পরিদর্শন', 'কুরআন চক্র', 'গ্রুপ সেশন'] })
    }
  }
  rows.push(
    { day: days - 1, title: 'মদিনায় শেষ দিন', description: 'শেষ নামাজ, বিদায়ী তাওয়াফের প্রস্তুতি।', activities: ['শেষ রওজা পরিদর্শন', 'মদিনার বাজারে শপিং', 'প্যাক ও প্রস্তুতি', 'গ্রুপ ফটো'] },
    { day: days, title: 'বাড়ি ফেরা', description: 'বাড়ি ফেরার ফ্লাইটের জন্য মদিনা বিমানবন্দরে স্থানান্তর।', activities: ['হোটেল চেক-আউট', 'বিমানবন্দরে স্থানান্তর', 'বাড়ি ফেরার ফ্লাইট', 'হজ্জ/উমরাহ মুবারক'] },
  )
  return rows
}

// Image paths kept as the same /img/ asset references the frontend uses.
const IMG = {
  kaabaDayCrowd: '/img/adliwahid-islam-3782623.jpg',
  kaabaDayMinarets: '/img/kaaba-day-minarets.jpg',
  kaabaClockTower: '/img/kaaba-clock-tower.jpg',
  kaabaIhramDay: '/img/kaaba-ihram-day.jpg',
  kaabaNightKiswa: '/img/kaaba-night-kiswa.jpg',
  kaabaNightHaram: '/img/kaaba-night-haram.jpg',
  kaabaNightFamily: '/img/kaaba-night-family.jpg',
  kaabaCloseDoor: '/img/kaaba-close-door.jpg',
  haramAerial: '/img/haram-aerial.jpg',
  nabawiDay: '/img/pexels-aamirnazir-29102586.jpg',
  nabawiNight: '/img/nabawi-night.jpg',
  nabawiInterior: '/img/nabawi-interior.jpg',
  nabawiUmbrellas: '/img/nabawi-umbrellas.jpg',
  nabawiUmbrellaGolden: '/img/nabawi-umbrella-golden.jpg',
  nabawiUmbrellaSky: '/img/nabawi-umbrella-sky.jpg',
  nabawiCoupleArches: '/img/nabawi-couple-arches.jpg',
  greenDomeMinarets: '/img/green-dome-minarets.jpg',
  greenDomeClose: '/img/green-dome-close.jpg',
  greenDomeStarFrame: '/img/green-dome-star-frame.jpg',
  pilgrimsWalking: '/img/pilgrims-walking.jpg',
}

const packageSeeds = [
  {
    slug: 'economy-hajj-2026', name: 'ইকোনমি হজ্জ ২০২৬', type: 'HAJJ' as const, tier: 'ECONOMY' as const,
    shortDescription: 'হারামের কাছে শেয়ার রুম ও ৩-তারকা হোটেলসহ সাশ্রয়ী সম্পূর্ণ হজ্জ।',
    description: 'আমাদের ইকোনমি হজ্জ প্যাকেজ বাজেট-সচেতন হাজীদের একটি সম্পূর্ণ ও আধ্যাত্মিকভাবে পরিপূর্ণ অভিজ্ঞতা প্রদান করে।',
    duration: 21, departureDate: new Date('2026-05-22'), returnDate: new Date('2026-06-11'),
    price: 6499, discount: 0, status: 'PUBLISHED' as const, availability: 'AVAILABLE' as const, seatsLeft: 18,
    rating: 4.6, reviewsCount: 234, bookingsCount: 612, featured: false,
    hotelMakkahName: 'দার আল ঈমান রয়্যাল', hotelMakkahStars: 3, hotelMakkahDistance: 'হারাম থেকে ৮৫০ মিটার', hotelMakkahImage: IMG.haramAerial,
    hotelMadinahName: 'ওলায়ান আল মদিনা', hotelMadinahStars: 3, hotelMadinahDistance: 'মসজিদে নববী থেকে ৪৫০ মিটার', hotelMadinahImage: IMG.nabawiDay,
    flightAirline: 'সৌদি এয়ারলাইন্স', flightDeparture: 'ঢাকা থেকে সরাসরি', flightArrival: 'জেদ্দা (JED)', flightClass: 'ইকোনমি',
    meals: 'নাশতা ও রাতের খাবার — বুফে', transport: 'সকল স্থানান্তর ও যিয়ারত ট্যুরের জন্য এসি কোচ',
    ziyarah: commonZiyarah, visa: 'হজ্জ ভিসা, বায়োমেট্রিক নিবন্ধন এবং ই-তাসরিহ অন্তর্ভুক্ত',
    included: ['হজ্জ ভিসা ও পারমিট', 'রাউন্ড-ট্রিপ ফ্লাইট (ইকোনমি)', '৩-তারকা হোটেল (কোয়াড শেয়ার)', 'এসি কোচ পরিবহন', 'নাশতা ও রাতের খাবার', 'কুরবানি কুপন', 'পুরুষদের জন্য ইহরাম', 'অভিজ্ঞ গ্রুপ লিডার', 'যিয়ারত ট্যুর', 'মিনা তাঁবু (D-ক্যাটাগরি)', '২৪/৭ গ্রাউন্ড সাপোর্ট'],
    excluded: ['ব্যক্তিগত খরচ', 'দুপুরের খাবার', 'ভ্রমণ বীমা আপগ্রেড', 'ফোন ও ইন্টারনেট', 'লন্ড্রি', 'পোর্টারদের জন্য টিপস'],
    highlights: ['হারামের কাছে ৩-তারকা হোটেল', 'কোয়াড-শেয়ার রুম', 'সম্পূর্ণ হজ্জ আচার-অনুষ্ঠান কভারেজ', 'গ্রুপ লিডার ও আলেম'],
    groupSize: '৪০-৬০ জন হাজী',
    gallery: [IMG.kaabaDayCrowd, IMG.haramAerial, IMG.nabawiDay, IMG.nabawiUmbrellas, IMG.pilgrimsWalking, IMG.greenDomeClose],
    cover: IMG.kaabaDayCrowd, ext_id: 'pkg-hajj-economy',
  },
  {
    slug: 'standard-hajj-2026', name: 'স্ট্যান্ডার্ড হজ্জ ২০২৬', type: 'HAJJ' as const, tier: 'STANDARD' as const,
    shortDescription: 'ট্রিপল-শেয়ার রুম ও সম্পূর্ণ যিয়ারত ট্যুরসহ ভারসাম্যপূর্ণ ৪-তারকা আরাম।',
    description: 'স্ট্যান্ডার্ড হজ্জ প্যাকেজ প্রিমিয়াম লোকেশনে ৪-তারকা হোটেল, ট্রিপল-শেয়ার রুম এবং যোগ্য আলেমদের নেতৃত্বে একটি ব্যাপক ইবাদত সময়সূচি প্রদান করে।',
    duration: 23, departureDate: new Date('2026-05-20'), returnDate: new Date('2026-06-12'),
    price: 8999, discount: 500, status: 'PUBLISHED' as const, availability: 'LIMITED' as const, seatsLeft: 6,
    rating: 4.8, reviewsCount: 421, bookingsCount: 1340, featured: true,
    hotelMakkahName: 'হিলটন স্যুটস মক্কা', hotelMakkahStars: 4, hotelMakkahDistance: 'হারাম থেকে ৪০০ মিটার', hotelMakkahImage: IMG.kaabaClockTower,
    hotelMadinahName: 'পুলম্যান জমজম মদিনা', hotelMadinahStars: 4, hotelMadinahDistance: 'মসজিদে নববী থেকে ১৮০ মিটার', hotelMadinahImage: IMG.greenDomeMinarets,
    flightAirline: 'এমিরেটস / কাতার এয়ারওয়েজ', flightDeparture: 'DXB/DOH হয়ে সংযোগ', flightArrival: 'জেদ্দা (JED)', flightClass: 'ইকোনমি প্লাস',
    meals: 'নাশতা, দুপুর ও রাতের খাবার — আন্তর্জাতিক বুফে', transport: 'প্রিমিয়াম এসি কোচ + বিমানবন্দর লাক্সারি স্থানান্তর',
    ziyarah: commonZiyarah, visa: 'হজ্জ ভিসা, বায়োমেট্রিক, ই-তাসরিহ, সকল পারমিট অন্তর্ভুক্ত',
    included: ['হজ্জ ভিসা ও পারমিট', 'রাউন্ড-ট্রিপ ফ্লাইট', '৪-তারকা হোটেল (ট্রিপল শেয়ার)', 'সকল খাবার', 'লাক্সারি পরিবহন', 'কুরবানি কুপন', 'ইহরাম ও বেল্ট', 'আলেম গাইড', 'সম্পূর্ণ যিয়ারত ট্যুর', 'মিনা তাঁবু (C-ক্যাটাগরি)', 'জমজম পানি (১০ লিটার)', '২৪/৭ বহুভাষিক সাপোর্ট'],
    excluded: ['ব্যক্তিগত শপিং', 'লন্ড্রি', 'ফোন কল', 'পোর্টারদের জন্য টিপস', 'ঐচ্ছিক স্পা পরিষেবা'],
    highlights: ['৪-তারকা প্রাইম লোকেশন হোটেল', 'আলেম-পরিচালিত ইবাদত', 'ট্রিপল-শেয়ার রুম', 'প্রিমিয়াম মিনা তাঁবু'],
    groupSize: '৩০-৪৫ জন হাজী',
    gallery: [IMG.kaabaClockTower, IMG.kaabaDayMinarets, IMG.greenDomeMinarets, IMG.nabawiUmbrellaGolden, IMG.nabawiInterior, IMG.kaabaIhramDay],
    cover: IMG.kaabaClockTower, ext_id: 'pkg-hajj-standard',
  },
  {
    slug: 'premium-hajj-2026', name: 'প্রিমিয়াম হজ্জ ২০২৬', type: 'HAJJ' as const, tier: 'PREMIUM' as const,
    shortDescription: 'হারাম ভিউ ও ডাবল-শেয়ার রুমসহ ৫-তারকা হোটেল।',
    description: 'সরাসরি হারাম ভিউ সমৃদ্ধ ৫-তারকা আবাসন, লাক্সারি সুবিধাসহ ডাবল-শেয়ার রুম এবং একজন নিবেদিত আলেম গ্রুপ লিডার।',
    duration: 24, departureDate: new Date('2026-05-19'), returnDate: new Date('2026-06-13'),
    price: 13499, discount: 800, status: 'PUBLISHED' as const, availability: 'AVAILABLE' as const, seatsLeft: 12,
    rating: 4.9, reviewsCount: 187, bookingsCount: 542, featured: true,
    hotelMakkahName: 'কনরাড মক্কা / ফেয়ারমন্ট ক্লক টাওয়ার', hotelMakkahStars: 5, hotelMakkahDistance: '৫০ মিটার / হারাম ভিউ', hotelMakkahImage: IMG.kaabaDayMinarets,
    hotelMadinahName: 'দ্য ওবেরয় মদিনা', hotelMadinahStars: 5, hotelMadinahDistance: 'মসজিদে নববী থেকে ১২০ মিটার', hotelMadinahImage: IMG.greenDomeClose,
    flightAirline: 'এমিরেটস / কাতার এয়ারওয়েজ', flightDeparture: 'সরাসরি', flightArrival: 'জেদ্দা (JED)', flightClass: 'প্রিমিয়াম ইকোনমি',
    meals: 'সকল খাবার — প্রিমিয়াম আন্তর্জাতিক বুফে', transport: 'লাক্সারি এসি কোচ + ভিআইপি স্থানান্তরের জন্য প্রাইভেট SUV',
    ziyarah: commonZiyarah, visa: 'হজ্জ ভিসা, ই-তাসরিহ, সকল পারমিট, বায়োমেট্রিক অন্তর্ভুক্ত',
    included: ['হজ্জ ভিসা ও পারমিট', 'প্রিমিয়াম ইকোনমি ফ্লাইট', '৫-তারকা হারাম-ভিউ হোটেল (ডাবল শেয়ার)', 'সকল প্রিমিয়াম খাবার', 'লাক্সারি পরিবহন', 'প্রিমিয়াম কুরবানি', 'প্রিমিয়াম ইহরাম কিট', 'নিবেদিত আলেম', 'সম্পূর্ণ যিয়ারত', 'মিনা তাঁবু (B-ক্যাটাগরি)', 'জমজম (১০ লিটার)', 'স্বাগতম উপহার হ্যাম্পার', '২৪/৭ কনসিয়ার্জ'],
    excluded: ['ব্যক্তিগত শপিং', 'স্পা', 'আন্তর্জাতিক কল', 'ঐচ্ছিক ভ্রমণ'],
    highlights: ['৫-তারকা হারাম-ভিউ হোটেল', 'ডাবল-শেয়ার রুম', 'নিবেদিত আলেম', 'প্রিমিয়াম মিনা তাঁবু'],
    groupSize: '২০-৩০ জন হাজী',
    gallery: [IMG.kaabaDayMinarets, IMG.kaabaNightKiswa, IMG.greenDomeClose, IMG.greenDomeStarFrame, IMG.nabawiUmbrellaSky, IMG.kaabaCloseDoor],
    cover: IMG.kaabaDayMinarets, ext_id: 'pkg-hajj-premium',
  },
  {
    slug: 'vip-hajj-2026', name: 'ভিআইপি হজ্জ ২০২৬', type: 'HAJJ' as const, tier: 'VIP' as const,
    shortDescription: 'অতুলনীয় ৫-তারকা লাক্সারি, একক রুম, ব্যক্তিগত আলেম, মিনা ভিআইপি তাঁবু।',
    description: 'হজ্জ ভ্রমণের শীর্ষবিন্দু। একক-অধিবাসী ৫-তারকা স্যুট, নিবেদিত ব্যক্তিগত আলেম, প্রাইভেট স্থানান্তর।',
    duration: 25, departureDate: new Date('2026-05-18'), returnDate: new Date('2026-06-14'),
    price: 24999, discount: 1500, status: 'PUBLISHED' as const, availability: 'LIMITED' as const, seatsLeft: 4,
    rating: 5.0, reviewsCount: 78, bookingsCount: 156, featured: true,
    hotelMakkahName: 'রাফেলস মক্কা প্যালেস', hotelMakkahStars: 5, hotelMakkahDistance: 'হারামের সংলগ্ন', hotelMakkahImage: IMG.kaabaNightKiswa,
    hotelMadinahName: 'মদিনা ম্যারিয়ট', hotelMadinahStars: 5, hotelMadinahDistance: 'মসজিদে নববী থেকে ৯০ মিটার', hotelMadinahImage: IMG.nabawiNight,
    flightAirline: 'এমিরেটস / কাতার', flightDeparture: 'সরাসরি', flightArrival: 'জেদ্দা (JED)', flightClass: 'বিজনেস ক্লাস',
    meals: 'সকল খাবার আ লা কার্টে, প্রিমিয়াম ইফতার, ইন-রুম ডাইনিং', transport: 'সর্বত্র প্রাইভেট মার্সিডিজ ভি-ক্লাস স্থানান্তর',
    ziyarah: commonZiyarah, visa: 'ভিআইপি হজ্জ ভিসা ফাস্ট-ট্র্যাক, সকল পারমিট, বায়োমেট্রিক অন্তর্ভুক্ত',
    included: ['হজ্জ ভিসা ফাস্ট-ট্র্যাক', 'বিজনেস ক্লাস ফ্লাইট', '৫-তারকা স্যুট একক অধিবাসন', 'সকল প্রিমিয়াম খাবার', 'প্রাইভেট মার্সিডিজ স্থানান্তর', 'প্রিমিয়াম কুরবানি × ২', 'লাক্সারি ইহরাম কিট', 'ব্যক্তিগত আলেম (১:৫ অনুপাত)', 'প্রাইভেট যিয়ারত ট্যুর', 'মিনা তাঁবু (A-ক্যাটাগরি ভিআইপি)', 'জমজম (২০ লিটার)', 'স্বাগতম হ্যাম্পার', 'ব্যক্তিগত বাটলার', '২৪/৭ কনসিয়ার্জ'],
    excluded: ['সীমার উপরে ব্যক্তিগত শপিং', 'স্পা আপগ্রেড'],
    highlights: ['একক ৫-তারকা স্যুট', 'ব্যক্তিগত আলেম', 'ভিআইপি মিনা তাঁবু', 'বিজনেস ক্লাস ফ্লাইট'],
    groupSize: '১০-১৫ জন হাজী',
    gallery: [IMG.kaabaNightKiswa, IMG.kaabaNightHaram, IMG.kaabaNightFamily, IMG.nabawiNight, IMG.greenDomeStarFrame, IMG.kaabaCloseDoor],
    cover: IMG.kaabaNightKiswa, ext_id: 'pkg-hajj-vip',
  },
  {
    slug: 'budget-umrah-2026', name: 'বাজেট উমরাহ', type: 'UMRAH' as const, tier: 'BUDGET' as const,
    shortDescription: '৩-তারকা হোটেল ও কোয়াড রুমসহ সবচেয়ে সাশ্রয়ী উমরাহ।',
    description: 'আমাদের বাজেট উমরাহ আপনাকে অতিরিক্ত খরচ ছাড়াই আপনার উমরাহ সম্পাদন করতে দেয়।',
    duration: 7, departureDate: new Date('2026-02-15'), returnDate: new Date('2026-02-21'),
    price: 1199, discount: 100, status: 'PUBLISHED' as const, availability: 'AVAILABLE' as const, seatsLeft: 42,
    rating: 4.5, reviewsCount: 312, bookingsCount: 1820, featured: false,
    hotelMakkahName: 'আল মাসসা হোটেল', hotelMakkahStars: 3, hotelMakkahDistance: 'হারাম থেকে ৯০০ মিটার', hotelMakkahImage: IMG.haramAerial,
    hotelMadinahName: 'দাল্লাহ তায়বাহ', hotelMadinahStars: 3, hotelMadinahDistance: 'মসজিদে নববী থেকে ৩৫০ মিটার', hotelMadinahImage: IMG.nabawiUmbrellas,
    flightAirline: 'টার্কিশ এয়ারলাইন্স', flightDeparture: 'IST হয়ে সংযোগ', flightArrival: 'জেদ্দা (JED)', flightClass: 'ইকোনমি',
    meals: 'শুধুমাত্র নাশতা', transport: 'স্থানান্তর ও যিয়ারতের জন্য শেয়ার্ড এসি কোচ',
    ziyarah: ['জাবাল আন-নূর', 'জাবাল সাওর', 'মসজিদ আয়েশা', 'কুবা মসজিদ', 'মসজিদ আল-কিবলাতাইন', 'উহুদ পর্বত'],
    visa: 'উমরাহ ভিসা ও প্রক্রিয়াকরণ অন্তর্ভুক্ত',
    included: ['উমরাহ ভিসা', 'রাউন্ড-ট্রিপ ফ্লাইট', '৩-তারকা হোটেল (কোয়াড)', 'নাশতা', 'শেয়ার্ড পরিবহন', 'যিয়ারত ট্যুর', 'গ্রুপ লিডার', 'জমজম ৫ লিটার'],
    excluded: ['দুপুর ও রাতের খাবার', 'ব্যক্তিগত খরচ', 'ভ্রমণ বীমা', 'ফোন ও ইন্টারনেট', 'টিপস'],
    highlights: ['৩-তারকা হোটেল', 'কোয়াড-শেয়ার রুম', 'সবচেয়ে সাশ্রয়ী', 'গ্রুপ লিডার'],
    groupSize: '২৫-৪০ জন হাজী',
    gallery: [IMG.kaabaIhramDay, IMG.haramAerial, IMG.nabawiUmbrellas, IMG.greenDomeClose],
    cover: IMG.kaabaIhramDay, ext_id: 'pkg-umrah-budget',
  },
  {
    slug: 'economy-umrah-2026', name: 'ইকোনমি উমরাহ', type: 'UMRAH' as const, tier: 'ECONOMY' as const,
    shortDescription: 'ট্রিপল রুম ও হাফ-বোর্ড খাবারসহ মজবুত ৩-তারকা প্লাস অবস্থান।',
    description: 'আমাদের সর্বাধিক বুক করা উমরাহ প্যাকেজ মান ও সাশ্রয়িতার ভারসাম্য রাখে।',
    duration: 10, departureDate: new Date('2026-03-01'), returnDate: new Date('2026-03-10'),
    price: 1899, discount: 150, status: 'PUBLISHED' as const, availability: 'AVAILABLE' as const, seatsLeft: 27,
    rating: 4.7, reviewsCount: 489, bookingsCount: 2410, featured: true,
    hotelMakkahName: 'রোতানা কর্তৃক আল মারওয়া রায়হান', hotelMakkahStars: 4, hotelMakkahDistance: 'হারাম থেকে ৫০০ মিটার', hotelMakkahImage: IMG.kaabaDayCrowd,
    hotelMadinahName: 'রয়্যাল ইন মদিনা', hotelMadinahStars: 4, hotelMadinahDistance: 'মসজিদে নববী থেকে ২৫০ মিটার', hotelMadinahImage: IMG.nabawiUmbrellaGolden,
    flightAirline: 'কাতার এয়ারওয়েজ', flightDeparture: 'DOH হয়ে সংযোগ', flightArrival: 'জেদ্দা (JED)', flightClass: 'ইকোনমি',
    meals: 'নাশতা ও রাতের খাবার — বুফে', transport: 'সকল স্থানান্তর ও যিয়ারতের জন্য এসি কোচ',
    ziyarah: commonZiyarah, visa: 'উমরাহ ভিসা, বায়োমেট্রিক ও প্রক্রিয়াকরণ অন্তর্ভুক্ত',
    included: ['উমরাহ ভিসা', 'রাউন্ড-ট্রিপ ফ্লাইট', '৪-তারকা হোটেল (ট্রিপল)', 'নাশতা ও রাতের খাবার', 'এসি পরিবহন', 'যিয়ারত ট্যুর', 'আলেম গ্রুপ লিডার', 'পুরুষদের জন্য ইহরাম', 'জমজম ৫ লিটার', '২৪/৭ সাপোর্ট'],
    excluded: ['দুপুরের খাবার', 'ব্যক্তিগত খরচ', 'ঐচ্ছিক ভ্রমণ', 'টিপস'],
    highlights: ['৪-তারকা হোটেল', 'ট্রিপল-শেয়ার রুম', 'আলেম লিডার', 'হাফ-বোর্ড খাবার'],
    groupSize: '২০-৩০ জন হাজী',
    gallery: [IMG.kaabaDayCrowd, IMG.kaabaIhramDay, IMG.nabawiUmbrellaGolden, IMG.greenDomeMinarets, IMG.nabawiCoupleArches],
    cover: IMG.kaabaDayCrowd, ext_id: 'pkg-umrah-economy',
  },
  {
    slug: 'premium-umrah-2026', name: 'প্রিমিয়াম উমরাহ', type: 'UMRAH' as const, tier: 'PREMIUM' as const,
    shortDescription: 'ডাবল রুম ও ফুল-বোর্ড খাবারসহ ৫-তারকা হারাম-এলাকার হোটেল।',
    description: 'আমাদের প্রিমিয়াম প্যাকেজের সাথে আপনার উমরাহকে উন্নত করুন।',
    duration: 12, departureDate: new Date('2026-03-15'), returnDate: new Date('2026-03-26'),
    price: 3299, discount: 200, status: 'PUBLISHED' as const, availability: 'AVAILABLE' as const, seatsLeft: 18,
    rating: 4.9, reviewsCount: 234, bookingsCount: 980, featured: true,
    hotelMakkahName: 'সুইসোটেল মক্কা / পুলম্যান জমজম', hotelMakkahStars: 5, hotelMakkahDistance: 'হারাম থেকে ১৮০ মিটার', hotelMakkahImage: IMG.kaabaDayMinarets,
    hotelMadinahName: 'লি মেরিডিয়েন মদিনা', hotelMadinahStars: 5, hotelMadinahDistance: 'মসজিদে নববী থেকে ১২০ মিটার', hotelMadinahImage: IMG.greenDomeStarFrame,
    flightAirline: 'এমিরেটস / কাতার', flightDeparture: 'সংযোগ বা সরাসরি', flightArrival: 'জেদ্দা (JED)', flightClass: 'ইকোনমি প্লাস',
    meals: 'সকল খাবার — প্রিমিয়াম আন্তর্জাতিক বুফে', transport: 'লাক্সারি এসি কোচ + প্রাইভেট বিমানবন্দর স্থানান্তর',
    ziyarah: commonZiyarah, visa: 'উমরাহ ভিসা ফাস্ট-ট্র্যাক অন্তর্ভুক্ত',
    included: ['উমরাহ ভিসা ফাস্ট-ট্র্যাক', 'প্রিমিয়াম ইকোনমি ফ্লাইট', '৫-তারকা হোটেল (ডাবল শেয়ার)', 'সকল প্রিমিয়াম খাবার', 'লাক্সারি পরিবহন', 'নিবেদিত আলেম', 'সম্পূর্ণ যিয়ারত', 'প্রিমিয়াম ইহরাম কিট', 'জমজম ১০ লিটার', 'স্বাগতম উপহার', '২৪/৭ কনসিয়ার্জ'],
    excluded: ['ব্যক্তিগত শপিং', 'স্পা', 'ঐচ্ছিক ভ্রমণ'],
    highlights: ['৫-তারকা হারাম-এলাকার হোটেল', 'ডাবল রুম', 'ফুল বোর্ড', 'প্রিমিয়াম যিয়ারত'],
    groupSize: '১৫-২৫ জন হাজী',
    gallery: [IMG.kaabaDayMinarets, IMG.kaabaNightFamily, IMG.greenDomeStarFrame, IMG.nabawiUmbrellaSky, IMG.kaabaCloseDoor, IMG.greenDomeClose],
    cover: IMG.kaabaDayMinarets, ext_id: 'pkg-umrah-premium',
  },
  {
    slug: 'luxury-umrah-2026', name: 'লাক্সারি উমরাহ', type: 'UMRAH' as const, tier: 'LUXURY' as const,
    shortDescription: 'ব্যক্তিগত আলেম ও মার্সিডিজ স্থানান্তরসহ একক-স্যুট ৫-তারকা অভিজ্ঞতা।',
    description: 'সবচেয়ে এক্সক্লুসিভ উমরাহ যাত্রা। প্রাইভেট ৫-তারকা স্যুট, একজন ব্যক্তিগত আলেম গাইড।',
    duration: 14, departureDate: new Date('2026-04-01'), returnDate: new Date('2026-04-14'),
    price: 6499, discount: 400, status: 'PUBLISHED' as const, availability: 'LIMITED' as const, seatsLeft: 6,
    rating: 5.0, reviewsCount: 89, bookingsCount: 215, featured: true,
    hotelMakkahName: 'রাফেলস মক্কা প্যালেস (স্যুট)', hotelMakkahStars: 5, hotelMakkahDistance: 'হারামের সংলগ্ন', hotelMakkahImage: IMG.kaabaNightHaram,
    hotelMadinahName: 'দ্য ওবেরয় মদিনা (স্যুট)', hotelMadinahStars: 5, hotelMadinahDistance: 'মসজিদে নববী থেকে ৯০ মিটার', hotelMadinahImage: IMG.nabawiNight,
    flightAirline: 'এমিরেটস / কাতার', flightDeparture: 'সরাসরি', flightArrival: 'জেদ্দা (JED)', flightClass: 'বিজনেস ক্লাস',
    meals: 'আ লা কার্টে প্রিমিয়াম, ২৪/৭ ইন-রুম ডাইনিং', transport: 'সর্বত্র প্রাইভেট মার্সিডিজ ভি-ক্লাস',
    ziyarah: commonZiyarah, visa: 'উমরাহ ভিসা ভিআইপি ফাস্ট-ট্র্যাক অন্তর্ভুক্ত',
    included: ['ভিআইপি ভিসা ফাস্ট-ট্র্যাক', 'বিজনেস ক্লাস ফ্লাইট', '৫-তারকা স্যুট একক অধিবাসন', 'আ লা কার্টে খাবার', 'প্রাইভেট মার্সিডিজ', 'ব্যক্তিগত আলেম (১:৩)', 'প্রাইভেট যিয়ারত', 'লাক্সারি ইহরাম কিট', 'জমজম ২০ লিটার', 'স্বাগতম হ্যাম্পার', 'ব্যক্তিগত বাটলার', '২৪/৭ কনসিয়ার্জ'],
    excluded: ['সীমার উপরে ব্যক্তিগত শপিং'],
    highlights: ['একক ৫-তারকা স্যুট', 'ব্যক্তিগত আলেম', 'মার্সিডিজ স্থানান্তর', 'বিজনেস ক্লাস'],
    groupSize: '৮-১২ জন হাজী',
    gallery: [IMG.kaabaNightHaram, IMG.kaabaNightKiswa, IMG.kaabaNightFamily, IMG.nabawiNight, IMG.greenDomeStarFrame],
    cover: IMG.kaabaNightHaram, ext_id: 'pkg-umrah-luxury',
  },
]

const hotelSeeds = [
  {
    slug: 'hilton-suites-makkah', name: 'হিলটন স্যুটস মক্কা', category: 4, city: 'MAKKAH' as const,
    address: 'জাবাল ওমর, ইব্রাহিম আল খলিল রোড, মক্কা ২৪২৩১',
    distanceFromHaram: 'হারাম থেকে ৪০০ মিটার হাঁটা',
    images: [IMG.kaabaClockTower, IMG.kaabaDayMinarets, IMG.haramAerial, IMG.kaabaDayCrowd],
    cover: IMG.kaabaClockTower,
    description: 'মসজিদুল হারামের ৫-মিনিট হাঁটার দূরত্বে আধুনিক ৪-তারকা স্যুট।',
    facilities: ['ফ্রি ওয়াই-ফাই', 'রুমে জায়নামাজ', '২৪/৭ রিসেপশন', 'হালাল রেস্তোরাঁ', 'কিবলা দিক', 'ইস্ত্রি সেবা', 'দৈনিক হাউসকিপিং', 'বিমানবন্দর স্থানান্তর (অর্থপ্রদেয়)'],
    meals: 'নাশতা বুফে অন্তর্ভুক্ত · দুপুর ও রাতের খাবার উপলব্ধ',
    checkInDate: new Date('2026-02-15'), checkOutDate: new Date('2026-02-22'),
    totalRooms: 220, pricePerNight: 165,
    rating: 4.7, reviewsCount: 1280, bookingsCount: 5420, status: 'ACTIVE' as const, featured: true,
    notes: 'উমরাহ গ্রুপগুলির জন্য শীর্ষ-রেটেড ৪-তারকা পছন্দ।',
    roomTypes: [
      { name: 'স্ট্যান্ডার্ড টুইন', capacity: 2, pricePerNight: 165, available: 28, board: 'BREAKFAST' as const },
      { name: 'ফ্যামিলি স্যুট', capacity: 4, pricePerNight: 245, available: 12, board: 'HALF_BOARD' as const },
      { name: 'হারাম-ভিউ ডিলাক্স', capacity: 2, pricePerNight: 320, available: 6, board: 'HALF_BOARD' as const },
    ],
  },
  {
    slug: 'fairmont-makkah-clock-tower', name: 'ফেয়ারমন্ট মক্কা ক্লক রয়্যাল টাওয়ার', category: 5, city: 'MAKKAH' as const,
    address: 'আবরাজ আল বাইত কমপ্লেক্স, কিং আব্দুল আজিজ এনডাওমেন্ট',
    distanceFromHaram: 'হারামের সংলগ্ন (ক্লক টাওয়ার)',
    images: [IMG.kaabaNightKiswa, IMG.kaabaNightHaram, IMG.kaabaCloseDoor, IMG.kaabaNightFamily],
    cover: IMG.kaabaNightKiswa,
    description: 'ক্লক টাওয়ারের ভিতরে আইকনিক ৫-তারকা লাক্সারি।',
    facilities: ['সরাসরি হারাম ভিউ', 'বাটলার সেবা', 'প্রিমিয়াম নামাজ রুম', 'স্পা', 'ফাইন ডাইনিং (হালাল)', '২৪/৭ কনসিয়ার্জ', 'ভ্যালেট পার্কিং', 'লিমুজিন সেবা'],
    meals: 'আ লা কার্টে ফাইন ডাইনিং, ২৪/৭ ইন-রুম ডাইনিং',
    checkInDate: new Date('2026-02-15'), checkOutDate: new Date('2026-02-22'),
    totalRooms: 858, pricePerNight: 520,
    rating: 4.9, reviewsCount: 2840, bookingsCount: 4180, status: 'ACTIVE' as const, featured: true,
    notes: 'ভিআইপি ও লাক্সারি প্যাকেজে একচেটিয়াভাবে বুক করা হয়।',
    roomTypes: [
      { name: 'প্রিমিয়ার রুম (সিটি ভিউ)', capacity: 2, pricePerNight: 520, available: 18, board: 'BREAKFAST' as const },
      { name: 'হারাম-ভিউ স্যুট', capacity: 2, pricePerNight: 780, available: 9, board: 'HALF_BOARD' as const },
      { name: 'রয়্যাল ফ্যামিলি স্যুট', capacity: 6, pricePerNight: 1450, available: 3, board: 'FULL_BOARD' as const },
    ],
  },
  {
    slug: 'dar-al-eiman-royal', name: 'দার আল ঈমান রয়্যাল', category: 3, city: 'MAKKAH' as const,
    address: 'ইব্রাহিম আল খলিল রোড, মক্কা',
    distanceFromHaram: 'হারাম থেকে ৮৫০ মিটার হাঁটা',
    images: [IMG.haramAerial, IMG.kaabaIhramDay, IMG.kaabaDayCrowd],
    cover: IMG.haramAerial,
    description: 'বাজেট উমরাহ গ্রুপগুলির কাছে জনপ্রিয় পরিষ্কার, সাশ্রয়ী ৩-তারকা হোটেল।',
    facilities: ['ফ্রি হারাম শাটল', 'জায়নামাজ', 'হালাল রেস্তোরাঁ', '২৪/৭ রিসেপশন', 'লবিতে ফ্রি ওয়াই-ফাই', 'গ্রুপ রেট'],
    meals: 'নাশতা ও রাতের খাবার বুফে',
    checkInDate: new Date('2026-02-15'), checkOutDate: new Date('2026-02-22'),
    totalRooms: 320, pricePerNight: 78,
    rating: 4.3, reviewsCount: 980, bookingsCount: 8240, status: 'ACTIVE' as const, featured: false,
    notes: 'ইকোনমি/বাজেট প্যাকেজের জন্য ডিফল্ট।',
    roomTypes: [
      { name: 'কোয়াড শেয়ার', capacity: 4, pricePerNight: 78, available: 64, board: 'HALF_BOARD' as const },
      { name: 'ট্রিপল শেয়ার', capacity: 3, pricePerNight: 95, available: 42, board: 'HALF_BOARD' as const },
      { name: 'ডাবল রুম', capacity: 2, pricePerNight: 120, available: 26, board: 'HALF_BOARD' as const },
    ],
  },
  {
    slug: 'pullman-zamzam-madinah', name: 'পুলম্যান জমজম মদিনা', category: 4, city: 'MADINAH' as const,
    address: 'কিং ফয়সাল রোড, কেন্দ্রীয় মদিনা',
    distanceFromHaram: 'মসজিদে নববী থেকে ১৮০ মিটার',
    images: [IMG.greenDomeMinarets, IMG.nabawiUmbrellaGolden, IMG.nabawiDay, IMG.greenDomeClose],
    cover: IMG.greenDomeMinarets,
    description: 'রওজা থেকে কয়েক মিনিট দূরে প্রিমিয়াম ৪-তারকা সম্পত্তি।',
    facilities: ['সরাসরি নববী অ্যাক্সেস', 'গ্রুপ মিটিং হল', 'নামাজের আজান সম্প্রচার', 'হালাল বুফে', 'হুইলচেয়ার অ্যাক্সেস', 'কনসিয়ার্জ', 'বহুভাষিক স্টাফ'],
    meals: 'হাফ-বোর্ড বুফে',
    checkInDate: new Date('2026-02-22'), checkOutDate: new Date('2026-02-28'),
    totalRooms: 410, pricePerNight: 195,
    rating: 4.7, reviewsCount: 1620, bookingsCount: 6240, status: 'ACTIVE' as const, featured: true,
    notes: 'স্ট্যান্ডার্ড ও প্রিমিয়াম টিয়ার জুড়ে সর্বাধিক বুক করা মদিনা হোটেল।',
    roomTypes: [
      { name: 'ট্রিপল শেয়ার', capacity: 3, pricePerNight: 195, available: 36, board: 'HALF_BOARD' as const },
      { name: 'ডাবল ডিলাক্স', capacity: 2, pricePerNight: 245, available: 22, board: 'HALF_BOARD' as const },
      { name: 'ফ্যামিলি স্যুট (৪ জন)', capacity: 4, pricePerNight: 365, available: 8, board: 'FULL_BOARD' as const },
    ],
  },
  {
    slug: 'the-oberoi-madinah', name: 'দ্য ওবেরয় মদিনা', category: 5, city: 'MADINAH' as const,
    address: 'খালিদ বিন আল ওয়ালিদ রোড, কেন্দ্রীয় মদিনা',
    distanceFromHaram: 'মসজিদে নববী থেকে ১২০ মিটার',
    images: [IMG.greenDomeClose, IMG.greenDomeStarFrame, IMG.nabawiNight, IMG.nabawiCoupleArches],
    cover: IMG.greenDomeClose,
    description: 'নববী-ভিউ স্যুটসহ অতি-লাক্সারি ৫-তারকা হোটেল।',
    facilities: ['নববী-ভিউ স্যুট', 'বাটলার সেবা', 'স্পা', 'ফাইন হালাল ডাইনিং', 'প্রিমিয়াম নামাজ রুম', 'ভ্যালেট', '২৪/৭ ইন-রুম ডাইনিং', 'লিমো বিমানবন্দর স্থানান্তর'],
    meals: 'ফুল-বোর্ড আ লা কার্টে',
    checkInDate: new Date('2026-02-22'), checkOutDate: new Date('2026-02-28'),
    totalRooms: 142, pricePerNight: 480,
    rating: 4.9, reviewsCount: 720, bookingsCount: 1840, status: 'ACTIVE' as const, featured: true,
    notes: 'প্রিমিয়াম / ভিআইপি / লাক্সারি প্যাকেজ ডিফল্ট।',
    roomTypes: [
      { name: 'ডিলাক্স রুম', capacity: 2, pricePerNight: 480, available: 14, board: 'BREAKFAST' as const },
      { name: 'নববী-ভিউ স্যুট', capacity: 2, pricePerNight: 720, available: 6, board: 'HALF_BOARD' as const },
      { name: 'রয়্যাল স্যুট (৪ জন)', capacity: 4, pricePerNight: 1280, available: 2, board: 'FULL_BOARD' as const },
    ],
  },
  {
    slug: 'olayan-al-madinah', name: 'ওলায়ান আল মদিনা', category: 3, city: 'MADINAH' as const,
    address: 'কেন্দ্রীয় মদিনা, বাব আল সালামের কাছে',
    distanceFromHaram: 'মসজিদে নববী থেকে ৪৫০ মিটার',
    images: [IMG.nabawiDay, IMG.nabawiUmbrellas, IMG.nabawiInterior],
    cover: IMG.nabawiDay,
    description: 'বাজেট হাজীদের জন্য সাশ্রয়ী ৩-তারকা হোটেল।',
    facilities: ['ফ্রি ওয়াই-ফাই', 'হালাল নাশতা', '২৪/৭ রিসেপশন', 'গ্রুপ রেট', 'বহুভাষিক স্টাফ', 'লন্ড্রি (অর্থপ্রদেয়)'],
    meals: 'শুধুমাত্র নাশতা',
    checkInDate: new Date('2026-02-22'), checkOutDate: new Date('2026-02-28'),
    totalRooms: 280, pricePerNight: 65,
    rating: 4.2, reviewsCount: 640, bookingsCount: 4380, status: 'ACTIVE' as const, featured: false,
    notes: 'ইকোনমি হজ্জ ও বাজেট উমরাহর জন্য ডিফল্ট।',
    roomTypes: [
      { name: 'কোয়াড শেয়ার', capacity: 4, pricePerNight: 65, available: 52, board: 'BREAKFAST' as const },
      { name: 'ট্রিপল শেয়ার', capacity: 3, pricePerNight: 82, available: 38, board: 'BREAKFAST' as const },
      { name: 'ডাবল রুম', capacity: 2, pricePerNight: 110, available: 24, board: 'BREAKFAST' as const },
    ],
  },
]

const flightSeeds = [
  { slug: 'biman-dac-jed-bg-1041', airlineName: 'বিমান বাংলাদেশ এয়ারলাইন্স', airlineLogo: 'BG', flightNumber: 'BG 1041', departureAirport: 'হযরত শাহজালাল আন্তর্জাতিক (DAC)', arrivalAirport: 'কিং আব্দুল আজিজ আন্তর্জাতিক (JED)', departureCity: 'ঢাকা', arrivalCity: 'জেদ্দা', departureDate: new Date('2026-02-15'), departureTime: '02:30', arrivalDate: new Date('2026-02-15'), arrivalTime: '07:45', transits: [], transitDuration: 'নন-স্টপ', totalDuration: '৮ ঘণ্টা ১৫ মিনিট', cabinClass: 'ECONOMY' as const, baggageAllowance: '৩০ কেজি চেকড + ৭ কেজি কেবিন', mealInfo: 'গরম হালাল খাবার + পানীয়', seatsTotal: 290, seatsAvailable: 84, bookingStatus: 'OPEN' as const, price: 745, taxes: 95, discount: 0, notes: 'নিবেদিত উমরাহ মৌসুমের সেবা।', status: 'ACTIVE' as const, featured: true, rating: 4.5, reviewsCount: 412, bookingsCount: 2890, publishedAt: new Date('2025-11-02') },
  { slug: 'saudia-dac-jed-sv-805', airlineName: 'সৌদিয়া', airlineLogo: 'SV', flightNumber: 'SV 805', departureAirport: 'হযরত শাহজালাল আন্তর্জাতিক (DAC)', arrivalAirport: 'কিং আব্দুল আজিজ আন্তর্জাতিক (JED)', departureCity: 'ঢাকা', arrivalCity: 'জেদ্দা', departureDate: new Date('2026-02-15'), departureTime: '06:15', arrivalDate: new Date('2026-02-15'), arrivalTime: '11:20', transits: [], transitDuration: 'নন-স্টপ', totalDuration: '৮ ঘণ্টা ০৫ মিনিট', cabinClass: 'ECONOMY' as const, baggageAllowance: '৪৬ কেজি চেকড (২ × ২৩ কেজি) + ৭ কেজি কেবিন', mealInfo: 'হালাল খাবার, খেজুর, আরবি কফি', seatsTotal: 320, seatsAvailable: 38, bookingStatus: 'OPEN' as const, price: 829, taxes: 110, discount: 40, notes: 'সেরা সময়মত পারফরম্যান্স।', status: 'ACTIVE' as const, featured: true, rating: 4.7, reviewsCount: 638, bookingsCount: 4120, publishedAt: new Date('2025-10-18') },
  { slug: 'emirates-dac-jed-ek-585-via-dxb', airlineName: 'এমিরেটস', airlineLogo: 'EK', flightNumber: 'EK 585 / EK 803', departureAirport: 'হযরত শাহজালাল আন্তর্জাতিক (DAC)', arrivalAirport: 'কিং আব্দুল আজিজ আন্তর্জাতিক (JED)', departureCity: 'ঢাকা', arrivalCity: 'জেদ্দা', departureDate: new Date('2026-02-16'), departureTime: '04:50', arrivalDate: new Date('2026-02-16'), arrivalTime: '14:35', transits: [{ airport: 'দুবাই আন্তর্জাতিক (DXB)', city: 'দুবাই', duration: '২ ঘণ্টা ১০ মিনিট' }], transitDuration: '২ ঘণ্টা ১০ মিনিট', totalDuration: '১২ ঘণ্টা ৪৫ মিনিট', cabinClass: 'ECONOMY_PLUS' as const, baggageAllowance: '৩৫ কেজি চেকড + ৭ কেজি কেবিন', mealInfo: 'দুই হালাল খাবার, আঞ্চলিক মেনু', seatsTotal: 360, seatsAvailable: 142, bookingStatus: 'OPEN' as const, price: 985, taxes: 165, discount: 0, notes: 'DXB হয়ে একক ট্রানজিট।', status: 'ACTIVE' as const, featured: false, rating: 4.8, reviewsCount: 521, bookingsCount: 1980, publishedAt: new Date('2025-09-30') },
  { slug: 'qatar-dac-jed-qr-635-via-doh', airlineName: 'কাতার এয়ারওয়েজ', airlineLogo: 'QR', flightNumber: 'QR 635 / QR 1170', departureAirport: 'হযরত শাহজালাল আন্তর্জাতিক (DAC)', arrivalAirport: 'কিং আব্দুল আজিজ আন্তর্জাতিক (JED)', departureCity: 'ঢাকা', arrivalCity: 'জেদ্দা', departureDate: new Date('2026-03-01'), departureTime: '01:20', arrivalDate: new Date('2026-03-01'), arrivalTime: '10:05', transits: [{ airport: 'হামাদ আন্তর্জাতিক (DOH)', city: 'দোহা', duration: '১ ঘণ্টা ৫০ মিনিট' }], transitDuration: '১ ঘণ্টা ৫০ মিনিট', totalDuration: '১১ ঘণ্টা ৪৫ মিনিট', cabinClass: 'BUSINESS' as const, baggageAllowance: '৪০ কেজি চেকড + ১২ কেজি কেবিন (বিজনেস)', mealInfo: 'আ লা কার্টে হালাল ডাইনিং, DOH-এ লাউঞ্জ', seatsTotal: 32, seatsAvailable: 6, bookingStatus: 'OPEN' as const, price: 2480, taxes: 240, discount: 100, notes: 'লাই-ফ্ল্যাট সিটসহ বিজনেস কেবিন।', status: 'ACTIVE' as const, featured: true, rating: 4.9, reviewsCount: 287, bookingsCount: 612, publishedAt: new Date('2025-10-05') },
  { slug: 'turkish-dac-med-tk-713-via-ist', airlineName: 'টার্কিশ এয়ারলাইন্স', airlineLogo: 'TK', flightNumber: 'TK 713 / TK 100', departureAirport: 'হযরত শাহজালাল আন্তর্জাতিক (DAC)', arrivalAirport: 'প্রিন্স মোহাম্মদ বিন আব্দুল আজিজ (MED)', departureCity: 'ঢাকা', arrivalCity: 'মদিনা', departureDate: new Date('2026-02-20'), departureTime: '09:40', arrivalDate: new Date('2026-02-20'), arrivalTime: '20:25', transits: [{ airport: 'ইস্তাম্বুল বিমানবন্দর (IST)', city: 'ইস্তাম্বুল', duration: '৩ ঘণ্টা ০৫ মিনিট' }], transitDuration: '৩ ঘণ্টা ০৫ মিনিট', totalDuration: '১৩ ঘণ্টা ৪৫ মিনিট', cabinClass: 'ECONOMY' as const, baggageAllowance: '৩০ কেজি চেকড + ৮ কেজি কেবিন', mealInfo: 'দুই হালাল খাবার, তুর্কি আতিথেয়তা', seatsTotal: 280, seatsAvailable: 96, bookingStatus: 'OPEN' as const, price: 895, taxes: 140, discount: 50, notes: 'সরাসরি মদিনায়।', status: 'ACTIVE' as const, featured: true, rating: 4.6, reviewsCount: 348, bookingsCount: 1420, publishedAt: new Date('2025-10-22') },
  { slug: 'saudia-dac-med-sv-803', airlineName: 'সৌদিয়া', airlineLogo: 'SV', flightNumber: 'SV 803', departureAirport: 'হযরত শাহজালাল আন্তর্জাতিক (DAC)', arrivalAirport: 'প্রিন্স মোহাম্মদ বিন আব্দুল আজিজ (MED)', departureCity: 'ঢাকা', arrivalCity: 'মদিনা', departureDate: new Date('2026-03-10'), departureTime: '23:55', arrivalDate: new Date('2026-03-11'), arrivalTime: '05:30', transits: [], transitDuration: 'নন-স্টপ', totalDuration: '৮ ঘণ্টা ৩৫ মিনিট', cabinClass: 'ECONOMY' as const, baggageAllowance: '৪৬ কেজি চেকড (২ × ২৩ কেজি) + ৭ কেজি কেবিন', mealInfo: 'হালাল খাবার, খেজুর, জমজম পানি', seatsTotal: 300, seatsAvailable: 12, bookingStatus: 'OPEN' as const, price: 875, taxes: 115, discount: 0, notes: 'একমাত্র নন-স্টপ ঢাকা → মদিনা।', status: 'ACTIVE' as const, featured: true, rating: 4.8, reviewsCount: 712, bookingsCount: 3260, publishedAt: new Date('2025-10-12') },
  { slug: 'flydubai-dac-jed-fz-552-via-dxb', airlineName: 'ফ্লাইদুবাই', airlineLogo: 'FZ', flightNumber: 'FZ 552 / FZ 815', departureAirport: 'হযরত শাহজালাল আন্তর্জাতিক (DAC)', arrivalAirport: 'কিং আব্দুল আজিজ আন্তর্জাতিক (JED)', departureCity: 'ঢাকা', arrivalCity: 'জেদ্দা', departureDate: new Date('2026-02-25'), departureTime: '15:30', arrivalDate: new Date('2026-02-26'), arrivalTime: '02:40', transits: [{ airport: 'দুবাই আন্তর্জাতিক (DXB)', city: 'দুবাই', duration: '৩ ঘণ্টা ৪৫ মিনিট' }], transitDuration: '৩ ঘণ্টা ৪৫ মিনিট', totalDuration: '১৪ ঘণ্টা ১০ মিনিট', cabinClass: 'ECONOMY' as const, baggageAllowance: '২০ কেজি চেকড + ৭ কেজি কেবিন', mealInfo: 'হালাল স্ন্যাক', seatsTotal: 195, seatsAvailable: 110, bookingStatus: 'OPEN' as const, price: 620, taxes: 95, discount: 30, notes: 'বাজেট অপশন।', status: 'ACTIVE' as const, featured: false, rating: 4.2, reviewsCount: 196, bookingsCount: 820, publishedAt: new Date('2025-11-10') },
  { slug: 'biman-cgp-jed-bg-7011-via-dac', airlineName: 'বিমান বাংলাদেশ এয়ারলাইন্স', airlineLogo: 'BG', flightNumber: 'BG 7011 / BG 1041', departureAirport: 'শাহ আমানত আন্তর্জাতিক (CGP)', arrivalAirport: 'কিং আব্দুল আজিজ আন্তর্জাতিক (JED)', departureCity: 'চট্টগ্রাম', arrivalCity: 'জেদ্দা', departureDate: new Date('2026-02-15'), departureTime: '22:10', arrivalDate: new Date('2026-02-16'), arrivalTime: '07:45', transits: [{ airport: 'হযরত শাহজালাল আন্তর্জাতিক (DAC)', city: 'ঢাকা', duration: '৩ ঘণ্টা ০৫ মিনিট' }], transitDuration: '৩ ঘণ্টা ০৫ মিনিট', totalDuration: '১২ ঘণ্টা ৩৫ মিনিট', cabinClass: 'ECONOMY' as const, baggageAllowance: '৩০ কেজি চেকড + ৭ কেজি কেবিন', mealInfo: 'গরম হালাল খাবার', seatsTotal: 248, seatsAvailable: 64, bookingStatus: 'OPEN' as const, price: 795, taxes: 105, discount: 0, notes: 'সংক্ষিপ্ত DAC ট্রানজিট।', status: 'ACTIVE' as const, featured: false, rating: 4.3, reviewsCount: 156, bookingsCount: 680, publishedAt: new Date('2025-11-05') },
  { slug: 'qatar-cgp-jed-qr-639-via-doh', airlineName: 'কাতার এয়ারওয়েজ', airlineLogo: 'QR', flightNumber: 'QR 639 / QR 1170', departureAirport: 'শাহ আমানত আন্তর্জাতিক (CGP)', arrivalAirport: 'কিং আব্দুল আজিজ আন্তর্জাতিক (JED)', departureCity: 'চট্টগ্রাম', arrivalCity: 'জেদ্দা', departureDate: new Date('2026-03-05'), departureTime: '03:35', arrivalDate: new Date('2026-03-05'), arrivalTime: '13:15', transits: [{ airport: 'হামাদ আন্তর্জাতিক (DOH)', city: 'দোহা', duration: '২ ঘণ্টা ২৫ মিনিট' }], transitDuration: '২ ঘণ্টা ২৫ মিনিট', totalDuration: '১২ ঘণ্টা ৪০ মিনিট', cabinClass: 'ECONOMY_PLUS' as const, baggageAllowance: '৩৫ কেজি চেকড + ১০ কেজি কেবিন', mealInfo: 'হালাল গরম খাবার', seatsTotal: 84, seatsAvailable: 28, bookingStatus: 'OPEN' as const, price: 1140, taxes: 175, discount: 60, notes: 'প্রিমিয়াম ইকোনমি।', status: 'ACTIVE' as const, featured: false, rating: 4.8, reviewsCount: 184, bookingsCount: 410, publishedAt: new Date('2025-10-25') },
  { slug: 'emirates-cgp-jed-ek-587-via-dxb', airlineName: 'এমিরেটস', airlineLogo: 'EK', flightNumber: 'EK 587 / EK 803', departureAirport: 'শাহ আমানত আন্তর্জাতিক (CGP)', arrivalAirport: 'কিং আব্দুল আজিজ আন্তর্জাতিক (JED)', departureCity: 'চট্টগ্রাম', arrivalCity: 'জেদ্দা', departureDate: new Date('2026-04-12'), departureTime: '23:55', arrivalDate: new Date('2026-04-13'), arrivalTime: '14:35', transits: [{ airport: 'দুবাই আন্তর্জাতিক (DXB)', city: 'দুবাই', duration: '৪ ঘণ্টা ১৫ মিনিট' }], transitDuration: '৪ ঘণ্টা ১৫ মিনিট', totalDuration: '১৭ ঘণ্টা ৪০ মিনিট', cabinClass: 'BUSINESS' as const, baggageAllowance: '৪০ কেজি চেকড + ১২ কেজি কেবিন (বিজনেস)', mealInfo: 'আ লা কার্টে হালাল ডাইনিং, DXB-এ লাউঞ্জ', seatsTotal: 24, seatsAvailable: 0, bookingStatus: 'SOLDOUT' as const, price: 2780, taxes: 260, discount: 0, notes: 'বর্তমানে সম্পূর্ণ বিক্রি।', status: 'ACTIVE' as const, featured: false, rating: 4.9, reviewsCount: 92, bookingsCount: 218, publishedAt: new Date('2025-09-15') },
  { slug: 'turkish-dac-jed-tk-713-via-ist', airlineName: 'টার্কিশ এয়ারলাইন্স', airlineLogo: 'TK', flightNumber: 'TK 713 / TK 84', departureAirport: 'হযরত শাহজালাল আন্তর্জাতিক (DAC)', arrivalAirport: 'কিং আব্দুল আজিজ আন্তর্জাতিক (JED)', departureCity: 'ঢাকা', arrivalCity: 'জেদ্দা', departureDate: new Date('2026-05-10'), departureTime: '09:40', arrivalDate: new Date('2026-05-10'), arrivalTime: '18:15', transits: [{ airport: 'ইস্তাম্বুল বিমানবন্দর (IST)', city: 'ইস্তাম্বুল', duration: '২ ঘণ্টা ৪০ মিনিট' }], transitDuration: '২ ঘণ্টা ৪০ মিনিট', totalDuration: '১১ ঘণ্টা ৩৫ মিনিট', cabinClass: 'FIRST' as const, baggageAllowance: '৫০ কেজি চেকড + ১৫ কেজি কেবিন (ফার্স্ট)', mealInfo: 'অনবোর্ড শেফ, আ লা কার্টে', seatsTotal: 8, seatsAvailable: 8, bookingStatus: 'OPEN' as const, price: 4250, taxes: 320, discount: 0, notes: 'ফার্স্ট ক্লাস।', status: 'INACTIVE' as const, featured: false, rating: 5.0, reviewsCount: 18, bookingsCount: 42, publishedAt: new Date('2025-11-12') },
]

const transportSeeds = [
  { slug: 'jeddah-airport-to-makkah-hotel', name: 'জেদ্দা বিমানবন্দর → মক্কা হোটেল (প্রাইভেট সেডান)', type: 'AIRPORT_TRANSFER' as const, vehicleType: 'SEDAN' as const, capacity: 3, images: [IMG.haramAerial, IMG.kaabaClockTower], cover: IMG.haramAerial, pickupLocation: 'কিং আব্দুল আজিজ আন্তর্জাতিক বিমানবন্দর (JED)', dropoffLocation: 'হারামের ৫ কিমির মধ্যে যেকোনো মক্কা হোটেল', routeDetails: 'JED টার্মিনাল ১ → মক্কা শহরের সীমা → হোটেল লবিতে ড্রপ-অফ', serviceCoverage: ['জেদ্দা বিমানবন্দরে পিকআপ', 'সকল মক্কা হোটেল', 'দরজা-থেকে-দরজা সেবা', '২৪/৭ প্রাপ্যতা'], driverName: 'সৌদি-লাইসেন্সপ্রাপ্ত চালক', driverContact: '+966 50 000 0001', travelDuration: '~১ ঘণ্টা ১৫ মিনিট', price: 75, pricingUnit: 'PER_VEHICLE' as const, availability: 'AVAILABLE' as const, status: 'ACTIVE' as const, featured: true, rating: 4.8, reviewsCount: 1240, bookingsCount: 8420, notes: '৬০ মিনিট ফ্রি অপেক্ষার সময়।' },
  { slug: 'makkah-hotel-to-madinah-hotel-coach', name: 'মক্কা হোটেল → মদিনা হোটেল (লাক্সারি কোচ)', type: 'INTERCITY' as const, vehicleType: 'LUXURY_COACH' as const, capacity: 45, images: [IMG.nabawiUmbrellas, IMG.pilgrimsWalking], cover: IMG.nabawiUmbrellas, pickupLocation: 'যেকোনো মক্কা হোটেল', dropoffLocation: 'যেকোনো মদিনা হোটেল', routeDetails: 'মক্কা → হাইওয়ে ১৫ → মদিনা শহর', serviceCoverage: ['সকল মক্কা হোটেল', 'সকল মদিনা হোটেল', 'হাইওয়ে ১৫ রুট', 'পানি ও স্ন্যাক স্টপ'], driverName: 'গ্রুপ অপারেটর দল', driverContact: '+966 50 000 0002', travelDuration: '~৫ ঘণ্টা ৩০ মিনিট', price: 38, pricingUnit: 'PER_PERSON' as const, availability: 'AVAILABLE' as const, status: 'ACTIVE' as const, featured: true, rating: 4.6, reviewsCount: 980, bookingsCount: 12400, notes: 'প্রতিদিন ০৯:০০, ১৪:০০ ও ২১:০০ এ ছাড়ে।' },
  { slug: 'madinah-hotel-to-madinah-airport', name: 'মদিনা হোটেল → মদিনা বিমানবন্দর (প্রাইভেট SUV)', type: 'AIRPORT_TRANSFER' as const, vehicleType: 'SUV' as const, capacity: 5, images: [IMG.greenDomeMinarets], cover: IMG.greenDomeMinarets, pickupLocation: 'যেকোনো মদিনা হোটেল', dropoffLocation: 'প্রিন্স মোহাম্মদ বিন আব্দুল আজিজ আন্তর্জাতিক (MED)', routeDetails: 'হোটেল লবি → মদিনা রিং রোড → MED প্রস্থান টার্মিনাল', serviceCoverage: ['সকল মদিনা হোটেল', 'MED বিমানবন্দরে ড্রপ'], driverName: 'সৌদি-লাইসেন্সপ্রাপ্ত চালক', driverContact: '+966 50 000 0003', travelDuration: '~৩৫ মিনিট', price: 55, pricingUnit: 'PER_VEHICLE' as const, availability: 'AVAILABLE' as const, status: 'ACTIVE' as const, featured: false, rating: 4.7, reviewsCount: 540, bookingsCount: 3120, notes: 'আন্তর্জাতিক প্রস্থানের ৩ ঘণ্টা আগে পিকআপ।' },
  { slug: 'makkah-haram-shuttle', name: 'মক্কা হোটেল ↔ হারাম শাটল (২৪/৭)', type: 'HARAM_SHUTTLE' as const, vehicleType: 'MINIVAN' as const, capacity: 12, images: [IMG.kaabaDayCrowd, IMG.haramAerial], cover: IMG.kaabaDayCrowd, pickupLocation: 'নির্ধারিত মক্কা হোটেলের লবি', dropoffLocation: 'মসজিদুল হারাম (বাব আল-সালাম)', routeDetails: 'নিরবচ্ছিন্ন লুপ সেবা। প্রতি ২০ মিনিটে পিকআপ।', serviceCoverage: ['আজিজিয়া, জাবাল ওমর, মিসফালা পার্টনার হোটেল', 'বাব আল-সালাম ড্রপ-অফ'], driverName: 'শাটল দল', driverContact: '+966 50 000 0004', travelDuration: 'প্রতি লেগে ~১০ মিনিট', price: 12, pricingUnit: 'PER_PERSON' as const, availability: 'AVAILABLE' as const, status: 'ACTIVE' as const, featured: true, rating: 4.5, reviewsCount: 1820, bookingsCount: 24600, notes: 'প্রতি ব্যক্তি দৈনিক আনলিমিটেড রাইড।' },
  { slug: 'madinah-haram-shuttle', name: 'মদিনা হোটেল ↔ মসজিদে নববী শাটল', type: 'HARAM_SHUTTLE' as const, vehicleType: 'MINIVAN' as const, capacity: 12, images: [IMG.nabawiUmbrellaGolden, IMG.nabawiDay], cover: IMG.nabawiUmbrellaGolden, pickupLocation: 'নির্ধারিত মদিনা হোটেলের লবি', dropoffLocation: 'মসজিদে নববী (বাব আল-সালাম)', routeDetails: 'নিরবচ্ছিন্ন লুপ সেবা। প্রতি ২৫ মিনিটে পিকআপ।', serviceCoverage: ['নববীর ১ কিমির মধ্যে পার্টনার হোটেল', 'বাব আল-সালাম ড্রপ-অফ'], driverName: 'শাটল দল', driverContact: '+966 50 000 0005', travelDuration: 'প্রতি লেগে ~৭ মিনিট', price: 10, pricingUnit: 'PER_PERSON' as const, availability: 'AVAILABLE' as const, status: 'ACTIVE' as const, featured: false, rating: 4.4, reviewsCount: 980, bookingsCount: 14200, notes: 'বয়স্ক/হুইলচেয়ার-বান্ধব ভ্যান অন্তর্ভুক্ত।' },
  { slug: 'makkah-ziyarah-tour', name: 'মক্কা যিয়ারত ট্যুর (অর্ধদিবস, এসি কোচ)', type: 'ZIYARAH_TOUR' as const, vehicleType: 'COACH' as const, capacity: 35, images: [IMG.kaabaIhramDay, IMG.haramAerial], cover: IMG.kaabaIhramDay, pickupLocation: 'মক্কা হোটেল (জাবাল ওমর / আজিজিয়া এলাকা)', dropoffLocation: 'পিকআপ হোটেলে ফেরত', routeDetails: 'জাবাল আন-নূর → জাবাল সাওর → মসজিদ আল-জিন → মসজিদ আয়েশা → ফেরত', serviceCoverage: ['জাবাল আন-নূর', 'জাবাল সাওর', 'মসজিদ আল-জিন', 'মসজিদ আয়েশা'], driverName: 'চালক + গাইড', driverContact: '+966 50 000 0006', travelDuration: '~৪ ঘণ্টা ৩০ মিনিট', price: 28, pricingUnit: 'PER_PERSON' as const, availability: 'AVAILABLE' as const, status: 'ACTIVE' as const, featured: true, rating: 4.7, reviewsCount: 1340, bookingsCount: 6280, notes: 'প্রতিদিন ০৯:০০ ও ১৪:০০ এ ছাড়ে।' },
  { slug: 'madinah-ziyarah-tour', name: 'মদিনা যিয়ারত ট্যুর (অর্ধদিবস, এসি কোচ)', type: 'ZIYARAH_TOUR' as const, vehicleType: 'COACH' as const, capacity: 35, images: [IMG.greenDomeStarFrame, IMG.nabawiUmbrellaSky], cover: IMG.greenDomeStarFrame, pickupLocation: 'মদিনা হোটেল (কেন্দ্রীয় এলাকা)', dropoffLocation: 'পিকআপ হোটেলে ফেরত', routeDetails: 'কুবা মসজিদ → মসজিদ আল-কিবলাতাইন → উহুদ পর্বত → সাত মসজিদ → খেজুর বাগান', serviceCoverage: ['কুবা মসজিদ', 'মসজিদ আল-কিবলাতাইন', 'উহুদ পর্বত', 'সাত মসজিদ', 'খেজুর বাগান'], driverName: 'চালক + গাইড', driverContact: '+966 50 000 0007', travelDuration: '~৫ ঘণ্টা', price: 26, pricingUnit: 'PER_PERSON' as const, availability: 'AVAILABLE' as const, status: 'ACTIVE' as const, featured: true, rating: 4.8, reviewsCount: 1620, bookingsCount: 7180, notes: 'প্রতিদিন ০৯:০০ ও ১৫:০০ এ ছাড়ে।' },
  { slug: 'mercedes-v-class-vip-day-rental', name: 'মার্সিডিজ ভি-ক্লাস — ভিআইপি দিন ভাড়া', type: 'PRIVATE_HIRE' as const, vehicleType: 'MERCEDES_V_CLASS' as const, capacity: 6, images: [IMG.kaabaClockTower, IMG.kaabaNightKiswa], cover: IMG.kaabaClockTower, pickupLocation: 'মক্কা বা মদিনায় যে কোনো স্থান', dropoffLocation: 'কাস্টম ভ্রমণসূচি', routeDetails: '১০ ঘণ্টা পর্যন্ত প্রাইভেট চালকসহ মার্সিডিজ ভি-ক্লাস সেবা।', serviceCoverage: ['মক্কা শহর', 'মদিনা শহর', 'কাস্টম যিয়ারত', 'বিমানবন্দর ট্রিপ'], driverName: 'প্রিমিয়াম ইংরেজি-ভাষী চালক', driverContact: '+966 50 000 0008', travelDuration: '১০ ঘণ্টা পর্যন্ত', price: 320, pricingUnit: 'PER_VEHICLE' as const, availability: 'LIMITED' as const, status: 'ACTIVE' as const, featured: false, rating: 5.0, reviewsCount: 184, bookingsCount: 412, notes: 'ডিফল্ট ভিআইপি / লাক্সারি প্যাকেজ পরিবহন।' },
]

const bookingSeeds = [
  { ext_id: 'bkg-1001', bookingCode: 'HJ-2026-1001', packageSlug: 'premium-hajj-2026', packageName: 'প্রিমিয়াম হজ্জ ২০২৬', packageType: 'HAJJ' as const, pilgrimExtId: 'p-001', pilgrimName: 'মোহাম্মদ আনোয়ার', pilgrimEmail: 'm.anwar@email.com', pilgrimPhone: '+880 1711-552341', status: 'CONFIRMED' as const, paymentStatus: 'PAID' as const, totalAmount: 26998, paidAmount: 26998, installmentsCount: 4, installmentsPaid: 4, departureDate: new Date('2026-05-19'), returnDate: new Date('2026-06-13'), pilgrimsCount: 2, bookedDate: new Date('2025-11-20'), notes: 'দম্পতি, পাশাপাশি রুম অনুরোধ করেছেন', visaStatus: 'APPROVED' as const, documentsStatus: 'COMPLETE' as const },
  { ext_id: 'bkg-1002', bookingCode: 'UM-2026-1002', packageSlug: 'economy-umrah-2026', packageName: 'ইকোনমি উমরাহ', packageType: 'UMRAH' as const, pilgrimExtId: 'p-002', pilgrimName: 'আয়েশা খান', pilgrimEmail: 'aisha.khan@email.com', pilgrimPhone: '+880 1712-900123', status: 'CONFIRMED' as const, paymentStatus: 'PAID' as const, totalAmount: 1749, paidAmount: 1749, installmentsCount: 2, installmentsPaid: 2, departureDate: new Date('2026-03-01'), returnDate: new Date('2026-03-10'), pilgrimsCount: 1, bookedDate: new Date('2025-12-08'), notes: 'শুধুমাত্র মহিলা গ্রুপ, প্রথমবারের হাজী', visaStatus: 'APPROVED' as const, documentsStatus: 'COMPLETE' as const },
  { ext_id: 'bkg-1003', bookingCode: 'HJ-2026-1003', packageSlug: 'vip-hajj-2026', packageName: 'ভিআইপি হজ্জ ২০২৬', packageType: 'HAJJ' as const, pilgrimExtId: 'p-003', pilgrimName: 'ইউসুফ গার্সিয়া', pilgrimEmail: 'y.garcia@email.com', pilgrimPhone: '+880 1832-559912', status: 'CONFIRMED' as const, paymentStatus: 'PARTIAL' as const, totalAmount: 46998, paidAmount: 30000, installmentsCount: 5, installmentsPaid: 3, departureDate: new Date('2026-05-18'), returnDate: new Date('2026-06-14'), pilgrimsCount: 2, bookedDate: new Date('2025-10-12'), notes: 'ভিআইপি দম্পতি, মার্সিডিজ ভি-ক্লাস স্থানান্তর', visaStatus: 'APPROVED' as const, documentsStatus: 'COMPLETE' as const },
  { ext_id: 'bkg-1004', bookingCode: 'UM-2026-1004', packageSlug: 'luxury-umrah-2026', packageName: 'লাক্সারি উমরাহ', packageType: 'UMRAH' as const, pilgrimExtId: 'p-004', pilgrimName: 'হাফসা বিলাল', pilgrimEmail: 'h.bilal@email.com', pilgrimPhone: '+880 1416-553344', status: 'IN_PROGRESS' as const, paymentStatus: 'PAID' as const, totalAmount: 18198, paidAmount: 18198, installmentsCount: 3, installmentsPaid: 3, departureDate: new Date('2026-04-01'), returnDate: new Date('2026-04-14'), pilgrimsCount: 3, bookedDate: new Date('2025-09-30'), notes: 'বয়স্ক পিতামাতাসহ পরিবার, হুইলচেয়ার অ্যাক্সেস', visaStatus: 'APPROVED' as const, documentsStatus: 'COMPLETE' as const },
  { ext_id: 'bkg-1005', bookingCode: 'HJ-2026-1005', packageSlug: 'standard-hajj-2026', packageName: 'স্ট্যান্ডার্ড হজ্জ ২০২৬', packageType: 'HAJJ' as const, pilgrimExtId: 'p-005', pilgrimName: 'ইব্রাহিম দিওপ', pilgrimEmail: 'i.diop@email.com', pilgrimPhone: '+880 1612-345678', status: 'CONFIRMED' as const, paymentStatus: 'PAID' as const, totalAmount: 25497, paidAmount: 25497, installmentsCount: 4, installmentsPaid: 4, departureDate: new Date('2026-05-20'), returnDate: new Date('2026-06-12'), pilgrimsCount: 3, bookedDate: new Date('2025-09-15'), notes: 'তিন প্রজন্ম, বাংলা-ভাষী গাইড', visaStatus: 'APPROVED' as const, documentsStatus: 'COMPLETE' as const },
  { ext_id: 'bkg-1006', bookingCode: 'UM-2026-1006', packageSlug: 'budget-umrah-2026', packageName: 'বাজেট উমরাহ', packageType: 'UMRAH' as const, pilgrimExtId: null, pilgrimName: 'জয়নব মুস্তাফা', pilgrimEmail: 'z.mustafa@email.com', pilgrimPhone: '+880 1712-900456', status: 'COMPLETED' as const, paymentStatus: 'PAID' as const, totalAmount: 1099, paidAmount: 1099, installmentsCount: 1, installmentsPaid: 1, departureDate: new Date('2025-11-05'), returnDate: new Date('2025-11-11'), pilgrimsCount: 1, bookedDate: new Date('2025-08-20'), notes: 'শিক্ষার্থী প্যাকেজ', visaStatus: 'APPROVED' as const, documentsStatus: 'COMPLETE' as const },
  { ext_id: 'bkg-1007', bookingCode: 'UM-2026-1007', packageSlug: 'premium-umrah-2026', packageName: 'প্রিমিয়াম উমরাহ', packageType: 'UMRAH' as const, pilgrimExtId: null, pilgrimName: 'খালিদ রশিদ', pilgrimEmail: 'k.rashid@email.com', pilgrimPhone: '+880 1412-345678', status: 'PENDING' as const, paymentStatus: 'PARTIAL' as const, totalAmount: 6198, paidAmount: 1500, installmentsCount: 4, installmentsPaid: 1, departureDate: new Date('2026-03-15'), returnDate: new Date('2026-03-26'), pilgrimsCount: 2, bookedDate: new Date('2026-01-08'), notes: 'ইস্তাম্বুল হয়ে মাল্টি-সিটি', visaStatus: 'SUBMITTED' as const, documentsStatus: 'INCOMPLETE' as const },
  { ext_id: 'bkg-1008', bookingCode: 'UM-2026-1008', packageSlug: 'economy-umrah-2026', packageName: 'ইকোনমি উমরাহ', packageType: 'UMRAH' as const, pilgrimExtId: null, pilgrimName: 'সালমা আল-ফয়সাল', pilgrimEmail: 's.faisal@email.com', pilgrimPhone: '+880 1712-900789', status: 'COMPLETED' as const, paymentStatus: 'PAID' as const, totalAmount: 1749, paidAmount: 1749, installmentsCount: 2, installmentsPaid: 2, departureDate: new Date('2025-08-25'), returnDate: new Date('2025-09-03'), pilgrimsCount: 1, bookedDate: new Date('2025-06-10'), notes: 'টেক পেশাদার', visaStatus: 'APPROVED' as const, documentsStatus: 'COMPLETE' as const },
  { ext_id: 'bkg-1009', bookingCode: 'HJ-2026-1009', packageSlug: 'standard-hajj-2026', packageName: 'স্ট্যান্ডার্ড হজ্জ ২০২৬', packageType: 'HAJJ' as const, pilgrimExtId: null, pilgrimName: 'আব্দুর রহমান', pilgrimEmail: 'a.rahman@email.com', pilgrimPhone: '+880 1313-551122', status: 'CONFIRMED' as const, paymentStatus: 'PARTIAL' as const, totalAmount: 8499, paidAmount: 4000, installmentsCount: 4, installmentsPaid: 2, departureDate: new Date('2026-05-20'), returnDate: new Date('2026-06-12'), pilgrimsCount: 1, bookedDate: new Date('2025-12-20'), notes: 'শিক্ষাগত কর্মসূচির অংশগ্রহণকারী', visaStatus: 'SUBMITTED' as const, documentsStatus: 'COMPLETE' as const },
  { ext_id: 'bkg-1010', bookingCode: 'UM-2026-1010', packageSlug: 'premium-umrah-2026', packageName: 'প্রিমিয়াম উমরাহ', packageType: 'UMRAH' as const, pilgrimExtId: null, pilgrimName: 'নুসায়বা আলি', pilgrimEmail: 'n.ali@email.com', pilgrimPhone: '+880 1773-557788', status: 'PENDING' as const, paymentStatus: 'PARTIAL' as const, totalAmount: 3099, paidAmount: 800, installmentsCount: 3, installmentsPaid: 1, departureDate: new Date('2026-04-15'), returnDate: new Date('2026-04-26'), pilgrimsCount: 1, bookedDate: new Date('2026-02-01'), notes: 'এক্সপ্রেস ৭-দিনের ভ্যারিয়েন্ট', visaStatus: 'PENDING' as const, documentsStatus: 'INCOMPLETE' as const },
  { ext_id: 'bkg-1011', bookingCode: 'HJ-2026-1011', packageSlug: 'economy-hajj-2026', packageName: 'ইকোনমি হজ্জ ২০২৬', packageType: 'HAJJ' as const, pilgrimExtId: null, pilgrimName: 'সাঈদ মনসুর', pilgrimEmail: 's.mansoor@email.com', pilgrimPhone: '+880 1713-559988', status: 'CONFIRMED' as const, paymentStatus: 'PARTIAL' as const, totalAmount: 12998, paidAmount: 6500, installmentsCount: 5, installmentsPaid: 3, departureDate: new Date('2026-05-22'), returnDate: new Date('2026-06-11'), pilgrimsCount: 2, bookedDate: new Date('2025-11-10'), notes: 'পিতা-পুত্র জুটি', visaStatus: 'SUBMITTED' as const, documentsStatus: 'COMPLETE' as const },
  { ext_id: 'bkg-1012', bookingCode: 'UM-2026-1012', packageSlug: 'economy-umrah-2026', packageName: 'ইকোনমি উমরাহ', packageType: 'UMRAH' as const, pilgrimExtId: null, pilgrimName: 'রাবেয়া তারিক', pilgrimEmail: 'r.tariq@email.com', pilgrimPhone: '+880 1416-554455', status: 'CONFIRMED' as const, paymentStatus: 'PAID' as const, totalAmount: 4998, paidAmount: 4998, installmentsCount: 2, installmentsPaid: 2, departureDate: new Date('2026-03-01'), returnDate: new Date('2026-03-10'), pilgrimsCount: 3, bookedDate: new Date('2025-12-01'), notes: 'শিশুসহ পরিবার — ফ্যামিলি স্যুট', visaStatus: 'APPROVED' as const, documentsStatus: 'COMPLETE' as const },
]

const paymentSeeds = [
  { transactionId: 'TXN-20251120-A1F8', bookingExtId: 'bkg-1001', bookingCode: 'HJ-2026-1001', pilgrimName: 'মোহাম্মদ আনোয়ার', amount: 6750, method: 'CARD' as const, status: 'COMPLETED' as const, date: new Date('2025-11-20T10:15:00'), installmentNumber: 1, installmentsTotal: 4 },
  { transactionId: 'TXN-20251220-B2C3', bookingExtId: 'bkg-1001', bookingCode: 'HJ-2026-1001', pilgrimName: 'মোহাম্মদ আনোয়ার', amount: 6750, method: 'CARD' as const, status: 'COMPLETED' as const, date: new Date('2025-12-20T10:15:00'), installmentNumber: 2, installmentsTotal: 4 },
  { transactionId: 'TXN-20260120-D4E5', bookingExtId: 'bkg-1001', bookingCode: 'HJ-2026-1001', pilgrimName: 'মোহাম্মদ আনোয়ার', amount: 6750, method: 'CARD' as const, status: 'COMPLETED' as const, date: new Date('2026-01-20T10:15:00'), installmentNumber: 3, installmentsTotal: 4 },
  { transactionId: 'TXN-20260220-F6G7', bookingExtId: 'bkg-1001', bookingCode: 'HJ-2026-1001', pilgrimName: 'মোহাম্মদ আনোয়ার', amount: 6748, method: 'CARD' as const, status: 'COMPLETED' as const, date: new Date('2026-02-20T10:15:00'), installmentNumber: 4, installmentsTotal: 4 },
  { transactionId: 'TXN-20251208-H8I9', bookingExtId: 'bkg-1002', bookingCode: 'UM-2026-1002', pilgrimName: 'আয়েশা খান', amount: 875, method: 'PAYPAL' as const, status: 'COMPLETED' as const, date: new Date('2025-12-08T15:20:00'), installmentNumber: 1, installmentsTotal: 2 },
  { transactionId: 'TXN-20260108-J1K2', bookingExtId: 'bkg-1002', bookingCode: 'UM-2026-1002', pilgrimName: 'আয়েশা খান', amount: 874, method: 'PAYPAL' as const, status: 'COMPLETED' as const, date: new Date('2026-01-08T15:20:00'), installmentNumber: 2, installmentsTotal: 2 },
  { transactionId: 'TXN-20251012-L3M4', bookingExtId: 'bkg-1003', bookingCode: 'HJ-2026-1003', pilgrimName: 'ইউসুফ গার্সিয়া', amount: 12000, method: 'BANK_TRANSFER' as const, status: 'COMPLETED' as const, date: new Date('2025-10-12T09:00:00'), installmentNumber: 1, installmentsTotal: 5 },
  { transactionId: 'TXN-20251112-N5O6', bookingExtId: 'bkg-1003', bookingCode: 'HJ-2026-1003', pilgrimName: 'ইউসুফ গার্সিয়া', amount: 9000, method: 'BANK_TRANSFER' as const, status: 'COMPLETED' as const, date: new Date('2025-11-12T09:00:00'), installmentNumber: 2, installmentsTotal: 5 },
  { transactionId: 'TXN-20251212-P7Q8', bookingExtId: 'bkg-1003', bookingCode: 'HJ-2026-1003', pilgrimName: 'ইউসুফ গার্সিয়া', amount: 9000, method: 'BANK_TRANSFER' as const, status: 'COMPLETED' as const, date: new Date('2025-12-12T09:00:00'), installmentNumber: 3, installmentsTotal: 5 },
  { transactionId: 'TXN-20260208-R9S0', bookingExtId: 'bkg-1010', bookingCode: 'UM-2026-1010', pilgrimName: 'নুসায়বা আলি', amount: 800, method: 'APPLE_PAY' as const, status: 'PENDING' as const, date: new Date('2026-02-08T16:30:00'), installmentNumber: 1, installmentsTotal: 3 },
  { transactionId: 'TXN-20260108-T1U2', bookingExtId: 'bkg-1007', bookingCode: 'UM-2026-1007', pilgrimName: 'খালিদ রশিদ', amount: 1500, method: 'CARD' as const, status: 'COMPLETED' as const, date: new Date('2026-01-08T14:45:00'), installmentNumber: 1, installmentsTotal: 4 },
  { transactionId: 'TXN-20260601-V3W4', bookingExtId: 'bkg-1003', bookingCode: 'HJ-2026-1003', pilgrimName: 'ইউসুফ গার্সিয়া', amount: 16998, method: 'BANK_TRANSFER' as const, status: 'PENDING' as const, date: new Date('2026-06-01T00:00:00'), installmentNumber: 4, installmentsTotal: 5 },
]

const inquirySeeds = [
  { name: 'হাসান মাহমুদ', email: 'hassan.m@email.com', phone: '+880 1555-123456', type: 'PACKAGE' as const, subject: 'প্রিমিয়াম হজ্জ ২০২৬ সম্পর্কে প্রশ্ন', message: 'আমি আমার বয়স্ক পিতামাতার সাথে ভ্রমণ করছি। হুইলচেয়ার-অ্যাক্সেসিবল মিনা তাঁবু অফার করেন?', packageSlug: 'premium-hajj-2026', status: 'IN_PROGRESS' as const, priority: 'HIGH' as const, createdDate: new Date('2026-06-12T08:30:00') },
  { name: 'লায়লা মোহাম্মদ', email: 'layla.m@email.com', phone: '+880 1712-901234', type: 'CONSULTATION' as const, subject: 'প্রথমবারের উমরাহ পরামর্শ', message: 'আমি ৩২ বছর বয়সী এবং প্রথমবার উমরাহ করতে চাই।', packageSlug: null, status: 'NEW' as const, priority: 'MEDIUM' as const, createdDate: new Date('2026-06-12T14:15:00') },
  { name: 'মরিয়ম আলি', email: 'm.ali@email.com', phone: '+880 1416-557788', type: 'PACKAGE' as const, subject: '২৫ জনের জন্য গ্রুপ বুকিং', message: 'আমাদের ইসলামিক সেন্টার মার্চ ২০২৬-এ ২৫ জনের একটি গ্রুপ বুক করতে চায়।', packageSlug: 'economy-umrah-2026', status: 'RESPONDED' as const, priority: 'HIGH' as const, createdDate: new Date('2026-06-10T11:20:00') },
  { name: 'বিলাল আহমদ', email: 'b.ahmad@email.com', phone: '+880 1412-349876', type: 'CONSULTATION' as const, subject: 'মাল্টি-সিটি ভ্রমণসূচি', message: 'উমরাহকে ইস্তাম্বুল ও জর্ডানের স্টপের সাথে একত্রিত করার চেষ্টা করছি।', packageSlug: null, status: 'IN_PROGRESS' as const, priority: 'LOW' as const, createdDate: new Date('2026-06-09T09:50:00') },
  { name: 'সুমাইয়া খান', email: 's.khan@email.com', phone: '+880 1712-905566', type: 'GENERAL' as const, subject: 'টিকার প্রয়োজনীয়তার আপডেট', message: '২০২৬ হজ্জের জন্য মেনিনজাইটিস টিকার প্রয়োজনীয়তা কি পরিবর্তিত হয়েছে?', packageSlug: null, status: 'RESPONDED' as const, priority: 'MEDIUM' as const, createdDate: new Date('2026-06-08T13:10:00') },
  { name: 'খালিদ রশিদ', email: 'k.rasheed@email.com', phone: '+880 1713-552233', type: 'PACKAGE' as const, subject: 'ভিআইপি হজ্জ প্রাপ্যতা', message: 'ভিআইপি হজ্জ ২০২৬ প্যাকেজে কি এখনও সিট পাওয়া যাচ্ছে?', packageSlug: 'vip-hajj-2026', status: 'IN_PROGRESS' as const, priority: 'HIGH' as const, createdDate: new Date('2026-06-07T18:25:00') },
  { name: 'ফাতিমা সালিম', email: 'f.saleem@email.com', phone: '+880 1611-554477', type: 'CONSULTATION' as const, subject: 'শুধুমাত্র মহিলা উমরাহ গ্রুপ', message: 'এপ্রিলে প্রস্থানকারী একটি শুধুমাত্র মহিলা উমরাহ গ্রুপ খুঁজছি।', packageSlug: null, status: 'NEW' as const, priority: 'MEDIUM' as const, createdDate: new Date('2026-06-12T07:00:00') },
]

const faqSeeds = [
  { category: 'বুকিং', question: 'কীভাবে প্যাকেজ বুক করব?', answer: 'আমাদের হজ্জ বা উমরাহ প্যাকেজ ব্রাউজ করুন, পছন্দের প্যাকেজে ক্লিক করুন, সম্পূর্ণ ভ্রমণসূচি দেখুন এবং "এখনই বুক করুন" ক্লিক করুন। হাজী বিবরণ, ডকুমেন্ট আপলোড এবং ২৫% জমার মাধ্যমে গাইড পাবেন।', position: 1 },
  { category: 'বুকিং', question: 'অন্য কারো জন্য (মাহরাম, বাবা-মা) বুক করতে পারি?', answer: 'হ্যাঁ। বুকিংয়ের সময় প্রতিটি হাজীর পাসপোর্ট বিবরণ ও সম্পর্ক যোগ করুন।', position: 2 },
  { category: 'বুকিং', question: 'জমার পরিমাণ কত?', answer: '২৫% জমা আপনার বুকিং নিশ্চিত করে। ভিআইপি প্যাকেজের জন্য ৩০%।', position: 3 },
  { category: 'বুকিং', question: 'কিস্তিতে পরিশোধ করা যায়?', answer: 'হ্যাঁ। জমার পর অবশিষ্ট ব্যালেন্স ২-৬ মাসিক কিস্তিতে পরিশোধ করা যায়।', position: 4 },
  { category: 'বুকিং', question: 'কখন বুক করা উচিত?', answer: 'হজ্জের জন্য ৬-১২ মাস আগে। রমজান উমরাহর জন্য ৮-১২ মাস আগে।', position: 5 },
  { category: 'ভিসা ও ডকুমেন্ট', question: 'প্যাকেজ মূল্যে কি ভিসা অন্তর্ভুক্ত?', answer: 'হ্যাঁ, আমাদের সব প্যাকেজে উমরাহ বা হজ্জ ভিসা ফি, বায়োমেট্রিক রেজিস্ট্রেশন এবং হজ্জ মন্ত্রণালয়ের ই-তাসরীহ অনুমতি অন্তর্ভুক্ত।', position: 6 },
  { category: 'ভিসা ও ডকুমেন্ট', question: 'কী কী ডকুমেন্ট লাগবে?', answer: 'ফেরত তারিখ থেকে কমপক্ষে ৬ মাস মেয়াদী বৈধ পাসপোর্ট, সাম্প্রতিক পাসপোর্ট সাইজ ছবি, টিকা সার্টিফিকেট ও সম্পূর্ণ আবেদনপত্র।', position: 7 },
  { category: 'ভিসা ও ডকুমেন্ট', question: 'ভিসা প্রসেসিংয়ে কত সময় লাগে?', answer: 'স্ট্যান্ডার্ড প্রসেসিং ৭-১৪ কার্যদিবস।', position: 8 },
  { category: 'ভিসা ও ডকুমেন্ট', question: 'কোন টিকা প্রয়োজন?', answer: 'মেনিনজাইটিস ACWY (বাধ্যতামূলক), সিজনাল ফ্লু, COVID-19 টিকা।', position: 9 },
  { category: 'ভ্রমণ', question: 'ফ্লাইট কি অন্তর্ভুক্ত?', answer: 'হ্যাঁ, সব প্যাকেজে প্রধান বিমানবন্দর থেকে রাউন্ড-ট্রিপ ফ্লাইট অন্তর্ভুক্ত।', position: 10 },
  { category: 'ভ্রমণ', question: 'কোন এয়ারলাইনে যাব?', answer: 'প্যাকেজ ও রুট অনুসারে সৌদি এয়ারলাইন্স, এমিরেটস, কাতার বা টার্কিশ।', position: 11 },
  { category: 'ভ্রমণ', question: 'অবস্থান বাড়াতে বা আগে পৌঁছাতে পারি?', answer: 'হ্যাঁ, ৩০+ দিন আগে অনুরোধ করলে অতিরিক্ত রাত ও ফ্লাইট পরিবর্তন সম্ভব।', position: 12 },
  { category: 'ভ্রমণ', question: 'ফ্লাইট দেরি বা বাতিল হলে কী হবে?', answer: 'আমাদের ২৪/৭ জরুরি লাইন রিবুকিং ও হোটেল কভারেজ পরিচালনা করে।', position: 13 },
  { category: 'হোটেল', question: 'হোটেল হারাম থেকে কত কাছে?', answer: 'বাজেট: ৭০০-৯০০ মিটার। ইকোনমি: ৪০০-৫০০ মিটার। প্রিমিয়াম: ১০০-২০০ মিটার।', position: 14 },
  { category: 'হোটেল', question: 'একক রুম পেতে পারি?', answer: 'হ্যাঁ, বাজেট ছাড়া সব প্যাকেজে একক রুম সাপ্লিমেন্ট পাওয়া যায়।', position: 15 },
  { category: 'হোটেল', question: 'ফ্যামিলি রুম পাওয়া যায়?', answer: 'হ্যাঁ, ২ প্রাপ্তবয়স্ক + ২ শিশু সম্বলিত ফ্যামিলি রুম পাওয়া যায়।', position: 16 },
  { category: 'পেমেন্ট', question: 'কী কী পেমেন্ট পদ্ধতি গ্রহণ করেন?', answer: 'ক্রেডিট/ডেবিট কার্ড, ব্যাংক ট্রান্সফার, ACH, অ্যাপল/গুগল পে, bKash, Nagad, Rocket।', position: 17 },
  { category: 'পেমেন্ট', question: 'আমার পেমেন্ট কি সুরক্ষিত?', answer: 'হ্যাঁ। সব পেমেন্ট PCI-DSS Level 1 কমপ্লায়েন্ট গেটওয়ের মাধ্যমে প্রক্রিয়াকৃত।', position: 18 },
  { category: 'পেমেন্ট', question: 'আপনাদের ফেরত নীতি কী?', answer: '৬০+ দিন আগে সম্পূর্ণ ফেরত। ৩০-৫৯ দিনে ৭৫% ফেরত। ১৫-২৯ দিনে ৫০% ফেরত।', position: 19 },
  { category: 'পেমেন্ট', question: 'ভিসা প্রত্যাখ্যাত হলে ফেরত পাব?', answer: 'হ্যাঁ। হাজীর ভুল ছাড়া ভিসা প্রত্যাখ্যাত হলে প্রশাসনিক ফি বাদে সম্পূর্ণ ফেরত।', position: 20 },
  { category: 'ভ্রমণকালীন', question: 'গ্রুপ লিডার থাকবেন?', answer: 'হ্যাঁ, প্রতিটি গ্রুপে অভিজ্ঞ আলেম বা প্রশিক্ষিত গ্রুপ লিডার থাকেন।', position: 21 },
  { category: 'ভ্রমণকালীন', question: 'মেডিকেল জরুরি অবস্থায় কী হবে?', answer: 'হোটেল মেডিকেল ডেস্কে তাৎক্ষণিক চিকিৎসা পাওয়া যায়।', position: 22 },
  { category: 'ভ্রমণকালীন', question: 'হোটেলে ওয়াই-ফাই পাওয়া যায়?', answer: 'হ্যাঁ, সব হোটেলের লবি ও রুমে ফ্রি ওয়াই-ফাই।', position: 23 },
  { category: 'ভ্রমণকালীন', question: 'নিজের ফোন ব্যবহার করতে পারি?', answer: 'হ্যাঁ। সৌদি টেলিকম STC, Mobily ও Zain বিমানবন্দরে ট্যুরিস্ট সিম দেয়।', position: 24 },
  { category: 'বিশেষ ক্ষেত্র', question: 'চলাচলে সমস্যাযুক্ত বয়স্ক হাজীরা যেতে পারেন?', answer: 'হ্যাঁ। হুইলচেয়ার-অ্যাক্সেসিবল প্যাকেজ ও মেডিকেল এসকর্ট অপশন আছে।', position: 25 },
  { category: 'বিশেষ ক্ষেত্র', question: 'বাচ্চাদের অনুমতি আছে?', answer: 'হ্যাঁ। ১২-এর নিচে বাচ্চারা ২৫% ছাড়, ৫-এর নিচে ৫০% ছাড় পায়।', position: 26 },
  { category: 'বিশেষ ক্ষেত্র', question: 'শুধু-নারী গ্রুপ আছে?', answer: 'হ্যাঁ। ফাতিমা জাহরা মালিক নারী গ্রুপ লিডারদের সাথে বিশেষজ্ঞ।', position: 27 },
  { category: 'বিশেষ ক্ষেত্র', question: 'উমরাহর সাথে তুরস্ক, মিশর বা জর্ডান সফর যুক্ত করা যায়?', answer: 'হ্যাঁ। ইস্তাম্বুল, কায়রো, আম্মান বা কুয়ালালামপুরে স্টপসহ মাল্টি-সিটি ভ্রমণসূচি ব্যবস্থা করা যায়।', position: 28 },
]

const testimonialSeeds = [
  { name: 'মোহাম্মদ আনোয়ার', location: 'ঢাকা, বাংলাদেশ', packageName: 'প্রিমিয়াম হজ্জ ২০২৬', rating: 5, date: new Date('2025-12-08'), content: 'সুবহানাল্লাহ, কল্পনার চেয়ে বেশি সুসংগঠিত হজ্জ। হোটেল হারাম থেকে ৫০ মিটার দূরে এবং মিনার তাঁবু প্রত্যাশার চেয়ে ভালো।', avatar: 'from-blue-400 to-indigo-500', verified: true, featured: true },
  { name: 'আয়েশা খান', location: 'চট্টগ্রাম, বাংলাদেশ', packageName: 'ইকোনমি উমরাহ', rating: 5, date: new Date('2025-11-22'), content: 'প্রথম উমরাহ ও একা ভ্রমণে নার্ভাস ছিলাম। ফাতিমা ভিসা থেকে ফেরা পর্যন্ত সব নিরবচ্ছিন্ন করেছেন।', avatar: 'from-rose-400 to-pink-500', verified: true, featured: true },
  { name: 'ইউসুফ গার্সিয়া', location: 'সিলেট, বাংলাদেশ', packageName: 'ভিআইপি হজ্জ ২০২৬', rating: 5, date: new Date('2025-12-15'), content: 'বছরের পর বছর তিনবার হজ্জ করেছি। ছোট গ্রুপের আকার ও ৫-তারকা ব্যবস্থাপনার কারণে এটি ছিল সবচেয়ে আধ্যাত্মিকভাবে নিবেদিত।', avatar: 'from-emerald-400 to-teal-500', verified: true, featured: true },
  { name: 'হাফসা বিলাল', location: 'রাজশাহী, বাংলাদেশ', packageName: 'লাক্সারি উমরাহ', rating: 5, date: new Date('2025-10-30'), content: 'আমার বয়স্ক বাবা-মায়ের হুইলচেয়ার দরকার ছিল এবং মরিয়ম প্রত্যাশার বাইরে গেছেন।', avatar: 'from-violet-400 to-purple-500', verified: true, featured: true },
  { name: 'ইব্রাহিম দিওপ', location: 'খুলনা, বাংলাদেশ', packageName: 'স্ট্যান্ডার্ড হজ্জ ২০২৬', rating: 5, date: new Date('2025-12-02'), content: 'ইব্রাহিম কেইতা আমাদের পরিবারের জন্য সবকিছু সংগঠিত করেছেন। তিন প্রজন্ম একসাথে নিশ্চিন্তে হজ্জ করেছি।', avatar: 'from-amber-400 to-orange-500', verified: true, featured: true },
  { name: 'জয়নব মুস্তফা', location: 'বরিশাল, বাংলাদেশ', packageName: 'বাজেট উমরাহ', rating: 4, date: new Date('2025-11-10'), content: 'দামের তুলনায় সত্যিই মুগ্ধ। হোটেল ১০ মিনিট হাঁটার দূরত্বে কিন্তু রুম পরিষ্কার ও শান্ত।', avatar: 'from-teal-400 to-cyan-500', verified: true, featured: false },
  { name: 'খালিদ রশিদ', location: 'রংপুর, বাংলাদেশ', packageName: 'প্রিমিয়াম উমরাহ', rating: 5, date: new Date('2025-09-18'), content: 'ইস্তাম্বুল হয়ে মাল্টি-সিটি ভ্রমণ ছিল চমৎকার। ২২তম তলা থেকে হারামের দৃশ্য ছিল অসাধারণ।', avatar: 'from-orange-400 to-red-500', verified: true, featured: true },
  { name: 'সালমা আল-ফয়সাল', location: 'ময়মনসিংহ, বাংলাদেশ', packageName: 'ইকোনমি উমরাহ', rating: 5, date: new Date('2025-08-25'), content: 'অ্যাপের মাধ্যমে বুকিং প্রক্রিয়া অবিশ্বাস্যভাবে মসৃণ।', avatar: 'from-pink-400 to-fuchsia-500', verified: true, featured: false },
  { name: 'আব্দুর রহমান', location: 'কুমিল্লা, বাংলাদেশ', packageName: 'স্ট্যান্ডার্ড হজ্জ ২০২৬', rating: 5, date: new Date('2025-12-12'), content: 'খাদিজার প্রাক-প্রস্থান শিক্ষামূলক প্রোগ্রাম আমাদের হজ্জ প্রস্তুতি বদলে দিয়েছে।', avatar: 'from-yellow-400 to-amber-500', verified: true, featured: true },
  { name: 'নুসাইবা আলী', location: 'নারায়ণগঞ্জ, বাংলাদেশ', packageName: 'প্রিমিয়াম উমরাহ', rating: 5, date: new Date('2025-10-05'), content: 'কর্মজীবী হিসেবে আমার সংক্ষিপ্ত উমরাহ প্রয়োজন ছিল। সাফিয়া ৭-দিনের প্রিমিয়াম প্যাকেজ ডিজাইন করেছেন।', avatar: 'from-indigo-400 to-violet-500', verified: true, featured: false },
  { name: 'সাঈদ মনসুর', location: 'গাজীপুর, বাংলাদেশ', packageName: 'ইকোনমি হজ্জ ২০২৬', rating: 5, date: new Date('2025-11-28'), content: 'দামের জন্য সাধারণ আশা করেছিলাম। যা পেলাম তা অসাধারণ।', avatar: 'from-cyan-400 to-blue-500', verified: true, featured: false },
  { name: 'রাবিয়া তারিক', location: 'বগুড়া, বাংলাদেশ', packageName: 'ফ্যামিলি উমরাহ', rating: 5, date: new Date('2025-09-30'), content: '৮ বছরের নিচে দুই বাচ্চা নিয়ে ভ্রমণ অসম্ভব মনে হত যতক্ষণ এই প্ল্যাটফর্ম না পেলাম।', avatar: 'from-emerald-400 to-green-500', verified: true, featured: false },
]

const blogSeeds = [
  { slug: 'complete-hajj-preparation-checklist', title: 'সম্পূর্ণ হজ্জ প্রস্তুতির চেকলিস্ট: প্রস্থানের ৯০ দিন আগে', excerpt: 'আপনার হজ্জ যাত্রার শারীরিক, আর্থিক এবং আধ্যাত্মিক প্রস্তুতির জন্য একটি বাস্তবসম্মত সপ্তাহ-ভিত্তিক গাইড।', content: 'হজ্জের জন্য প্রস্তুতি শুধু একটি স্যুটকেস প্যাক করা নয়। এটি শরীর, অর্থ এবং আত্মার একটি ৯০-দিনের রূপান্তর। এই গাইডটি আপনার পবিত্র যাত্রার পূর্ববর্তী প্রতিটি সপ্তাহের মাধ্যমে আপনাকে নিয়ে যায়।', author: 'শায়খ আহমাদ বিন খলিল', authorRole: 'হজ্জ আলেম', authorAvatar: 'from-amber-400 to-orange-500', category: 'হজ্জ প্রস্তুতি', tags: ['হজ্জ', 'চেকলিস্ট', 'প্রস্তুতি', 'আধ্যাত্মিক'], cover: 'from-amber-400 via-orange-400 to-rose-400', readTime: 12, publishedDate: new Date('2026-01-15'), views: 14820, featured: true },
  { slug: 'umrah-vs-hajj-key-differences', title: 'উমরাহ বনাম হজ্জ: মূল পার্থক্য বোঝা', excerpt: 'উমরাহ এবং হজ্জ কীভাবে বাধ্যবাধকতা, সময়কাল এবং আচার-অনুষ্ঠানে পৃথক তার স্পষ্ট, পাণ্ডিত্যপূর্ণ ব্যাখ্যা।', content: 'অনেক মুসলিম উমরাহ এবং হজ্জ শব্দগুলি বিনিময়যোগ্যভাবে ব্যবহার করেন, কিন্তু এগুলি গুরুত্বপূর্ণ পার্থক্যসহ স্বতন্ত্র ইবাদত।', author: 'ডঃ ইউসুফ ইব্রাহিম', authorRole: 'ইসলামিক আলেম', authorAvatar: 'from-emerald-400 to-teal-500', category: 'শিক্ষা', tags: ['হজ্জ', 'উমরাহ', 'শিক্ষা', 'পার্থক্য'], cover: 'from-emerald-400 via-teal-400 to-cyan-400', readTime: 8, publishedDate: new Date('2026-02-03'), views: 9240, featured: true },
  { slug: 'choosing-right-hajj-package', title: 'আপনার পরিবারের জন্য সঠিক হজ্জ প্যাকেজ কীভাবে বেছে নেবেন', excerpt: 'ইকোনমি, স্ট্যান্ডার্ড, প্রিমিয়াম এবং ভিআইপি হজ্জ টিয়ার থেকে নির্বাচন করার সময় ছয়টি বিষয় বিবেচনা করতে হবে।', content: 'প্রতি ব্যক্তি $৬,৫০০ থেকে $২৫,০০০ এর বেশি পর্যন্ত হজ্জ প্যাকেজ টিয়ার সহ, সঠিকটি বেছে নেওয়ার জন্য সতর্ক মূল্যায়ন প্রয়োজন।', author: 'ফাতিমা জাহরা মালিক', authorRole: 'ভ্রমণ বিশেষজ্ঞ', authorAvatar: 'from-rose-400 to-pink-500', category: 'ভ্রমণ টিপস', tags: ['হজ্জ', 'প্যাকেজ', 'পরিবার', 'সিদ্ধান্ত গাইড'], cover: 'from-rose-400 via-pink-400 to-fuchsia-400', readTime: 10, publishedDate: new Date('2026-02-18'), views: 11320, featured: true },
  { slug: 'best-time-for-umrah', title: 'উমরাহ সম্পাদনের সেরা সময়: মাস-ভিত্তিক গাইড', excerpt: 'হিজরি ক্যালেন্ডারের প্রতিটি মাসের জন্য আবহাওয়া, ভিড়ের মাত্রা এবং আধ্যাত্মিক তাৎপর্য।', content: 'উমরাহ বছরের যেকোনো সময় সম্পাদন করা যেতে পারে, তবে প্রতিটি মাস একটি ভিন্ন অভিজ্ঞতা প্রদান করে।', author: 'ওমর হাসান', authorRole: 'সিনিয়র আলেম', authorAvatar: 'from-blue-400 to-cyan-500', category: 'ভ্রমণ টিপস', tags: ['উমরাহ', 'সময়', 'ক্যালেন্ডার', 'পরিকল্পনা'], cover: 'from-blue-400 via-cyan-400 to-teal-400', readTime: 7, publishedDate: new Date('2026-03-02'), views: 7820, featured: false },
  { slug: 'what-to-pack-for-umrah', title: 'উমরাহর জন্য কী প্যাক করবেন: অপরিহার্য প্যাকিং তালিকা', excerpt: 'প্রতিটি ঋতুর জন্য জলবায়ু বিবেচনা সহ পুরুষ এবং মহিলাদের জন্য বিস্তারিত প্যাকিং তালিকা।', content: 'হালকা প্যাক করুন, স্মার্টভাবে প্যাক করুন। হোটেল এবং মিনার মধ্যে স্থানান্তরের সময় অতিরিক্ত লাগেজ একটি বোঝা।', author: 'আয়েশা রাহমানী', authorRole: 'ভ্রমণ বিশেষজ্ঞ', authorAvatar: 'from-violet-400 to-purple-500', category: 'ভ্রমণ টিপস', tags: ['উমরাহ', 'প্যাকিং', 'অপরিহার্য', 'চেকলিস্ট'], cover: 'from-violet-400 via-purple-400 to-fuchsia-400', readTime: 6, publishedDate: new Date('2026-01-28'), views: 12450, featured: false },
  { slug: 'spiritual-significance-tawaf', title: 'তাওয়াফের আধ্যাত্মিক তাৎপর্য: শুধু হাঁটার চেয়ে বেশি', excerpt: 'সাত প্রদক্ষিণের অর্থ, ইতিহাস এবং অভ্যন্তরীণ মাত্রাগুলির উপর একটি পাণ্ডিত্যপূর্ণ ধ্যান।', content: 'তাওয়াফ হল কাবাকে সাতবার প্রদক্ষিণ করার কাজ। বাহ্যিকভাবে এটি হাঁটা। অভ্যন্তরীণভাবে এটি আল্লাহর ভালোবাসার সিংহাসনকে আত্মার প্রদক্ষিণ।', author: 'শায়খ ইউসুফ ইব্রাহিম', authorRole: 'ইসলামিক আলেম', authorAvatar: 'from-emerald-400 to-teal-500', category: 'আধ্যাত্মিকতা', tags: ['তাওয়াফ', 'আধ্যাত্মিকতা', 'কাবা', 'ইবাদত'], cover: 'from-emerald-400 via-green-400 to-teal-400', readTime: 9, publishedDate: new Date('2026-02-25'), views: 6890, featured: false },
  { slug: 'first-time-umrah-mistakes', title: 'প্রথমবারের উমরাহ হাজীদের ১০টি সাধারণ ভুল', excerpt: 'প্রতিটি প্রথমবারের হাজী প্রায় যে ব্যয়বহুল এবং আধ্যাত্মিক ভুলগুলি করেন তা এড়িয়ে চলুন।', content: 'বিশ বছরের প্রথমবারের হাজীদের গাইড করার অভিজ্ঞতা আমাদের প্যাটার্ন শিখিয়েছে।', author: 'খাদিজা সুলাইমান', authorRole: 'সিনিয়র আলেম', authorAvatar: 'from-orange-400 to-red-500', category: 'ভ্রমণ টিপস', tags: ['উমরাহ', 'প্রথমবার', 'ভুল', 'টিপস'], cover: 'from-orange-400 via-red-400 to-rose-400', readTime: 8, publishedDate: new Date('2026-03-10'), views: 18750, featured: true },
  { slug: 'visiting-madinah-guide', title: 'মদিনা পরিদর্শন: রসূলের শহরের সম্পূর্ণ গাইড', excerpt: 'ঐতিহাসিক স্থান, মসজিদে নববীতে শিষ্টাচার এবং বেশিরভাগ হাজী যে হারিয়ে যাওয়া স্থানগুলি মিস করেন।', content: 'মদিনা একটি সাইড ট্রিপ নয়। এটি আপনার যাত্রার আধ্যাত্মিক চূড়ান্ত পরিণতি।', author: 'মরিয়ম আল-জাহরানী', authorRole: 'সিনিয়র আলেম', authorAvatar: 'from-teal-400 to-emerald-500', category: 'গন্তব্য', tags: ['মদিনা', 'যিয়ারত', 'ভ্রমণ গাইড', 'আধ্যাত্মিকতা'], cover: 'from-teal-400 via-emerald-400 to-green-400', readTime: 11, publishedDate: new Date('2026-03-20'), views: 8460, featured: false },
]

const heroSeed = {
  videoId: 'weCvgHcbdP4',
  badge: '২০১৫ সাল থেকে পবিত্র যাত্রায় পরিপূর্ণতা',
  titleStart: 'আপনার পবিত্র যাত্রা,',
  titleHighlight: 'মর্যাদার সাথে সাজানো।',
  description: 'যোগ্য আলেমদের পরিচালনায় বাছাইকৃত হজ্জ ও উমরাহ প্যাকেজ। স্বচ্ছ মূল্য, ৫-তারকা অংশীদার এবং ২৪/৭ সরাসরি সহায়তা। বিশ্বব্যাপী ৫০,০০০+ হাজী দ্বারা বিশ্বস্ত।',
  ctaUmrah: 'উমরাহ খুঁজুন',
  ctaHajj: 'হজ্জ খুঁজুন',
  trustBadges: ['সৌদি মন্ত্রণালয় লাইসেন্সপ্রাপ্ত', '৪.৯/৫ (১২ হাজার+ রিভিউ)', '৬০+ দিন আগে বাতিল বিনামূল্যে'],
  reflectionEyebrow: 'আজকের প্রতিফলন',
  reflectionQuote: '"আর তুমি মানুষের প্রতি হজ্জের ঘোষণা দাও, তারা তোমার কাছে আসবে পায়ে হেঁটে এবং প্রতিটি ক্ষীণকায় উটের পিঠে চড়ে, দূর-দূরান্তের পথ পেরিয়ে।"',
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

async function main() {
  console.log('🌱 Seeding database...')

  // 1. Wipe in FK-safe order
  await prisma.payment.deleteMany()
  await prisma.bookingTraveler.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.inquiry.deleteMany()
  await prisma.userDocument.deleteMany()
  await prisma.packageItineraryDay.deleteMany()
  await prisma.packageFAQ.deleteMany()
  await prisma.hotelRoomType.deleteMany()
  await prisma.flightTransit.deleteMany()
  await prisma.heroStat.deleteMany()
  await prisma.heroReflectionItem.deleteMany()
  await prisma.siteContent.deleteMany()
  await prisma.transport.deleteMany()
  await prisma.flight.deleteMany()
  await prisma.hotel.deleteMany()
  await prisma.package.deleteMany()
  await prisma.user.deleteMany()
  await prisma.blog.deleteMany()
  await prisma.faq.deleteMany()
  await prisma.testimonial.deleteMany()
  console.log('  Tables cleared.')

  // 2. Users (also creates admin)
  const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 10)
  const adminHash = await bcrypt.hash('Admin@2026', 10)

  await prisma.user.create({
    data: {
      full_name: 'System Admin',
      email: 'admin@hajj-umrah.local',
      password: adminHash,
      role: 'ADMIN',
    },
  })
  const userIdByExt = new Map<string, string>()
  for (const u of userSeeds) {
    const { id, documents, ...data } = u
    const created = await prisma.user.create({
      data: {
        ...data,
        password: passwordHash,
        documents: { create: documents.map(d => ({ type: d.type, status: d.status, uploadedDate: d.uploadedDate })) },
      },
    })
    userIdByExt.set(id, created.id)
  }
  console.log(`  Users: ${userSeeds.length + 1}`)

  // 3. Packages
  const packageIdBySlug = new Map<string, string>()
  for (const p of packageSeeds) {
    const { ext_id, ...data } = p
    const itinerary = buildItinerary(p.type, p.duration)
    const created = await prisma.package.create({
      data: {
        ...data,
        itinerary: { create: itinerary },
        faqs: { create: commonFaqs },
      },
    })
    packageIdBySlug.set(p.slug, created.id)
  }
  console.log(`  Packages: ${packageSeeds.length}`)

  // 4. Hotels
  for (const h of hotelSeeds) {
    const { roomTypes, ...data } = h
    await prisma.hotel.create({
      data: { ...data, roomTypes: { create: roomTypes } },
    })
  }
  console.log(`  Hotels: ${hotelSeeds.length}`)

  // 5. Flights
  for (const f of flightSeeds) {
    const { transits, ...data } = f
    await prisma.flight.create({
      data: {
        ...data,
        transits: { create: transits.map((t, i) => ({ ...t, position: i })) },
      },
    })
  }
  console.log(`  Flights: ${flightSeeds.length}`)

  // 6. Transports
  for (const t of transportSeeds) {
    await prisma.transport.create({ data: t })
  }
  console.log(`  Transports: ${transportSeeds.length}`)

  // 7. Bookings
  const bookingIdByExt = new Map<string, string>()
  for (const b of bookingSeeds) {
    const { ext_id, packageSlug, pilgrimExtId, ...data } = b
    const packageId = packageIdBySlug.get(packageSlug)!
    const userId = pilgrimExtId ? userIdByExt.get(pilgrimExtId) ?? null : null
    const created = await prisma.booking.create({
      data: { ...data, packageId, userId },
    })
    bookingIdByExt.set(ext_id, created.id)
  }
  console.log(`  Bookings: ${bookingSeeds.length}`)

  // 8. Payments
  for (const p of paymentSeeds) {
    const { bookingExtId, ...data } = p
    const bookingId = bookingIdByExt.get(bookingExtId)!
    await prisma.payment.create({ data: { ...data, bookingId } })
  }
  console.log(`  Payments: ${paymentSeeds.length}`)

  // 9. Inquiries
  for (const i of inquirySeeds) {
    const { packageSlug, ...data } = i
    const packageId = packageSlug ? packageIdBySlug.get(packageSlug) ?? null : null
    await prisma.inquiry.create({ data: { ...data, packageId } })
  }
  console.log(`  Inquiries: ${inquirySeeds.length}`)

  // 10. Blogs
  for (const b of blogSeeds) {
    await prisma.blog.create({ data: b })
  }
  console.log(`  Blogs: ${blogSeeds.length}`)

  // 11. Faqs
  for (const f of faqSeeds) {
    await prisma.faq.create({ data: f })
  }
  console.log(`  Faqs: ${faqSeeds.length}`)

  // 12. Testimonials
  for (const t of testimonialSeeds) {
    await prisma.testimonial.create({ data: t })
  }
  console.log(`  Testimonials: ${testimonialSeeds.length}`)

  // 13. Site content (hero)
  await prisma.siteContent.create({
    data: {
      key: 'hero',
      videoId: heroSeed.videoId,
      badge: heroSeed.badge,
      titleStart: heroSeed.titleStart,
      titleHighlight: heroSeed.titleHighlight,
      description: heroSeed.description,
      ctaUmrah: heroSeed.ctaUmrah,
      ctaHajj: heroSeed.ctaHajj,
      trustBadges: heroSeed.trustBadges,
      reflectionEyebrow: heroSeed.reflectionEyebrow,
      reflectionQuote: heroSeed.reflectionQuote,
      reflectionRef: heroSeed.reflectionRef,
      reflectionItems: { create: heroSeed.reflectionItems.map((r, i) => ({ ...r, position: i })) },
      stats: { create: heroSeed.stats.map((s, i) => ({ ...s, position: i })) },
    },
  })
  console.log('  SiteContent: 1 (hero)')

  console.log('✅ Seed complete.')
}

main()
  .catch(e => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
