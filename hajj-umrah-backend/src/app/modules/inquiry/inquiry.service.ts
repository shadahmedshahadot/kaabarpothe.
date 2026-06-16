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
  priority?: string;
  type?: string;
  search?: string;
};

const CreateInquiry = async (payload: any, user?: JwtPayload) =>
  prisma.inquiry.create({
    data: {
      ...payload,
      userId: user?.id ?? null,
    },
  });

const GetAllInquiries = async (query: ListQuery) => {
  const { page, limit, skip, sort, order } = calculatePagination(query);
  const where: Prisma.InquiryWhereInput = {};
  if (query.status) where.status = query.status as any;
  if (query.priority) where.priority = query.priority as any;
  if (query.type) where.type = query.type as any;
  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: 'insensitive' } },
      { email: { contains: query.search, mode: 'insensitive' } },
      { subject: { contains: query.search, mode: 'insensitive' } },
    ];
  }

  const sortField = ['createdDate', 'priority'].includes(sort) ? sort : 'createdDate';

  const [data, total] = await Promise.all([
    prisma.inquiry.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortField]: order as 'asc' | 'desc' },
      include: { package: true },
    }),
    prisma.inquiry.count({ where }),
  ]);
  return { data, meta: { page, limit, total } };
};

const GetSingleInquiry = async (id: string) => {
  const inquiry = await prisma.inquiry.findUnique({ where: { id }, include: { package: true } });
  if (!inquiry) throw new AppError(httpStatus.NOT_FOUND, 'Inquiry not found');
  return inquiry;
};

const UpdateInquiry = async (id: string, payload: any) => {
  const exists = await prisma.inquiry.findUnique({ where: { id } });
  if (!exists) throw new AppError(httpStatus.NOT_FOUND, 'Inquiry not found');
  return prisma.inquiry.update({ where: { id }, data: payload });
};

const DeleteInquiry = async (id: string) => {
  const exists = await prisma.inquiry.findUnique({ where: { id } });
  if (!exists) throw new AppError(httpStatus.NOT_FOUND, 'Inquiry not found');
  await prisma.inquiry.delete({ where: { id } });
};

const InquiryService = { CreateInquiry, GetAllInquiries, GetSingleInquiry, UpdateInquiry, DeleteInquiry };
export default InquiryService;
