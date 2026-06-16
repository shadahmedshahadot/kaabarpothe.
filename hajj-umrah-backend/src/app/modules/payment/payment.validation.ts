import { z } from 'zod';

const CreatePaymentSchema = z.object({
  body: z.object({
    transactionId: z.string().min(1),
    bookingId: z.string().min(1),
    amount: z.number().positive(),
    method: z.enum(['CARD', 'BANK_TRANSFER', 'PAYPAL', 'APPLE_PAY', 'KLARNA', 'AFFIRM', 'BKASH', 'NAGAD', 'SSLCOMMERZ']),
    status: z.enum(['COMPLETED', 'PENDING', 'FAILED', 'REFUNDED']).default('PENDING'),
    date: z.string().optional(),
    installmentNumber: z.number().int().positive().optional(),
    installmentsTotal: z.number().int().positive().optional(),
  }),
});

const UpdatePaymentSchema = z.object({
  body: z.object({
    amount: z.number().positive().optional(),
    method: z.enum(['CARD', 'BANK_TRANSFER', 'PAYPAL', 'APPLE_PAY', 'KLARNA', 'AFFIRM', 'BKASH', 'NAGAD', 'SSLCOMMERZ']).optional(),
    status: z.enum(['COMPLETED', 'PENDING', 'FAILED', 'REFUNDED']).optional(),
    date: z.string().optional(),
    installmentNumber: z.number().int().positive().optional(),
    installmentsTotal: z.number().int().positive().optional(),
  }),
});

const PaymentValidation = { CreatePaymentSchema, UpdatePaymentSchema };
export default PaymentValidation;
