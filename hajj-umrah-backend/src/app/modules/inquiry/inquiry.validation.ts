import { z } from 'zod';

const CreateInquirySchema = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string(),
    type: z.enum(['GENERAL', 'PACKAGE', 'CONSULTATION']),
    subject: z.string().min(1),
    message: z.string().min(1),
    packageId: z.string().optional().nullable(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
  }),
});

const UpdateInquirySchema = z.object({
  body: z.object({
    status: z.enum(['NEW', 'IN_PROGRESS', 'RESPONDED', 'CLOSED']).optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    subject: z.string().optional(),
    message: z.string().optional(),
  }),
});

const InquiryValidation = { CreateInquirySchema, UpdateInquirySchema };
export default InquiryValidation;
