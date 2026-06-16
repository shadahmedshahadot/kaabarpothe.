import { z } from 'zod';

const Traveler = z.object({
  fullName: z.string(),
  gender: z.enum(['MALE', 'FEMALE']),
  dateOfBirth: z.string(),
  passportNumber: z.string(),
  passportExpiry: z.string(),
  nationality: z.string(),
  mobile: z.string(),
  email: z.string().email(),
  emergencyContact: z.string().optional().nullable(),
});

const CreateBookingSchema = z.object({
  body: z.object({
    bookingCode: z.string().optional(),
    packageId: z.string().min(1),
    pilgrimName: z.string(),
    pilgrimEmail: z.string().email(),
    pilgrimPhone: z.string(),
    pilgrimsCount: z.number().int().positive().default(1),
    departureDate: z.string(),
    returnDate: z.string(),
    totalAmount: z.number().nonnegative(),
    paidAmount: z.number().nonnegative().default(0),
    installmentsCount: z.number().int().positive().default(1),
    installmentsPaid: z.number().int().nonnegative().default(0),
    status: z.enum(['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).default('PENDING'),
    paymentStatus: z.enum(['UNPAID', 'PARTIAL', 'PAID', 'REFUNDED']).default('UNPAID'),
    visaStatus: z.enum(['PENDING', 'SUBMITTED', 'APPROVED', 'REJECTED']).default('PENDING'),
    documentsStatus: z.enum(['INCOMPLETE', 'COMPLETE']).default('INCOMPLETE'),
    notes: z.string().optional().nullable(),
    travelers: z.array(Traveler).optional(),
  }),
});

const UpdateBookingSchema = z.object({
  body: z.object({
    pilgrimName: z.string().optional(),
    pilgrimEmail: z.string().email().optional(),
    pilgrimPhone: z.string().optional(),
    pilgrimsCount: z.number().int().positive().optional(),
    totalAmount: z.number().nonnegative().optional(),
    paidAmount: z.number().nonnegative().optional(),
    installmentsCount: z.number().int().positive().optional(),
    installmentsPaid: z.number().int().nonnegative().optional(),
    status: z.enum(['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
    paymentStatus: z.enum(['UNPAID', 'PARTIAL', 'PAID', 'REFUNDED']).optional(),
    visaStatus: z.enum(['PENDING', 'SUBMITTED', 'APPROVED', 'REJECTED']).optional(),
    documentsStatus: z.enum(['INCOMPLETE', 'COMPLETE']).optional(),
    notes: z.string().optional().nullable(),
    travelers: z.array(Traveler).optional(),
  }),
});

const BookingValidation = { CreateBookingSchema, UpdateBookingSchema };
export default BookingValidation;
