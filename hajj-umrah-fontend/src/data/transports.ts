import { IMG } from './images'

export type TransportType = 'airport-transfer' | 'intercity' | 'ziyarah-tour' | 'haram-shuttle' | 'private-hire'
export type VehicleType = 'sedan' | 'suv' | 'minivan' | 'coach' | 'luxury-coach' | 'mercedes-v-class'
export type TransportStatus = 'active' | 'inactive'

export interface Transport {
  id: string
  slug: string
  name: string
  type: TransportType
  vehicleType: VehicleType
  capacity: number
  images: string[]
  cover: string
  pickupLocation: string
  dropoffLocation: string
  routeDetails: string
  serviceCoverage: string[]
  driverName: string
  driverContact: string
  travelDuration: string
  price: number
  pricingUnit: 'per-person' | 'per-vehicle'
  availability: 'available' | 'limited' | 'soldout'
  status: TransportStatus
  featured: boolean
  rating: number
  reviewsCount: number
  bookingsCount: number
  notes: string
}

export const transports: Transport[] = [
  {
    id: 'trn-001',
    slug: 'jeddah-airport-to-makkah-hotel',
    name: 'জেদ্দা বিমানবন্দর → মক্কা হোটেল (প্রাইভেট সেডান)',
    type: 'airport-transfer',
    vehicleType: 'sedan',
    capacity: 3,
    images: [IMG.haramAerial, IMG.kaabaClockTower],
    cover: IMG.haramAerial,
    pickupLocation: 'কিং আব্দুল আজিজ আন্তর্জাতিক বিমানবন্দর (JED)',
    dropoffLocation: 'হারামের ৫ কিমির মধ্যে যেকোনো মক্কা হোটেল',
    routeDetails: 'JED টার্মিনাল ১ / হজ্জ টার্মিনাল → মক্কা শহরের সীমা → হোটেল লবিতে ড্রপ-অফ',
    serviceCoverage: ['জেদ্দা বিমানবন্দরে পিকআপ', 'সকল মক্কা হোটেল', 'দরজা-থেকে-দরজা সেবা', '২৪/৭ প্রাপ্যতা'],
    driverName: 'সৌদি-লাইসেন্সপ্রাপ্ত চালক',
    driverContact: '+966 50 000 0001',
    travelDuration: '~১ ঘণ্টা ১৫ মিনিট',
    price: 75,
    pricingUnit: 'per-vehicle',
    availability: 'available',
    status: 'active',
    featured: true,
    rating: 4.8,
    reviewsCount: 1240,
    bookingsCount: 8420,
    notes: '৬০ মিনিট ফ্রি অপেক্ষার সময় এবং আগমনে অভ্যর্থনা অন্তর্ভুক্ত।',
  },
  {
    id: 'trn-002',
    slug: 'makkah-hotel-to-madinah-hotel-coach',
    name: 'মক্কা হোটেল → মদিনা হোটেল (লাক্সারি কোচ)',
    type: 'intercity',
    vehicleType: 'luxury-coach',
    capacity: 45,
    images: [IMG.nabawiUmbrellas, IMG.pilgrimsWalking],
    cover: IMG.nabawiUmbrellas,
    pickupLocation: 'যেকোনো মক্কা হোটেল',
    dropoffLocation: 'যেকোনো মদিনা হোটেল',
    routeDetails: 'মক্কা → হাইওয়ে ১৫ → মদিনা শহর → হোটেল ড্রপ-অফ। একটি রিফ্রেশমেন্ট স্টপ অন্তর্ভুক্ত।',
    serviceCoverage: ['সকল মক্কা হোটেল', 'সকল মদিনা হোটেল', 'হাইওয়ে ১৫ রুট', 'পানি ও স্ন্যাক স্টপ'],
    driverName: 'গ্রুপ অপারেটর দল',
    driverContact: '+966 50 000 0002',
    travelDuration: '~৫ ঘণ্টা ৩০ মিনিট',
    price: 38,
    pricingUnit: 'per-person',
    availability: 'available',
    status: 'active',
    featured: true,
    rating: 4.6,
    reviewsCount: 980,
    bookingsCount: 12_400,
    notes: 'কোচ প্রতিদিন ০৯:০০, ১৪:০০ এবং ২১:০০ এ ছাড়ে। গ্রুপ রেট উপলব্ধ।',
  },
  {
    id: 'trn-003',
    slug: 'madinah-hotel-to-madinah-airport',
    name: 'মদিনা হোটেল → মদিনা বিমানবন্দর (প্রাইভেট SUV)',
    type: 'airport-transfer',
    vehicleType: 'suv',
    capacity: 5,
    images: [IMG.greenDomeMinarets],
    cover: IMG.greenDomeMinarets,
    pickupLocation: 'যেকোনো মদিনা হোটেল',
    dropoffLocation: 'প্রিন্স মোহাম্মদ বিন আব্দুল আজিজ আন্তর্জাতিক (MED)',
    routeDetails: 'হোটেল লবি → মদিনা রিং রোড → MED প্রস্থান টার্মিনাল',
    serviceCoverage: ['সকল মদিনা হোটেল', 'MED বিমানবন্দরে ড্রপ'],
    driverName: 'সৌদি-লাইসেন্সপ্রাপ্ত চালক',
    driverContact: '+966 50 000 0003',
    travelDuration: '~৩৫ মিনিট',
    price: 55,
    pricingUnit: 'per-vehicle',
    availability: 'available',
    status: 'active',
    featured: false,
    rating: 4.7,
    reviewsCount: 540,
    bookingsCount: 3120,
    notes: 'আন্তর্জাতিক প্রস্থানের ৩ ঘণ্টা আগে পিকআপের সময়সূচি নির্ধারণ করুন।',
  },
  {
    id: 'trn-004',
    slug: 'makkah-haram-shuttle',
    name: 'মক্কা হোটেল ↔ হারাম শাটল (২৪/৭)',
    type: 'haram-shuttle',
    vehicleType: 'minivan',
    capacity: 12,
    images: [IMG.kaabaDayCrowd, IMG.haramAerial],
    cover: IMG.kaabaDayCrowd,
    pickupLocation: 'নির্ধারিত মক্কা হোটেলের লবি',
    dropoffLocation: 'মসজিদুল হারাম (বাব আল-সালাম)',
    routeDetails: 'নিরবচ্ছিন্ন লুপ সেবা। ০৪:০০ থেকে ০০:০০ এর মধ্যে প্রতি ২০ মিনিটে পিকআপ।',
    serviceCoverage: ['আজিজিয়া, জাবাল ওমর, মিসফালার পার্টনার হোটেল', 'বাব আল-সালাম ড্রপ-অফ'],
    driverName: 'শাটল দল',
    driverContact: '+966 50 000 0004',
    travelDuration: 'প্রতি লেগে ~১০ মিনিট',
    price: 12,
    pricingUnit: 'per-person',
    availability: 'available',
    status: 'active',
    featured: true,
    rating: 4.5,
    reviewsCount: 1820,
    bookingsCount: 24_600,
    notes: 'প্রতি ব্যক্তি দৈনিক আনলিমিটেড রাইড। বাজেট/ইকোনমি প্যাকেজের জন্য সর্বাধিক-ক্রয়কৃত অ্যাড-অন।',
  },
  {
    id: 'trn-005',
    slug: 'madinah-haram-shuttle',
    name: 'মদিনা হোটেল ↔ মসজিদে নববী শাটল',
    type: 'haram-shuttle',
    vehicleType: 'minivan',
    capacity: 12,
    images: [IMG.nabawiUmbrellaGolden, IMG.nabawiDay],
    cover: IMG.nabawiUmbrellaGolden,
    pickupLocation: 'নির্ধারিত মদিনা হোটেলের লবি',
    dropoffLocation: 'মসজিদে নববী (বাব আল-সালাম)',
    routeDetails: 'নিরবচ্ছিন্ন লুপ সেবা। ০৩:৩০ থেকে ২৩:৩০ এর মধ্যে প্রতি ২৫ মিনিটে পিকআপ।',
    serviceCoverage: ['নববীর ১ কিমির মধ্যে পার্টনার হোটেল', 'বাব আল-সালাম ড্রপ-অফ'],
    driverName: 'শাটল দল',
    driverContact: '+966 50 000 0005',
    travelDuration: 'প্রতি লেগে ~৭ মিনিট',
    price: 10,
    pricingUnit: 'per-person',
    availability: 'available',
    status: 'active',
    featured: false,
    rating: 4.4,
    reviewsCount: 980,
    bookingsCount: 14_200,
    notes: 'প্রতি ২য় রানে বয়স্ক/হুইলচেয়ার-বান্ধব ভ্যান অন্তর্ভুক্ত।',
  },
  {
    id: 'trn-006',
    slug: 'makkah-ziyarah-tour',
    name: 'মক্কা যিয়ারত ট্যুর (অর্ধদিবস, এসি কোচ)',
    type: 'ziyarah-tour',
    vehicleType: 'coach',
    capacity: 35,
    images: [IMG.kaabaIhramDay, IMG.haramAerial],
    cover: IMG.kaabaIhramDay,
    pickupLocation: 'মক্কা হোটেল (জাবাল ওমর / আজিজিয়া এলাকা)',
    dropoffLocation: 'পিকআপ হোটেলে ফেরত',
    routeDetails: 'জাবাল আন-নূর (হেরা গুহা) → জাবাল সাওর → মসজিদ আল-জিন → মসজিদ আয়েশা (তানঈম) → ফেরত',
    serviceCoverage: ['জাবাল আন-নূর', 'জাবাল সাওর', 'মসজিদ আল-জিন', 'মসজিদ আয়েশা (তানঈম)'],
    driverName: 'চালক + ইংরেজি/আরবি গাইড',
    driverContact: '+966 50 000 0006',
    travelDuration: '~৪ ঘণ্টা ৩০ মিনিট',
    price: 28,
    pricingUnit: 'per-person',
    availability: 'available',
    status: 'active',
    featured: true,
    rating: 4.7,
    reviewsCount: 1340,
    bookingsCount: 6280,
    notes: 'প্রতিদিন ০৯:০০ এবং ১৪:০০ এ ছাড়ে। বোতলজাত পানি অন্তর্ভুক্ত।',
  },
  {
    id: 'trn-007',
    slug: 'madinah-ziyarah-tour',
    name: 'মদিনা যিয়ারত ট্যুর (অর্ধদিবস, এসি কোচ)',
    type: 'ziyarah-tour',
    vehicleType: 'coach',
    capacity: 35,
    images: [IMG.greenDomeStarFrame, IMG.nabawiUmbrellaSky],
    cover: IMG.greenDomeStarFrame,
    pickupLocation: 'মদিনা হোটেল (কেন্দ্রীয় এলাকা)',
    dropoffLocation: 'পিকআপ হোটেলে ফেরত',
    routeDetails: 'কুবা মসজিদ → মসজিদ আল-কিবলাতাইন → উহুদ পর্বত (শহীদগণ) → সাত মসজিদ → খেজুর বাগান → ফেরত',
    serviceCoverage: ['কুবা মসজিদ', 'মসজিদ আল-কিবলাতাইন', 'উহুদ পর্বত ও শহীদগণ', 'সাত মসজিদ', 'খেজুর বাগান'],
    driverName: 'চালক + ইংরেজি/আরবি/উর্দু গাইড',
    driverContact: '+966 50 000 0007',
    travelDuration: '~৫ ঘণ্টা',
    price: 26,
    pricingUnit: 'per-person',
    availability: 'available',
    status: 'active',
    featured: true,
    rating: 4.8,
    reviewsCount: 1620,
    bookingsCount: 7180,
    notes: 'প্রতিদিন ০৯:০০ এবং ১৫:০০ এ ছাড়ে।',
  },
  {
    id: 'trn-008',
    slug: 'mercedes-v-class-vip-day-rental',
    name: 'মার্সিডিজ ভি-ক্লাস — ভিআইপি দিন ভাড়া (মক্কা/মদিনা)',
    type: 'private-hire',
    vehicleType: 'mercedes-v-class',
    capacity: 6,
    images: [IMG.kaabaClockTower, IMG.kaabaNightKiswa],
    cover: IMG.kaabaClockTower,
    pickupLocation: 'মক্কা বা মদিনায় যে কোনো স্থান',
    dropoffLocation: 'কাস্টম ভ্রমণসূচি',
    routeDetails: '১০ ঘণ্টা পর্যন্ত প্রাইভেট চালকসহ মার্সিডিজ ভি-ক্লাস সেবা। চালক অপেক্ষা করেন, মাল্টি-স্টপ অনুমোদিত।',
    serviceCoverage: ['মক্কা শহর', 'মদিনা শহর', 'কাস্টম যিয়ারত ভ্রমণসূচি', 'বিমানবন্দর ট্রিপ (যেকোনো)'],
    driverName: 'প্রিমিয়াম ইংরেজি-ভাষী চালক',
    driverContact: '+966 50 000 0008',
    travelDuration: '১০ ঘণ্টা পর্যন্ত',
    price: 320,
    pricingUnit: 'per-vehicle',
    availability: 'limited',
    status: 'active',
    featured: false,
    rating: 5.0,
    reviewsCount: 184,
    bookingsCount: 412,
    notes: 'ডিফল্ট ভিআইপি / লাক্সারি প্যাকেজ পরিবহন। চালকের প্রাপ্যতার সাপেক্ষে।',
  },
]

export const getTransport = (slug: string) => transports.find(t => t.slug === slug)
export const getTransportById = (id: string) => transports.find(t => t.id === id)
export const getActiveTransports = () => transports.filter(t => t.status === 'active')
export const getFeaturedTransports = () => transports.filter(t => t.featured && t.status === 'active')

export const TRANSPORT_TYPES: { value: TransportType; label: string }[] = [
  { value: 'airport-transfer', label: 'বিমানবন্দর স্থানান্তর' },
  { value: 'intercity', label: 'আন্তঃনগর' },
  { value: 'ziyarah-tour', label: 'যিয়ারত ট্যুর' },
  { value: 'haram-shuttle', label: 'হারাম শাটল' },
  { value: 'private-hire', label: 'প্রাইভেট হায়ার' },
]
