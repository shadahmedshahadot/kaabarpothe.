import { z } from 'zod';

const CreateUserSchema = z.object({
  body: z.object({
    full_name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['ADMIN', 'USER']).default('USER'),
  }),
});

const UpdateUserSchema = z.object({
  body: z.object({
    full_name: z.string().min(3).max(255).optional(),
    phone: z.string().optional().nullable(),
    dateOfBirth: z.string().optional().nullable(),
    gender: z.enum(['MALE', 'FEMALE']).optional().nullable(),
    nationality: z.string().optional().nullable(),
    address: z.string().optional().nullable(),
    city: z.string().optional().nullable(),
    country: z.string().optional().nullable(),
    avatar: z.string().optional().nullable(),
    passportNumber: z.string().optional().nullable(),
    passportIssueDate: z.string().optional().nullable(),
    passportExpiryDate: z.string().optional().nullable(),
    passportCountry: z.string().optional().nullable(),
    emergencyContactName: z.string().optional().nullable(),
    emergencyContactRelationship: z.string().optional().nullable(),
    emergencyContactPhone: z.string().optional().nullable(),
    role: z.enum(['ADMIN', 'USER']).optional(),
  }),
});

const UserValidation = { CreateUserSchema, UpdateUserSchema };
export default UserValidation;
