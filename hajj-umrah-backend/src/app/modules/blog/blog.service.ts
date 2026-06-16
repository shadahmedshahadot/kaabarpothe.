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
  category?: string;
  featured?: string | boolean;
  search?: string;
};

const sanitizeDates = (input: any) => {
  if (input.publishedDate) input.publishedDate = new Date(input.publishedDate);
  return input;
};

const CreateBlog = async (payload: any) => prisma.blog.create({ data: sanitizeDates(payload) });

const GetAllBlogs = async (query: ListQuery) => {
  const { page, limit, skip, sort, order } = calculatePagination(query);
  const where: Prisma.BlogWhereInput = { isDeleted: false };
  if (query.category) where.category = query.category;
  if (query.featured !== undefined) where.featured = query.featured === true || query.featured === 'true';
  if (query.search) {
    where.OR = [
      { title: { contains: query.search, mode: 'insensitive' } },
      { excerpt: { contains: query.search, mode: 'insensitive' } },
    ];
  }

  const sortField = ['createdAt', 'publishedDate', 'views', 'readTime'].includes(sort) ? sort : 'publishedDate';

  const [data, total] = await Promise.all([
    prisma.blog.findMany({ where, skip, take: limit, orderBy: { [sortField]: order as 'asc' | 'desc' } }),
    prisma.blog.count({ where }),
  ]);
  return { data, meta: { page, limit, total } };
};

const GetSingleBlog = async (idOrSlug: string) => {
  const blog = await prisma.blog.findFirst({
    where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }], isDeleted: false },
  });
  if (!blog) throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  await prisma.blog.update({ where: { id: blog.id }, data: { views: { increment: 1 } } });
  return blog;
};

const UpdateBlog = async (id: string, payload: any) => {
  const exists = await prisma.blog.findFirst({ where: { id, isDeleted: false } });
  if (!exists) throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  return prisma.blog.update({ where: { id }, data: sanitizeDates(payload) });
};

const DeleteBlog = async (id: string) => {
  const exists = await prisma.blog.findFirst({ where: { id, isDeleted: false } });
  if (!exists) throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  await prisma.blog.update({ where: { id }, data: { isDeleted: true } });
};

const BlogService = { CreateBlog, GetAllBlogs, GetSingleBlog, UpdateBlog, DeleteBlog };
export default BlogService;
