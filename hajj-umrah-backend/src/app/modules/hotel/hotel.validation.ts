import { z } from 'zod';

const RoomType = z.object({
  name: z.string(),
  capacity: z.number().int().positive(),
  pricePerNight: z.number().nonnegative(),
  available: z.number().int().nonnegative(),
  board: z.enum(['ROOM_ONLY', 'BREAKFAST', 'HALF_BOARD', 'FULL_BOARD']),
});

const CreateHotelSchema = z.object({
  body: z.object({
    slug: z.string().min(1),
    name: z.string().min(1),
    category: z.number().int().min(1).max(5),
    city: z.enum(['MAKKAH', 'MADINAH']),
    country: z.string().default('Saudi Arabia'),
    address: z.string(),
    distanceFromHaram: z.string(),
    images: z.array(z.string()).default([]),
    cover: z.string(),
    description: z.string(),
    facilities: z.array(z.string()).default([]),
    meals: z.string(),
    checkInDate: z.string().optional().nullable(),
    checkOutDate: z.string().optional().nullable(),
    totalRooms: z.number().int().nonnegative(),
    pricePerNight: z.number().nonnegative(),
    rating: z.number().min(0).max(5).default(0),
    reviewsCount: z.number().int().nonnegative().default(0),
    bookingsCount: z.number().int().nonnegative().default(0),
    status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
    featured: z.boolean().default(false),
    notes: z.string().optional().nullable(),
    roomTypes: z.array(RoomType).optional(),
  }),
});

const UpdateHotelSchema = z.object({
  body: CreateHotelSchema.shape.body.partial(),
});

const HotelValidation = { CreateHotelSchema, UpdateHotelSchema };
export default HotelValidation;
