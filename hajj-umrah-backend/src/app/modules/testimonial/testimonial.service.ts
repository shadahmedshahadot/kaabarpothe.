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
  featured?: string | boolean;
  verified?: string | boolean;
};

const sanitizeDates = (input: any) => {
  if (input.date) input.date = new Date(input.date);
  return input;
};

const CreateTestimonial = async (payload: any) => prisma.testimonial.create({ data: sanitizeDates(payload) });

const GetAllTestimonials = async (query: ListQuery) => {
  const { page, limit, skip, sort, order } = calculatePagination(query);
  const where: Prisma.TestimonialWhereInput = {};
  if (query.featured !== undefined) where.featured = query.featured === true || query.featured === 'true';
  if (query.verified !== undefined) where.verified = query.verified === true || query.verified === 'true';

  const sortField = ['createdAt', 'date', 'rating'].includes(sort) ? sort : 'date';

  const [data, total] = await Promise.all([
    prisma.testimonial.findMany({ where, skip, take: limit, orderBy: { [sortField]: order as 'asc' | 'desc' } }),
    prisma.testimonial.count({ where }),
  ]);
  return { data, meta: { page, limit, total } };
};

const GetSingleTestimonial = async (id: string) => {
  const t = await prisma.testimonial.findUnique({ where: { id } });
  if (!t) throw new AppError(httpStatus.NOT_FOUND, 'Testimonial not found');
  return t;
};

const UpdateTestimonial = async (id: string, payload: any) => {
  const exists = await prisma.testimonial.findUnique({ where: { id } });
  if (!exists) throw new AppError(httpStatus.NOT_FOUND, 'Testimonial not found');
  return prisma.testimonial.update({ where: { id }, data: sanitizeDates(payload) });
};

const DeleteTestimonial = async (id: string) => {
  const exists = await prisma.testimonial.findUnique({ where: { id } });
  if (!exists) throw new AppError(httpStatus.NOT_FOUND, 'Testimonial not found');
  await prisma.testimonial.delete({ where: { id } });
};

const TestimonialService = {
  CreateTestimonial,
  GetAllTestimonials,
  GetSingleTestimonial,
  UpdateTestimonial,
  DeleteTestimonial,
};
export default TestimonialService;
