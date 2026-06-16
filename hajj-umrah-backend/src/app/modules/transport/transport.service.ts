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
  type?: string;
  vehicleType?: string;
  status?: 'ACTIVE' | 'INACTIVE';
  featured?: string | boolean;
  search?: string;
};

const CreateTransport = async (payload: any) => prisma.transport.create({ data: payload });

const GetAllTransports = async (query: ListQuery) => {
  const { page, limit, skip, sort, order } = calculatePagination(query);
  const where: Prisma.TransportWhereInput = { isDeleted: false };
  if (query.type) where.type = query.type as any;
  if (query.vehicleType) where.vehicleType = query.vehicleType as any;
  if (query.status) where.status = query.status;
  if (query.featured !== undefined) where.featured = query.featured === true || query.featured === 'true';
  if (query.search) where.name = { contains: query.search, mode: 'insensitive' };

  const sortField = ['createdAt', 'price', 'rating', 'name'].includes(sort) ? sort : 'createdAt';

  const [data, total] = await Promise.all([
    prisma.transport.findMany({ where, skip, take: limit, orderBy: { [sortField]: order as 'asc' | 'desc' } }),
    prisma.transport.count({ where }),
  ]);
  return { data, meta: { page, limit, total } };
};

const GetSingleTransport = async (idOrSlug: string) => {
  const t = await prisma.transport.findFirst({
    where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }], isDeleted: false },
  });
  if (!t) throw new AppError(httpStatus.NOT_FOUND, 'Transport not found');
  return t;
};

const UpdateTransport = async (id: string, payload: any) => {
  const exists = await prisma.transport.findFirst({ where: { id, isDeleted: false } });
  if (!exists) throw new AppError(httpStatus.NOT_FOUND, 'Transport not found');
  return prisma.transport.update({ where: { id }, data: payload });
};

const DeleteTransport = async (id: string) => {
  const exists = await prisma.transport.findFirst({ where: { id, isDeleted: false } });
  if (!exists) throw new AppError(httpStatus.NOT_FOUND, 'Transport not found');
  await prisma.transport.update({ where: { id }, data: { isDeleted: true } });
};

const TransportService = {
  CreateTransport,
  GetAllTransports,
  GetSingleTransport,
  UpdateTransport,
  DeleteTransport,
};
export default TransportService;
