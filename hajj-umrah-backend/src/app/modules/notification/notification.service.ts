import httpStatus from 'http-status';
import { Prisma } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';
import calculatePagination from '../../utils/pagination';

type ListQuery = {
  page?: number;
  limit?: number;
  read?: string;
  type?: string;
};

const List = async (query: ListQuery, user?: JwtPayload) => {
  if (!user) throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  const { page, limit, skip } = calculatePagination(query);
  const where: Prisma.NotificationWhereInput = { userId: user.id };
  if (query.read === 'true') where.read = true;
  if (query.read === 'false') where.read = false;
  if (query.type) where.type = query.type as any;

  const [data, total, unread] = await Promise.all([
    prisma.notification.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.notification.count({ where }),
    prisma.notification.count({ where: { userId: user.id, read: false } }),
  ]);
  return { data, meta: { page, limit, total, unread } };
};

const UnreadCount = async (user?: JwtPayload) => {
  if (!user) throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  const count = await prisma.notification.count({ where: { userId: user.id, read: false } });
  return { count };
};

const MarkRead = async (id: string, user?: JwtPayload) => {
  if (!user) throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  const notif = await prisma.notification.findUnique({ where: { id } });
  if (!notif || notif.userId !== user.id) throw new AppError(httpStatus.NOT_FOUND, 'Notification not found');
  return prisma.notification.update({ where: { id }, data: { read: true, readAt: new Date() } });
};

const MarkAllRead = async (user?: JwtPayload) => {
  if (!user) throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  await prisma.notification.updateMany({
    where: { userId: user.id, read: false },
    data: { read: true, readAt: new Date() },
  });
  return { ok: true };
};

const Delete = async (id: string, user?: JwtPayload) => {
  if (!user) throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  const notif = await prisma.notification.findUnique({ where: { id } });
  if (!notif || notif.userId !== user.id) throw new AppError(httpStatus.NOT_FOUND, 'Notification not found');
  await prisma.notification.delete({ where: { id } });
};

const NotificationService = { List, UnreadCount, MarkRead, MarkAllRead, Delete };
export default NotificationService;
