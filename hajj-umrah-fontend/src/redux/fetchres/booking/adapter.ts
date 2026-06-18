import type { Booking, BookingStatus, PaymentStatus } from '@/data/bookings'
import type { BookingDto } from './bookingApi'

const statusMap: Record<BookingDto['status'], BookingStatus> = {
  PENDING: 'pending',
  PENDING_REVIEW: 'pending',
  DOCUMENTS_REQUIRED: 'in-progress',
  UNDER_VERIFICATION: 'in-progress',
  WAITING_FOR_PAYMENT: 'in-progress',
  PAYMENT_RECEIVED: 'in-progress',
  VISA_PROCESSING: 'in-progress',
  FLIGHT_RESERVED: 'in-progress',
  HOTEL_RESERVED: 'in-progress',
  TRANSPORTATION_CONFIRMED: 'in-progress',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  REJECTED: 'cancelled',
}

const paymentMap: Record<BookingDto['paymentStatus'], PaymentStatus> = {
  UNPAID: 'unpaid',
  PARTIAL: 'partial',
  PAID: 'paid',
  REFUNDED: 'refunded',
}

export const adaptBooking = (dto: BookingDto): Booking =>
  ({
    id: dto.id,
    bookingCode: dto.bookingCode,
    packageId: dto.packageId,
    packageName: dto.packageName,
    packageType: dto.packageType.toLowerCase() as 'hajj' | 'umrah',
    pilgrimId: dto.userId ?? '',
    pilgrimName: dto.pilgrimName,
    pilgrimEmail: dto.pilgrimEmail,
    pilgrimPhone: dto.pilgrimPhone,
    status: statusMap[dto.status],
    paymentStatus: paymentMap[dto.paymentStatus],
    totalAmount: dto.totalAmount,
    paidAmount: dto.paidAmount,
    installmentsCount: dto.installmentsCount,
    installmentsPaid: dto.installmentsPaid,
    departureDate: dto.departureDate?.slice(0, 10) ?? '',
    returnDate: dto.returnDate?.slice(0, 10) ?? '',
    pilgrimsCount: dto.pilgrimsCount,
    bookedDate: dto.bookedDate?.slice(0, 10) ?? '',
    notes: dto.notes ?? '',
    visaStatus: dto.visaStatus.toLowerCase() as Booking['visaStatus'],
    documentsStatus: dto.documentsStatus.toLowerCase() as Booking['documentsStatus'],
  }) as Booking
