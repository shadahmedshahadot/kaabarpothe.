import { z } from 'zod';

const CreateTransportSchema = z.object({
  body: z.object({
    slug: z.string().min(1),
    name: z.string(),
    type: z.enum(['AIRPORT_TRANSFER', 'INTERCITY', 'ZIYARAH_TOUR', 'HARAM_SHUTTLE', 'PRIVATE_HIRE']),
    vehicleType: z.enum(['SEDAN', 'SUV', 'MINIVAN', 'COACH', 'LUXURY_COACH', 'MERCEDES_V_CLASS']),
    capacity: z.number().int().positive(),
    images: z.array(z.string()).default([]),
    cover: z.string(),
    pickupLocation: z.string(),
    dropoffLocation: z.string(),
    routeDetails: z.string(),
    serviceCoverage: z.array(z.string()).default([]),
    driverName: z.string(),
    driverContact: z.string(),
    travelDuration: z.string(),
    price: z.number().nonnegative(),
    pricingUnit: z.enum(['PER_PERSON', 'PER_VEHICLE']),
    availability: z.enum(['AVAILABLE', 'LIMITED', 'SOLDOUT']).default('AVAILABLE'),
    status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
    featured: z.boolean().default(false),
    rating: z.number().min(0).max(5).default(0),
    reviewsCount: z.number().int().nonnegative().default(0),
    bookingsCount: z.number().int().nonnegative().default(0),
    notes: z.string().optional().nullable(),
  }),
});

const UpdateTransportSchema = z.object({
  body: CreateTransportSchema.shape.body.partial(),
});

const TransportValidation = { CreateTransportSchema, UpdateTransportSchema };
export default TransportValidation;
