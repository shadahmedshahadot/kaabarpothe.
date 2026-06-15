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
    airlineName: 'Biman Bangladesh Airlines',
    airlineLogo: airlineLogo.biman,
    flightNumber: 'BG 1041',

    departureAirport: 'Hazrat Shahjalal International (DAC)',
    arrivalAirport: 'King Abdulaziz International (JED)',
    departureCity: 'Dhaka',
    arrivalCity: 'Jeddah',

    departureDate: '2026-02-15',
    departureTime: '02:30',
    arrivalDate: '2026-02-15',
    arrivalTime: '07:45',

    transits: [],
    transitDuration: 'Non-stop',
    totalDuration: '8h 15m',

    cabinClass: 'economy',
    baggageAllowance: '30 kg checked + 7 kg cabin',
    mealInfo: 'Hot halal meal + beverages',

    seatsTotal: 290,
    seatsAvailable: 84,
    bookingStatus: 'open',

    price: 745,
    taxes: 95,
    discount: 0,

    notes: 'Dedicated Umrah season service. Onboard prayer times announced.',
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
    airlineName: 'Saudia',
    airlineLogo: airlineLogo.saudia,
    flightNumber: 'SV 805',

    departureAirport: 'Hazrat Shahjalal International (DAC)',
    arrivalAirport: 'King Abdulaziz International (JED)',
    departureCity: 'Dhaka',
    arrivalCity: 'Jeddah',

    departureDate: '2026-02-15',
    departureTime: '06:15',
    arrivalDate: '2026-02-15',
    arrivalTime: '11:20',

    transits: [],
    transitDuration: 'Non-stop',
    totalDuration: '8h 05m',

    cabinClass: 'economy',
    baggageAllowance: '46 kg checked (2 × 23kg) + 7 kg cabin',
    mealInfo: 'Halal meal, dates, Arabic coffee',

    seatsTotal: 320,
    seatsAvailable: 38,
    bookingStatus: 'open',

    price: 829,
    taxes: 110,
    discount: 40,

    notes: 'Best on-time performance. Direct service preferred by groups.',
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
    airlineName: 'Emirates',
    airlineLogo: airlineLogo.emirates,
    flightNumber: 'EK 585 / EK 803',

    departureAirport: 'Hazrat Shahjalal International (DAC)',
    arrivalAirport: 'King Abdulaziz International (JED)',
    departureCity: 'Dhaka',
    arrivalCity: 'Jeddah',

    departureDate: '2026-02-16',
    departureTime: '04:50',
    arrivalDate: '2026-02-16',
    arrivalTime: '14:35',

    transits: [{ airport: 'Dubai International (DXB)', city: 'Dubai', duration: '2h 10m' }],
    transitDuration: '2h 10m',
    totalDuration: '12h 45m',

    cabinClass: 'economy-plus',
    baggageAllowance: '35 kg checked + 7 kg cabin',
    mealInfo: 'Two halal meals, regional menu, ice entertainment',

    seatsTotal: 360,
    seatsAvailable: 142,
    bookingStatus: 'open',

    price: 985,
    taxes: 165,
    discount: 0,

    notes: 'Single transit via DXB. Same-terminal connection.',
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
    airlineName: 'Qatar Airways',
    airlineLogo: airlineLogo.qatar,
    flightNumber: 'QR 635 / QR 1170',

    departureAirport: 'Hazrat Shahjalal International (DAC)',
    arrivalAirport: 'King Abdulaziz International (JED)',
    departureCity: 'Dhaka',
    arrivalCity: 'Jeddah',

    departureDate: '2026-03-01',
    departureTime: '01:20',
    arrivalDate: '2026-03-01',
    arrivalTime: '10:05',

    transits: [{ airport: 'Hamad International (DOH)', city: 'Doha', duration: '1h 50m' }],
    transitDuration: '1h 50m',
    totalDuration: '11h 45m',

    cabinClass: 'business',
    baggageAllowance: '40 kg checked + 12 kg cabin (Business)',
    mealInfo: 'A la carte halal dining, lounge access in DOH',

    seatsTotal: 32,
    seatsAvailable: 6,
    bookingStatus: 'open',

    price: 2480,
    taxes: 240,
    discount: 100,

    notes: 'Business cabin with lie-flat seats. Lounge access included.',
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
    airlineName: 'Turkish Airlines',
    airlineLogo: airlineLogo.turkish,
    flightNumber: 'TK 713 / TK 100',

    departureAirport: 'Hazrat Shahjalal International (DAC)',
    arrivalAirport: 'Prince Mohammad Bin Abdulaziz (MED)',
    departureCity: 'Dhaka',
    arrivalCity: 'Madinah',

    departureDate: '2026-02-20',
    departureTime: '09:40',
    arrivalDate: '2026-02-20',
    arrivalTime: '20:25',

    transits: [{ airport: 'Istanbul Airport (IST)', city: 'Istanbul', duration: '3h 05m' }],
    transitDuration: '3h 05m',
    totalDuration: '13h 45m',

    cabinClass: 'economy',
    baggageAllowance: '30 kg checked + 8 kg cabin',
    mealInfo: 'Two halal meals, Turkish hospitality',

    seatsTotal: 280,
    seatsAvailable: 96,
    bookingStatus: 'open',

    price: 895,
    taxes: 140,
    discount: 50,

    notes: 'Direct to Madinah — saves Jeddah-Madinah ground transfer.',
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
    airlineName: 'Saudia',
    airlineLogo: airlineLogo.saudia,
    flightNumber: 'SV 803',

    departureAirport: 'Hazrat Shahjalal International (DAC)',
    arrivalAirport: 'Prince Mohammad Bin Abdulaziz (MED)',
    departureCity: 'Dhaka',
    arrivalCity: 'Madinah',

    departureDate: '2026-03-10',
    departureTime: '23:55',
    arrivalDate: '2026-03-11',
    arrivalTime: '05:30',

    transits: [],
    transitDuration: 'Non-stop',
    totalDuration: '8h 35m',

    cabinClass: 'economy',
    baggageAllowance: '46 kg checked (2 × 23kg) + 7 kg cabin',
    mealInfo: 'Halal meal, dates, Zamzam water',

    seatsTotal: 300,
    seatsAvailable: 12,
    bookingStatus: 'open',

    price: 875,
    taxes: 115,
    discount: 0,

    notes: 'Only non-stop Dhaka → Madinah. Books out fast during Umrah season.',
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
    airlineName: 'Flydubai',
    airlineLogo: airlineLogo.flydubai,
    flightNumber: 'FZ 552 / FZ 815',

    departureAirport: 'Hazrat Shahjalal International (DAC)',
    arrivalAirport: 'King Abdulaziz International (JED)',
    departureCity: 'Dhaka',
    arrivalCity: 'Jeddah',

    departureDate: '2026-02-25',
    departureTime: '15:30',
    arrivalDate: '2026-02-26',
    arrivalTime: '02:40',

    transits: [{ airport: 'Dubai International (DXB)', city: 'Dubai', duration: '3h 45m' }],
    transitDuration: '3h 45m',
    totalDuration: '14h 10m',

    cabinClass: 'economy',
    baggageAllowance: '20 kg checked + 7 kg cabin',
    mealInfo: 'Halal snack (purchasable hot meal upgrade)',

    seatsTotal: 195,
    seatsAvailable: 110,
    bookingStatus: 'open',

    price: 620,
    taxes: 95,
    discount: 30,

    notes: 'Budget option. Add-on baggage available at admin discretion.',
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
    airlineName: 'Biman Bangladesh Airlines',
    airlineLogo: airlineLogo.biman,
    flightNumber: 'BG 7011 / BG 1041',

    departureAirport: 'Shah Amanat International (CGP)',
    arrivalAirport: 'King Abdulaziz International (JED)',
    departureCity: 'Chattogram',
    arrivalCity: 'Jeddah',

    departureDate: '2026-02-15',
    departureTime: '22:10',
    arrivalDate: '2026-02-16',
    arrivalTime: '07:45',

    transits: [{ airport: 'Hazrat Shahjalal International (DAC)', city: 'Dhaka', duration: '3h 05m' }],
    transitDuration: '3h 05m',
    totalDuration: '12h 35m',

    cabinClass: 'economy',
    baggageAllowance: '30 kg checked + 7 kg cabin',
    mealInfo: 'Hot halal meal on long sector',

    seatsTotal: 248,
    seatsAvailable: 64,
    bookingStatus: 'open',

    price: 795,
    taxes: 105,
    discount: 0,

    notes: 'Short DAC transit. Same airline through-fare.',
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
    airlineName: 'Qatar Airways',
    airlineLogo: airlineLogo.qatar,
    flightNumber: 'QR 639 / QR 1170',

    departureAirport: 'Shah Amanat International (CGP)',
    arrivalAirport: 'King Abdulaziz International (JED)',
    departureCity: 'Chattogram',
    arrivalCity: 'Jeddah',

    departureDate: '2026-03-05',
    departureTime: '03:35',
    arrivalDate: '2026-03-05',
    arrivalTime: '13:15',

    transits: [{ airport: 'Hamad International (DOH)', city: 'Doha', duration: '2h 25m' }],
    transitDuration: '2h 25m',
    totalDuration: '12h 40m',

    cabinClass: 'economy-plus',
    baggageAllowance: '35 kg checked + 10 kg cabin',
    mealInfo: 'Halal hot meal, premium beverages',

    seatsTotal: 84,
    seatsAvailable: 28,
    bookingStatus: 'open',

    price: 1140,
    taxes: 175,
    discount: 60,

    notes: 'Premium Economy with extended legroom.',
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
    airlineName: 'Emirates',
    airlineLogo: airlineLogo.emirates,
    flightNumber: 'EK 587 / EK 803',

    departureAirport: 'Shah Amanat International (CGP)',
    arrivalAirport: 'King Abdulaziz International (JED)',
    departureCity: 'Chattogram',
    arrivalCity: 'Jeddah',

    departureDate: '2026-04-12',
    departureTime: '23:55',
    arrivalDate: '2026-04-13',
    arrivalTime: '14:35',

    transits: [{ airport: 'Dubai International (DXB)', city: 'Dubai', duration: '4h 15m' }],
    transitDuration: '4h 15m',
    totalDuration: '17h 40m',

    cabinClass: 'business',
    baggageAllowance: '40 kg checked + 12 kg cabin (Business)',
    mealInfo: 'À la carte halal dining, lounge in DXB',

    seatsTotal: 24,
    seatsAvailable: 0,
    bookingStatus: 'soldout',

    price: 2780,
    taxes: 260,
    discount: 0,

    notes: 'Business class via DXB. Currently sold out — waitlist available.',
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
    airlineName: 'Turkish Airlines',
    airlineLogo: airlineLogo.turkish,
    flightNumber: 'TK 713 / TK 84',

    departureAirport: 'Hazrat Shahjalal International (DAC)',
    arrivalAirport: 'King Abdulaziz International (JED)',
    departureCity: 'Dhaka',
    arrivalCity: 'Jeddah',

    departureDate: '2026-05-10',
    departureTime: '09:40',
    arrivalDate: '2026-05-10',
    arrivalTime: '18:15',

    transits: [{ airport: 'Istanbul Airport (IST)', city: 'Istanbul', duration: '2h 40m' }],
    transitDuration: '2h 40m',
    totalDuration: '11h 35m',

    cabinClass: 'first',
    baggageAllowance: '50 kg checked + 15 kg cabin (First)',
    mealInfo: 'Onboard chef, à la carte, private suite',

    seatsTotal: 8,
    seatsAvailable: 8,
    bookingStatus: 'open',

    price: 4250,
    taxes: 320,
    discount: 0,

    notes: 'First class — booked exclusively for VIP Hajj package by default.',
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
  'Biman Bangladesh Airlines',
  'Saudia',
  'Emirates',
  'Qatar Airways',
  'Turkish Airlines',
  'Flydubai',
] as const

export const FLIGHT_CITIES = ['Dhaka', 'Chattogram', 'Jeddah', 'Madinah'] as const

export const flightTotal = (f: Flight) => f.price + f.taxes - f.discount
