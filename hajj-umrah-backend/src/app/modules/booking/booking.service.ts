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
  status?: string;
  paymentStatus?: string;
  packageId?: string;
  userId?: string;
  search?: string;
};

const sanitizeDates = (input: any) => {
  if (input.departureDate) input.departureDate = new Date(input.departureDate);
  if (input.returnDate) input.returnDate = new Date(input.returnDate);
  return input;
};

const sanitizeTravelers = (travelers: any[]) =>
  travelers.map(t => ({
    ...t,
    dateOfBirth: new Date(t.dateOfBirth),
    passportExpiry: new Date(t.passportExpiry),
  }));

const generateBookingCode = (type: string) =>
  `${type === 'HAJJ' ? 'HJ' : 'UM'}-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`;

const CreateBooking = async (payload: any, user?: JwtPayload) => {
  const pkg = await prisma.package.findFirst({ where: { id: payload.packageId, isDeleted: false } });
  if (!pkg) throw new AppError(httpStatus.NOT_FOUND, 'Package not found');

  const { travelers, ...data } = sanitizeDates(payload);
  const bookingCode = data.bookingCode || generateBookingCode(pkg.type);

  return prisma.booking.create({
    data: {
      ...data,
      bookingCode,
      packageName: pkg.name,
      packageType: pkg.type,
      userId: user?.id ?? null,
      travelers: travelers ? { create: sanitizeTravelers(travelers) } : undefined,
    },
    include: { travelers: true, package: true },
  });
};

const GetAllBookings = async (query: ListQuery, user?: JwtPayload) => {
  const { page, limit, skip, sort, order } = calculatePagination(query);
  const where: Prisma.BookingWhereInput = { isDeleted: false };

  // USER scope: only own bookings
  if (user && user.role !== 'ADMIN') {
    where.userId = user.id;
  } else if (query.userId) {
    where.userId = query.userId;
  }

  if (query.status) where.status = query.status as any;
  if (query.paymentStatus) where.paymentStatus = query.paymentStatus as any;
  if (query.packageId) where.packageId = query.packageId;
  if (query.search) {
    where.OR = [
      { bookingCode: { contains: query.search, mode: 'insensitive' } },
      { pilgrimName: { contains: query.search, mode: 'insensitive' } },
      { pilgrimEmail: { contains: query.search, mode: 'insensitive' } },
    ];
  }

  const sortField = ['createdAt', 'bookedDate', 'departureDate', 'totalAmount'].includes(sort) ? sort : 'createdAt';

  const [data, total] = await Promise.all([
    prisma.booking.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortField]: order as 'asc' | 'desc' },
      include: { travelers: true, payments: true, package: true },
    }),
    prisma.booking.count({ where }),
  ]);
  return { data, meta: { page, limit, total } };
};

const GetSingleBooking = async (idOrCode: string, user?: JwtPayload) => {
  const booking = await prisma.booking.findFirst({
    where: { OR: [{ id: idOrCode }, { bookingCode: idOrCode }], isDeleted: false },
    include: { travelers: true, payments: true, package: true, user: true },
  });
  if (!booking) throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  if (user && user.role !== 'ADMIN' && booking.userId !== user.id) {
    throw new AppError(httpStatus.FORBIDDEN, "You can't view this booking");
  }
  return booking;
};

const UpdateBooking = async (id: string, payload: any) => {
  const exists = await prisma.booking.findFirst({ where: { id, isDeleted: false } });
  if (!exists) throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');

  const { travelers, ...data } = sanitizeDates(payload);

  return prisma.$transaction(async tx => {
    if (travelers) {
      await tx.bookingTraveler.deleteMany({ where: { bookingId: id } });
      await tx.bookingTraveler.createMany({
        data: sanitizeTravelers(travelers).map(t => ({ ...t, bookingId: id })),
      });
    }
    return tx.booking.update({
      where: { id },
      data,
      include: { travelers: true, payments: true, package: true },
    });
  });
};

const DeleteBooking = async (id: string) => {
  const exists = await prisma.booking.findFirst({ where: { id, isDeleted: false } });
  if (!exists) throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  await prisma.booking.update({ where: { id }, data: { isDeleted: true } });
};

const BookingService = {
  CreateBooking,
  GetAllBookings,
  GetSingleBooking,
  UpdateBooking,
  DeleteBooking,
};
export default BookingService;
