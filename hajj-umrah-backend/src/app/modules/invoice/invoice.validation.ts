import { z } from 'zod';

const methodEnum = z.enum(['CARD', 'BANK_TRANSFER', 'PAYPAL', 'APPLE_PAY', 'KLARNA', 'AFFIRM', 'BKASH', 'NAGAD', 'SSLCOMMERZ']);
const statusEnum = z.enum(['COMPLETED', 'PENDING', 'FAILED', 'REFUNDED']);

const CreateInvoiceSchema = z.object({
  body: z.object({
    bookingId: z.string().min(1),
    amount: z.number().positive(),
    method: methodEnum.optional(),
    status: statusEnum.optional(),
    date: z.string().optional(),
    transactionId: z.string().optional(),
    installmentNumber: z.number().int().positive().optional(),
    installmentsTotal: z.number().int().positive().optional(),
  }),
});

const UpdateInvoiceSchema = z.object({
  body: z.object({
    amount: z.number().positive().optional(),
    method: methodEnum.optional(),
    status: statusEnum.optional(),
    date: z.string().optional(),
    transactionId: z.string().optional(),
    installmentNumber: z.number().int().positive().optional(),
    installmentsTotal: z.number().int().positive().optional(),
  }),
});

const InvoiceValidation = { CreateInvoiceSchema, UpdateInvoiceSchema };
export default InvoiceValidation;
