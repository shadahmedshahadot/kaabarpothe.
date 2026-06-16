import httpStatus from 'http-status';
import { Prisma } from '@prisma/client';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';
import calculatePagination from '../../utils/pagination';

type ListQuery = {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  departureCity?: string;
  arrivalCity?: string;
  cabinClass?: string;
  status?: 'ACTIVE' | 'INACTIVE';
  featured?: string | boolean;
  search?: string;
};

const sanitizeDates = (input: any) => {
  if (input.departureDate) input.departureDate = new Date(input.departureDate);
  if (input.arrivalDate) input.arrivalDate = new Date(input.arrivalDate);
  if (input.publishedAt) input.publishedAt = new Date(input.publishedAt);
  return input;
};

const CreateFlight = async (payload: any) => {
  const { transits, ...data } = sanitizeDates(payload);
  return prisma.flight.create({
    data: {
      ...data,
      transits: transits ? { create: transits.map((t: any, i: number) => ({ ...t, position: i })) } : undefined,
    },
    include: { transits: true },
  });
};

const GetAllFlights = async (query: ListQuery) => {
  const { page, limit, skip, sort, order } = calculatePagination(query);
  const where: Prisma.FlightWhereInput = { isDeleted: false };
  if (query.departureCity) where.departureCity = query.departureCity;
  if (query.arrivalCity) where.arrivalCity = query.arrivalCity;
  if (query.cabinClass) where.cabinClass = query.cabinClass as any;
  if (query.status) where.status = query.status;
  if (query.featured !== undefined) where.featured = query.featured === true || query.featured === 'true';
  if (query.search) {
    where.OR = [
      { flightNumber: { contains: query.search, mode: 'insensitive' } },
      { airlineName: { contains: query.search, mode: 'insensitive' } },
    ];
  }

  const sortField = ['createdAt', 'price', 'rating', 'departureDate'].includes(sort) ? sort : 'createdAt';

  const [data, total] = await Promise.all([
    prisma.flight.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortField]: order as 'asc' | 'desc' },
      include: { transits: { orderBy: { position: 'asc' } } },
    }),
    prisma.flight.count({ where }),
  ]);
  return { data, meta: { page, limit, total } };
};

const GetSingleFlight = async (idOrSlug: string) => {
  const flight = await prisma.flight.findFirst({
    where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }], isDeleted: false },
    include: { transits: { orderBy: { position: 'asc' } } },
  });
  if (!flight) throw new AppError(httpStatus.NOT_FOUND, 'Flight not found');
  return flight;
};

const UpdateFlight = async (id: string, payload: any) => {
  const exists = await prisma.flight.findFirst({ where: { id, isDeleted: false } });
  if (!exists) throw new AppError(httpStatus.NOT_FOUND, 'Flight not found');

  const { transits, ...data } = sanitizeDates(payload);

  return prisma.$transaction(async tx => {
    if (transits) {
      await tx.flightTransit.deleteMany({ where: { flightId: id } });
      await tx.flightTransit.createMany({
        data: transits.map((t: any, i: number) => ({ ...t, flightId: id, position: i })),
      });
    }
    return tx.flight.update({ where: { id }, data, include: { transits: true } });
  });
};

const DeleteFlight = async (id: string) => {
  const exists = await prisma.flight.findFirst({ where: { id, isDeleted: false } });
  if (!exists) throw new AppError(httpStatus.NOT_FOUND, 'Flight not found');
  await prisma.flight.update({ where: { id }, data: { isDeleted: true } });
};

const FlightService = {
  CreateFlight,
  GetAllFlights,
  GetSingleFlight,
  UpdateFlight,
  DeleteFlight,
};
export default FlightService;
