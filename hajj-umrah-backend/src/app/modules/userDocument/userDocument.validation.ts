import { z } from 'zod';

const CreateDocumentSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    type: z.string().min(1),
    status: z.enum(['PENDING', 'UPLOADED', 'VERIFIED']).default('PENDING'),
    uploadedDate: z.string().optional(),
    fileUrl: z.string().optional().nullable(),
  }),
});

const UpdateDocumentSchema = z.object({
  body: z.object({
    type: z.string().optional(),
    status: z.enum(['PENDING', 'UPLOADED', 'VERIFIED']).optional(),
    uploadedDate: z.string().optional(),
    fileUrl: z.string().optional().nullable(),
  }),
});

const UserDocumentValidation = { CreateDocumentSchema, UpdateDocumentSchema };
export default UserDocumentValidation;
