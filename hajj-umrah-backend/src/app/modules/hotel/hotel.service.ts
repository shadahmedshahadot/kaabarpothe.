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
  city?: 'MAKKAH' | 'MADINAH';
  status?: 'ACTIVE' | 'INACTIVE';
  featured?: string | boolean;
  search?: string;
};

const sanitizeDates = (input: any) => {
  if (input.checkInDate) input.checkInDate = new Date(input.checkInDate);
  if (input.checkOutDate) input.checkOutDate = new Date(input.checkOutDate);
  return input;
};

// Hotel-level dates are optional from the UI's perspective (actual check-in/out
// belongs to a booking). DB still has NOT NULL columns, so default to a far-future
// placeholder when missing — Prisma migration to make them optional is a follow-up.
const PLACEHOLDER = new Date('2099-12-31T00:00:00.000Z');

const CreateHotel = async (payload: any) => {
  const { roomTypes, ...data } = sanitizeDates(payload);
  if (!data.checkInDate) data.checkInDate = PLACEHOLDER;
  if (!data.checkOutDate) data.checkOutDate = PLACEHOLDER;
  return prisma.hotel.create({
    data: { ...data, roomTypes: roomTypes ? { create: roomTypes } : undefined },
    include: { roomTypes: true },
  });
};

const GetAllHotels = async (query: ListQuery) => {
  const { page, limit, skip, sort, order } = calculatePagination(query);
  const where: Prisma.HotelWhereInput = { isDeleted: false };
  if (query.city) where.city = query.city;
  if (query.status) where.status = query.status;
  if (query.featured !== undefined) where.featured = query.featured === true || query.featured === 'true';
  if (query.search) where.name = { contains: query.search, mode: 'insensitive' };

  const sortField = ['createdAt', 'pricePerNight', 'rating', 'name'].includes(sort) ? sort : 'createdAt';

  const [data, total] = await Promise.all([
    prisma.hotel.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortField]: order as 'asc' | 'desc' },
      include: { roomTypes: true },
    }),
    prisma.hotel.count({ where }),
  ]);
  return { data, meta: { page, limit, total } };
};

const GetSingleHotel = async (idOrSlug: string) => {
  const hotel = await prisma.hotel.findFirst({
    where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }], isDeleted: false },
    include: { roomTypes: true },
  });
  if (!hotel) throw new AppError(httpStatus.NOT_FOUND, 'Hotel not found');
  return hotel;
};

const UpdateHotel = async (id: string, payload: any) => {
  const exists = await prisma.hotel.findFirst({ where: { id, isDeleted: false } });
  if (!exists) throw new AppError(httpStatus.NOT_FOUND, 'Hotel not found');

  const { roomTypes, ...data } = sanitizeDates(payload);

  return prisma.$transaction(async tx => {
    if (roomTypes) {
      await tx.hotelRoomType.deleteMany({ where: { hotelId: id } });
      await tx.hotelRoomType.createMany({ data: roomTypes.map((r: any) => ({ ...r, hotelId: id })) });
    }
    return tx.hotel.update({ where: { id }, data, include: { roomTypes: true } });
  });
};

const DeleteHotel = async (id: string) => {
  const exists = await prisma.hotel.findFirst({ where: { id, isDeleted: false } });
  if (!exists) throw new AppError(httpStatus.NOT_FOUND, 'Hotel not found');
  await prisma.hotel.update({ where: { id }, data: { isDeleted: true } });
};

const HotelService = {
  CreateHotel,
  GetAllHotels,
  GetSingleHotel,
  UpdateHotel,
  DeleteHotel,
};
export default HotelService;
