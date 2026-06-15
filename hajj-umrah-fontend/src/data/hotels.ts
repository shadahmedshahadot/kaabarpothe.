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
    name: 'Hilton Suites Makkah',
    category: 4,
    city: 'Makkah',
    country: 'Saudi Arabia',
    address: 'Jabal Omar, Ibrahim Al Khalil Rd, Makkah 24231',
    distanceFromHaram: '400m walk from Haram',
    images: [IMG.kaabaClockTower, IMG.kaabaDayMinarets, IMG.haramAerial, IMG.kaabaDayCrowd],
    cover: IMG.kaabaClockTower,
    description:
      'Modern 4-star suites within a 5-minute walk of Masjid al-Haram. Spacious rooms, prayer-friendly amenities, and 24/7 multilingual concierge.',
    facilities: ['Free Wi-Fi', 'Prayer mats in-room', '24/7 reception', 'Halal restaurant', 'Qibla direction', 'Ironing service', 'Daily housekeeping', 'Airport transfer (paid)'],
    meals: 'Breakfast buffet included · lunch & dinner available',
    checkInDate: '2026-02-15',
    checkOutDate: '2026-02-22',
    totalRooms: 220,
    pricePerNight: 165,
    roomTypes: [
      { id: 'rt-001', name: 'Standard Twin', capacity: 2, pricePerNight: 165, available: 28, board: 'breakfast' },
      { id: 'rt-002', name: 'Family Suite', capacity: 4, pricePerNight: 245, available: 12, board: 'half-board' },
      { id: 'rt-003', name: 'Haram-View Deluxe', capacity: 2, pricePerNight: 320, available: 6, board: 'half-board' },
    ],
    rating: 4.7,
    reviewsCount: 1280,
    bookingsCount: 5420,
    status: 'active',
    featured: true,
    notes: 'Top-rated 4-star pick for Umrah groups. Group rates available.',
  },
  {
    id: 'htl-mkk-002',
    slug: 'fairmont-makkah-clock-tower',
    name: 'Fairmont Makkah Clock Royal Tower',
    category: 5,
    city: 'Makkah',
    country: 'Saudi Arabia',
    address: 'Abraj Al Bait Complex, King Abdul Aziz Endowment',
    distanceFromHaram: 'Adjacent to Haram (Clock Tower)',
    images: [IMG.kaabaNightKiswa, IMG.kaabaNightHaram, IMG.kaabaCloseDoor, IMG.kaabaNightFamily],
    cover: IMG.kaabaNightKiswa,
    description:
      'Iconic 5-star luxury inside the Clock Tower. Direct Haram views, butler service, and the most prestigious address in Makkah.',
    facilities: ['Direct Haram view', 'Butler service', 'Premium prayer room', 'Spa', 'Fine dining (halal)', '24/7 concierge', 'Valet parking', 'Limousine service'],
    meals: 'À la carte fine dining, in-room dining 24/7',
    checkInDate: '2026-02-15',
    checkOutDate: '2026-02-22',
    totalRooms: 858,
    pricePerNight: 520,
    roomTypes: [
      { id: 'rt-010', name: 'Premier Room (City View)', capacity: 2, pricePerNight: 520, available: 18, board: 'breakfast' },
      { id: 'rt-011', name: 'Haram-View Suite', capacity: 2, pricePerNight: 780, available: 9, board: 'half-board' },
      { id: 'rt-012', name: 'Royal Family Suite', capacity: 6, pricePerNight: 1450, available: 3, board: 'full-board' },
    ],
    rating: 4.9,
    reviewsCount: 2840,
    bookingsCount: 4180,
    status: 'active',
    featured: true,
    notes: 'Booked exclusively in VIP and Luxury packages by default.',
  },
  {
    id: 'htl-mkk-003',
    slug: 'dar-al-eiman-royal',
    name: 'Dar Al Eiman Royal',
    category: 3,
    city: 'Makkah',
    country: 'Saudi Arabia',
    address: 'Ibrahim Al Khalil Rd, Makkah',
    distanceFromHaram: '850m walk from Haram',
    images: [IMG.haramAerial, IMG.kaabaIhramDay, IMG.kaabaDayCrowd],
    cover: IMG.haramAerial,
    description:
      'Clean, affordable 3-star hotel popular with budget Umrah groups. Shuttle service to Haram every 30 minutes.',
    facilities: ['Free Haram shuttle', 'Prayer mats', 'Halal restaurant', '24/7 reception', 'Free Wi-Fi in lobby', 'Group rates'],
    meals: 'Breakfast & dinner buffet',
    checkInDate: '2026-02-15',
    checkOutDate: '2026-02-22',
    totalRooms: 320,
    pricePerNight: 78,
    roomTypes: [
      { id: 'rt-020', name: 'Quad Share', capacity: 4, pricePerNight: 78, available: 64, board: 'half-board' },
      { id: 'rt-021', name: 'Triple Share', capacity: 3, pricePerNight: 95, available: 42, board: 'half-board' },
      { id: 'rt-022', name: 'Double Room', capacity: 2, pricePerNight: 120, available: 26, board: 'half-board' },
    ],
    rating: 4.3,
    reviewsCount: 980,
    bookingsCount: 8240,
    status: 'active',
    featured: false,
    notes: 'Default for Economy/Budget packages. High volume.',
  },
  {
    id: 'htl-med-001',
    slug: 'pullman-zamzam-madinah',
    name: 'Pullman Zamzam Madinah',
    category: 4,
    city: 'Madinah',
    country: 'Saudi Arabia',
    address: 'King Faisal Rd, Central Madinah, near Masjid Nabawi',
    distanceFromHaram: '180m from Masjid Nabawi',
    images: [IMG.greenDomeMinarets, IMG.nabawiUmbrellaGolden, IMG.nabawiDay, IMG.greenDomeClose],
    cover: IMG.greenDomeMinarets,
    description:
      'Premium 4-star property minutes from the Rawdah. Spacious rooms, generous buffet, and excellent group facilities.',
    facilities: ['Direct Nabawi access', 'Group meeting hall', 'Prayer call broadcast', 'Halal buffet', 'Wheelchair access', 'Concierge', 'Multilingual staff'],
    meals: 'Half-board buffet (breakfast + dinner)',
    checkInDate: '2026-02-22',
    checkOutDate: '2026-02-28',
    totalRooms: 410,
    pricePerNight: 195,
    roomTypes: [
      { id: 'rt-030', name: 'Triple Share', capacity: 3, pricePerNight: 195, available: 36, board: 'half-board' },
      { id: 'rt-031', name: 'Double Deluxe', capacity: 2, pricePerNight: 245, available: 22, board: 'half-board' },
      { id: 'rt-032', name: 'Family Suite (4 pax)', capacity: 4, pricePerNight: 365, available: 8, board: 'full-board' },
    ],
    rating: 4.7,
    reviewsCount: 1620,
    bookingsCount: 6240,
    status: 'active',
    featured: true,
    notes: 'Most-booked Madinah hotel across Standard and Premium tiers.',
  },
  {
    id: 'htl-med-002',
    slug: 'the-oberoi-madinah',
    name: 'The Oberoi Madinah',
    category: 5,
    city: 'Madinah',
    country: 'Saudi Arabia',
    address: 'Khalid Bin Al Walid Rd, Central Madinah',
    distanceFromHaram: '120m from Masjid Nabawi',
    images: [IMG.greenDomeClose, IMG.greenDomeStarFrame, IMG.nabawiNight, IMG.nabawiCoupleArches],
    cover: IMG.greenDomeClose,
    description:
      'Ultra-luxury 5-star hotel with Nabawi-view suites. Butler service, à la carte dining, and a serene worship-focused atmosphere.',
    facilities: ['Nabawi-view suites', 'Butler service', 'Spa', 'Fine halal dining', 'Premium prayer room', 'Valet', 'In-room dining 24/7', 'Limo airport transfer'],
    meals: 'Full-board à la carte',
    checkInDate: '2026-02-22',
    checkOutDate: '2026-02-28',
    totalRooms: 142,
    pricePerNight: 480,
    roomTypes: [
      { id: 'rt-040', name: 'Deluxe Room', capacity: 2, pricePerNight: 480, available: 14, board: 'breakfast' },
      { id: 'rt-041', name: 'Nabawi-View Suite', capacity: 2, pricePerNight: 720, available: 6, board: 'half-board' },
      { id: 'rt-042', name: 'Royal Suite (4 pax)', capacity: 4, pricePerNight: 1280, available: 2, board: 'full-board' },
    ],
    rating: 4.9,
    reviewsCount: 720,
    bookingsCount: 1840,
    status: 'active',
    featured: true,
    notes: 'Premium / VIP / Luxury package default.',
  },
  {
    id: 'htl-med-003',
    slug: 'olayan-al-madinah',
    name: 'Olayan Al Madinah',
    category: 3,
    city: 'Madinah',
    country: 'Saudi Arabia',
    address: 'Central Madinah, near Bab Al Salam',
    distanceFromHaram: '450m from Masjid Nabawi',
    images: [IMG.nabawiDay, IMG.nabawiUmbrellas, IMG.nabawiInterior],
    cover: IMG.nabawiDay,
    description:
      'Affordable 3-star hotel for budget pilgrims. Clean rooms, breakfast included, walking distance to Masjid Nabawi.',
    facilities: ['Free Wi-Fi', 'Halal breakfast', '24/7 reception', 'Group rates', 'Multilingual staff', 'Laundry (paid)'],
    meals: 'Breakfast only',
    checkInDate: '2026-02-22',
    checkOutDate: '2026-02-28',
    totalRooms: 280,
    pricePerNight: 65,
    roomTypes: [
      { id: 'rt-050', name: 'Quad Share', capacity: 4, pricePerNight: 65, available: 52, board: 'breakfast' },
      { id: 'rt-051', name: 'Triple Share', capacity: 3, pricePerNight: 82, available: 38, board: 'breakfast' },
      { id: 'rt-052', name: 'Double Room', capacity: 2, pricePerNight: 110, available: 24, board: 'breakfast' },
    ],
    rating: 4.2,
    reviewsCount: 640,
    bookingsCount: 4380,
    status: 'active',
    featured: false,
    notes: 'Default for Economy Hajj and Budget Umrah.',
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
