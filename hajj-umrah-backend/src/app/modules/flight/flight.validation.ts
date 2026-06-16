import { z } from 'zod';

const Transit = z.object({
  airport: z.string(),
  city: z.string(),
  duration: z.string(),
});

const CreateFlightSchema = z.object({
  body: z.object({
    slug: z.string().min(1),
    airlineName: z.string(),
    airlineLogo: z.string(),
    flightNumber: z.string(),
    departureAirport: z.string(),
    arrivalAirport: z.string(),
    departureCity: z.string(),
    arrivalCity: z.string(),
    departureDate: z.string(),
    departureTime: z.string(),
    arrivalDate: z.string(),
    arrivalTime: z.string(),
    transitDuration: z.string(),
    totalDuration: z.string(),
    cabinClass: z.enum(['ECONOMY', 'ECONOMY_PLUS', 'BUSINESS', 'FIRST']),
    baggageAllowance: z.string(),
    mealInfo: z.string(),
    seatsTotal: z.number().int().nonnegative(),
    seatsAvailable: z.number().int().nonnegative(),
    bookingStatus: z.enum(['OPEN', 'CLOSED', 'WAITLIST', 'SOLDOUT']).default('OPEN'),
    price: z.number().nonnegative(),
    taxes: z.number().nonnegative().default(0),
    discount: z.number().nonnegative().default(0),
    notes: z.string().optional().nullable(),
    status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
    featured: z.boolean().default(false),
    rating: z.number().min(0).max(5).default(0),
    reviewsCount: z.number().int().nonnegative().default(0),
    bookingsCount: z.number().int().nonnegative().default(0),
    publishedAt: z.string().optional(),
    transits: z.array(Transit).default([]),
  }),
});

const UpdateFlightSchema = z.object({
  body: CreateFlightSchema.shape.body.partial(),
});

const FlightValidation = { CreateFlightSchema, UpdateFlightSchema };
export default FlightValidation;
