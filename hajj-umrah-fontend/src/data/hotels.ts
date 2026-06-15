import { IMG } from './images'

export type HotelCategory = 3 | 4 | 5
export type HotelStatus = 'active' | 'inactive'
export type RoomBoard = 'room-only' | 'breakfast' | 'half-board' | 'full-board'

export interface HotelRoomType {
  id: string
  name: string
  capacity: number
  pricePerNight: number
  available: number
  board: RoomBoard
}

export interface Hotel {
  id: string
  slug: string
  name: string
  category: HotelCategory
  city: 'Makkah' | 'Madinah'
  country: 'Saudi Arabia'
  address: string
  distanceFromHaram: string
  images: string[]
  cover: string
  description: string
  facilities: string[]
  meals: string
  checkInDate: string
  checkOutDate: string
  totalRooms: number
  pricePerNight: number
  roomTypes: HotelRoomType[]
  rating: number
  reviewsCount: number
  bookingsCount: number
  status: HotelStatus
  featured: boolean
  notes: string
}

export const hotels: Hotel[] = [
  {
    id: 'htl-mkk-001',
    slug: 'hilton-suites-makkah',
    name: 'হিলটন স্যুটস মক্কা',
    category: 4,
    city: 'Makkah',
    country: 'Saudi Arabia',
    address: 'জাবাল ওমর, ইব্রাহিম আল খলিল রোড, মক্কা ২৪২৩১',
    distanceFromHaram: 'হারাম থেকে ৪০০ মিটার হাঁটা',
    images: [IMG.kaabaClockTower, IMG.kaabaDayMinarets, IMG.haramAerial, IMG.kaabaDayCrowd],
    cover: IMG.kaabaClockTower,
    description:
      'মসজিদুল হারামের ৫-মিনিট হাঁটার দূরত্বে আধুনিক ৪-তারকা স্যুট। প্রশস্ত রুম, নামাজ-বান্ধব সুবিধা এবং ২৪/৭ বহুভাষিক কনসিয়ার্জ।',
    facilities: ['ফ্রি ওয়াই-ফাই', 'রুমে জায়নামাজ', '২৪/৭ রিসেপশন', 'হালাল রেস্তোরাঁ', 'কিবলা দিক', 'ইস্ত্রি সেবা', 'দৈনিক হাউসকিপিং', 'বিমানবন্দর স্থানান্তর (অর্থপ্রদেয়)'],
    meals: 'নাশতা বুফে অন্তর্ভুক্ত · দুপুর ও রাতের খাবার উপলব্ধ',
    checkInDate: '2026-02-15',
    checkOutDate: '2026-02-22',
    totalRooms: 220,
    pricePerNight: 165,
    roomTypes: [
      { id: 'rt-001', name: 'স্ট্যান্ডার্ড টুইন', capacity: 2, pricePerNight: 165, available: 28, board: 'breakfast' },
      { id: 'rt-002', name: 'ফ্যামিলি স্যুট', capacity: 4, pricePerNight: 245, available: 12, board: 'half-board' },
      { id: 'rt-003', name: 'হারাম-ভিউ ডিলাক্স', capacity: 2, pricePerNight: 320, available: 6, board: 'half-board' },
    ],
    rating: 4.7,
    reviewsCount: 1280,
    bookingsCount: 5420,
    status: 'active',
    featured: true,
    notes: 'উমরাহ গ্রুপগুলির জন্য শীর্ষ-রেটেড ৪-তারকা পছন্দ। গ্রুপ রেট উপলব্ধ।',
  },
  {
    id: 'htl-mkk-002',
    slug: 'fairmont-makkah-clock-tower',
    name: 'ফেয়ারমন্ট মক্কা ক্লক রয়্যাল টাওয়ার',
    category: 5,
    city: 'Makkah',
    country: 'Saudi Arabia',
    address: 'আবরাজ আল বাইত কমপ্লেক্স, কিং আব্দুল আজিজ এনডাওমেন্ট',
    distanceFromHaram: 'হারামের সংলগ্ন (ক্লক টাওয়ার)',
    images: [IMG.kaabaNightKiswa, IMG.kaabaNightHaram, IMG.kaabaCloseDoor, IMG.kaabaNightFamily],
    cover: IMG.kaabaNightKiswa,
    description:
      'ক্লক টাওয়ারের ভিতরে আইকনিক ৫-তারকা লাক্সারি। সরাসরি হারাম ভিউ, বাটলার সেবা এবং মক্কার সবচেয়ে মর্যাদাপূর্ণ ঠিকানা।',
    facilities: ['সরাসরি হারাম ভিউ', 'বাটলার সেবা', 'প্রিমিয়াম নামাজ রুম', 'স্পা', 'ফাইন ডাইনিং (হালাল)', '২৪/৭ কনসিয়ার্জ', 'ভ্যালেট পার্কিং', 'লিমুজিন সেবা'],
    meals: 'আ লা কার্টে ফাইন ডাইনিং, ২৪/৭ ইন-রুম ডাইনিং',
    checkInDate: '2026-02-15',
    checkOutDate: '2026-02-22',
    totalRooms: 858,
    pricePerNight: 520,
    roomTypes: [
      { id: 'rt-010', name: 'প্রিমিয়ার রুম (সিটি ভিউ)', capacity: 2, pricePerNight: 520, available: 18, board: 'breakfast' },
      { id: 'rt-011', name: 'হারাম-ভিউ স্যুট', capacity: 2, pricePerNight: 780, available: 9, board: 'half-board' },
      { id: 'rt-012', name: 'রয়্যাল ফ্যামিলি স্যুট', capacity: 6, pricePerNight: 1450, available: 3, board: 'full-board' },
    ],
    rating: 4.9,
    reviewsCount: 2840,
    bookingsCount: 4180,
    status: 'active',
    featured: true,
    notes: 'ডিফল্টরূপে ভিআইপি ও লাক্সারি প্যাকেজে একচেটিয়াভাবে বুক করা হয়।',
  },
  {
    id: 'htl-mkk-003',
    slug: 'dar-al-eiman-royal',
    name: 'দার আল ঈমান রয়্যাল',
    category: 3,
    city: 'Makkah',
    country: 'Saudi Arabia',
    address: 'ইব্রাহিম আল খলিল রোড, মক্কা',
    distanceFromHaram: 'হারাম থেকে ৮৫০ মিটার হাঁটা',
    images: [IMG.haramAerial, IMG.kaabaIhramDay, IMG.kaabaDayCrowd],
    cover: IMG.haramAerial,
    description:
      'বাজেট উমরাহ গ্রুপগুলির কাছে জনপ্রিয় পরিষ্কার, সাশ্রয়ী ৩-তারকা হোটেল। প্রতি ৩০ মিনিটে হারামে শাটল সেবা।',
    facilities: ['ফ্রি হারাম শাটল', 'জায়নামাজ', 'হালাল রেস্তোরাঁ', '২৪/৭ রিসেপশন', 'লবিতে ফ্রি ওয়াই-ফাই', 'গ্রুপ রেট'],
    meals: 'নাশতা ও রাতের খাবার বুফে',
    checkInDate: '2026-02-15',
    checkOutDate: '2026-02-22',
    totalRooms: 320,
    pricePerNight: 78,
    roomTypes: [
      { id: 'rt-020', name: 'কোয়াড শেয়ার', capacity: 4, pricePerNight: 78, available: 64, board: 'half-board' },
      { id: 'rt-021', name: 'ট্রিপল শেয়ার', capacity: 3, pricePerNight: 95, available: 42, board: 'half-board' },
      { id: 'rt-022', name: 'ডাবল রুম', capacity: 2, pricePerNight: 120, available: 26, board: 'half-board' },
    ],
    rating: 4.3,
    reviewsCount: 980,
    bookingsCount: 8240,
    status: 'active',
    featured: false,
    notes: 'ইকোনমি/বাজেট প্যাকেজের জন্য ডিফল্ট। উচ্চ ভলিউম।',
  },
  {
    id: 'htl-med-001',
    slug: 'pullman-zamzam-madinah',
    name: 'পুলম্যান জমজম মদিনা',
    category: 4,
    city: 'Madinah',
    country: 'Saudi Arabia',
    address: 'কিং ফয়সাল রোড, কেন্দ্রীয় মদিনা, মসজিদে নববীর কাছে',
    distanceFromHaram: 'মসজিদে নববী থেকে ১৮০ মিটার',
    images: [IMG.greenDomeMinarets, IMG.nabawiUmbrellaGolden, IMG.nabawiDay, IMG.greenDomeClose],
    cover: IMG.greenDomeMinarets,
    description:
      'রওজা থেকে কয়েক মিনিট দূরে প্রিমিয়াম ৪-তারকা সম্পত্তি। প্রশস্ত রুম, প্রচুর বুফে এবং চমৎকার গ্রুপ সুবিধা।',
    facilities: ['সরাসরি নববী অ্যাক্সেস', 'গ্রুপ মিটিং হল', 'নামাজের আজান সম্প্রচার', 'হালাল বুফে', 'হুইলচেয়ার অ্যাক্সেস', 'কনসিয়ার্জ', 'বহুভাষিক স্টাফ'],
    meals: 'হাফ-বোর্ড বুফে (নাশতা + রাতের খাবার)',
    checkInDate: '2026-02-22',
    checkOutDate: '2026-02-28',
    totalRooms: 410,
    pricePerNight: 195,
    roomTypes: [
      { id: 'rt-030', name: 'ট্রিপল শেয়ার', capacity: 3, pricePerNight: 195, available: 36, board: 'half-board' },
      { id: 'rt-031', name: 'ডাবল ডিলাক্স', capacity: 2, pricePerNight: 245, available: 22, board: 'half-board' },
      { id: 'rt-032', name: 'ফ্যামিলি স্যুট (৪ জন)', capacity: 4, pricePerNight: 365, available: 8, board: 'full-board' },
    ],
    rating: 4.7,
    reviewsCount: 1620,
    bookingsCount: 6240,
    status: 'active',
    featured: true,
    notes: 'স্ট্যান্ডার্ড ও প্রিমিয়াম টিয়ার জুড়ে সর্বাধিক বুক করা মদিনা হোটেল।',
  },
  {
    id: 'htl-med-002',
    slug: 'the-oberoi-madinah',
    name: 'দ্য ওবেরয় মদিনা',
    category: 5,
    city: 'Madinah',
    country: 'Saudi Arabia',
    address: 'খালিদ বিন আল ওয়ালিদ রোড, কেন্দ্রীয় মদিনা',
    distanceFromHaram: 'মসজিদে নববী থেকে ১২০ মিটার',
    images: [IMG.greenDomeClose, IMG.greenDomeStarFrame, IMG.nabawiNight, IMG.nabawiCoupleArches],
    cover: IMG.greenDomeClose,
    description:
      'নববী-ভিউ স্যুটসহ অতি-লাক্সারি ৫-তারকা হোটেল। বাটলার সেবা, আ লা কার্টে ডাইনিং এবং একটি প্রশান্ত ইবাদত-কেন্দ্রিক পরিবেশ।',
    facilities: ['নববী-ভিউ স্যুট', 'বাটলার সেবা', 'স্পা', 'ফাইন হালাল ডাইনিং', 'প্রিমিয়াম নামাজ রুম', 'ভ্যালেট', '২৪/৭ ইন-রুম ডাইনিং', 'লিমো বিমানবন্দর স্থানান্তর'],
    meals: 'ফুল-বোর্ড আ লা কার্টে',
    checkInDate: '2026-02-22',
    checkOutDate: '2026-02-28',
    totalRooms: 142,
    pricePerNight: 480,
    roomTypes: [
      { id: 'rt-040', name: 'ডিলাক্স রুম', capacity: 2, pricePerNight: 480, available: 14, board: 'breakfast' },
      { id: 'rt-041', name: 'নববী-ভিউ স্যুট', capacity: 2, pricePerNight: 720, available: 6, board: 'half-board' },
      { id: 'rt-042', name: 'রয়্যাল স্যুট (৪ জন)', capacity: 4, pricePerNight: 1280, available: 2, board: 'full-board' },
    ],
    rating: 4.9,
    reviewsCount: 720,
    bookingsCount: 1840,
    status: 'active',
    featured: true,
    notes: 'প্রিমিয়াম / ভিআইপি / লাক্সারি প্যাকেজ ডিফল্ট।',
  },
  {
    id: 'htl-med-003',
    slug: 'olayan-al-madinah',
    name: 'ওলায়ান আল মদিনা',
    category: 3,
    city: 'Madinah',
    country: 'Saudi Arabia',
    address: 'কেন্দ্রীয় মদিনা, বাব আল সালামের কাছে',
    distanceFromHaram: 'মসজিদে নববী থেকে ৪৫০ মিটার',
    images: [IMG.nabawiDay, IMG.nabawiUmbrellas, IMG.nabawiInterior],
    cover: IMG.nabawiDay,
    description:
      'বাজেট হাজীদের জন্য সাশ্রয়ী ৩-তারকা হোটেল। পরিষ্কার রুম, নাশতা অন্তর্ভুক্ত, মসজিদে নববীতে হাঁটার দূরত্ব।',
    facilities: ['ফ্রি ওয়াই-ফাই', 'হালাল নাশতা', '২৪/৭ রিসেপশন', 'গ্রুপ রেট', 'বহুভাষিক স্টাফ', 'লন্ড্রি (অর্থপ্রদেয়)'],
    meals: 'শুধুমাত্র নাশতা',
    checkInDate: '2026-02-22',
    checkOutDate: '2026-02-28',
    totalRooms: 280,
    pricePerNight: 65,
    roomTypes: [
      { id: 'rt-050', name: 'কোয়াড শেয়ার', capacity: 4, pricePerNight: 65, available: 52, board: 'breakfast' },
      { id: 'rt-051', name: 'ট্রিপল শেয়ার', capacity: 3, pricePerNight: 82, available: 38, board: 'breakfast' },
      { id: 'rt-052', name: 'ডাবল রুম', capacity: 2, pricePerNight: 110, available: 24, board: 'breakfast' },
    ],
    rating: 4.2,
    reviewsCount: 640,
    bookingsCount: 4380,
    status: 'active',
    featured: false,
    notes: 'ইকোনমি হজ্জ ও বাজেট উমরাহর জন্য ডিফল্ট।',
  },
]

export const getHotel = (slug: string) => hotels.find(h => h.slug === slug)
export const getHotelById = (id: string) => hotels.find(h => h.id === id)
export const getActiveHotels = () => hotels.filter(h => h.status === 'active')
export const getFeaturedHotels = () => hotels.filter(h => h.featured && h.status === 'active')
export const getHotelsByCity = (city: Hotel['city']) => hotels.filter(h => h.city === city)

export const hotelNights = (h: Hotel) => {
  const a = new Date(h.checkInDate).getTime()
  const b = new Date(h.checkOutDate).getTime()
  return Math.max(1, Math.round((b - a) / 86_400_000))
}

export const hotelTotal = (h: Hotel, nights = hotelNights(h)) => h.pricePerNight * nights
