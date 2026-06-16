import httpStatus from 'http-status';
import { Prisma } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';
import calculatePagination from '../../utils/pagination';

type ListQuery = {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  bookingId?: string;
  status?: string;
  method?: string;
  search?: string;
};

const recomputeBookingPaymentSnapshot = async (bookingId: string) => {
  const aggregates = await prisma.payment.aggregate({
    where: { bookingId, status: 'COMPLETED' },
    _sum: { amount: true },
    _count: { id: true },
  });
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking) return;
  const paid = aggregates._sum.amount ?? 0;
  let paymentStatus: 'UNPAID' | 'PARTIAL' | 'PAID' = 'UNPAID';
  if (paid >= booking.totalAmount) paymentStatus = 'PAID';
  else if (paid > 0) paymentStatus = 'PARTIAL';
  await prisma.booking.update({
    where: { id: bookingId },
    data: { paidAmount: paid, installmentsPaid: aggregates._count.id, paymentStatus },
  });
};

const CreatePayment = async (payload: any) => {
  const booking = await prisma.booking.findFirst({ where: { id: payload.bookingId, isDeleted: false } });
  if (!booking) throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');

  const created = await prisma.payment.create({
    data: {
      ...payload,
      date: payload.date ? new Date(payload.date) : new Date(),
      bookingCode: booking.bookingCode,
      pilgrimName: booking.pilgrimName,
    },
  });
  await recomputeBookingPaymentSnapshot(booking.id);
  return created;
};

const GetAllPayments = async (query: ListQuery, user?: JwtPayload) => {
  const { page, limit, skip, sort, order } = calculatePagination(query);
  const where: Prisma.PaymentWhereInput = {};

  if (user && user.role !== 'ADMIN') {
    where.booking = { userId: user.id };
  }

  if (query.bookingId) where.bookingId = query.bookingId;
  if (query.status) where.status = query.status as any;
  if (query.method) where.method = query.method as any;
  if (query.search) {
    where.OR = [
      { transactionId: { contains: query.search, mode: 'insensitive' } },
      { bookingCode: { contains: query.search, mode: 'insensitive' } },
      { pilgrimName: { contains: query.search, mode: 'insensitive' } },
    ];
  }

  const sortField = ['createdAt', 'date', 'amount'].includes(sort) ? sort : 'date';

  const [data, total] = await Promise.all([
    prisma.payment.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortField]: order as 'asc' | 'desc' },
      include: { booking: true },
    }),
    prisma.payment.count({ where }),
  ]);
  return { data, meta: { page, limit, total } };
};

const GetSinglePayment = async (id: string, user?: JwtPayload) => {
  const payment = await prisma.payment.findUnique({
    where: { id },
    include: { booking: true },
  });
  if (!payment) throw new AppError(httpStatus.NOT_FOUND, 'Payment not found');
  if (user && user.role !== 'ADMIN' && payment.booking.userId !== user.id) {
    throw new AppError(httpStatus.FORBIDDEN, "You can't view this payment");
  }
  return payment;
};

const UpdatePayment = async (id: string, payload: any) => {
  const payment = await prisma.payment.findUnique({ where: { id } });
  if (!payment) throw new AppError(httpStatus.NOT_FOUND, 'Payment not found');
  const updated = await prisma.payment.update({
    where: { id },
    data: { ...payload, date: payload.date ? new Date(payload.date) : undefined },
  });
  await recomputeBookingPaymentSnapshot(payment.bookingId);
  return updated;
};

const DeletePayment = async (id: string) => {
  const payment = await prisma.payment.findUnique({ where: { id } });
  if (!payment) throw new AppError(httpStatus.NOT_FOUND, 'Payment not found');
  await prisma.payment.delete({ where: { id } });
  await recomputeBookingPaymentSnapshot(payment.bookingId);
};

const PaymentService = {
  CreatePayment,
  GetAllPayments,
  GetSinglePayment,
  UpdatePayment,
  DeletePayment,
};
export default PaymentService;
