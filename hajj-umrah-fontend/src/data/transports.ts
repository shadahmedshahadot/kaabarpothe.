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
    name: 'Jeddah Airport → Makkah Hotel (Private Sedan)',
    type: 'airport-transfer',
    vehicleType: 'sedan',
    capacity: 3,
    images: [IMG.haramAerial, IMG.kaabaClockTower],
    cover: IMG.haramAerial,
    pickupLocation: 'King Abdulaziz International Airport (JED)',
    dropoffLocation: 'Any Makkah hotel within 5km of Haram',
    routeDetails: 'JED Terminal 1 / Hajj Terminal → Makkah city limits → drop-off at hotel lobby',
    serviceCoverage: ['Jeddah Airport pickup', 'All Makkah hotels', 'Door-to-door service', '24/7 availability'],
    driverName: 'Saudi-licensed driver',
    driverContact: '+966 50 000 0001',
    travelDuration: '~1h 15m',
    price: 75,
    pricingUnit: 'per-vehicle',
    availability: 'available',
    status: 'active',
    featured: true,
    rating: 4.8,
    reviewsCount: 1240,
    bookingsCount: 8420,
    notes: 'Includes 60 minutes free wait time and meet-and-greet at arrivals.',
  },
  {
    id: 'trn-002',
    slug: 'makkah-hotel-to-madinah-hotel-coach',
    name: 'Makkah Hotel → Madinah Hotel (Luxury Coach)',
    type: 'intercity',
    vehicleType: 'luxury-coach',
    capacity: 45,
    images: [IMG.nabawiUmbrellas, IMG.pilgrimsWalking],
    cover: IMG.nabawiUmbrellas,
    pickupLocation: 'Any Makkah hotel',
    dropoffLocation: 'Any Madinah hotel',
    routeDetails: 'Makkah → Highway 15 → Madinah city → hotel drop-off. One refreshment stop included.',
    serviceCoverage: ['All Makkah hotels', 'All Madinah hotels', 'Highway 15 route', 'Water and snack stop'],
    driverName: 'Group operator team',
    driverContact: '+966 50 000 0002',
    travelDuration: '~5h 30m',
    price: 38,
    pricingUnit: 'per-person',
    availability: 'available',
    status: 'active',
    featured: true,
    rating: 4.6,
    reviewsCount: 980,
    bookingsCount: 12_400,
    notes: 'Coach departs daily at 09:00, 14:00, and 21:00. Group rates available.',
  },
  {
    id: 'trn-003',
    slug: 'madinah-hotel-to-madinah-airport',
    name: 'Madinah Hotel → Madinah Airport (Private SUV)',
    type: 'airport-transfer',
    vehicleType: 'suv',
    capacity: 5,
    images: [IMG.greenDomeMinarets],
    cover: IMG.greenDomeMinarets,
    pickupLocation: 'Any Madinah hotel',
    dropoffLocation: 'Prince Mohammad Bin Abdulaziz International (MED)',
    routeDetails: 'Hotel lobby → Madinah ring road → MED departures terminal',
    serviceCoverage: ['All Madinah hotels', 'MED airport drop'],
    driverName: 'Saudi-licensed driver',
    driverContact: '+966 50 000 0003',
    travelDuration: '~35m',
    price: 55,
    pricingUnit: 'per-vehicle',
    availability: 'available',
    status: 'active',
    featured: false,
    rating: 4.7,
    reviewsCount: 540,
    bookingsCount: 3120,
    notes: 'Schedule pickup 3 hours before international departure.',
  },
  {
    id: 'trn-004',
    slug: 'makkah-haram-shuttle',
    name: 'Makkah Hotel ↔ Haram Shuttle (24/7)',
    type: 'haram-shuttle',
    vehicleType: 'minivan',
    capacity: 12,
    images: [IMG.kaabaDayCrowd, IMG.haramAerial],
    cover: IMG.kaabaDayCrowd,
    pickupLocation: 'Designated Makkah hotel lobbies',
    dropoffLocation: 'Masjid al-Haram (Bab al-Salam)',
    routeDetails: 'Continuous loop service. Pickup every 20 minutes between 04:00 and 00:00.',
    serviceCoverage: ['Partner hotels in Aziziyah, Jabal Omar, Misfalah', 'Bab al-Salam drop-off'],
    driverName: 'Shuttle team',
    driverContact: '+966 50 000 0004',
    travelDuration: '~10m per leg',
    price: 12,
    pricingUnit: 'per-person',
    availability: 'available',
    status: 'active',
    featured: true,
    rating: 4.5,
    reviewsCount: 1820,
    bookingsCount: 24_600,
    notes: 'Daily unlimited rides per person. Most-purchased add-on for Budget/Economy packages.',
  },
  {
    id: 'trn-005',
    slug: 'madinah-haram-shuttle',
    name: 'Madinah Hotel ↔ Masjid Nabawi Shuttle',
    type: 'haram-shuttle',
    vehicleType: 'minivan',
    capacity: 12,
    images: [IMG.nabawiUmbrellaGolden, IMG.nabawiDay],
    cover: IMG.nabawiUmbrellaGolden,
    pickupLocation: 'Designated Madinah hotel lobbies',
    dropoffLocation: 'Masjid an-Nabawi (Bab al-Salam)',
    routeDetails: 'Continuous loop service. Pickup every 25 minutes between 03:30 and 23:30.',
    serviceCoverage: ['Partner hotels within 1km of Nabawi', 'Bab al-Salam drop-off'],
    driverName: 'Shuttle team',
    driverContact: '+966 50 000 0005',
    travelDuration: '~7m per leg',
    price: 10,
    pricingUnit: 'per-person',
    availability: 'available',
    status: 'active',
    featured: false,
    rating: 4.4,
    reviewsCount: 980,
    bookingsCount: 14_200,
    notes: 'Includes elderly/wheelchair-friendly van every 2nd run.',
  },
  {
    id: 'trn-006',
    slug: 'makkah-ziyarah-tour',
    name: 'Makkah Ziyarah Tour (Half Day, AC Coach)',
    type: 'ziyarah-tour',
    vehicleType: 'coach',
    capacity: 35,
    images: [IMG.kaabaIhramDay, IMG.haramAerial],
    cover: IMG.kaabaIhramDay,
    pickupLocation: 'Makkah hotel (Jabal Omar / Aziziyah area)',
    dropoffLocation: 'Return to pickup hotel',
    routeDetails: 'Jabal al-Nour (Cave of Hira) → Jabal Thawr → Masjid al-Jin → Masjid Aisha (Tan\'eem) → return',
    serviceCoverage: ['Jabal al-Nour', 'Jabal Thawr', 'Masjid al-Jin', "Masjid Aisha (Tan'eem)"],
    driverName: 'Driver + English/Arabic guide',
    driverContact: '+966 50 000 0006',
    travelDuration: '~4h 30m',
    price: 28,
    pricingUnit: 'per-person',
    availability: 'available',
    status: 'active',
    featured: true,
    rating: 4.7,
    reviewsCount: 1340,
    bookingsCount: 6280,
    notes: 'Departures at 09:00 and 14:00 daily. Includes bottled water.',
  },
  {
    id: 'trn-007',
    slug: 'madinah-ziyarah-tour',
    name: 'Madinah Ziyarah Tour (Half Day, AC Coach)',
    type: 'ziyarah-tour',
    vehicleType: 'coach',
    capacity: 35,
    images: [IMG.greenDomeStarFrame, IMG.nabawiUmbrellaSky],
    cover: IMG.greenDomeStarFrame,
    pickupLocation: 'Madinah hotel (central area)',
    dropoffLocation: 'Return to pickup hotel',
    routeDetails: 'Quba Mosque → Masjid al-Qiblatain → Mount Uhud (Martyrs) → Seven Mosques → Date farms → return',
    serviceCoverage: ['Quba Mosque', 'Masjid al-Qiblatain', 'Mount Uhud & martyrs', 'Seven Mosques', 'Date farms'],
    driverName: 'Driver + English/Arabic/Urdu guide',
    driverContact: '+966 50 000 0007',
    travelDuration: '~5h',
    price: 26,
    pricingUnit: 'per-person',
    availability: 'available',
    status: 'active',
    featured: true,
    rating: 4.8,
    reviewsCount: 1620,
    bookingsCount: 7180,
    notes: 'Departures at 09:00 and 15:00 daily.',
  },
  {
    id: 'trn-008',
    slug: 'mercedes-v-class-vip-day-rental',
    name: 'Mercedes V-Class — VIP Day Rental (Makkah/Madinah)',
    type: 'private-hire',
    vehicleType: 'mercedes-v-class',
    capacity: 6,
    images: [IMG.kaabaClockTower, IMG.kaabaNightKiswa],
    cover: IMG.kaabaClockTower,
    pickupLocation: 'Anywhere in Makkah or Madinah',
    dropoffLocation: 'Custom itinerary',
    routeDetails: 'Up to 10 hours of private chauffeured Mercedes V-Class service. Driver waits, multi-stop allowed.',
    serviceCoverage: ['Makkah city', 'Madinah city', 'Custom ziyarat itinerary', 'Airport runs (any)'],
    driverName: 'Premium English-speaking chauffeur',
    driverContact: '+966 50 000 0008',
    travelDuration: 'Up to 10 hours',
    price: 320,
    pricingUnit: 'per-vehicle',
    availability: 'limited',
    status: 'active',
    featured: false,
    rating: 5.0,
    reviewsCount: 184,
    bookingsCount: 412,
    notes: 'Default VIP / Luxury package transport. Subject to driver availability.',
  },
]

export const getTransport = (slug: string) => transports.find(t => t.slug === slug)
export const getTransportById = (id: string) => transports.find(t => t.id === id)
export const getActiveTransports = () => transports.filter(t => t.status === 'active')
export const getFeaturedTransports = () => transports.filter(t => t.featured && t.status === 'active')

export const TRANSPORT_TYPES: { value: TransportType; label: string }[] = [
  { value: 'airport-transfer', label: 'Airport Transfer' },
  { value: 'intercity', label: 'Intercity' },
  { value: 'ziyarah-tour', label: 'Ziyarah Tour' },
  { value: 'haram-shuttle', label: 'Haram Shuttle' },
  { value: 'private-hire', label: 'Private Hire' },
]
