import { z } from 'zod';

const CreateTestimonialSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    location: z.string(),
    packageName: z.string(),
    rating: z.number().int().min(1).max(5),
    date: z.string(),
    content: z.string().min(1),
    avatar: z.string(),
    verified: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

const UpdateTestimonialSchema = z.object({
  body: CreateTestimonialSchema.shape.body.partial(),
});

const TestimonialValidation = { CreateTestimonialSchema, UpdateTestimonialSchema };
export default TestimonialValidation;
