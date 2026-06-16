import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';
import calculatePagination from '../../utils/pagination';
import config from '../../config';

type ListQuery = {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  role?: 'ADMIN' | 'USER';
  search?: string;
};

const sanitizeDates = (input: any) => {
  for (const f of ['dateOfBirth', 'passportIssueDate', 'passportExpiryDate']) {
    if (input[f]) input[f] = new Date(input[f]);
  }
  return input;
};

const stripPassword = <T extends { password?: string }>(u: T): Omit<T, 'password'> => {
  const { password: _p, ...rest } = u;
  return rest;
};

const CreateUser = async (payload: any) => {
  const exists = await prisma.user.findFirst({ where: { email: payload.email } });
  if (exists) throw new AppError(httpStatus.CONFLICT, 'User already exists');
  const hashedPassword = await bcrypt.hash(payload.password, Number(config.bcrypt_salt_rounds));
  const user = await prisma.user.create({
    data: { ...payload, password: hashedPassword },
  });
  return stripPassword(user);
};

const GetAllUsers = async (query: ListQuery) => {
  const { page, limit, skip, sort, order } = calculatePagination(query);
  const where: Prisma.UserWhereInput = { isDeleted: false };
  if (query.role) where.role = query.role;
  if (query.search) {
    where.OR = [
      { full_name: { contains: query.search, mode: 'insensitive' } },
      { email: { contains: query.search, mode: 'insensitive' } },
    ];
  }

  const sortField = ['createdAt', 'joinedDate', 'full_name', 'totalSpent'].includes(sort) ? sort : 'createdAt';

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortField]: order as 'asc' | 'desc' },
    }),
    prisma.user.count({ where }),
  ]);
  return { data: users.map(stripPassword), meta: { page, limit, total } };
};

const GetSingleUser = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: { id, isDeleted: false },
    include: { documents: true, bookings: true },
  });
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  return stripPassword(user);
};

const GetMe = async (user: JwtPayload) => {
  const me = await prisma.user.findFirst({
    where: { id: user.id, isDeleted: false },
    include: { documents: true },
  });
  if (!me) throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  return stripPassword(me);
};

const UpdateUser = async (id: string, payload: any, requester: JwtPayload) => {
  if (requester.role !== 'ADMIN' && requester.id !== id) {
    throw new AppError(httpStatus.FORBIDDEN, "You can't update this user");
  }
  const exists = await prisma.user.findFirst({ where: { id, isDeleted: false } });
  if (!exists) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  // Non-admin can't change role
  if (requester.role !== 'ADMIN') delete payload.role;

  const updated = await prisma.user.update({ where: { id }, data: sanitizeDates(payload) });
  return stripPassword(updated);
};

const DeleteUser = async (id: string) => {
  const exists = await prisma.user.findFirst({ where: { id, isDeleted: false } });
  if (!exists) throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  await prisma.user.update({ where: { id }, data: { isDeleted: true } });
};

export const UserService = {
  CreateUser,
  GetAllUsers,
  GetSingleUser,
  GetMe,
  UpdateUser,
  DeleteUser,
};
