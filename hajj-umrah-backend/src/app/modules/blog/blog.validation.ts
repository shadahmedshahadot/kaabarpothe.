import { z } from 'zod';

const CreateBlogSchema = z.object({
  body: z.object({
    slug: z.string().min(1),
    title: z.string(),
    excerpt: z.string(),
    content: z.string(),
    author: z.string(),
    authorRole: z.string(),
    authorAvatar: z.string(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    cover: z.string(),
    readTime: z.number().int().positive(),
    publishedDate: z.string(),
    views: z.number().int().nonnegative().default(0),
    featured: z.boolean().default(false),
  }),
});

const UpdateBlogSchema = z.object({
  body: CreateBlogSchema.shape.body.partial(),
});

const BlogValidation = { CreateBlogSchema, UpdateBlogSchema };
export default BlogValidation;
