import { z } from 'zod';

const CreateFaqSchema = z.object({
  body: z.object({
    category: z.string().min(1),
    question: z.string().min(1),
    answer: z.string().min(1),
    position: z.number().int().nonnegative().default(0),
  }),
});

const UpdateFaqSchema = z.object({
  body: CreateFaqSchema.shape.body.partial(),
});

const FaqValidation = { CreateFaqSchema, UpdateFaqSchema };
export default FaqValidation;
