export type BookingStatus = 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'
export type PaymentStatus = 'unpaid' | 'partial' | 'paid' | 'refunded'

export interface Booking {
  id: string
  bookingCode: string
  packageId: string
  packageName: string
  packageType: 'hajj' | 'umrah'
  pilgrimId: string
  pilgrimName: string
  pilgrimEmail: string
  pilgrimPhone: string
  status: BookingStatus
  paymentStatus: PaymentStatus
  totalAmount: number
  paidAmount: number
  installmentsCount: number
  installmentsPaid: number
  departureDate: string
  returnDate: string
  pilgrimsCount: number
  bookedDate: string
  notes: string
  visaStatus: 'pending' | 'submitted' | 'approved' | 'rejected'
  documentsStatus: 'incomplete' | 'complete'
}

export const bookings: Booking[] = [
  { id: 'bkg-1001', bookingCode: 'HJ-2026-1001', packageId: 'pkg-hajj-premium', packageName: 'প্রিমিয়াম হজ্জ ২০২৬', packageType: 'hajj', pilgrimId: 'p-001', pilgrimName: 'মোহাম্মদ আনোয়ার', pilgrimEmail: 'm.anwar@email.com', pilgrimPhone: '+880 1711-552341', status: 'confirmed', paymentStatus: 'paid', totalAmount: 26998, paidAmount: 26998, installmentsCount: 4, installmentsPaid: 4, departureDate: '2026-05-19', returnDate: '2026-06-13', pilgrimsCount: 2, bookedDate: '2025-11-20', notes: 'দম্পতি, পাশাপাশি রুম অনুরোধ করেছেন', visaStatus: 'approved', documentsStatus: 'complete' },
  { id: 'bkg-1002', bookingCode: 'UM-2026-1002', packageId: 'pkg-umrah-economy', packageName: 'ইকোনমি উমরাহ', packageType: 'umrah', pilgrimId: 'p-002', pilgrimName: 'আয়েশা খান', pilgrimEmail: 'aisha.khan@email.com', pilgrimPhone: '+880 1712-900123', status: 'confirmed', paymentStatus: 'paid', totalAmount: 1749, paidAmount: 1749, installmentsCount: 2, installmentsPaid: 2, departureDate: '2026-03-01', returnDate: '2026-03-10', pilgrimsCount: 1, bookedDate: '2025-12-08', notes: 'শুধুমাত্র মহিলা গ্রুপ, প্রথমবারের হাজী', visaStatus: 'approved', documentsStatus: 'complete' },
  { id: 'bkg-1003', bookingCode: 'HJ-2026-1003', packageId: 'pkg-hajj-vip', packageName: 'ভিআইপি হজ্জ ২০২৬', packageType: 'hajj', pilgrimId: 'p-003', pilgrimName: 'ইউসুফ গার্সিয়া', pilgrimEmail: 'y.garcia@email.com', pilgrimPhone: '+880 1832-559912', status: 'confirmed', paymentStatus: 'partial', totalAmount: 46998, paidAmount: 30000, installmentsCount: 5, installmentsPaid: 3, departureDate: '2026-05-18', returnDate: '2026-06-14', pilgrimsCount: 2, bookedDate: '2025-10-12', notes: 'ভিআইপি দম্পতি, মার্সিডিজ ভি-ক্লাস স্থানান্তর', visaStatus: 'approved', documentsStatus: 'complete' },
  { id: 'bkg-1004', bookingCode: 'UM-2026-1004', packageId: 'pkg-umrah-luxury', packageName: 'লাক্সারি উমরাহ', packageType: 'umrah', pilgrimId: 'p-004', pilgrimName: 'হাফসা বিলাল', pilgrimEmail: 'h.bilal@email.com', pilgrimPhone: '+880 1416-553344', status: 'in-progress', paymentStatus: 'paid', totalAmount: 18198, paidAmount: 18198, installmentsCount: 3, installmentsPaid: 3, departureDate: '2026-04-01', returnDate: '2026-04-14', pilgrimsCount: 3, bookedDate: '2025-09-30', notes: 'বয়স্ক পিতামাতাসহ পরিবার, হুইলচেয়ার অ্যাক্সেস', visaStatus: 'approved', documentsStatus: 'complete' },
  { id: 'bkg-1005', bookingCode: 'HJ-2026-1005', packageId: 'pkg-hajj-standard', packageName: 'স্ট্যান্ডার্ড হজ্জ ২০২৬', packageType: 'hajj', pilgrimId: 'p-005', pilgrimName: 'ইব্রাহিম দিওপ', pilgrimEmail: 'i.diop@email.com', pilgrimPhone: '+880 1612-345678', status: 'confirmed', paymentStatus: 'paid', totalAmount: 25497, paidAmount: 25497, installmentsCount: 4, installmentsPaid: 4, departureDate: '2026-05-20', returnDate: '2026-06-12', pilgrimsCount: 3, bookedDate: '2025-09-15', notes: 'তিন প্রজন্ম, বাংলা-ভাষী গাইড', visaStatus: 'approved', documentsStatus: 'complete' },
  { id: 'bkg-1006', bookingCode: 'UM-2026-1006', packageId: 'pkg-umrah-budget', packageName: 'বাজেট উমরাহ', packageType: 'umrah', pilgrimId: 'p-006', pilgrimName: 'জয়নব মুস্তাফা', pilgrimEmail: 'z.mustafa@email.com', pilgrimPhone: '+880 1712-900456', status: 'completed', paymentStatus: 'paid', totalAmount: 1099, paidAmount: 1099, installmentsCount: 1, installmentsPaid: 1, departureDate: '2025-11-05', returnDate: '2025-11-11', pilgrimsCount: 1, bookedDate: '2025-08-20', notes: 'শিক্ষার্থী প্যাকেজ', visaStatus: 'approved', documentsStatus: 'complete' },
  { id: 'bkg-1007', bookingCode: 'UM-2026-1007', packageId: 'pkg-umrah-premium', packageName: 'প্রিমিয়াম উমরাহ', packageType: 'umrah', pilgrimId: 'p-007', pilgrimName: 'খালিদ রশিদ', pilgrimEmail: 'k.rashid@email.com', pilgrimPhone: '+880 1412-345678', status: 'pending', paymentStatus: 'partial', totalAmount: 6198, paidAmount: 1500, installmentsCount: 4, installmentsPaid: 1, departureDate: '2026-03-15', returnDate: '2026-03-26', pilgrimsCount: 2, bookedDate: '2026-01-08', notes: 'ইস্তাম্বুল হয়ে মাল্টি-সিটি', visaStatus: 'submitted', documentsStatus: 'incomplete' },
  { id: 'bkg-1008', bookingCode: 'UM-2026-1008', packageId: 'pkg-umrah-economy', packageName: 'ইকোনমি উমরাহ', packageType: 'umrah', pilgrimId: 'p-008', pilgrimName: 'সালমা আল-ফয়সাল', pilgrimEmail: 's.faisal@email.com', pilgrimPhone: '+880 1712-900789', status: 'completed', paymentStatus: 'paid', totalAmount: 1749, paidAmount: 1749, installmentsCount: 2, installmentsPaid: 2, departureDate: '2025-08-25', returnDate: '2025-09-03', pilgrimsCount: 1, bookedDate: '2025-06-10', notes: 'টেক পেশাদার', visaStatus: 'approved', documentsStatus: 'complete' },
  { id: 'bkg-1009', bookingCode: 'HJ-2026-1009', packageId: 'pkg-hajj-standard', packageName: 'স্ট্যান্ডার্ড হজ্জ ২০২৬', packageType: 'hajj', pilgrimId: 'p-009', pilgrimName: 'আব্দুর রহমান', pilgrimEmail: 'a.rahman@email.com', pilgrimPhone: '+880 1313-551122', status: 'confirmed', paymentStatus: 'partial', totalAmount: 8499, paidAmount: 4000, installmentsCount: 4, installmentsPaid: 2, departureDate: '2026-05-20', returnDate: '2026-06-12', pilgrimsCount: 1, bookedDate: '2025-12-20', notes: 'শিক্ষাগত কর্মসূচির অংশগ্রহণকারী', visaStatus: 'submitted', documentsStatus: 'complete' },
  { id: 'bkg-1010', bookingCode: 'UM-2026-1010', packageId: 'pkg-umrah-premium', packageName: 'প্রিমিয়াম উমরাহ', packageType: 'umrah', pilgrimId: 'p-010', pilgrimName: 'নুসায়বা আলি', pilgrimEmail: 'n.ali@email.com', pilgrimPhone: '+880 1773-557788', status: 'pending', paymentStatus: 'partial', totalAmount: 3099, paidAmount: 800, installmentsCount: 3, installmentsPaid: 1, departureDate: '2026-04-15', returnDate: '2026-04-26', pilgrimsCount: 1, bookedDate: '2026-02-01', notes: 'এক্সপ্রেস ৭-দিনের ভ্যারিয়েন্ট অনুরোধ করা হয়েছে', visaStatus: 'pending', documentsStatus: 'incomplete' },
  { id: 'bkg-1011', bookingCode: 'HJ-2026-1011', packageId: 'pkg-hajj-economy', packageName: 'ইকোনমি হজ্জ ২০২৬', packageType: 'hajj', pilgrimId: 'p-011', pilgrimName: 'সাঈদ মনসুর', pilgrimEmail: 's.mansoor@email.com', pilgrimPhone: '+880 1713-559988', status: 'confirmed', paymentStatus: 'partial', totalAmount: 12998, paidAmount: 6500, installmentsCount: 5, installmentsPaid: 3, departureDate: '2026-05-22', returnDate: '2026-06-11', pilgrimsCount: 2, bookedDate: '2025-11-10', notes: 'পিতা-পুত্র জুটি', visaStatus: 'submitted', documentsStatus: 'complete' },
  { id: 'bkg-1012', bookingCode: 'UM-2026-1012', packageId: 'pkg-umrah-economy', packageName: 'ইকোনমি উমরাহ', packageType: 'umrah', pilgrimId: 'p-012', pilgrimName: 'রাবেয়া তারিক', pilgrimEmail: 'r.tariq@email.com', pilgrimPhone: '+880 1416-554455', status: 'confirmed', paymentStatus: 'paid', totalAmount: 4998, paidAmount: 4998, installmentsCount: 2, installmentsPaid: 2, departureDate: '2026-03-01', returnDate: '2026-03-10', pilgrimsCount: 3, bookedDate: '2025-12-01', notes: 'শিশুসহ পরিবার — ফ্যামিলি স্যুট', visaStatus: 'approved', documentsStatus: 'complete' },
]

export const getBooking = (id: string) => bookings.find(b => b.id === id || b.bookingCode === id)
