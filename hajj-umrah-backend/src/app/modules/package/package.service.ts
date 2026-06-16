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
  type?: 'HAJJ' | 'UMRAH';
  tier?: string;
  status?: 'PUBLISHED' | 'DRAFT';
  featured?: string | boolean;
  search?: string;
};

const sanitizeDates = (input: any) => {
  if (input.departureDate) input.departureDate = new Date(input.departureDate);
  if (input.returnDate) input.returnDate = new Date(input.returnDate);
  return input;
};

const CreatePackage = async (payload: any) => {
  const { itinerary, faqs, ...data } = sanitizeDates(payload);
  return prisma.package.create({
    data: {
      ...data,
      itinerary: itinerary ? { create: itinerary } : undefined,
      faqs: faqs ? { create: faqs } : undefined,
    },
    include: { itinerary: true, faqs: true },
  });
};

const GetAllPackages = async (query: ListQuery) => {
  const { page, limit, skip, sort, order } = calculatePagination(query);
  const where: Prisma.PackageWhereInput = { isDeleted: false };
  if (query.type) where.type = query.type;
  if (query.tier) where.tier = query.tier as any;
  if (query.status) where.status = query.status;
  if (query.featured !== undefined) where.featured = query.featured === true || query.featured === 'true';
  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: 'insensitive' } },
      { slug: { contains: query.search, mode: 'insensitive' } },
    ];
  }

  const sortField = ['createdAt', 'price', 'rating', 'departureDate', 'name'].includes(sort) ? sort : 'createdAt';

  const [data, total] = await Promise.all([
    prisma.package.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortField]: order as 'asc' | 'desc' },
    }),
    prisma.package.count({ where }),
  ]);
  return { data, meta: { page, limit, total } };
};

const GetSinglePackage = async (idOrSlug: string) => {
  const pkg = await prisma.package.findFirst({
    where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }], isDeleted: false },
    include: {
      itinerary: { orderBy: { day: 'asc' } },
      faqs: true,
    },
  });
  if (!pkg) throw new AppError(httpStatus.NOT_FOUND, 'Package not found');
  return pkg;
};

const UpdatePackage = async (id: string, payload: any) => {
  const exists = await prisma.package.findFirst({ where: { id, isDeleted: false } });
  if (!exists) throw new AppError(httpStatus.NOT_FOUND, 'Package not found');

  const { itinerary, faqs, ...data } = sanitizeDates(payload);

  return prisma.$transaction(async tx => {
    if (itinerary) {
      await tx.packageItineraryDay.deleteMany({ where: { packageId: id } });
      await tx.packageItineraryDay.createMany({ data: itinerary.map((d: any) => ({ ...d, packageId: id })) });
    }
    if (faqs) {
      await tx.packageFAQ.deleteMany({ where: { packageId: id } });
      await tx.packageFAQ.createMany({ data: faqs.map((f: any) => ({ ...f, packageId: id })) });
    }
    return tx.package.update({
      where: { id },
      data,
      include: { itinerary: true, faqs: true },
    });
  });
};

const DeletePackage = async (id: string) => {
  const exists = await prisma.package.findFirst({ where: { id, isDeleted: false } });
  if (!exists) throw new AppError(httpStatus.NOT_FOUND, 'Package not found');
  await prisma.package.update({ where: { id }, data: { isDeleted: true } });
};

const PackageService = {
  CreatePackage,
  GetAllPackages,
  GetSinglePackage,
  UpdatePackage,
  DeletePackage,
};
export default PackageService;
