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

const BookingStatusEnum = z.enum([
  'PENDING',
  'PENDING_REVIEW',
  'DOCUMENTS_REQUIRED',
  'UNDER_VERIFICATION',
  'WAITING_FOR_PAYMENT',
  'PAYMENT_RECEIVED',
  'VISA_PROCESSING',
  'FLIGHT_RESERVED',
  'HOTEL_RESERVED',
  'TRANSPORTATION_CONFIRMED',
  'CONFIRMED',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
  'REJECTED',
]);

const CreateBookingSchema = z.object({
  body: z.object({
    bookingCode: z.string().optional(),
    packageId: z.string().optional().nullable(),
    flightId: z.string().optional().nullable(),
    hotelId: z.string().optional().nullable(),
    transportId: z.string().optional().nullable(),
    pilgrimName: z.string(),
    pilgrimEmail: z.string().email(),
    pilgrimPhone: z.string(),
    pilgrimNationality: z.string().optional().nullable(),
    pilgrimPassportNo: z.string().optional().nullable(),
    pilgrimPassportExp: z.string().optional().nullable(),
    pilgrimsCount: z.number().int().positive().default(1),
    departureDate: z.string(),
    returnDate: z.string(),
    totalAmount: z.number().nonnegative(),
    paidAmount: z.number().nonnegative().default(0),
    installmentsCount: z.number().int().positive().default(1),
    notes: z.string().optional().nullable(),
    specialRequests: z.string().optional().nullable(),
    travelers: z.array(Traveler).optional(),
    requestedDocuments: z
      .array(
        z.union([
          z.string(),
          z.object({ type: z.string(), name: z.string().optional(), description: z.string().optional() }),
        ]),
      )
      .optional(),
  }).refine(v => Boolean(v.packageId) || Boolean(v.flightId), {
    message: 'Either packageId or flightId is required',
    path: ['packageId'],
  }),
});

const UpdateBookingSchema = z.object({
  body: z.object({
    pilgrimName: z.string().optional(),
    pilgrimEmail: z.string().email().optional(),
    pilgrimPhone: z.string().optional(),
    pilgrimNationality: z.string().optional().nullable(),
    pilgrimPassportNo: z.string().optional().nullable(),
    pilgrimPassportExp: z.string().optional().nullable(),
    pilgrimsCount: z.number().int().positive().optional(),
    totalAmount: z.number().nonnegative().optional(),
    paidAmount: z.number().nonnegative().optional(),
    installmentsCount: z.number().int().positive().optional(),
    installmentsPaid: z.number().int().nonnegative().optional(),
    status: BookingStatusEnum.optional(),
    paymentStatus: z.enum(['UNPAID', 'PARTIAL', 'PAID', 'REFUNDED']).optional(),
    visaStatus: z.enum(['PENDING', 'SUBMITTED', 'APPROVED', 'REJECTED']).optional(),
    documentsStatus: z.enum(['INCOMPLETE', 'COMPLETE']).optional(),
    notes: z.string().optional().nullable(),
    adminNotes: z.string().optional().nullable(),
    specialRequests: z.string().optional().nullable(),
    flightId: z.string().optional().nullable(),
    hotelId: z.string().optional().nullable(),
    transportId: z.string().optional().nullable(),
    assignedConsultantId: z.string().optional().nullable(),
    travelers: z.array(Traveler).optional(),
  }),
});

const UpdateStatusSchema = z.object({
  body: z.object({
    status: BookingStatusEnum,
    note: z.string().optional().nullable(),
  }),
});

const AssignConsultantSchema = z.object({
  body: z.object({
    staffId: z.string().min(1),
    role: z.enum(['CONSULTANT', 'STAFF']).optional(),
    note: z.string().optional().nullable(),
  }),
});

const RequestDocumentsSchema = z.object({
  body: z.object({
    documents: z
      .array(z.object({ type: z.string(), name: z.string().optional(), description: z.string().optional() }))
      .min(1),
  }),
});

const UploadDocumentSchema = z.object({
  body: z.object({
    documentId: z.string().optional(),
    type: z.string().optional(),
    name: z.string().optional(),
    fileUrl: z.string().min(1),
    fileName: z.string().optional(),
  }),
});

const VerifyDocumentSchema = z.object({
  body: z.object({
    status: z.enum(['VERIFIED', 'REJECTED']),
    reason: z.string().optional(),
  }),
});

const SendMessageSchema = z.object({
  body: z.object({
    content: z.string().min(1),
    attachments: z.array(z.string()).optional(),
  }),
});

const UpdateNotesSchema = z.object({
  body: z.object({
    adminNotes: z.string().optional().nullable(),
    notes: z.string().optional().nullable(),
  }),
});

const AssignEntitySchema = z.object({
  body: z.object({
    flightId: z.string().optional(),
    hotelId: z.string().optional(),
    transportId: z.string().optional(),
  }),
});

const UpdatePaymentSchema = z.object({
  body: z.object({
    paidAmount: z.number().nonnegative().optional(),
    paymentStatus: z.enum(['UNPAID', 'PARTIAL', 'PAID', 'REFUNDED']).optional(),
    note: z.string().optional().nullable(),
  }),
});

const UpdateVisaSchema = z.object({
  body: z.object({
    visaStatus: z.enum(['PENDING', 'SUBMITTED', 'APPROVED', 'REJECTED']),
    note: z.string().optional().nullable(),
  }),
});

const BookingValidation = {
  CreateBookingSchema,
  UpdateBookingSchema,
  UpdateStatusSchema,
  AssignConsultantSchema,
  RequestDocumentsSchema,
  UploadDocumentSchema,
  VerifyDocumentSchema,
  SendMessageSchema,
  UpdateNotesSchema,
  AssignEntitySchema,
  UpdatePaymentSchema,
  UpdateVisaSchema,
};
export default BookingValidation;
