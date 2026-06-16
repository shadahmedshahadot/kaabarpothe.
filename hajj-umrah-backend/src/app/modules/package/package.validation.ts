import { z } from 'zod';

const ItineraryDay = z.object({
  day: z.number().int().positive(),
  title: z.string(),
  description: z.string(),
  activities: z.array(z.string()).default([]),
});

const PackageFaqItem = z.object({
  question: z.string(),
  answer: z.string(),
});

const CreatePackageSchema = z.object({
  body: z.object({
    slug: z.string().min(1),
    name: z.string().min(1),
    type: z.enum(['HAJJ', 'UMRAH']),
    tier: z.enum(['BUDGET', 'ECONOMY', 'STANDARD', 'PREMIUM', 'VIP', 'LUXURY']),
    shortDescription: z.string(),
    description: z.string(),
    duration: z.number().int().positive(),
    departureDate: z.string().datetime().or(z.string()),
    returnDate: z.string().datetime().or(z.string()),
    price: z.number().nonnegative(),
    discount: z.number().nonnegative().default(0),
    status: z.enum(['PUBLISHED', 'DRAFT']).default('DRAFT'),
    availability: z.enum(['AVAILABLE', 'LIMITED', 'SOLDOUT']).default('AVAILABLE'),
    seatsLeft: z.number().int().nonnegative().default(0),
    rating: z.number().min(0).max(5).default(0),
    reviewsCount: z.number().int().nonnegative().default(0),
    bookingsCount: z.number().int().nonnegative().default(0),
    featured: z.boolean().default(false),
    hotelMakkahName: z.string(),
    hotelMakkahStars: z.number().int(),
    hotelMakkahDistance: z.string(),
    hotelMakkahImage: z.string(),
    hotelMadinahName: z.string(),
    hotelMadinahStars: z.number().int(),
    hotelMadinahDistance: z.string(),
    hotelMadinahImage: z.string(),
    flightAirline: z.string(),
    flightDeparture: z.string(),
    flightArrival: z.string(),
    flightClass: z.string(),
    meals: z.string(),
    transport: z.string(),
    ziyarah: z.array(z.string()).default([]),
    visa: z.string(),
    included: z.array(z.string()).default([]),
    excluded: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
    groupSize: z.string(),
    gallery: z.array(z.string()).default([]),
    cover: z.string(),
    itinerary: z.array(ItineraryDay).optional(),
    faqs: z.array(PackageFaqItem).optional(),
  }),
});

const UpdatePackageSchema = z.object({
  body: CreatePackageSchema.shape.body.partial(),
});

const PackageValidation = { CreatePackageSchema, UpdatePackageSchema };
export default PackageValidation;
