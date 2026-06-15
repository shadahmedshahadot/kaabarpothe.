export type CabinClass = 'economy' | 'economy-plus' | 'business' | 'first'
export type FlightStatus = 'active' | 'inactive'
export type BookingStatus = 'open' | 'closed' | 'waitlist' | 'soldout'

export interface FlightTransit {
  airport: string
  city: string
  duration: string
}

export interface Flight {
  id: string
  slug: string
  airlineName: string
  airlineLogo: string
  flightNumber: string

  departureAirport: string
  arrivalAirport: string
  departureCity: string
  arrivalCity: string

  departureDate: string
  departureTime: string
  arrivalDate: string
  arrivalTime: string

  transits: FlightTransit[]
  transitDuration: string
  totalDuration: string

  cabinClass: CabinClass
  baggageAllowance: string
  mealInfo: string

  seatsTotal: number
  seatsAvailable: number
  bookingStatus: BookingStatus

  price: number
  taxes: number
  discount: number

  notes: string
  status: FlightStatus
  featured: boolean

  rating: number
  reviewsCount: number
  bookingsCount: number

  publishedAt: string
}

const airlineLogo = {
  biman: 'BG',
  saudia: 'SV',
  emirates: 'EK',
  qatar: 'QR',
  turkish: 'TK',
  flydubai: 'FZ',
} as const

export const flights: Flight[] = [
  {
    id: 'flt-bg-dac-jed-001',
    slug: 'biman-dac-jed-bg-1041',
    airlineName: 'বিমান বাংলাদেশ এয়ারলাইন্স',
    airlineLogo: airlineLogo.biman,
    flightNumber: 'BG 1041',

    departureAirport: 'হযরত শাহজালাল আন্তর্জাতিক (DAC)',
    arrivalAirport: 'কিং আব্দুল আজিজ আন্তর্জাতিক (JED)',
    departureCity: 'ঢাকা',
    arrivalCity: 'জেদ্দা',

    departureDate: '2026-02-15',
    departureTime: '02:30',
    arrivalDate: '2026-02-15',
    arrivalTime: '07:45',

    transits: [],
    transitDuration: 'নন-স্টপ',
    totalDuration: '৮ ঘণ্টা ১৫ মিনিট',

    cabinClass: 'economy',
    baggageAllowance: '৩০ কেজি চেকড + ৭ কেজি কেবিন',
    mealInfo: 'গরম হালাল খাবার + পানীয়',

    seatsTotal: 290,
    seatsAvailable: 84,
    bookingStatus: 'open',

    price: 745,
    taxes: 95,
    discount: 0,

    notes: 'নিবেদিত উমরাহ মৌসুমের সেবা। অনবোর্ড নামাজের সময় ঘোষণা করা হয়।',
    status: 'active',
    featured: true,

    rating: 4.5,
    reviewsCount: 412,
    bookingsCount: 2890,
    publishedAt: '2025-11-02',
  },
  {
    id: 'flt-sv-dac-jed-002',
    slug: 'saudia-dac-jed-sv-805',
    airlineName: 'সৌদিয়া',
    airlineLogo: airlineLogo.saudia,
    flightNumber: 'SV 805',

    departureAirport: 'হযরত শাহজালাল আন্তর্জাতিক (DAC)',
    arrivalAirport: 'কিং আব্দুল আজিজ আন্তর্জাতিক (JED)',
    departureCity: 'ঢাকা',
    arrivalCity: 'জেদ্দা',

    departureDate: '2026-02-15',
    departureTime: '06:15',
    arrivalDate: '2026-02-15',
    arrivalTime: '11:20',

    transits: [],
    transitDuration: 'নন-স্টপ',
    totalDuration: '৮ ঘণ্টা ০৫ মিনিট',

    cabinClass: 'economy',
    baggageAllowance: '৪৬ কেজি চেকড (২ × ২৩ কেজি) + ৭ কেজি কেবিন',
    mealInfo: 'হালাল খাবার, খেজুর, আরবি কফি',

    seatsTotal: 320,
    seatsAvailable: 38,
    bookingStatus: 'open',

    price: 829,
    taxes: 110,
    discount: 40,

    notes: 'সেরা সময়মত পারফরম্যান্স। গ্রুপগুলির পছন্দের সরাসরি সেবা।',
    status: 'active',
    featured: true,

    rating: 4.7,
    reviewsCount: 638,
    bookingsCount: 4120,
    publishedAt: '2025-10-18',
  },
  {
    id: 'flt-ek-dac-jed-003',
    slug: 'emirates-dac-jed-ek-585-via-dxb',
    airlineName: 'এমিরেটস',
    airlineLogo: airlineLogo.emirates,
    flightNumber: 'EK 585 / EK 803',

    departureAirport: 'হযরত শাহজালাল আন্তর্জাতিক (DAC)',
    arrivalAirport: 'কিং আব্দুল আজিজ আন্তর্জাতিক (JED)',
    departureCity: 'ঢাকা',
    arrivalCity: 'জেদ্দা',

    departureDate: '2026-02-16',
    departureTime: '04:50',
    arrivalDate: '2026-02-16',
    arrivalTime: '14:35',

    transits: [{ airport: 'দুবাই আন্তর্জাতিক (DXB)', city: 'দুবাই', duration: '২ ঘণ্টা ১০ মিনিট' }],
    transitDuration: '২ ঘণ্টা ১০ মিনিট',
    totalDuration: '১২ ঘণ্টা ৪৫ মিনিট',

    cabinClass: 'economy-plus',
    baggageAllowance: '৩৫ কেজি চেকড + ৭ কেজি কেবিন',
    mealInfo: 'দুই হালাল খাবার, আঞ্চলিক মেনু, আইস বিনোদন',

    seatsTotal: 360,
    seatsAvailable: 142,
    bookingStatus: 'open',

    price: 985,
    taxes: 165,
    discount: 0,

    notes: 'DXB হয়ে একক ট্রানজিট। একই-টার্মিনাল সংযোগ।',
    status: 'active',
    featured: false,

    rating: 4.8,
    reviewsCount: 521,
    bookingsCount: 1980,
    publishedAt: '2025-09-30',
  },
  {
    id: 'flt-qr-dac-jed-004',
    slug: 'qatar-dac-jed-qr-635-via-doh',
    airlineName: 'কাতার এয়ারওয়েজ',
    airlineLogo: airlineLogo.qatar,
    flightNumber: 'QR 635 / QR 1170',

    departureAirport: 'হযরত শাহজালাল আন্তর্জাতিক (DAC)',
    arrivalAirport: 'কিং আব্দুল আজিজ আন্তর্জাতিক (JED)',
    departureCity: 'ঢাকা',
    arrivalCity: 'জেদ্দা',

    departureDate: '2026-03-01',
    departureTime: '01:20',
    arrivalDate: '2026-03-01',
    arrivalTime: '10:05',

    transits: [{ airport: 'হামাদ আন্তর্জাতিক (DOH)', city: 'দোহা', duration: '১ ঘণ্টা ৫০ মিনিট' }],
    transitDuration: '১ ঘণ্টা ৫০ মিনিট',
    totalDuration: '১১ ঘণ্টা ৪৫ মিনিট',

    cabinClass: 'business',
    baggageAllowance: '৪০ কেজি চেকড + ১২ কেজি কেবিন (বিজনেস)',
    mealInfo: 'আ লা কার্টে হালাল ডাইনিং, DOH-এ লাউঞ্জ অ্যাক্সেস',

    seatsTotal: 32,
    seatsAvailable: 6,
    bookingStatus: 'open',

    price: 2480,
    taxes: 240,
    discount: 100,

    notes: 'লাই-ফ্ল্যাট সিটসহ বিজনেস কেবিন। লাউঞ্জ অ্যাক্সেস অন্তর্ভুক্ত।',
    status: 'active',
    featured: true,

    rating: 4.9,
    reviewsCount: 287,
    bookingsCount: 612,
    publishedAt: '2025-10-05',
  },
  {
    id: 'flt-tk-dac-med-005',
    slug: 'turkish-dac-med-tk-713-via-ist',
    airlineName: 'টার্কিশ এয়ারলাইন্স',
    airlineLogo: airlineLogo.turkish,
    flightNumber: 'TK 713 / TK 100',

    departureAirport: 'হযরত শাহজালাল আন্তর্জাতিক (DAC)',
    arrivalAirport: 'প্রিন্স মোহাম্মদ বিন আব্দুল আজিজ (MED)',
    departureCity: 'ঢাকা',
    arrivalCity: 'মদিনা',

    departureDate: '2026-02-20',
    departureTime: '09:40',
    arrivalDate: '2026-02-20',
    arrivalTime: '20:25',

    transits: [{ airport: 'ইস্তাম্বুল বিমানবন্দর (IST)', city: 'ইস্তাম্বুল', duration: '৩ ঘণ্টা ০৫ মিনিট' }],
    transitDuration: '৩ ঘণ্টা ০৫ মিনিট',
    totalDuration: '১৩ ঘণ্টা ৪৫ মিনিট',

    cabinClass: 'economy',
    baggageAllowance: '৩০ কেজি চেকড + ৮ কেজি কেবিন',
    mealInfo: 'দুই হালাল খাবার, তুর্কি আতিথেয়তা',

    seatsTotal: 280,
    seatsAvailable: 96,
    bookingStatus: 'open',

    price: 895,
    taxes: 140,
    discount: 50,

    notes: 'সরাসরি মদিনায় — জেদ্দা-মদিনা গ্রাউন্ড স্থানান্তর সাশ্রয় করে।',
    status: 'active',
    featured: true,

    rating: 4.6,
    reviewsCount: 348,
    bookingsCount: 1420,
    publishedAt: '2025-10-22',
  },
  {
    id: 'flt-sv-dac-med-006',
    slug: 'saudia-dac-med-sv-803',
    airlineName: 'সৌদিয়া',
    airlineLogo: airlineLogo.saudia,
    flightNumber: 'SV 803',

    departureAirport: 'হযরত শাহজালাল আন্তর্জাতিক (DAC)',
    arrivalAirport: 'প্রিন্স মোহাম্মদ বিন আব্দুল আজিজ (MED)',
    departureCity: 'ঢাকা',
    arrivalCity: 'মদিনা',

    departureDate: '2026-03-10',
    departureTime: '23:55',
    arrivalDate: '2026-03-11',
    arrivalTime: '05:30',

    transits: [],
    transitDuration: 'নন-স্টপ',
    totalDuration: '৮ ঘণ্টা ৩৫ মিনিট',

    cabinClass: 'economy',
    baggageAllowance: '৪৬ কেজি চেকড (২ × ২৩ কেজি) + ৭ কেজি কেবিন',
    mealInfo: 'হালাল খাবার, খেজুর, জমজম পানি',

    seatsTotal: 300,
    seatsAvailable: 12,
    bookingStatus: 'open',

    price: 875,
    taxes: 115,
    discount: 0,

    notes: 'একমাত্র নন-স্টপ ঢাকা → মদিনা। উমরাহ মৌসুমে দ্রুত বুক হয়ে যায়।',
    status: 'active',
    featured: true,

    rating: 4.8,
    reviewsCount: 712,
    bookingsCount: 3260,
    publishedAt: '2025-10-12',
  },
  {
    id: 'flt-fz-dac-jed-007',
    slug: 'flydubai-dac-jed-fz-552-via-dxb',
    airlineName: 'ফ্লাইদুবাই',
    airlineLogo: airlineLogo.flydubai,
    flightNumber: 'FZ 552 / FZ 815',

    departureAirport: 'হযরত শাহজালাল আন্তর্জাতিক (DAC)',
    arrivalAirport: 'কিং আব্দুল আজিজ আন্তর্জাতিক (JED)',
    departureCity: 'ঢাকা',
    arrivalCity: 'জেদ্দা',

    departureDate: '2026-02-25',
    departureTime: '15:30',
    arrivalDate: '2026-02-26',
    arrivalTime: '02:40',

    transits: [{ airport: 'দুবাই আন্তর্জাতিক (DXB)', city: 'দুবাই', duration: '৩ ঘণ্টা ৪৫ মিনিট' }],
    transitDuration: '৩ ঘণ্টা ৪৫ মিনিট',
    totalDuration: '১৪ ঘণ্টা ১০ মিনিট',

    cabinClass: 'economy',
    baggageAllowance: '২০ কেজি চেকড + ৭ কেজি কেবিন',
    mealInfo: 'হালাল স্ন্যাক (ক্রয়যোগ্য গরম খাবার আপগ্রেড)',

    seatsTotal: 195,
    seatsAvailable: 110,
    bookingStatus: 'open',

    price: 620,
    taxes: 95,
    discount: 30,

    notes: 'বাজেট অপশন। অ্যাডমিনের বিবেচনায় অ্যাড-অন ব্যাগেজ উপলব্ধ।',
    status: 'active',
    featured: false,

    rating: 4.2,
    reviewsCount: 196,
    bookingsCount: 820,
    publishedAt: '2025-11-10',
  },
  {
    id: 'flt-bg-cgp-jed-008',
    slug: 'biman-cgp-jed-bg-7011-via-dac',
    airlineName: 'বিমান বাংলাদেশ এয়ারলাইন্স',
    airlineLogo: airlineLogo.biman,
    flightNumber: 'BG 7011 / BG 1041',

    departureAirport: 'শাহ আমানত আন্তর্জাতিক (CGP)',
    arrivalAirport: 'কিং আব্দুল আজিজ আন্তর্জাতিক (JED)',
    departureCity: 'চট্টগ্রাম',
    arrivalCity: 'জেদ্দা',

    departureDate: '2026-02-15',
    departureTime: '22:10',
    arrivalDate: '2026-02-16',
    arrivalTime: '07:45',

    transits: [{ airport: 'হযরত শাহজালাল আন্তর্জাতিক (DAC)', city: 'ঢাকা', duration: '৩ ঘণ্টা ০৫ মিনিট' }],
    transitDuration: '৩ ঘণ্টা ০৫ মিনিট',
    totalDuration: '১২ ঘণ্টা ৩৫ মিনিট',

    cabinClass: 'economy',
    baggageAllowance: '৩০ কেজি চেকড + ৭ কেজি কেবিন',
    mealInfo: 'দীর্ঘ সেক্টরে গরম হালাল খাবার',

    seatsTotal: 248,
    seatsAvailable: 64,
    bookingStatus: 'open',

    price: 795,
    taxes: 105,
    discount: 0,

    notes: 'সংক্ষিপ্ত DAC ট্রানজিট। একই এয়ারলাইন থ্রু-ফেয়ার।',
    status: 'active',
    featured: false,

    rating: 4.3,
    reviewsCount: 156,
    bookingsCount: 680,
    publishedAt: '2025-11-05',
  },
  {
    id: 'flt-qr-cgp-jed-009',
    slug: 'qatar-cgp-jed-qr-639-via-doh',
    airlineName: 'কাতার এয়ারওয়েজ',
    airlineLogo: airlineLogo.qatar,
    flightNumber: 'QR 639 / QR 1170',

    departureAirport: 'শাহ আমানত আন্তর্জাতিক (CGP)',
    arrivalAirport: 'কিং আব্দুল আজিজ আন্তর্জাতিক (JED)',
    departureCity: 'চট্টগ্রাম',
    arrivalCity: 'জেদ্দা',

    departureDate: '2026-03-05',
    departureTime: '03:35',
    arrivalDate: '2026-03-05',
    arrivalTime: '13:15',

    transits: [{ airport: 'হামাদ আন্তর্জাতিক (DOH)', city: 'দোহা', duration: '২ ঘণ্টা ২৫ মিনিট' }],
    transitDuration: '২ ঘণ্টা ২৫ মিনিট',
    totalDuration: '১২ ঘণ্টা ৪০ মিনিট',

    cabinClass: 'economy-plus',
    baggageAllowance: '৩৫ কেজি চেকড + ১০ কেজি কেবিন',
    mealInfo: 'হালাল গরম খাবার, প্রিমিয়াম পানীয়',

    seatsTotal: 84,
    seatsAvailable: 28,
    bookingStatus: 'open',

    price: 1140,
    taxes: 175,
    discount: 60,

    notes: 'বর্ধিত লেগরুমসহ প্রিমিয়াম ইকোনমি।',
    status: 'active',
    featured: false,

    rating: 4.8,
    reviewsCount: 184,
    bookingsCount: 410,
    publishedAt: '2025-10-25',
  },
  {
    id: 'flt-ek-cgp-jed-010',
    slug: 'emirates-cgp-jed-ek-587-via-dxb',
    airlineName: 'এমিরেটস',
    airlineLogo: airlineLogo.emirates,
    flightNumber: 'EK 587 / EK 803',

    departureAirport: 'শাহ আমানত আন্তর্জাতিক (CGP)',
    arrivalAirport: 'কিং আব্দুল আজিজ আন্তর্জাতিক (JED)',
    departureCity: 'চট্টগ্রাম',
    arrivalCity: 'জেদ্দা',

    departureDate: '2026-04-12',
    departureTime: '23:55',
    arrivalDate: '2026-04-13',
    arrivalTime: '14:35',

    transits: [{ airport: 'দুবাই আন্তর্জাতিক (DXB)', city: 'দুবাই', duration: '৪ ঘণ্টা ১৫ মিনিট' }],
    transitDuration: '৪ ঘণ্টা ১৫ মিনিট',
    totalDuration: '১৭ ঘণ্টা ৪০ মিনিট',

    cabinClass: 'business',
    baggageAllowance: '৪০ কেজি চেকড + ১২ কেজি কেবিন (বিজনেস)',
    mealInfo: 'আ লা কার্টে হালাল ডাইনিং, DXB-এ লাউঞ্জ',

    seatsTotal: 24,
    seatsAvailable: 0,
    bookingStatus: 'soldout',

    price: 2780,
    taxes: 260,
    discount: 0,

    notes: 'DXB হয়ে বিজনেস ক্লাস। বর্তমানে সম্পূর্ণ বিক্রি — ওয়েটলিস্ট উপলব্ধ।',
    status: 'active',
    featured: false,

    rating: 4.9,
    reviewsCount: 92,
    bookingsCount: 218,
    publishedAt: '2025-09-15',
  },
  {
    id: 'flt-tk-dac-jed-011',
    slug: 'turkish-dac-jed-tk-713-via-ist',
    airlineName: 'টার্কিশ এয়ারলাইন্স',
    airlineLogo: airlineLogo.turkish,
    flightNumber: 'TK 713 / TK 84',

    departureAirport: 'হযরত শাহজালাল আন্তর্জাতিক (DAC)',
    arrivalAirport: 'কিং আব্দুল আজিজ আন্তর্জাতিক (JED)',
    departureCity: 'ঢাকা',
    arrivalCity: 'জেদ্দা',

    departureDate: '2026-05-10',
    departureTime: '09:40',
    arrivalDate: '2026-05-10',
    arrivalTime: '18:15',

    transits: [{ airport: 'ইস্তাম্বুল বিমানবন্দর (IST)', city: 'ইস্তাম্বুল', duration: '২ ঘণ্টা ৪০ মিনিট' }],
    transitDuration: '২ ঘণ্টা ৪০ মিনিট',
    totalDuration: '১১ ঘণ্টা ৩৫ মিনিট',

    cabinClass: 'first',
    baggageAllowance: '৫০ কেজি চেকড + ১৫ কেজি কেবিন (ফার্স্ট)',
    mealInfo: 'অনবোর্ড শেফ, আ লা কার্টে, প্রাইভেট স্যুট',

    seatsTotal: 8,
    seatsAvailable: 8,
    bookingStatus: 'open',

    price: 4250,
    taxes: 320,
    discount: 0,

    notes: 'ফার্স্ট ক্লাস — ডিফল্টরূপে ভিআইপি হজ্জ প্যাকেজের জন্য একচেটিয়াভাবে বুক করা।',
    status: 'inactive',
    featured: false,

    rating: 5.0,
    reviewsCount: 18,
    bookingsCount: 42,
    publishedAt: '2025-11-12',
  },
]

export const getFlight = (slug: string) => flights.find(f => f.slug === slug)
export const getFlightById = (id: string) => flights.find(f => f.id === id)
export const getActiveFlights = () => flights.filter(f => f.status === 'active')
export const getFeaturedFlights = () => flights.filter(f => f.featured && f.status === 'active')
export const getFlightsByRoute = (from: string, to: string) =>
  flights.filter(f => f.departureCity === from && f.arrivalCity === to)

export const FLIGHT_AIRLINES = [
  'বিমান বাংলাদেশ এয়ারলাইন্স',
  'সৌদিয়া',
  'এমিরেটস',
  'কাতার এয়ারওয়েজ',
  'টার্কিশ এয়ারলাইন্স',
  'ফ্লাইদুবাই',
] as const

export const FLIGHT_CITIES = ['ঢাকা', 'চট্টগ্রাম', 'জেদ্দা', 'মদিনা'] as const

export const flightTotal = (f: Flight) => f.price + f.taxes - f.discount
