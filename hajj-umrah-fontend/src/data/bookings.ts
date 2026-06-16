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

export const bookings: Booking[] = []
export const getBooking = (_id: string): Booking | undefined => undefined
