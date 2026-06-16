import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';

const sanitizeDates = (input: any) => {
  if (input.uploadedDate) input.uploadedDate = new Date(input.uploadedDate);
  return input;
};

const CreateDocument = async (payload: any, user: JwtPayload) => {
  const targetUserId = user.role === 'ADMIN' && payload.userId ? payload.userId : user.id;
  const data = sanitizeDates({ ...payload, userId: targetUserId });
  return prisma.userDocument.create({ data });
};

const GetMyDocuments = async (user: JwtPayload) =>
  prisma.userDocument.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' } });

const GetUserDocuments = async (userId: string) =>
  prisma.userDocument.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });

const GetSingleDocument = async (id: string, user: JwtPayload) => {
  const doc = await prisma.userDocument.findUnique({ where: { id } });
  if (!doc) throw new AppError(httpStatus.NOT_FOUND, 'Document not found');
  if (user.role !== 'ADMIN' && doc.userId !== user.id) {
    throw new AppError(httpStatus.FORBIDDEN, "You can't view this document");
  }
  return doc;
};

const UpdateDocument = async (id: string, payload: any, user: JwtPayload) => {
  const doc = await prisma.userDocument.findUnique({ where: { id } });
  if (!doc) throw new AppError(httpStatus.NOT_FOUND, 'Document not found');
  if (user.role !== 'ADMIN' && doc.userId !== user.id) {
    throw new AppError(httpStatus.FORBIDDEN, "You can't update this document");
  }
  return prisma.userDocument.update({ where: { id }, data: sanitizeDates(payload) });
};

const DeleteDocument = async (id: string, user: JwtPayload) => {
  const doc = await prisma.userDocument.findUnique({ where: { id } });
  if (!doc) throw new AppError(httpStatus.NOT_FOUND, 'Document not found');
  if (user.role !== 'ADMIN' && doc.userId !== user.id) {
    throw new AppError(httpStatus.FORBIDDEN, "You can't delete this document");
  }
  await prisma.userDocument.delete({ where: { id } });
};

const UserDocumentService = {
  CreateDocument,
  GetMyDocuments,
  GetUserDocuments,
  GetSingleDocument,
  UpdateDocument,
  DeleteDocument,
};
export default UserDocumentService;
