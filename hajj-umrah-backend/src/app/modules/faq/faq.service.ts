import httpStatus from 'http-status';
import { Prisma } from '@prisma/client';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';

type ListQuery = { category?: string };

const CreateFaq = async (payload: any) => prisma.faq.create({ data: payload });

const GetAllFaqs = async (query: ListQuery) => {
  const where: Prisma.FaqWhereInput = {};
  if (query.category) where.category = query.category;
  return prisma.faq.findMany({ where, orderBy: [{ category: 'asc' }, { position: 'asc' }] });
};

const GetSingleFaq = async (id: string) => {
  const faq = await prisma.faq.findUnique({ where: { id } });
  if (!faq) throw new AppError(httpStatus.NOT_FOUND, 'FAQ not found');
  return faq;
};

const UpdateFaq = async (id: string, payload: any) => {
  const exists = await prisma.faq.findUnique({ where: { id } });
  if (!exists) throw new AppError(httpStatus.NOT_FOUND, 'FAQ not found');
  return prisma.faq.update({ where: { id }, data: payload });
};

const DeleteFaq = async (id: string) => {
  const exists = await prisma.faq.findUnique({ where: { id } });
  if (!exists) throw new AppError(httpStatus.NOT_FOUND, 'FAQ not found');
  await prisma.faq.delete({ where: { id } });
};

const GetCategories = async () => {
  const rows = await prisma.faq.findMany({ select: { category: true }, distinct: ['category'] });
  return rows.map(r => r.category);
};

const FaqService = { CreateFaq, GetAllFaqs, GetSingleFaq, UpdateFaq, DeleteFaq, GetCategories };
export default FaqService;
