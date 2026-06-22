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
  userId?: string;
  status?: string;
  search?: string;
  from?: string;
  to?: string;
};

const PAID_STATUSES = ['COMPLETED'] as const;
const PENDING_STATUSES = ['PENDING'] as const;

const padYearSeq = (n: number) => n.toString().padStart(4, '0');

const buildInvoiceNumber = (payment: { transactionId: string; createdAt: Date; id: string }) => {
  if (payment.transactionId.startsWith('INV-')) return payment.transactionId;
  const year = payment.createdAt.getFullYear();
  const suffix = payment.id.replace(/-/g, '').slice(-4).toUpperCase();
  return `INV-${year}-${suffix}`;
};

const buildDescription = (booking: { packageName: string }, payment: { installmentNumber?: number | null; installmentsTotal?: number | null }) => {
  const base = booking.packageName ?? 'Invoice';
  if (payment.installmentNumber && payment.installmentsTotal) {
    return `${base} — Installment ${payment.installmentNumber} of ${payment.installmentsTotal}`;
  }
  return base;
};

const mapToInvoice = (payment: any) => {
  if (!payment) return null;
  const booking = payment.booking;
  return {
    id: payment.id,
    invoiceNumber: buildInvoiceNumber(payment),
    paymentId: payment.id,
    bookingId: payment.bookingId,
    bookingCode: payment.bookingCode,
    pilgrimName: payment.pilgrimName,
    pilgrimEmail: booking?.pilgrimEmail ?? null,
    pilgrimPhone: booking?.pilgrimPhone ?? null,
    packageName: booking?.packageName ?? null,
    packageType: booking?.packageType ?? null,
    amount: payment.amount,
    method: payment.method,
    rawStatus: payment.status,
    status: payment.status === 'COMPLETED'
      ? 'PAID'
      : payment.status === 'PENDING'
        ? 'PENDING'
        : payment.status === 'REFUNDED'
          ? 'REFUNDED'
          : 'CANCELLED',
    description: buildDescription(booking ?? { packageName: '' }, payment),
    installmentNumber: payment.installmentNumber,
    installmentsTotal: payment.installmentsTotal,
    issueDate: payment.date,
    dueDate: new Date(new Date(payment.date).getTime() + 14 * 24 * 60 * 60 * 1000),
    paidDate: payment.status === 'COMPLETED' ? payment.date : null,
    createdAt: payment.createdAt,
    updatedAt: payment.updatedAt,
    booking: booking
      ? {
          id: booking.id,
          bookingCode: booking.bookingCode,
          packageName: booking.packageName,
          packageType: booking.packageType,
          totalAmount: booking.totalAmount,
          paidAmount: booking.paidAmount,
          paymentStatus: booking.paymentStatus,
          departureDate: booking.departureDate,
          returnDate: booking.returnDate,
          pilgrimName: booking.pilgrimName,
          pilgrimEmail: booking.pilgrimEmail,
          pilgrimPhone: booking.pilgrimPhone,
          userId: booking.userId,
        }
      : null,
  };
};

const generateInvoiceTxId = async () => {
  const year = new Date().getFullYear();
  const yearStart = new Date(year, 0, 1);
  const count = await prisma.payment.count({
    where: { transactionId: { startsWith: `INV-${year}-` }, createdAt: { gte: yearStart } },
  });
  return `INV-${year}-${padYearSeq(count + 1)}`;
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

const CreateInvoice = async (payload: any) => {
  const booking = await prisma.booking.findFirst({ where: { id: payload.bookingId, isDeleted: false } });
  if (!booking) throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');

  const transactionId = payload.transactionId || (await generateInvoiceTxId());

  const created = await prisma.payment.create({
    data: {
      transactionId,
      bookingId: booking.id,
      bookingCode: booking.bookingCode,
      pilgrimName: booking.pilgrimName,
      amount: payload.amount,
      method: payload.method ?? 'BANK_TRANSFER',
      status: payload.status ?? 'PENDING',
      date: payload.date ? new Date(payload.date) : new Date(),
      installmentNumber: payload.installmentNumber,
      installmentsTotal: payload.installmentsTotal,
    },
    include: { booking: true },
  });

  if (created.status === 'COMPLETED') {
    await recomputeBookingPaymentSnapshot(booking.id);
  }

  return mapToInvoice(created);
};

const GetAllInvoices = async (query: ListQuery, user?: JwtPayload) => {
  const { page, limit, skip, sort, order } = calculatePagination(query);
  const where: Prisma.PaymentWhereInput = {};

  if (user && user.role !== 'ADMIN') {
    where.booking = { userId: user.id };
  }
  if (query.userId && user?.role === 'ADMIN') {
    where.booking = { ...(where.booking as any), userId: query.userId };
  }
  if (query.bookingId) where.bookingId = query.bookingId;

  if (query.status) {
    const s = query.status.toUpperCase();
    if (s === 'PAID') where.status = 'COMPLETED';
    else if (s === 'PENDING') where.status = 'PENDING';
    else if (s === 'REFUNDED') where.status = 'REFUNDED';
    else if (s === 'CANCELLED') where.status = 'FAILED';
  }

  if (query.from || query.to) {
    where.date = {};
    if (query.from) (where.date as any).gte = new Date(query.from);
    if (query.to) (where.date as any).lte = new Date(query.to);
  }

  if (query.search) {
    where.OR = [
      { transactionId: { contains: query.search, mode: 'insensitive' } },
      { bookingCode: { contains: query.search, mode: 'insensitive' } },
      { pilgrimName: { contains: query.search, mode: 'insensitive' } },
    ];
  }

  const sortField = ['createdAt', 'date', 'amount'].includes(sort) ? sort : 'date';

  const [rows, total] = await Promise.all([
    prisma.payment.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortField]: order as 'asc' | 'desc' },
      include: { booking: true },
    }),
    prisma.payment.count({ where }),
  ]);

  const data = rows.map(mapToInvoice);

  const summary = await prisma.payment.groupBy({
    by: ['status'],
    where: user?.role === 'ADMIN' ? {} : { booking: { userId: user?.id } },
    _sum: { amount: true },
    _count: { id: true },
  });
  const buckets = { paid: 0, pending: 0, refunded: 0, cancelled: 0, paidCount: 0, pendingCount: 0 };
  for (const s of summary) {
    if (s.status === 'COMPLETED') { buckets.paid = s._sum.amount ?? 0; buckets.paidCount = s._count.id; }
    else if (s.status === 'PENDING') { buckets.pending = s._sum.amount ?? 0; buckets.pendingCount = s._count.id; }
    else if (s.status === 'REFUNDED') { buckets.refunded = s._sum.amount ?? 0; }
    else if (s.status === 'FAILED') { buckets.cancelled = s._sum.amount ?? 0; }
  }

  return { data, meta: { page, limit, total }, summary: buckets };
};

const GetSingleInvoice = async (id: string, user?: JwtPayload) => {
  const payment = await prisma.payment.findUnique({
    where: { id },
    include: { booking: true },
  });
  if (!payment) throw new AppError(httpStatus.NOT_FOUND, 'Invoice not found');
  if (user && user.role !== 'ADMIN' && payment.booking.userId !== user.id) {
    throw new AppError(httpStatus.FORBIDDEN, "You can't view this invoice");
  }
  return mapToInvoice(payment);
};

const UpdateInvoice = async (id: string, payload: any) => {
  const payment = await prisma.payment.findUnique({ where: { id } });
  if (!payment) throw new AppError(httpStatus.NOT_FOUND, 'Invoice not found');

  const updated = await prisma.payment.update({
    where: { id },
    data: {
      amount: payload.amount,
      method: payload.method,
      status: payload.status,
      date: payload.date ? new Date(payload.date) : undefined,
      installmentNumber: payload.installmentNumber,
      installmentsTotal: payload.installmentsTotal,
      transactionId: payload.transactionId,
    },
    include: { booking: true },
  });
  await recomputeBookingPaymentSnapshot(payment.bookingId);
  return mapToInvoice(updated);
};

const MarkPaid = async (id: string) => {
  const payment = await prisma.payment.findUnique({ where: { id } });
  if (!payment) throw new AppError(httpStatus.NOT_FOUND, 'Invoice not found');
  const updated = await prisma.payment.update({
    where: { id },
    data: { status: 'COMPLETED', date: payment.date ?? new Date() },
    include: { booking: true },
  });
  await recomputeBookingPaymentSnapshot(payment.bookingId);
  return mapToInvoice(updated);
};

const DeleteInvoice = async (id: string) => {
  const payment = await prisma.payment.findUnique({ where: { id } });
  if (!payment) throw new AppError(httpStatus.NOT_FOUND, 'Invoice not found');
  await prisma.payment.delete({ where: { id } });
  await recomputeBookingPaymentSnapshot(payment.bookingId);
};

const InvoiceService = {
  CreateInvoice,
  GetAllInvoices,
  GetSingleInvoice,
  UpdateInvoice,
  MarkPaid,
  DeleteInvoice,
};
export default InvoiceService;
